import { Component } from 'react'
import { Space, Spin } from 'antd'

import MovieDb from '../../services/movie-db/movie-db'

import MovieCard from './MovieCard'

export default class MovieList extends Component {
  state = { error: null, isLoaded: false, items: [], totalPages: null }

  componentDidMount() {
    new MovieDb().getMovies('poke').then(
      (body) => {
        body.total_pages = undefined
        this.setState({
          isLoaded: true,
          items: body.results,
          totalPages: body.total_pages,
        })
      },
      (err) => {
        this.setState({
          isLoaded: true,
          err,
        })
      },
    )
  }

  render() {
    const { error, isLoaded, items } = this.state

    if (error) {
      return <div>Ошибка: {error.message}</div>
    } else if (!isLoaded) {
      return <Spin size='large'></Spin>
    } else {
      return (
        <Space size='large' wrap>
          <>
            {items.map((item) => (
              <MovieCard
                key={item.id}
                poster={item['poster_path']}
                date={item['release_date']}
                desc={item['overview']}
                rating={item['vote_average']}
                tags={item['genre_ids']}
                title={item['title']}
              />
            ))}
          </>
        </Space>
      )
    }
  }
}
