import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import {
  deleteAllInviteGuests,
  deleteInviteGuest,
  insertInviteGuests,
  isDbConfigured,
  listInviteGuests,
  updateInviteGuest,
  type InviteGuestInput,
} from "@/lib/wedding-db";

export const runtime = "nodejs";

/** Shared guard: must be a configured DB and a logged-in admin. */
async function guard(): Promise<NextResponse | null> {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Chưa đăng nhập." }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Máy chủ chưa cấu hình cơ sở dữ liệu." },
      { status: 503 },
    );
  }
  return null;
}

function parseSchedule(v: unknown): number | null {
  if (v === 0 || v === 1) return v;
  if (v === "0" || v === "1") return Number(v);
  return null;
}

/** Validate and normalize one incoming guest, or null if the name is empty. */
function cleanGuest(raw: unknown): InviteGuestInput | null {
  const r = (raw ?? {}) as Record<string, unknown>;
  const name = String(r.name ?? "").trim().slice(0, 100);
  if (!name) return null;
  return {
    name,
    call_them: (String(r.call_them ?? "").trim() || "bạn").slice(0, 40),
    call_self: (String(r.call_self ?? "").trim() || "tôi").slice(0, 40),
    schedule: parseSchedule(r.schedule),
    messenger: String(r.messenger ?? "").trim().slice(0, 300),
    sent: r.sent === true,
  };
}

export async function GET() {
  const denied = await guard();
  if (denied) return denied;
  try {
    const guests = await listInviteGuests();
    return NextResponse.json({ ok: true, guests });
  } catch (err) {
    console.error("[moi-online] list failed:", err);
    return NextResponse.json({ ok: false, error: "Không tải được danh sách." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const denied = await guard();
  if (denied) return denied;

  const body = (await request.json().catch(() => ({}))) as { guests?: unknown };
  const list = Array.isArray(body.guests) ? body.guests : [body.guests];
  const rows = list.map(cleanGuest).filter((g): g is InviteGuestInput => g !== null);
  if (rows.length === 0) {
    return NextResponse.json({ ok: false, error: "Không có khách hợp lệ." }, { status: 400 });
  }

  try {
    const created = await insertInviteGuests(rows);
    return NextResponse.json({ ok: true, guests: created });
  } catch (err) {
    console.error("[moi-online] insert failed:", err);
    return NextResponse.json({ ok: false, error: "Không lưu được, thử lại sau." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const denied = await guard();
  if (denied) return denied;

  const body = (await request.json().catch(() => ({}))) as {
    id?: unknown;
    changes?: unknown;
  };
  const id = typeof body.id === "string" ? body.id : "";
  if (!id) {
    return NextResponse.json({ ok: false, error: "Thiếu id." }, { status: 400 });
  }

  const c = (body.changes ?? {}) as Record<string, unknown>;
  const changes: Partial<InviteGuestInput> = {};
  if ("name" in c) {
    const name = String(c.name ?? "").trim().slice(0, 100);
    if (!name) {
      return NextResponse.json({ ok: false, error: "Tên không được để trống." }, { status: 400 });
    }
    changes.name = name;
  }
  if ("call_them" in c) changes.call_them = (String(c.call_them ?? "").trim() || "bạn").slice(0, 40);
  if ("call_self" in c) changes.call_self = (String(c.call_self ?? "").trim() || "tôi").slice(0, 40);
  if ("messenger" in c) changes.messenger = String(c.messenger ?? "").trim().slice(0, 300);
  if ("schedule" in c) changes.schedule = parseSchedule(c.schedule);
  if ("sent" in c) changes.sent = c.sent === true;

  if (Object.keys(changes).length === 0) {
    return NextResponse.json({ ok: false, error: "Không có thay đổi." }, { status: 400 });
  }

  try {
    const row = await updateInviteGuest(id, changes);
    return NextResponse.json({ ok: true, guest: row });
  } catch (err) {
    console.error("[moi-online] update failed:", err);
    return NextResponse.json({ ok: false, error: "Không cập nhật được." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const denied = await guard();
  if (denied) return denied;

  const body = (await request.json().catch(() => ({}))) as { id?: unknown; all?: unknown };
  try {
    if (body.all === true) {
      await deleteAllInviteGuests();
      return NextResponse.json({ ok: true });
    }
    const id = typeof body.id === "string" ? body.id : "";
    if (!id) {
      return NextResponse.json({ ok: false, error: "Thiếu id." }, { status: 400 });
    }
    await deleteInviteGuest(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[moi-online] delete failed:", err);
    return NextResponse.json({ ok: false, error: "Không xoá được." }, { status: 500 });
  }
}
