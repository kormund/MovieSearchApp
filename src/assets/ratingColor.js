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

export default ratingColor
