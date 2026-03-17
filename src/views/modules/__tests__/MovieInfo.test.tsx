import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { getDoc, serverTimestamp, setDoc } from "firebase/firestore";

import { MovieInfo } from "@modules";
import { IMovie } from "@entities";

import "@testing-library/jest-dom";

const movieData: IMovie = {
  title: "Titanic",
  id: 1,
  backdropPath: "/background.jpg",
  genreIds: [2, 3],
  originalLanguage: "en",
  overview: "Movie description",
  posterPath: "/poster.jpg",
  releaseDate: "1998-01-15",
  voteAverage: 8.8,
};

const genresList = [
  { id: 2, name: "Drama" },
  { id: 3, name: "Romance" },
];

const currentUser = {
  uid: "user-1",
  displayName: "vasya",
  email: "email@test",
  phoneNumber: null,
  photoURL: null,
  providerId: "1",
};

jest.mock("firebase/firestore", () => ({
  doc: jest.fn(() => ({})),
  getDoc: jest.fn(),
  getFirestore: jest.fn(() => ({})),
  serverTimestamp: jest.fn(() => "server-timestamp"),
  setDoc: jest.fn(),
}));

describe("MovieInfo component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => false,
    });
    (setDoc as jest.Mock).mockResolvedValue(undefined);
  });

  it("should match snapshot", async () => {
    const { asFragment } = render(
      <MovieInfo
        movieInfo={movieData}
        genresList={genresList}
        currentUser={null}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should display movie info", async () => {
    render(
      <MovieInfo
        movieInfo={movieData}
        genresList={genresList}
        currentUser={null}
      />,
    );

    const title = screen.getByText("Titanic (1998)");
    expect(title).toBeInTheDocument();

    expect(screen.getByText("Drama, Romance")).toBeInTheDocument();
    expect(screen.getByText("Movie description")).toBeInTheDocument();
    expect(screen.getByText("88%")).toBeInTheDocument();
    expect(screen.getByText("Original language: EN")).toBeInTheDocument();
  });

  it("should show watchlist button for authorized user", async () => {
    render(
      <MovieInfo
        movieInfo={movieData}
        genresList={genresList}
        currentUser={currentUser}
      />,
    );

    expect(
      await screen.findByRole("button", { name: /add to watchlist/i }),
    ).toBeInTheDocument();
  });

  it("should hide watchlist button when movie is already in watchlist", async () => {
    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => true,
    });

    render(
      <MovieInfo
        movieInfo={movieData}
        genresList={genresList}
        currentUser={currentUser}
      />,
    );

    await waitFor(() => {
      expect(
        screen.queryByRole("button", { name: /add to watchlist/i }),
      ).not.toBeInTheDocument();
    });
  });

  it("should add movie to watchlist", async () => {
    render(
      <MovieInfo
        movieInfo={movieData}
        genresList={genresList}
        currentUser={currentUser}
      />,
    );

    fireEvent.click(
      await screen.findByRole("button", { name: /add to watchlist/i }),
    );

    await waitFor(() => {
      expect(setDoc).toHaveBeenCalledTimes(1);
      expect(setDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          movieId: 1,
          title: "Titanic",
          posterPath: "/poster.jpg",
          addedAt: serverTimestamp(),
        }),
      );
    });
  });
});
