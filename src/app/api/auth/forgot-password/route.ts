import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isEmailConfigured, sendPasswordResetOtpEmail } from "@/lib/email";
import { generateOtp, isValidEmail } from "@/lib/password";

const OTP_TTL_MS = 10 * 60 * 1000;

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const cleanEmail = String(email || "").trim().toLowerCase();

  if (!cleanEmail || !isValidEmail(cleanEmail)) {
    return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
  }

  if (!isEmailConfigured()) {
    return NextResponse.json(
      { error: "Email is not configured. Please contact support to reset your password." },
      { status: 503 },
    );
  }

  const user = await prisma.user.findUnique({ where: { email: cleanEmail } });

  // Always return success shape so we don't leak whether the email exists.
  if (!user) {
    return NextResponse.json({
      success: true,
      message: "If an account exists for this email, an OTP has been sent.",
    });
  }

  const otp = generateOtp();
  await prisma.user.update({
    where: { id: user.id },
    data: { otpCode: otp, otpExpiresAt: new Date(Date.now() + OTP_TTL_MS) },
  });

  await sendPasswordResetOtpEmail(user, otp);

  return NextResponse.json({
    success: true,
    otpRequired: true,
    email: cleanEmail,
    message: "If an account exists for this email, an OTP has been sent.",
  });
}
