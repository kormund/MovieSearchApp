import { Card, Image } from 'antd'

import MovieDb from '../../services/movie-db/movie-db'

import './MovieCard.css'
import Details from './Details'

export default function MovieCard({ poster, title, desc, tags, date, rating, id, userRating }) {
  const movieDB = new MovieDb()
  const cardBodyStyle = {
    width: '450px',
    height: '280px',
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
  }

  return (
    <Card className="movie_card" bodyStyle={cardBodyStyle}>
      <Image
        src={movieDB.getPoster(poster)}
        fallback="https://critics.io/img/movies/poster-placeholder.png"
        height="280px"
        width="fit-content"
        style={{ minWidth: '180px', marginRight: '20px' }}
      />
      <Details title={title} desc={desc} tags={tags} date={date} rating={rating} id={id} userRating={userRating} />
    </Card>
  )
}
