import "./theme.css";
import { fontClassName } from "./fonts";
import { Invitation } from "./Invitation";
import type { Side } from "./data";

/**
 * Wraps the invitation in the `.cdn-root` theme scope with the font variables.
 * Rendered by each route page (`side` selects the groom or bride card).
 */
export function InvitationShell({ side }: { side: Side }) {
  return (
    <div className={`cdn-root ${fontClassName}`}>
      <Invitation side={side} />
    </div>
  );
}
