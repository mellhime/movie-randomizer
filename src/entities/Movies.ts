interface IMovie {
  title: string;
  id: TMovieId;
  backdropPath: string;
  genreIds: TGenreId[];
  originalLanguage: string;
  overview: string;
  posterPath: string;
  releaseDate: string;
  voteAverage: number;
}

export { IMovie };
