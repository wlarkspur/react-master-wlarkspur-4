export function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

export function makeSearchResult(keyword: string) {
  return `https://api.themoviedb.org/3/search/movie?api_key=30a18278aa32c27de99875e2b7b41efe&language=en-US&query=${keyword}&page=1&include_adult=false`;
}
