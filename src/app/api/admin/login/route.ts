import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "Chưa đặt ADMIN_PASSWORD trên máy chủ." },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as { password?: unknown };
  if (typeof body.password !== "string" || body.password !== expected) {
    return NextResponse.json({ ok: false, error: "Sai mật khẩu." }, { status: 401 });
  }

  const jar = await cookies();
  jar.set("cdn_admin", expected, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return NextResponse.json({ ok: true });
}
