import { InvitationShell } from "@/components/sites/chungdoi-nau/InvitationShell";
import { createMetadata } from "@/components/sites/chungdoi-nau/metadata";

// This route is what the site root ("/") rewrites to, so it must declare "/"
// as its canonical/og:url — otherwise Facebook bounces a shared root link to
// /chu-re and the preview/image becomes unreliable.
export const metadata = createMetadata("groom", "/");

export default function Page() {
  return <InvitationShell side="groom" />;
}
