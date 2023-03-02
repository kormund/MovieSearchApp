export default class MovieDb {
  _apiKey = '183134ca68caf00c2b6e58eae31ec011'
  _baseUrl = `https://api.themoviedb.org/3/search/movie?api_key=${this._apiKey}`
  _baseImgUrl = 'https://image.tmdb.org/t/p/w500'

  async getMovies(name, page = 1) {
    console.log(name)
    console.log(page)
    let res = await fetch(`${this._baseUrl}&language=en-US&query=${name}&page=${page}&include_adult=false`)
    if (res.ok) {
      res = await res.json()
      return res
    } else {
      throw new Error(`Could not get movies from database. Error code: ${res.status}`)
    }
  }

  getPoster(url) {
    return url !== null ? this._baseImgUrl + url : ''
  }

  async getGenres() {
    let res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this._apiKey}`)
    if (res.ok) {
      res = await res.json()
      return res
    } else {
      throw new Error(`Could not get movies from database. Error code: ${res.status}`)
    }
  }
}
