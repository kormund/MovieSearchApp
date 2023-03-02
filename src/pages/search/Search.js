import React from 'react'
import { debounce } from 'lodash'
import { Input, Pagination } from 'antd'

import MovieDb from '../../services/movie-db/movie-db'

import MovieList from './MovieList'

class Search extends React.Component {
  state = { error: null, isLoaded: false, items: [], totalPages: null, genres: [], page: 1, query: 'return' }

  movieDB = new MovieDb()
  getMovies = (value, page) => {
    this.setState({ query: value })
    this.movieDB.getMovies(value, page).then(
      (body) => {
        this.setState({
          isLoaded: true,
          items: body.results,
          totalPages: body['total_pages'],
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

  getGenres = () => {
    this.movieDB.getGenres().then(
      (body) => {
        this.setState({
          genres: body,
        })
      },
      (err) => {
        this.setState({
          error: err,
        })
      },
    )
  }
  onSearchInput = (e) => {
    this.setState({ isLoaded: false })
    let query = e.target.value
    if (query) {
      this.getMovies(query, this.state.page)
    } else {
      this.getMovies(this.state.query)
    }
  }

  onPageChange = (page) => {
    this.setState({ page })
    this.getMovies(this.state.query, page)
  }

  componentDidMount() {
    this.getGenres()
    this.getMovies('return')
  }

  render() {
    const { error, isLoaded, items, genres, totalPages, page } = this.state

    return (
      <>
        <Input placeholder='Type to search &hellip;' onChange={debounce(this.onSearchInput, 500)} />
        <MovieList items={items} error={error} isLoaded={isLoaded} genres={genres} />
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
          <Pagination current={page} total={totalPages} showSizeChanger={false} onChange={this.onPageChange} />
        </div>
      </>
    )
  }
}

export default Search
