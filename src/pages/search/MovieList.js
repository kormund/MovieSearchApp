import React from 'react'
import { truncate } from 'lodash'
import { Alert, Spin } from 'antd'

import genresFromId from '../../services/genres-from-id/genres-from-id'

import MovieCard from './MovieCard'

export default function MovieList({ items, error, isLoaded, genres }) {
  if (error) {
    return (
      <Alert
        message='Error'
        description='Could not get a movie from a server.'
        type='error'
        showIcon
        style={{ marginTop: 20 }}
      />
    )
  } else if (!isLoaded) {
    return (
      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
        <Spin size={'large'} tip='Loading'></Spin>
      </div>
    )
  } else if (!items.length) {
    return (
      <Alert
        message='No such movie wow'
        description='Consider changing your search woof!'
        type='info'
        showIcon
        style={{ marginTop: 20 }}
      />
    )
  } else {
    return (
      <div className={'movie_card__wrapper'}>
        {items.map((item) => (
          <MovieCard
            key={item.id}
            poster={item['poster_path']}
            date={item['release_date']}
            desc={truncate(item['overview'], { length: item.title.length > 30 ? 70 : 140, separator: ' ' })}
            rating={item['vote_average'].toFixed(1)}
            tags={item['genre_ids'].map((id) => {
              return genresFromId(id, genres.genres)
            })}
            title={item['title']}
          />
        ))}
      </div>
    )
  }
}
