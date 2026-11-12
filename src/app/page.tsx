import { InvitationShell } from "@/components/sites/chungdoi-nau/InvitationShell";
import { createMetadata } from "@/components/sites/chungdoi-nau/metadata";

// Default route shows the groom's card ("nhà trai"); /co-dau is the bride's.
// Declare "/" as canonical so a shared root link keeps its own OG cache instead
// of Facebook re-attributing it to /chu-re.
export const metadata = createMetadata("groom", "/");

export default function Home() {
  return <InvitationShell side="groom" />;
}
