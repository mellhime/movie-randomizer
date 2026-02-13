import { render, screen } from "@testing-library/react";

import { MovieInfo } from "@modules";
import { signin, signout, signup } from "@lib";
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

jest.mock("@lib", () => ({
  signin: jest.fn(),
  signup: jest.fn(),
  signout: jest.fn(),
}));

describe("MovieInfo component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (signout as jest.Mock).mockReturnValueOnce({});
    (signin as jest.Mock).mockReturnValueOnce({ user: { id: 1 } });
    (signup as jest.Mock).mockReturnValueOnce({ user: { id: 1 } });
  });

  it("should match snapshot", async () => {
    const { asFragment } = render(
      <MovieInfo movieInfo={movieData} genresList={genresList} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should display movie info", async () => {
    render(<MovieInfo movieInfo={movieData} genresList={genresList} />);

    const title = screen.getByText("Titanic (1998)");
    expect(title).toBeInTheDocument();

    expect(screen.getByText("Drama, Romance")).toBeInTheDocument();
    expect(screen.getByText("Movie description")).toBeInTheDocument();
    expect(screen.getByText("88%")).toBeInTheDocument();
    expect(screen.getByText("Original language: EN")).toBeInTheDocument();
  });
});
