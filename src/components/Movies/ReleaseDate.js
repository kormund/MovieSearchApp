import { format } from 'date-fns'

export default function ReleaseDate(props) {
  const { date } = props
  const rDate = Date.parse(date)
  return <p className="details__date">{isNaN(rDate) ? 'No release date' : format(rDate, 'MMMM d, yyyy')}</p>
}
