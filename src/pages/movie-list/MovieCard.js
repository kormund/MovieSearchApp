import { Card, Image } from 'antd'

import MovieDb from '../../services/movie-db/movie-db'

export default function MovieCard({ poster, title, desc, tags, date, rating }) {
  const movieDB = new MovieDb()
  const cardStyle = {
    borderRadius: 0,
  }
  const cardBodyStyle = {
    width: '450px',
    height: '280px',
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
  return (
    <Card style={cardStyle} bodyStyle={cardBodyStyle}>
      <Image
        src={movieDB.getPoster(poster)}
        height='280px'
        width='fit-content'
        style={{ minWidth: '180px', marginRight: '20px' }}
      />
      <div>
        <Title title={title} />
        <p>{desc}</p>
        <p>{tags}</p>
        <p>{date}</p>
        <p>{rating}</p>
      </div>
    </Card>
  )
}

function Title({ title }) {
  const titleStyle = {
    fontFamily: 'Arial',
    fontSize: '20px',
    lineHeight: '28px',
  }
  return <h2 style={titleStyle}>{title}</h2>
}
