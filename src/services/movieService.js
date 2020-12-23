import http from "./httpService";

export function getMovies() {
  return http.get("http://localhost:3900/api/movies");
}
export function deleteMovie(id) {
  return http.delete(`http://localhost:3900/api/movies/${id}`);
}
export function getMovie(id) {
  return http.get(`http://localhost:3900/api/movies/${id}`);
}
export function saveMovie(movie) {
  if (movie._id) {
    let body = { ...movie };
    delete body._id;
    return http.put(`http://localhost:3900/api/movies/${movie._id}`, body);
  }
  let body = { ...movie };
  let bodyTitle = body.title.charAt(0).toUpperCase() + body.title.slice(1);
  delete body.title;
  body = { title: bodyTitle, ...body };
  return http.post(`http://localhost:3900/api/movies/`, body);
}
