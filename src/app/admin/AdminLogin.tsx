"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminLogin({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const d = await res.json();
      if (!res.ok || !d.ok) throw new Error(d.error || "Đăng nhập thất bại.");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đăng nhập thất bại.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-sm flex-col justify-center px-6">
      <h1 className="text-xl font-semibold">Quản trị thiệp cưới</h1>
      <p className="mt-1 text-sm text-neutral-500">Nhập mật khẩu để xem danh sách phản hồi.</p>

      {!configured && (
        <p className="mt-4 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-700">
          Chưa đặt biến môi trường <code>ADMIN_PASSWORD</code> trên máy chủ.
        </p>
      )}

      <form onSubmit={submit} className="mt-5 space-y-3">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mật khẩu"
          autoFocus
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
        />
        <button
          type="submit"
          disabled={busy || !configured}
          className="w-full cursor-pointer rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {busy ? "Đang kiểm tra…" : "Đăng nhập"}
        </button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>
    </main>
  );
}

export function DeleteButton({ type, id }: { type: "rsvp" | "wishes"; id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return (
    <button
      type="button"
      disabled={busy}
      aria-label="Xoá"
      onClick={async () => {
        if (!confirm("Xoá mục này? Không thể hoàn tác.")) return;
        setBusy(true);
        try {
          const res = await fetch("/api/admin/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type, id }),
          });
          const d = await res.json();
          if (!res.ok || !d.ok) throw new Error(d.error || "Không xoá được.");
          router.refresh();
        } catch (err) {
          setBusy(false);
          alert(err instanceof Error ? err.message : "Không xoá được.");
        }
      }}
      className="cursor-pointer rounded px-2 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
    >
      {busy ? "…" : "Xoá"}
    </button>
  );
}

export function LogoutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.refresh();
      }}
      className="cursor-pointer rounded-md border border-neutral-300 px-3 py-1.5 text-sm text-neutral-600 transition-colors hover:bg-neutral-100"
    >
      Đăng xuất
    </button>
  );
}
