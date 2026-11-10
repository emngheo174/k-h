import { isAdmin } from "@/lib/admin-auth";
import { listRsvps, listWishes } from "@/lib/wedding-db";

export const runtime = "nodejs";

const SIDE_LABEL: Record<string, string> = {
  groom: "Chú rể (nhà trai)",
  bride: "Cô dâu (nhà gái)",
};

/** Quote a value for CSV (handles commas, quotes, newlines). */
function csvCell(v: unknown): string {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function toCsv(headers: string[], rows: string[][]): string {
  // Prepend BOM so Excel opens UTF-8 (Vietnamese) correctly.
  return "﻿" + [headers, ...rows].map((r) => r.map(csvCell).join(",")).join("\r\n");
}

export async function GET(request: Request) {
  if (!(await isAdmin())) {
    return new Response("Unauthorized", { status: 401 });
  }

  const type = new URL(request.url).searchParams.get("type");

  let csv: string;
  let filename: string;

  if (type === "wishes") {
    const wishes = await listWishes();
    csv = toCsv(
      ["Thời gian", "Bên mời", "Tên", "Lời chúc"],
      wishes.map((w) => [
        new Date(w.created_at).toLocaleString("vi-VN"),
        SIDE_LABEL[w.side] ?? w.side,
        w.name,
        w.message,
      ]),
    );
    filename = "loi-chuc.csv";
  } else {
    const rsvps = await listRsvps();
    csv = toCsv(
      ["Thời gian", "Bên mời", "Tên", "Tham dự", "Số khách", "Lời nhắn"],
      rsvps.map((r) => [
        new Date(r.created_at).toLocaleString("vi-VN"),
        SIDE_LABEL[r.side] ?? r.side,
        r.name,
        r.attending ? "Có" : "Không",
        String(r.guests),
        r.message,
      ]),
    );
    filename = "rsvp.csv";
  }

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
