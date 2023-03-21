import React from 'react'
import { Rate, Space, Tag } from 'antd'

import MovieDb from '../../services/movie-db/movie-db'
import ratingColor from '../../assets/ratingColor'

import ReleaseDate from './ReleaseDate'

import './Details.css'

const Details = ({ title, desc, tags, rating, date, id, userRating }) => {
  const handleMovieRate = (value) => {
    let movieDB = new MovieDb()
    let token = localStorage.getItem('guestSessionID')
    let guest_id = JSON.parse(token)
    let ratedMovies = JSON.parse(localStorage.getItem('rated')) || []
    let movieRate = { id, value }
    let movieIndex = ratedMovies.findIndex((movie) => movie.id === id)
    if (!value) {
      movieDB.deleteRatedMovie(guest_id, id)
      ratedMovies.splice(movieIndex, 1)
    } else {
      movieDB.rateMovie(guest_id, value, id)
      movieIndex !== -1 ? ratedMovies.splice(movieIndex, 1, movieRate) : (ratedMovies = [...ratedMovies, movieRate])
    }
    localStorage.setItem('rated', JSON.stringify(ratedMovies))
  }

  return (
    <div className="movie_card__details details">
      <h2 className="details__title">{title}</h2>
      <ReleaseDate date={date} />
      <Space size={[0, 8]} wrap>
        {tags.map((tag) => {
          if (tag.length === 0) {
            return null
          }
          return <Tag key={tag[0].id}>{tag[0].name}</Tag>
        })}
      </Space>
      <p className="details__desc">{desc}</p>
      <div className="details__rating" style={{ border: `2px solid ${ratingColor(rating)}` }}>
        {rating}
      </div>
      <Rate
        allowHalf={true}
        count={10}
        style={{ fontSize: '15px', position: 'absolute', bottom: '10px' }}
        onChange={(value) => {
          handleMovieRate(value)
        }}
        defaultValue={userRating?.value || 0}
      />
    </div>
  )
}

export default Details
