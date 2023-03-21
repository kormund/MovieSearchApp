import { Component } from 'react'
import { Tabs } from 'antd'

import Search from '../pages/search/Search'
import Rated from '../pages/rated/Rated'
import Genres from '../Genres/Genres'
import './App.css'
import MovieDb from '../../services/movie-db/movie-db'

export default class App extends Component {
  state = {
    genres: [],
  }
  tabs = [
    {
      key: '1',
      label: 'Search',
      children: <Search />,
    },
    {
      key: '2',
      label: 'Rated',
      children: <Rated />,
    },
  ]
  movieDB = new MovieDb()
  getGenres = () => {
    this.movieDB.getGenres().then(
      (body) => {
        this.setState({
          genres: body.genres,
        })
      },
      (err) => {
        this.setState({
          error: err,
        })
      }
    )
  }

  createGuestSession = () => {
    let token = JSON.parse(localStorage.getItem('guestSessionID'))
    if (!token) {
      this.movieDB.createGuest()
      localStorage.setItem('rated', JSON.stringify([]))
    }
  }

  componentDidMount() {
    this.createGuestSession()
    this.getGenres()
  }

  render() {
    return (
      <Genres.Provider value={this.state.genres}>
        <Tabs className="main" defaultActiveKey="1" items={this.tabs} centered destroyInactiveTabPane />
      </Genres.Provider>
    )
  }
}
