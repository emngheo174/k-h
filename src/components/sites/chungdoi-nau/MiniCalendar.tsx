import { CAL_WEEKDAYS_VI, type CoupleView } from "./data";
import { parseDate, daysInMonth, firstWeekdayOfMonth } from "./format";

/** Mini month calendar inside the reception panel (bg calendarBg, Nautigal title). */
export function MiniCalendar({ view }: { view: CoupleView }) {
  const date = parseDate(view.date);
  const year = date.dayNum ? parseInt(date.year, 10) : 2026;
  const month = date.monthNum;
  const total = daysInMonth(year, month);
  // Convert Sun-first (0) to Mon-first offset.
  const firstDow = (firstWeekdayOfMonth(year, month) + 6) % 7;

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= total; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div
      className="mx-auto mt-3 w-fit max-w-full overflow-hidden rounded-[10px] px-4 pb-4 pt-2"
      style={{ backgroundColor: "var(--cdn-calendar-bg)" }}
    >
      <div
        className="w-[280px] max-w-full md:w-[330px]"
        style={{ color: "var(--cdn-light)" }}
      >
        <p
          className="py-2 text-center"
          style={{
            fontFamily: "var(--cdn-nautigal)",
            fontSize: "24px",
            color: "var(--cdn-light)",
          }}
        >
          Tháng {month}, {year}
        </p>
        <div className="grid grid-cols-7 gap-y-1 text-center text-[11px] uppercase tracking-wide opacity-80">
          {CAL_WEEKDAYS_VI.map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-y-1 text-center text-sm">
          {cells.map((d, i) => {
            const isWedding = d === date.dayNum;
            return (
              <div key={i} className="flex items-center justify-center py-0.5">
                {d === null ? (
                  <span />
                ) : isWedding ? (
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full font-semibold"
                    style={{
                      backgroundColor: "var(--cdn-light)",
                      color: "var(--cdn-primary)",
                    }}
                  >
                    {d}
                  </span>
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center">
                    {d}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
