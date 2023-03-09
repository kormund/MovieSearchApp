import React from 'react'
import { Pagination } from 'antd'

import MovieList from '../../components/Movies/MovieList'
import MovieDb from '../../services/movie-db/movie-db'
import Genres from '../../components/Genres/Genres'

class Rated extends React.Component {
  state = {
    error: null,
    isLoaded: false,
    items: [],
    totalPages: null,
    page: 1,
    guest_id: JSON.parse(localStorage.getItem('guestSessionID')),
    userRating: JSON.parse(localStorage.getItem('rated')) || [],
  }

  movieDB = new MovieDb()

  getMovies = (page) => {
    this.movieDB.getRatedMovies(this.state.guest_id, page).then(
      (body) => {
        this.setState({
          isLoaded: true,
          items: body.results,
          totalPages: body['total_results'],
        })
      },
      (err) => {
        this.setState({
          isLoaded: true,
          error: err,
        })
      },
    )
  }

  componentDidMount() {
    this.getMovies()
  }

  onPageChange = (page) => {
    this.setState({ page })
    this.getMovies(page)
  }

  render() {
    const { error, isLoaded, items, page, userRating, totalPages } = this.state
    return (
      <>
        <MovieList items={items} error={error} isLoaded={isLoaded} userRating={userRating} />
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            current={page}
            total={totalPages}
            showSizeChanger={false}
            onChange={this.onPageChange}
            defaultPageSize={20}
          />
        </div>
      </>
    )
  }
}

Rated.contextType = Genres

export default Rated
