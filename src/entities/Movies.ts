import { Timestamp as FirestoreTimestamp } from "firebase/firestore";

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

interface IWatchListMovie {
  movieId: number;
  title: string;
  posterPath: string;
  addedAt: FirestoreTimestamp;
}

export { IMovie, IWatchListMovie };
