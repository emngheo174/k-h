import { NextResponse } from "next/server";
import {
  insertWish,
  isDbConfigured,
  listPublicWishes,
  type Side,
} from "@/lib/wedding-db";

export const runtime = "nodejs";

function parseSide(v: unknown): Side | null {
  return v === "groom" || v === "bride" ? v : null;
}

/** Public guestbook feed. */
export async function GET() {
  if (!isDbConfigured()) {
    // Fail soft: an unconfigured server shows an empty guestbook, not an error.
    return NextResponse.json({ ok: true, wishes: [] });
  }
  try {
    const wishes = await listPublicWishes();
    return NextResponse.json({ ok: true, wishes });
  } catch (err) {
    console.error("[wishes] list failed:", err);
    return NextResponse.json({ ok: false, error: "Không tải được lời chúc." }, { status: 500 });
  }
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
  const name = String(body.name ?? "").trim().slice(0, 100);
  const message = String(body.message ?? "").trim().slice(0, 1000);

  if (!side) {
    return NextResponse.json({ ok: false, error: "Thiếu thông tin bên mời." }, { status: 400 });
  }
  if (!name || !message) {
    return NextResponse.json(
      { ok: false, error: "Vui lòng nhập tên và lời chúc." },
      { status: 400 },
    );
  }

  try {
    const row = await insertWish({ side, name, message });
    return NextResponse.json({
      ok: true,
      wish: row
        ? { side: row.side, name: row.name, message: row.message, created_at: row.created_at }
        : { side, name, message, created_at: new Date().toISOString() },
    });
  } catch (err) {
    console.error("[wishes] insert failed:", err);
    return NextResponse.json({ ok: false, error: "Không lưu được, thử lại sau." }, { status: 500 });
  }
}
