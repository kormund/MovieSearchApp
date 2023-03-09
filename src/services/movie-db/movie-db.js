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
      const { guest_session_id } = res
      localStorage.setItem('guestSessionID', `${JSON.stringify(guest_session_id)}`)
      return res
    } else {
      throw new Error(`Could not create new guest in database. Error code: ${res.status}`)
    }
  }

  async getRatedMovies(guestId, page = 1) {
    let res = await fetch(
      `${this._baseUrl}/guest_session/${guestId}/rated/movies?api_key=${this._apiKey}&language=en-US&sort_by=created_at.asc&page=${page}`,
    )
    if (res.ok) {
      res = await res.json()
      return res
    } else {
      throw new Error(`Could not get user's rated movies from database. Error code: ${res.status}`)
    }
  }

  async rateMovie(guestId, rating, id) {
    let res = await fetch(`${this._baseUrl}/movie/${id}/rating?api_key=${this._apiKey}&guest_session_id=${guestId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        value: rating,
      }),
    })
    if (res.ok) {
      res = await res.json()
      return res
    } else {
      throw new Error(`Could not rate movie. Error code: ${res.status}`)
    }
  }

  async deleteRatedMovie(guestId, id) {
    let res = await fetch(`${this._baseUrl}/movie/${id}/rating?api_key=${this._apiKey}&guest_session_id=${guestId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
    if (res.ok) {
      res = await res.json()
      return res
    } else {
      throw new Error(`Could not rate movie. Error code: ${res.status}`)
    }
  }
}
