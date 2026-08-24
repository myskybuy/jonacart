import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword, isValidEmail } from "@/lib/password";

export async function POST(req: NextRequest) {
  const { email, otp, newPassword } = await req.json();
  const cleanEmail = String(email || "").trim().toLowerCase();
  const cleanOtp = String(otp || "").trim();
  const password = String(newPassword || "");

  if (!cleanEmail || !isValidEmail(cleanEmail)) {
    return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
  }
  if (!cleanOtp || cleanOtp.length !== 6) {
    return NextResponse.json({ error: "Please enter the 6-digit OTP" }, { status: 400 });
  }
  if (password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: cleanEmail } });
  if (!user || !user.otpCode || !user.otpExpiresAt) {
    return NextResponse.json({ error: "No reset request found. Please request a new OTP." }, { status: 400 });
  }

  if (user.otpExpiresAt.getTime() < Date.now()) {
    return NextResponse.json({ error: "OTP has expired. Please request a new one." }, { status: 400 });
  }

  if (user.otpCode !== cleanOtp) {
    return NextResponse.json({ error: "Incorrect OTP. Please try again." }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash: hashPassword(password),
      otpCode: null,
      otpExpiresAt: null,
    },
  });

  return NextResponse.json({ success: true, message: "Password updated. Please log in." });
}
