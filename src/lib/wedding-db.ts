// Server-only data access for the wedding backend.
// Talks to Supabase via its PostgREST endpoint using the service-role key, so
// this module must never be imported into a Client Component.

import type { InviteSettings } from "@/lib/moi-online";

export type Side = "groom" | "bride";

export interface RsvpRow {
  id: string;
  side: Side;
  name: string;
  attending: boolean;
  guests: number;
  message: string;
  created_at: string;
}

export interface WishRow {
  id: string;
  side: Side;
  name: string;
  message: string;
  created_at: string;
}

/** Public shape returned to the guestbook (no id, no created_at precision needs). */
export interface PublicWish {
  side: Side;
  name: string;
  message: string;
  created_at: string;
}

/** One guest in the private /moi-online invitation list. */
export interface InviteGuestRow {
  id: string;
  name: string;
  call_them: string;
  call_self: string;
  schedule: number | null;
  messenger: string;
  sent: boolean;
  created_at: string;
}

/** Fields accepted when creating a guest. */
export interface InviteGuestInput {
  name: string;
  call_them: string;
  call_self: string;
  schedule: number | null;
  messenger: string;
  sent: boolean;
}

// Accept either name: the Supabase→Vercel integration sets both SUPABASE_URL
// and NEXT_PUBLIC_SUPABASE_URL; a manual setup may only set one.
const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** True when Supabase credentials are present. Lets callers fail soft. */
export function isDbConfigured(): boolean {
  return Boolean(SUPABASE_URL && SERVICE_KEY);
}

function restUrl(table: string, query = ""): string {
  if (!SUPABASE_URL) throw new Error("SUPABASE_URL is not set");
  return `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/${table}${query}`;
}

function headers(extra: Record<string, string> = {}): Record<string, string> {
  if (!SERVICE_KEY) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  return {
    apikey: SERVICE_KEY,
    Authorization: `Bearer ${SERVICE_KEY}`,
    ...extra,
  };
}

async function insert<T>(table: string, row: object, returnRow = false): Promise<T | null> {
  const res = await fetch(restUrl(table), {
    method: "POST",
    headers: headers({
      "Content-Type": "application/json",
      Prefer: returnRow ? "return=representation" : "return=minimal",
    }),
    body: JSON.stringify(row),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Supabase insert "${table}" failed (${res.status}): ${await res.text()}`);
  }
  if (!returnRow) return null;
  const rows = (await res.json()) as T[];
  return rows[0] ?? null;
}

async function removeById(table: string, id: string): Promise<void> {
  const res = await fetch(restUrl(table, `?id=eq.${encodeURIComponent(id)}`), {
    method: "DELETE",
    headers: headers({ Prefer: "return=minimal" }),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Supabase delete "${table}" failed (${res.status}): ${await res.text()}`);
  }
}

async function insertMany<T>(table: string, rows: object[]): Promise<T[]> {
  const res = await fetch(restUrl(table), {
    method: "POST",
    headers: headers({ "Content-Type": "application/json", Prefer: "return=representation" }),
    body: JSON.stringify(rows),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Supabase insert "${table}" failed (${res.status}): ${await res.text()}`);
  }
  return (await res.json()) as T[];
}

async function patch<T>(table: string, id: string, changes: object): Promise<T | null> {
  const res = await fetch(restUrl(table, `?id=eq.${encodeURIComponent(id)}`), {
    method: "PATCH",
    headers: headers({ "Content-Type": "application/json", Prefer: "return=representation" }),
    body: JSON.stringify(changes),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Supabase update "${table}" failed (${res.status}): ${await res.text()}`);
  }
  const rows = (await res.json()) as T[];
  return rows[0] ?? null;
}

async function upsert<T>(table: string, row: object): Promise<T | null> {
  const res = await fetch(restUrl(table, "?on_conflict=id"), {
    method: "POST",
    headers: headers({
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation",
    }),
    body: JSON.stringify(row),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Supabase upsert "${table}" failed (${res.status}): ${await res.text()}`);
  }
  const rows = (await res.json()) as T[];
  return rows[0] ?? null;
}

async function select<T>(table: string, query: string): Promise<T[]> {
  const res = await fetch(restUrl(table, query), {
    headers: headers(),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Supabase select "${table}" failed (${res.status}): ${await res.text()}`);
  }
  return (await res.json()) as T[];
}

// ----------------------------------------------------------------- writes ---

export function insertRsvp(input: {
  side: Side;
  name: string;
  attending: boolean;
  guests: number;
  message: string;
}): Promise<RsvpRow | null> {
  return insert<RsvpRow>("rsvps", input, true);
}

export function insertWish(input: {
  side: Side;
  name: string;
  message: string;
}): Promise<WishRow | null> {
  return insert<WishRow>("wishes", input, true);
}

// ------------------------------------------------------------------ reads ---

/** Public guestbook feed (newest first). */
export function listPublicWishes(limit = 200): Promise<PublicWish[]> {
  return select<PublicWish>(
    "wishes",
    `?select=side,name,message,created_at&order=created_at.desc&limit=${limit}`,
  );
}

/** Admin: every RSVP, newest first. */
export function listRsvps(): Promise<RsvpRow[]> {
  return select<RsvpRow>("rsvps", "?select=*&order=created_at.desc");
}

/** Admin: every wish, newest first. */
export function listWishes(): Promise<WishRow[]> {
  return select<WishRow>("wishes", "?select=*&order=created_at.desc");
}

// --------------------------------------------------------------- deletes ---

export function deleteRsvp(id: string): Promise<void> {
  return removeById("rsvps", id);
}

export function deleteWish(id: string): Promise<void> {
  return removeById("wishes", id);
}

// ------------------------------------------------ moi-online (invite list) ---

/** Admin: full guest list, in the order they were added. */
export function listInviteGuests(): Promise<InviteGuestRow[]> {
  return select<InviteGuestRow>("invite_guests", "?select=*&order=created_at.asc");
}

/** Insert one or more guests; returns the created rows (with ids). */
export function insertInviteGuests(rows: InviteGuestInput[]): Promise<InviteGuestRow[]> {
  return insertMany<InviteGuestRow>("invite_guests", rows);
}

/** Update selected fields of one guest. */
export function updateInviteGuest(
  id: string,
  changes: Partial<InviteGuestInput>,
): Promise<InviteGuestRow | null> {
  return patch<InviteGuestRow>("invite_guests", id, changes);
}

export function deleteInviteGuest(id: string): Promise<void> {
  return removeById("invite_guests", id);
}

/** Delete every guest (PostgREST needs a filter, so match all non-null ids). */
export async function deleteAllInviteGuests(): Promise<void> {
  const res = await fetch(restUrl("invite_guests", "?id=not.is.null"), {
    method: "DELETE",
    headers: headers({ Prefer: "return=minimal" }),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Supabase delete-all "invite_guests" failed (${res.status}): ${await res.text()}`);
  }
}

/** The single settings row, or null when it has never been saved. */
export async function getInviteSettings(): Promise<InviteSettings | null> {
  const rows = await select<InviteSettings>(
    "invite_settings",
    "?id=eq.main&select=tpl,def,opts",
  );
  return rows[0] ?? null;
}

/** Create or update the settings row. */
export function saveInviteSettings(settings: InviteSettings): Promise<InviteSettings | null> {
  return upsert<InviteSettings>("invite_settings", {
    id: "main",
    tpl: settings.tpl,
    def: settings.def,
    opts: settings.opts,
    updated_at: new Date().toISOString(),
  });
}
