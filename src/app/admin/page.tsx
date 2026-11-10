import type { Metadata } from "next";
import { isAdmin } from "@/lib/admin-auth";
import { isDbConfigured, listRsvps, listWishes } from "@/lib/wedding-db";
import { AdminLogin, DeleteButton, LogoutButton } from "./AdminLogin";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Quản trị", robots: { index: false, follow: false } };

const SIDE_LABEL: Record<string, string> = {
  groom: "Chú rể (nhà trai)",
  bride: "Cô dâu (nhà gái)",
};

function fmt(ts: string): string {
  return new Date(ts).toLocaleString("vi-VN");
}

export default async function AdminPage() {
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

  const [rsvps, wishes] = await Promise.all([listRsvps(), listWishes()]);

  const attending = rsvps.filter((r) => r.attending);
  const declined = rsvps.length - attending.length;
  const totalGuests = attending.reduce((sum, r) => sum + r.guests, 0);

  return (
    <main className="mx-auto max-w-5xl px-5 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Phản hồi thiệp cưới</h1>
        <LogoutButton />
      </div>

      {/* Summary */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Tổng RSVP", value: rsvps.length },
          { label: "Sẽ tham dự", value: attending.length },
          { label: "Tổng số khách", value: totalGuests },
          { label: "Không dự", value: declined },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-neutral-200 bg-white px-4 py-3">
            <div className="text-2xl font-semibold tabular-nums">{s.value}</div>
            <div className="text-xs text-neutral-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* RSVPs */}
      <section className="mt-9">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-medium">Xác nhận tham dự ({rsvps.length})</h2>
          <a
            href="/api/admin/export?type=rsvp"
            className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100"
          >
            Tải CSV
          </a>
        </div>
        <div className="overflow-x-auto rounded-lg border border-neutral-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-xs uppercase text-neutral-500">
              <tr>
                <th className="px-3 py-2 font-medium">Thời gian</th>
                <th className="px-3 py-2 font-medium">Bên mời</th>
                <th className="px-3 py-2 font-medium">Tên</th>
                <th className="px-3 py-2 font-medium">Tham dự</th>
                <th className="px-3 py-2 font-medium">Khách</th>
                <th className="px-3 py-2 font-medium">Lời nhắn</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {rsvps.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-3 py-6 text-center text-neutral-400">
                    Chưa có phản hồi nào.
                  </td>
                </tr>
              ) : (
                rsvps.map((r) => (
                  <tr key={r.id} className="border-t border-neutral-100 align-top">
                    <td className="whitespace-nowrap px-3 py-2 text-neutral-500">{fmt(r.created_at)}</td>
                    <td className="whitespace-nowrap px-3 py-2">{SIDE_LABEL[r.side] ?? r.side}</td>
                    <td className="px-3 py-2 font-medium">{r.name}</td>
                    <td className="whitespace-nowrap px-3 py-2">
                      {r.attending ? (
                        <span className="text-green-700">Có</span>
                      ) : (
                        <span className="text-neutral-400">Không</span>
                      )}
                    </td>
                    <td className="px-3 py-2 tabular-nums">{r.attending ? r.guests : "—"}</td>
                    <td className="px-3 py-2 text-neutral-600">{r.message || "—"}</td>
                    <td className="px-3 py-2 text-right">
                      <DeleteButton type="rsvp" id={r.id} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Wishes */}
      <section className="mt-9">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-medium">Lời chúc ({wishes.length})</h2>
          <a
            href="/api/admin/export?type=wishes"
            className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100"
          >
            Tải CSV
          </a>
        </div>
        <div className="overflow-x-auto rounded-lg border border-neutral-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-xs uppercase text-neutral-500">
              <tr>
                <th className="px-3 py-2 font-medium">Thời gian</th>
                <th className="px-3 py-2 font-medium">Bên mời</th>
                <th className="px-3 py-2 font-medium">Tên</th>
                <th className="px-3 py-2 font-medium">Lời chúc</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {wishes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-3 py-6 text-center text-neutral-400">
                    Chưa có lời chúc nào.
                  </td>
                </tr>
              ) : (
                wishes.map((w) => (
                  <tr key={w.id} className="border-t border-neutral-100 align-top">
                    <td className="whitespace-nowrap px-3 py-2 text-neutral-500">{fmt(w.created_at)}</td>
                    <td className="whitespace-nowrap px-3 py-2">{SIDE_LABEL[w.side] ?? w.side}</td>
                    <td className="px-3 py-2 font-medium">{w.name}</td>
                    <td className="px-3 py-2 text-neutral-600">{w.message}</td>
                    <td className="px-3 py-2 text-right">
                      <DeleteButton type="wishes" id={w.id} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
