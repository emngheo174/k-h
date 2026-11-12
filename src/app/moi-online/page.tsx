import type { Metadata } from "next";
import { isAdmin } from "@/lib/admin-auth";
import { getInviteSettings, isDbConfigured, listInviteGuests } from "@/lib/wedding-db";
import { DEFAULT_SETTINGS, type InviteGuest } from "@/lib/moi-online";
import { AdminLogin } from "@/app/admin/AdminLogin";
import { MoiOnlineClient } from "./MoiOnlineClient";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Gửi thiệp mời qua Messenger",
  robots: { index: false, follow: false },
};

export default async function MoiOnlinePage() {
  if (!(await isAdmin())) {
    return <AdminLogin configured={Boolean(process.env.ADMIN_PASSWORD)} />;
  }

  if (!isDbConfigured()) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-10">
        <p className="rounded-md bg-amber-50 px-4 py-3 text-sm text-amber-700">
          Chưa cấu hình Supabase. Hãy đặt <code>SUPABASE_URL</code> và{" "}
          <code>SUPABASE_SERVICE_ROLE_KEY</code> rồi tải lại trang.
        </p>
      </main>
    );
  }

  const [rows, settings] = await Promise.all([listInviteGuests(), getInviteSettings()]);

  const guests: InviteGuest[] = rows.map((r) => ({
    id: r.id,
    name: r.name,
    callThem: r.call_them,
    callSelf: r.call_self,
    schedule: r.schedule,
    messenger: r.messenger,
    sent: r.sent,
  }));

  // A saved settings row may predate a template/opts change; fall back per field.
  const initialSettings = settings
    ? {
        tpl: settings.tpl || DEFAULT_SETTINGS.tpl,
        def: settings.def ?? DEFAULT_SETTINGS.def,
        opts: settings.opts?.length ? settings.opts : DEFAULT_SETTINGS.opts,
      }
    : DEFAULT_SETTINGS;

  return <MoiOnlineClient initialGuests={guests} initialSettings={initialSettings} />;
}
