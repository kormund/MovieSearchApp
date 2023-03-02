export default class MovieDb {
  _apiKey = '183134ca68caf00c2b6e58eae31ec011'
  _baseUrl = 'https://api.themoviedb.org/3'
  _baseImgUrl = 'https://image.tmdb.org/t/p/w500'

  async getMovies(name, page = 1) {
    let res = await fetch(
      `${this._baseUrl}/search/movie?api_key=${this._apiKey}&language=en-US&query=${name}&page=${page}&include_adult=false`,
    )
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
    let res = await fetch(`${this._baseUrl}/genre/movie/list?api_key=${this._apiKey}`)
    if (res.ok) {
      res = await res.json()
      return res
    } else {
      throw new Error(`Could not get movies from database. Error code: ${res.status}`)
    }
  }

  async createGuest() {
    let res = await fetch(`${this._baseUrl}/authentication/guest_session/new?api_key=${this._apiKey}`)
    if (res.ok) {
      res = await res.json()
      localStorage.setItem('expires', `${Date.parse(res['expires_at'])}`)
      localStorage.setItem('token', `${res['guest_session_id']}`)
      console.log(res)
      return res
    } else {
      throw new Error(`Could not create new guest in database. Error code: ${res.status}`)
    }
  }

  // async getRatedMovies(guestId) {
  //   console.log(guestId)
  // }
  //
  // async rateMovie(id) {
  //   console.log(id)
  // }
}
