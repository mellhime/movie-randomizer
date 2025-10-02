interface IMovie {
  title: string;
  id: number;
  backdropPath: string;
  genreIds: number[];
  originalLanguage: string;
  overview: string;
  posterPath: string;
  releaseDate: string;
  voteAverage: number; // 8.25
}

export { IMovie };
