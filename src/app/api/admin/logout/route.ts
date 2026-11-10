import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";

export async function POST() {
  const jar = await cookies();
  jar.delete("cdn_admin");
  return NextResponse.json({ ok: true });
}
