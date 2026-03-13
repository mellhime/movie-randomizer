import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { useGetMovies } from "@modules";

import { TFilterChangeEvent } from "../../types";
import { randChoice, randomPage } from "../helpers";
import { SearchBlock } from "../SearchBlock";

import "@testing-library/jest-dom";

const genresList = [
  { id: 2, name: "Drama" },
  { id: 3, name: "Romance" },
];

jest.mock("@modules", () => ({
  useGetMovies: jest.fn(),
}));

jest.mock("../helpers", () => ({
  randChoice: jest.fn(),
  randomPage: jest.fn(),
}));

jest.mock("../MovieOptions", () => ({
  MovieOptions: ({
    onChange,
  }: {
    onChange: (e: TFilterChangeEvent) => void;
  }) => (
    <button
      data-testid="mock-rating"
      onClick={() =>
        onChange({
          target: { name: "score" },
          value: 4,
        } as unknown as TFilterChangeEvent)
      }
    >
      Mock Rating
    </button>
  ),
}));

describe("SearchBlock component", () => {
  const mockOnMovieChange = jest.fn();
  const mockHandleGetMoviesList = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();

    (useGetMovies as jest.Mock).mockReturnValue({
      handleGetMoviesList: mockHandleGetMoviesList,
    });
  });

  it("should match snapshot", () => {
    const { asFragment } = render(
      <SearchBlock onMovieChange={mockOnMovieChange} genresList={genresList} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should choose random movie", async () => {
    const mockMovies = {
      results: [
        { id: 1, title: "Movie 1" },
        { id: 2, title: "Movie 2" },
      ],
    };

    mockHandleGetMoviesList.mockResolvedValueOnce(mockMovies);
    (randChoice as jest.Mock).mockReturnValueOnce(mockMovies.results[0]);
    (randomPage as jest.Mock).mockReturnValueOnce(1);

    render(
      <SearchBlock onMovieChange={mockOnMovieChange} genresList={genresList} />,
    );

    fireEvent.click(screen.getByTestId("mock-rating"));

    const button = screen.getByRole("button", { name: /Get a random movie/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockHandleGetMoviesList).toHaveBeenCalledTimes(1);
      expect(mockHandleGetMoviesList).toHaveBeenCalledWith(
        expect.objectContaining({ score: 4 }),
      );
      expect(randChoice).toHaveBeenCalledWith(mockMovies.results);
    });
  });
});
