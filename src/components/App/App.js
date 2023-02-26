import { Component } from 'react'
import { Tabs } from 'antd'

import MovieList from '../../pages/movie-list/MovieList'
import './App.css'

export default class App extends Component {
  onChange = (key) => {
    console.log(key)
  }

  getPages = (pages) => {
    this.setState({
      pages,
    })
  }
  tabs = [
    {
      key: '1',
      label: 'Search',
      children: <MovieList getPages={this.getPages} />,
    },
    {
      key: '2',
      label: 'Rated',
      children: 'Rated content',
    },
  ]

  render() {
    return (
      <>
        <Tabs className="main" defaultActiveKey="1" items={this.tabs} onChange={this.onChange} centered />
      </>
    )
  }
}
