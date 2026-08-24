import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isValidPhone, normalizePhone, publicUser } from "@/lib/password";
import { getSession } from "@/lib/session";

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session.userId) {
    return NextResponse.json({ error: "Please log in" }, { status: 401 });
  }

  const { name, phone, address } = await req.json();
  const cleanName = String(name || "").trim();
  const cleanPhone = String(phone || "").trim();
  const cleanAddress = String(address || "").trim();

  if (!cleanName || cleanName.length < 2) {
    return NextResponse.json({ error: "Please enter your full name" }, { status: 400 });
  }

  let phoneValue: string | null = null;
  if (cleanPhone) {
    const normalized = normalizePhone(cleanPhone);
    if (!isValidPhone(normalized)) {
      return NextResponse.json({ error: "Please enter a valid 10-digit Indian mobile number" }, { status: 400 });
    }
    phoneValue = normalized;
  }

  const user = await prisma.user.update({
    where: { id: session.userId },
    data: {
      name: cleanName,
      phone: phoneValue,
      address: cleanAddress || null,
    },
  });

  return NextResponse.json({ success: true, user: publicUser(user) });
}
