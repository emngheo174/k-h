import { InvitationShell } from "@/components/sites/chungdoi-nau/InvitationShell";
import { createMetadata } from "@/components/sites/chungdoi-nau/metadata";

export const metadata = createMetadata("bride");

export default function Page() {
  return <InvitationShell side="bride" />;
}
