import React from 'react'
import { debounce } from 'lodash'
import { Input, Pagination } from 'antd'

import MovieDb from '../../../services/movie-db/movie-db'
import MovieList from '../../Movies/MovieList'

class Search extends React.Component {
  state = {
    error: null,
    isLoaded: false,
    items: [],
    totalPages: null,
    page: 1,
    query: 'return',
    userRating: JSON.parse(localStorage.getItem('rated')) || [],
  }

  movieDB = new MovieDb()
  getMovies = (value, page) => {
    this.setState({ query: value })
    this.movieDB.getMovies(value, page).then(
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
      }
    )
  }

  onSearchInput = (e) => {
    this.setState({ isLoaded: false, page: 1 })
    let query = e.target.value
    if (query) {
      this.getMovies(query, this.state.page)
    } else {
      this.getMovies('return', 1)
    }
  }

  onPageChange = (page) => {
    this.setState({ page })
    this.getMovies(this.state.query, page)
  }

  componentDidMount() {
    this.getMovies('return')
  }

  render() {
    const { error, isLoaded, items, totalPages, page, userRating } = this.state
    return (
      <>
        <Input placeholder="Type to search &hellip;" onChange={debounce(this.onSearchInput, 500)} />
        <MovieList items={items} error={error} isLoaded={isLoaded} userRating={userRating} />
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            current={page}
            total={totalPages}
            showSizeChanger={false}
            onChange={this.onPageChange}
            defaultPageSize={20}
            hideOnSinglePage
          />
        </div>
      </>
    )
  }
}

export default Search
