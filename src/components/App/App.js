import { Component } from 'react'
import { Tabs } from 'antd'

import Search from '../../pages/search/Search'

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
      children: <Search getPages={this.getPages} />,
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
