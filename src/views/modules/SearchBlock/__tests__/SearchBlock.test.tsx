import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { useGetMovies } from "@modules";

import { TFilterChangeEvent } from "../../types";
import { randChoice, randomPage } from "../helpers";
import { SearchBlock } from "../SearchBlock";

import "@testing-library/jest-dom";

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
      <SearchBlock onMovieChange={mockOnMovieChange} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should choose random movie", () => {
    const mockMovies = {
      results: [
        { id: 1, title: "Movie 1" },
        { id: 2, title: "Movie 2" },
      ],
    };

    mockHandleGetMoviesList.mockResolvedValueOnce(mockMovies);
    (randChoice as jest.Mock).mockReturnValueOnce(mockMovies.results[0]);
    (randomPage as jest.Mock).mockReturnValueOnce(1);

    render(<SearchBlock onMovieChange={mockOnMovieChange} />);

    fireEvent.click(screen.getByTestId("mock-rating"));

    const button = screen.getByRole("button", { name: /Get a random movie/i });
    fireEvent.click(button);

    waitFor(() => {
      expect(mockHandleGetMoviesList).toHaveBeenCalledTimes(1);
      expect(mockHandleGetMoviesList).toHaveBeenCalledWith(
        expect.objectContaining({ score: 4 }),
      );
      expect(randChoice).toHaveBeenCalledWith(mockMovies.results);
    });
  });
});
