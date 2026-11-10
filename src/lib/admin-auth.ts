import { cookies } from "next/headers";

/** True when the current request carries a valid admin session cookie. */
export async function isAdmin(): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const jar = await cookies();
  return jar.get("cdn_admin")?.value === expected;
}
