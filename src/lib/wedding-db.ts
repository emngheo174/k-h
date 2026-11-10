// Server-only data access for the wedding backend.
// Talks to Supabase via its PostgREST endpoint using the service-role key, so
// this module must never be imported into a Client Component.

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
