import { NextResponse } from "next/server";
import { insertRsvp, isDbConfigured, type Side } from "@/lib/wedding-db";

export const runtime = "nodejs";

function parseSide(v: unknown): Side | null {
  return v === "groom" || v === "bride" ? v : null;
}

export async function POST(request: Request) {
  if (!isDbConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Máy chủ chưa cấu hình cơ sở dữ liệu." },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Dữ liệu không hợp lệ." }, { status: 400 });
  }

  const side = parseSide(body.side);
  const name = String(body.name ?? "").trim();
  const attending = body.attending === true;
  const message = String(body.message ?? "").trim().slice(0, 1000);
  const guestsRaw = Number(body.guests);
  const guests = attending
    ? Math.min(20, Math.max(1, Number.isFinite(guestsRaw) ? Math.floor(guestsRaw) : 1))
    : 1;

  if (!side) {
    return NextResponse.json({ ok: false, error: "Thiếu thông tin bên mời." }, { status: 400 });
  }
  if (name.length < 1 || name.length > 100) {
    return NextResponse.json({ ok: false, error: "Vui lòng nhập tên hợp lệ." }, { status: 400 });
  }
  if (typeof body.attending !== "boolean") {
    return NextResponse.json({ ok: false, error: "Vui lòng chọn tham dự hay không." }, { status: 400 });
  }

  try {
    await insertRsvp({ side, name, attending, guests, message });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[rsvp] insert failed:", err);
    return NextResponse.json({ ok: false, error: "Không lưu được, thử lại sau." }, { status: 500 });
  }
}
