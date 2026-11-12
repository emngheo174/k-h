import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { isDbConfigured, saveInviteSettings } from "@/lib/wedding-db";
import type { InviteSettings, ScheduleOption } from "@/lib/moi-online";

export const runtime = "nodejs";

function cleanOpt(raw: unknown): ScheduleOption {
  const r = (raw ?? {}) as Record<string, unknown>;
  return {
    h: String(r.h ?? "").slice(0, 120),
    d: String(r.d ?? "").slice(0, 200),
  };
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Chưa đăng nhập." }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Máy chủ chưa cấu hình cơ sở dữ liệu." },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const opts = (Array.isArray(body.opts) ? body.opts : []).slice(0, 8).map(cleanOpt);
  const defRaw = Number(body.def);
  const def = Number.isInteger(defRaw) && defRaw >= 0 && defRaw < opts.length ? defRaw : 0;
  const settings: InviteSettings = {
    tpl: String(body.tpl ?? "").slice(0, 4000),
    def,
    opts,
  };

  try {
    await saveInviteSettings(settings);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[moi-online] save settings failed:", err);
    return NextResponse.json({ ok: false, error: "Không lưu được cài đặt." }, { status: 500 });
  }
}
