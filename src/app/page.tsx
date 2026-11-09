import { InvitationShell } from "@/components/sites/chungdoi-nau/InvitationShell";
import { createMetadata } from "@/components/sites/chungdoi-nau/metadata";

// Default route shows the groom's card ("nhà trai"); /co-dau is the bride's.
export const metadata = createMetadata("groom");

export default function Home() {
  return <InvitationShell side="groom" />;
}
