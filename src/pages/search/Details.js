import React from 'react'
import { Rate, Space, Tag } from 'antd'

import ReleaseDate from './ReleaseDate'
import './Details.css'

const Details = ({ title, desc, tags, rating, date }) => {
  const ratingColor = (value) => {
    switch (true) {
      case value < 3:
        return '#E90000'
      case value > 3 && value < 5:
        return '#E97E00'
      case value > 5 && value < 7:
        return '#E9D100'
      case value > 7:
        return '#66E900'
    }
  }

  return (
    <div className='movie_card__details details'>
      <h2 className='details__title'>{title}</h2>
      <ReleaseDate date={date} />
      <Space size={[0, 8]} wrap>
        {tags.map((tag) => {
          return <Tag key={tag[0].id}>{tag[0].name}</Tag>
        })}
      </Space>
      <p className='details__desc'>{desc}</p>
      <div className='details__rating' style={{ border: `2px solid ${ratingColor(rating)}` }}>
        {rating}
      </div>
      <Rate allowHalf={true} count={10} style={{ fontSize: '15px', position: 'absolute', bottom: '10px' }} />
    </div>
  )
}

export default Details
