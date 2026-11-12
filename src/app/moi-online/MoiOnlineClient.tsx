"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  PAIRS,
  buildMessage,
  messengerLink,
  selfFor,
  type InviteGuest,
  type InviteSettings,
} from "@/lib/moi-online";

const VARS = ["{xưng_hô}", "{Xưng_hô}", "{tôi}", "{Tôi}", "{tên}", "{giờ}", "{ngày}"];

type GuestRow = {
  id: string;
  name: string;
  call_them: string;
  call_self: string;
  schedule: number | null;
  messenger: string;
  sent: boolean;
};

function rowToGuest(r: GuestRow): InviteGuest {
  return {
    id: r.id,
    name: r.name,
    callThem: r.call_them,
    callSelf: r.call_self,
    schedule: r.schedule,
    messenger: r.messenger,
    sent: r.sent,
  };
}

function copyText(t: string): boolean {
  let ok = false;
  try {
    const ta = document.createElement("textarea");
    ta.value = t;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    ok = document.execCommand("copy");
    document.body.removeChild(ta);
  } catch {
    /* ignore */
  }
  if (!ok && navigator.clipboard) {
    try {
      navigator.clipboard.writeText(t);
      ok = true;
    } catch {
      /* ignore */
    }
  }
  return ok;
}

export function MoiOnlineClient({
  initialGuests,
  initialSettings,
}: {
  initialGuests: InviteGuest[];
  initialSettings: InviteSettings;
}) {
  const router = useRouter();
  const [guests, setGuests] = useState<InviteGuest[]>(initialGuests);
  const [settings, setSettings] = useState<InviteSettings>(initialSettings);

  // Add-guest form
  const [name, setName] = useState("");
  const [callThem, setCallThem] = useState("bạn");
  const [callSelf, setCallSelf] = useState("tôi");
  const [sched, setSched] = useState(""); // "" = default, "0"/"1"
  const [messenger, setMessenger] = useState("");
  const [bulk, setBulk] = useState("");

  const [editId, setEditId] = useState<string | null>(null);
  const [editBuf, setEditBuf] = useState({ name: "", callThem: "", callSelf: "", messenger: "" });

  const [preview, setPreview] = useState("Bấm “Xem” ở một khách để xem tin nhắn.");
  const [toastMsg, setToastMsg] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function toast(t: string) {
    setToastMsg(t);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(""), 1800);
  }

  // --- persistence ---------------------------------------------------------

  function queueSettingsSave(next: InviteSettings) {
    setSettings(next);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try {
        const res = await fetch("/api/moi-online/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(next),
        });
        const d = await res.json();
        if (!res.ok || !d.ok) throw new Error(d.error || "Không lưu được cài đặt.");
      } catch (err) {
        toast(err instanceof Error ? err.message : "Không lưu được cài đặt.");
      }
    }, 600);
  }

  async function patchGuest(id: string, patch: Partial<InviteGuest>) {
    const prev = guests;
    setGuests((gs) => gs.map((g) => (g.id === id ? { ...g, ...patch } : g)));
    const changes: Record<string, unknown> = {};
    if ("name" in patch) changes.name = patch.name;
    if ("callThem" in patch) changes.call_them = patch.callThem;
    if ("callSelf" in patch) changes.call_self = patch.callSelf;
    if ("messenger" in patch) changes.messenger = patch.messenger;
    if ("schedule" in patch) changes.schedule = patch.schedule;
    if ("sent" in patch) changes.sent = patch.sent;
    try {
      const res = await fetch("/api/moi-online/guests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, changes }),
      });
      const d = await res.json();
      if (!res.ok || !d.ok) throw new Error(d.error || "Không cập nhật được.");
    } catch (err) {
      setGuests(prev);
      toast(err instanceof Error ? err.message : "Không cập nhật được.");
    }
  }

  async function addGuests(inputs: Omit<GuestRow, "id">[], okMsg: string) {
    try {
      const res = await fetch("/api/moi-online/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guests: inputs }),
      });
      const d = await res.json();
      if (!res.ok || !d.ok) throw new Error(d.error || "Không lưu được.");
      const created = (d.guests as GuestRow[]).map(rowToGuest);
      setGuests((gs) => [...gs, ...created]);
      toast(okMsg);
      return true;
    } catch (err) {
      toast(err instanceof Error ? err.message : "Không lưu được.");
      return false;
    }
  }

  async function deleteGuest(id: string) {
    const prev = guests;
    setGuests((gs) => gs.filter((g) => g.id !== id));
    if (editId === id) setEditId(null);
    try {
      const res = await fetch("/api/moi-online/guests", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const d = await res.json();
      if (!res.ok || !d.ok) throw new Error(d.error || "Không xoá được.");
    } catch (err) {
      setGuests(prev);
      toast(err instanceof Error ? err.message : "Không xoá được.");
    }
  }

  async function clearAll() {
    if (!guests.length || !confirm("Xoá toàn bộ danh sách?")) return;
    const prev = guests;
    setGuests([]);
    setEditId(null);
    try {
      const res = await fetch("/api/moi-online/guests", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ all: true }),
      });
      const d = await res.json();
      if (!res.ok || !d.ok) throw new Error(d.error || "Không xoá được.");
    } catch (err) {
      setGuests(prev);
      toast(err instanceof Error ? err.message : "Không xoá được.");
    }
  }

  async function resetSent() {
    const sentOnes = guests.filter((g) => g.sent);
    if (!sentOnes.length) return;
    setGuests((gs) => gs.map((g) => ({ ...g, sent: false })));
    try {
      await Promise.all(
        sentOnes.map((g) =>
          fetch("/api/moi-online/guests", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: g.id, changes: { sent: false } }),
          }),
        ),
      );
    } catch {
      toast("Có lỗi khi cập nhật, hãy tải lại trang.");
    }
  }

  // --- derived / helpers ---------------------------------------------------

  const sentCount = guests.filter((g) => g.sent).length;
  const label = (i: number) => `${settings.opts[i].h}, ${settings.opts[i].d}`;

  function scheduleOptions() {
    return (
      <>
        <option value="">Mặc định ({label(settings.def)})</option>
        {settings.opts.map((_, i) => (
          <option key={i} value={i}>
            {i + 1}. {label(i)}
          </option>
        ))}
      </>
    );
  }

  function oval(v: string): number | null {
    return v === "" ? null : Number(v);
  }

  // --- form handlers -------------------------------------------------------

  function onPresetChange(v: string) {
    const p = PAIRS[Number(v)];
    if (p) {
      setCallThem(p[0]);
      setCallSelf(p[1]);
    }
  }

  async function onAdd() {
    const n = name.trim();
    if (!n) {
      toast("Nhập tên khách");
      return;
    }
    const ok = await addGuests(
      [
        {
          name: n,
          call_them: callThem.trim() || "bạn",
          call_self: callSelf.trim() || "tôi",
          schedule: oval(sched),
          messenger: messenger.trim(),
          sent: false,
        },
      ],
      `Đã thêm ${n}`,
    );
    if (ok) {
      setName("");
      setMessenger("");
    }
  }

  async function onAddBulk() {
    const rows: Omit<GuestRow, "id">[] = [];
    bulk.split("\n").forEach((ln) => {
      const p = ln.split(",").map((s) => s.trim());
      if (!p[0]) return;
      const o = p[3] === "1" ? 0 : p[3] === "2" ? 1 : null;
      const xs = (p[1] || "bạn").split("/");
      const x = xs[0].trim();
      rows.push({
        name: p[0],
        call_them: x || "bạn",
        call_self: (xs[1] || selfFor(x)).trim() || "tôi",
        schedule: o,
        messenger: p[2] || "",
        sent: false,
      });
    });
    if (!rows.length) {
      toast("Không có dòng hợp lệ");
      return;
    }
    const ok = await addGuests(rows, `Đã thêm ${rows.length} khách`);
    if (ok) setBulk("");
  }

  function onExport() {
    const rows = guests
      .map((g) =>
        [g.name, `${g.callThem}/${g.callSelf}`, g.messenger, g.schedule == null ? "" : g.schedule + 1].join(", "),
      )
      .join("\n");
    setBulk(rows);
    copyText(rows);
    toast("Đã copy, có thể dán lại vào ô nhập nhiều dòng");
  }

  function onCopyMessage(g: InviteGuest, openMessenger: boolean) {
    const msg = buildMessage(settings, g);
    const ok = copyText(msg);
    setPreview(msg);
    if (openMessenger) {
      const u = messengerLink(g.messenger);
      if (u) window.open(u, "_blank", "noopener");
      else toast("Khách này chưa có username Messenger");
    }
    if (ok) toast(`Đã copy tin nhắn cho ${g.name}`);
    else toast("Không copy được, hãy chọn tin ở mục Xem trước");
  }

  function onCopyLink(g: InviteGuest) {
    const u = messengerLink(g.messenger);
    if (!u) toast("Khách này chưa có username Messenger");
    else toast(copyText(u) ? `Đã copy link: ${u}` : u);
  }

  function startEdit(g: InviteGuest) {
    setEditId(g.id);
    setEditBuf({ name: g.name, callThem: g.callThem, callSelf: g.callSelf, messenger: g.messenger });
  }

  async function saveEdit(g: InviteGuest) {
    const n = editBuf.name.trim();
    if (!n) {
      toast("Tên không được để trống");
      return;
    }
    await patchGuest(g.id, {
      name: n,
      callThem: editBuf.callThem.trim() || "bạn",
      callSelf: editBuf.callSelf.trim() || "tôi",
      messenger: editBuf.messenger.trim(),
    });
    setEditId(null);
    toast("Đã lưu");
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  // --- render --------------------------------------------------------------

  return (
    <div className="moi">
      <style>{CSS}</style>

      <div className="topbar">
        <h1>Gửi thiệp mời qua Messenger</h1>
        <div className="acts">
          <a className="btn s" href="/admin">
            Bảng quản trị
          </a>
          <button className="btn s" type="button" onClick={logout}>
            Đăng xuất
          </button>
        </div>
      </div>

      {/* 1. Schedule options */}
      <section className="card">
        <h2>1. Lịch mời (2 lựa chọn)</h2>
        {settings.opts.map((o, i) => (
          <div className="opt" key={i}>
            <b>
              <input
                type="radio"
                name="def"
                checked={settings.def === i}
                onChange={() => queueSettingsSave({ ...settings, def: i })}
              />{" "}
              Lịch {i + 1}
            </b>
            <div>
              <label>Giờ</label>
              <input
                value={o.h}
                onChange={(e) => {
                  const opts = settings.opts.map((x, j) => (j === i ? { ...x, h: e.target.value } : x));
                  queueSettingsSave({ ...settings, opts });
                }}
              />
            </div>
            <div>
              <label>Ngày</label>
              <input
                value={o.d}
                onChange={(e) => {
                  const opts = settings.opts.map((x, j) => (j === i ? { ...x, d: e.target.value } : x));
                  queueSettingsSave({ ...settings, opts });
                }}
              />
            </div>
          </div>
        ))}
        <p className="hint">
          Chọn nút tròn để đặt lịch mặc định. Mỗi khách có thể chọn lịch riêng ở danh sách bên dưới.
        </p>
      </section>

      {/* 2. Template */}
      <section className="card">
        <h2>2. Mẫu tin nhắn</h2>
        <textarea value={settings.tpl} onChange={(e) => queueSettingsSave({ ...settings, tpl: e.target.value })} />
        <div className="chips">
          {VARS.map((c) => (
            <code key={c} onClick={() => queueSettingsSave({ ...settings, tpl: settings.tpl + c })}>
              {c}
            </code>
          ))}
        </div>
        <p className="hint">
          Bấm vào biến để chèn vào cuối mẫu. <code>{"{xưng_hô}"}</code> là cách gọi họ,{" "}
          <code>{"{tôi}"}</code> là cách mình tự xưng. <code>{"{Xưng_hô}"}</code> và{" "}
          <code>{"{Tôi}"}</code> tự viết hoa chữ đầu (dùng khi đứng đầu câu).
        </p>
      </section>

      {/* 3. Add guest */}
      <section className="card">
        <h2>3. Thêm khách</h2>
        <div className="row">
          <div>
            <label>Tên</label>
            <input
              value={name}
              placeholder="Kiên"
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onAdd()}
            />
          </div>
          <div>
            <label>Cách xưng hô</label>
            <select defaultValue="0" onChange={(e) => onPresetChange(e.target.value)}>
              {PAIRS.map((p, i) => (
                <option key={i} value={i}>
                  Gọi {p[0]}, xưng {p[1]}
                </option>
              ))}
              <option value="">Tự nhập…</option>
            </select>
          </div>
          <div>
            <label>Gọi họ là</label>
            <input value={callThem} onChange={(e) => setCallThem(e.target.value)} />
          </div>
          <div>
            <label>Mình xưng là</label>
            <input value={callSelf} onChange={(e) => setCallSelf(e.target.value)} />
          </div>
          <div>
            <label>Lịch mời</label>
            <select value={sched} onChange={(e) => setSched(e.target.value)}>
              {scheduleOptions()}
            </select>
          </div>
          <div>
            <label>Username / link Messenger</label>
            <input
              value={messenger}
              placeholder="kien.nguyen hoặc link FB"
              onChange={(e) => setMessenger(e.target.value)}
            />
          </div>
        </div>
        <div className="bar">
          <button className="btn p" type="button" onClick={onAdd}>
            Thêm
          </button>
        </div>
        <p className="hint" style={{ marginTop: 12 }}>
          Hoặc dán nhiều dòng, mỗi dòng: tên, xưng hô (anh hoặc em/anh = gọi em, xưng anh), username, lịch
          (1 hoặc 2, bỏ trống = mặc định)
        </p>
        <textarea
          style={{ minHeight: 70, marginTop: 6 }}
          value={bulk}
          placeholder={"Kiên, anh, kien.nguyen, 1\nHạnh, chị, hanh.tran, 2"}
          onChange={(e) => setBulk(e.target.value)}
        />
        <div className="bar">
          <button className="btn" type="button" onClick={onAddBulk}>
            Thêm từ danh sách dán
          </button>
        </div>
      </section>

      {/* 4. List */}
      <section className="card">
        <h2>
          4. Danh sách{" "}
          <span className="hint">
            (đã gửi {sentCount}/{guests.length})
          </span>
        </h2>
        <div className="scroll">
          <table>
            <thead>
              <tr>
                <th>Tên</th>
                <th>Xưng hô</th>
                <th>Lịch mời</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {guests.length === 0 ? (
                <tr>
                  <td colSpan={4} className="hint">
                    Chưa có khách nào.
                  </td>
                </tr>
              ) : (
                guests.map((g) =>
                  editId === g.id ? (
                    <tr key={g.id}>
                      <td>
                        <input
                          placeholder="Tên"
                          value={editBuf.name}
                          onChange={(e) => setEditBuf({ ...editBuf, name: e.target.value })}
                        />
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: 4 }}>
                          <input
                            placeholder="Gọi"
                            value={editBuf.callThem}
                            onChange={(e) => setEditBuf({ ...editBuf, callThem: e.target.value })}
                          />
                          <input
                            placeholder="Xưng"
                            value={editBuf.callSelf}
                            onChange={(e) => setEditBuf({ ...editBuf, callSelf: e.target.value })}
                          />
                        </div>
                      </td>
                      <td>
                        <input
                          placeholder="Username / link Messenger"
                          value={editBuf.messenger}
                          onChange={(e) => setEditBuf({ ...editBuf, messenger: e.target.value })}
                        />
                        <select
                          style={{ marginTop: 4 }}
                          value={g.schedule == null ? "" : String(g.schedule)}
                          onChange={(e) => patchGuest(g.id, { schedule: oval(e.target.value) })}
                        >
                          {scheduleOptions()}
                        </select>
                      </td>
                      <td>
                        <div className="acts">
                          <button className="btn p s" type="button" onClick={() => saveEdit(g)}>
                            Lưu
                          </button>
                          <button className="btn s" type="button" onClick={() => setEditId(null)}>
                            Hủy
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <tr key={g.id} className={g.sent ? "done" : ""}>
                      <td>{g.name}</td>
                      <td>
                        gọi {g.callThem}, xưng {g.callSelf}
                      </td>
                      <td>
                        <select
                          value={g.schedule == null ? "" : String(g.schedule)}
                          onChange={(e) => patchGuest(g.id, { schedule: oval(e.target.value) })}
                        >
                          {scheduleOptions()}
                        </select>
                      </td>
                      <td>
                        <div className="acts">
                          <button className="btn p s" type="button" onClick={() => onCopyMessage(g, true)}>
                            Copy &amp; mở Messenger
                          </button>
                          <button className="btn s" type="button" onClick={() => onCopyMessage(g, false)}>
                            Copy
                          </button>
                          <button className="btn s" type="button" onClick={() => onCopyLink(g)}>
                            Copy link
                          </button>
                          <button
                            className="btn s"
                            type="button"
                            onClick={() => {
                              setPreview(buildMessage(settings, g));
                            }}
                          >
                            Xem
                          </button>
                          <button className="btn s" type="button" onClick={() => patchGuest(g.id, { sent: !g.sent })}>
                            {g.sent ? "✓ Đã gửi" : "Đánh dấu đã gửi"}
                          </button>
                          {!g.sent && (
                            <button className="btn s" type="button" onClick={() => startEdit(g)}>
                              Sửa
                            </button>
                          )}
                          <button className="btn s" type="button" onClick={() => deleteGuest(g.id)}>
                            Xoá
                          </button>
                        </div>
                      </td>
                    </tr>
                  ),
                )
              )}
            </tbody>
          </table>
        </div>
        <div className="bar">
          <button className="btn" type="button" onClick={onExport}>
            Xuất danh sách
          </button>
          <button className="btn" type="button" onClick={resetSent}>
            Bỏ đánh dấu đã gửi
          </button>
          <button className="btn" type="button" onClick={clearAll}>
            Xoá danh sách
          </button>
        </div>
      </section>

      {/* Preview */}
      <section className="card">
        <h2>Xem trước</h2>
        <div className="prev">{preview}</div>
      </section>

      <div className={`toast${toastMsg ? " on" : ""}`}>{toastMsg}</div>
    </div>
  );
}

const CSS = `
.moi{--bg:#faf7f5;--card:#fff;--tx:#2a2227;--mut:#7a6f75;--bd:#e6dde0;--ac:#b4476b;--acx:#fff;--ok:#2f8f5b;--ft:#f6eef1;max-width:900px;margin:0 auto;padding:16px;background:var(--bg);color:var(--tx);font:15px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;min-height:100dvh}
@media (prefers-color-scheme:dark){.moi{--bg:#1a1618;--card:#241f22;--tx:#f0e8eb;--mut:#a89ca2;--bd:#3a3236;--ac:#e07a9c;--acx:#1a1618;--ok:#5cc489;--ft:#2d2629}}
.moi *{box-sizing:border-box}
.moi .topbar{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between}
.moi h1{font-size:20px;margin:4px 0 14px}
.moi h2{font-size:15px;margin:0 0 10px}
.moi .card{background:var(--card);border:1px solid var(--bd);border-radius:12px;padding:14px;margin-bottom:14px}
.moi label{display:block;font-size:12px;color:var(--mut);margin-bottom:3px}
.moi input,.moi textarea,.moi select{width:100%;font:inherit;color:var(--tx);background:var(--bg);border:1px solid var(--bd);border-radius:8px;padding:8px 10px}
.moi input[type=radio]{width:auto}
.moi textarea{min-height:190px;resize:vertical}
.moi .row{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin-bottom:10px}
.moi .opt{display:grid;grid-template-columns:auto 1fr 1.6fr;gap:10px;align-items:end;margin-bottom:10px}
.moi .opt b{font-size:13px;padding-bottom:9px;white-space:nowrap}
.moi .btn{display:inline-block;font:inherit;cursor:pointer;border:1px solid var(--bd);background:var(--card);color:var(--tx);border-radius:8px;padding:7px 12px;text-decoration:none;line-height:1.5}
.moi .btn.p{background:var(--ac);color:var(--acx);border-color:var(--ac);font-weight:600}
.moi .btn.s{font-size:13px;padding:5px 9px}
.moi .chips{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 0}
.moi .chips code{background:var(--ft);border:1px solid var(--bd);border-radius:6px;padding:2px 7px;font-size:12px;cursor:pointer}
.moi .hint{font-size:12px;color:var(--mut);margin:6px 0 0}
.moi .scroll{overflow-x:auto}
.moi table{width:100%;border-collapse:collapse;font-size:14px;min-width:620px}
.moi th,.moi td{text-align:left;padding:8px 6px;border-bottom:1px solid var(--bd);vertical-align:middle}
.moi th{font-size:12px;color:var(--mut);font-weight:600}
.moi tr.done td{opacity:.55}
.moi td select{font-size:13px;padding:5px 6px;min-width:150px}
.moi .acts{display:flex;gap:6px;flex-wrap:wrap}
.moi .prev{white-space:pre-wrap;background:var(--ft);border:1px solid var(--bd);border-radius:8px;padding:10px;font-size:14px}
.moi .bar{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:10px}
.moi .toast{position:fixed;left:50%;bottom:calc(20px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);background:var(--tx);color:var(--bg);padding:8px 14px;border-radius:20px;font-size:13px;opacity:0;pointer-events:none;transition:opacity .2s;z-index:50}
.moi .toast.on{opacity:1}
`;
