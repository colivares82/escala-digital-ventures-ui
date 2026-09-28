/**
 * DayComparison — "Un lunes cualquiera" table (LANDING-01 §3.2).
 *
 * Semantic <table>: Hora · Hoy · Con tu sistema. Below 720px the CSS stacks
 * each row and prints the inline labels from `data-label` (dictionary copy,
 * not CSS literals), so the column header is never lost on mobile.
 */
import type { DayComparisonContent } from '@/content/types'

export function DayComparison({ content }: { content: DayComparisonContent }) {
  const [timeCol, beforeCol, afterCol] = content.cols

  return (
    <table className="day-comparison">
      <thead>
        <tr>
          <th scope="col">{timeCol}</th>
          <th scope="col">{beforeCol}</th>
          <th scope="col" className="day-comparison__after-head">
            {afterCol}
          </th>
        </tr>
      </thead>
      <tbody>
        {content.rows.map((row) => (
          <tr key={row.time}>
            <th scope="row" className="day-comparison__time">
              {row.time}
            </th>
            <td className="day-comparison__before" data-label={content.mobileBefore}>
              {row.before}
            </td>
            <td className="day-comparison__after" data-label={content.mobileAfter}>
              {row.after}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
