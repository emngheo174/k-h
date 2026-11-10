import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { deleteRsvp, deleteWish } from "@/lib/wedding-db";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Chưa đăng nhập." }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as { type?: unknown; id?: unknown };
  const id = typeof body.id === "string" ? body.id : "";
  if (!id) {
    return NextResponse.json({ ok: false, error: "Thiếu id." }, { status: 400 });
  }

  try {
    if (body.type === "rsvp") {
      await deleteRsvp(id);
    } else if (body.type === "wishes") {
      await deleteWish(id);
    } else {
      return NextResponse.json({ ok: false, error: "Loại không hợp lệ." }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/delete] failed:", err);
    return NextResponse.json({ ok: false, error: "Không xoá được." }, { status: 500 });
  }
}
