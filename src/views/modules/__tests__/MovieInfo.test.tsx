import { render, screen, waitFor } from "@testing-library/react";

import { MovieInfo } from "@modules";
import { IMovie } from "@entities";

import { useGetGenres } from "../hooks";

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

jest.mock("../hooks", () => ({
  useGetGenres: jest.fn(),
}));

describe("MovieInfo component", () => {
  const mockHandleGetGenresList = jest.fn().mockResolvedValue({
    genres: [
      { id: 2, name: "Drama" },
      { id: 3, name: "Romance" },
    ],
  });

  beforeEach(() => {
    jest.clearAllMocks();

    (useGetGenres as jest.Mock).mockReturnValue({
      handleGetGenresList: mockHandleGetGenresList,
    });
  });

  it("should match snapshot", async () => {
    const { asFragment } = render(<MovieInfo movieInfo={movieData} />);

    await waitFor(() => {
      expect(mockHandleGetGenresList).toHaveBeenCalled();
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should display movie info", async () => {
    render(<MovieInfo movieInfo={movieData} />);

    await waitFor(() => {
      expect(mockHandleGetGenresList).toHaveBeenCalled();
    });

    const title = screen.getByText("Titanic (1998)");
    expect(title).toBeInTheDocument();

    expect(screen.getByText("Drama, Romance")).toBeInTheDocument();
    expect(screen.getByText("Movie description")).toBeInTheDocument();
    expect(screen.getByText("88%")).toBeInTheDocument();
    expect(screen.getByText("Original language: EN")).toBeInTheDocument();
  });
});
