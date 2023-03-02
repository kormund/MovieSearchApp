export default function genresFromId(id, genres) {
  return genres.filter((genre) => {
    return genre.id === id ? genre : null
  })
}
