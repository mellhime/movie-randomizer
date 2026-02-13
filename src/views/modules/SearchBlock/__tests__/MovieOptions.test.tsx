import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TMoviesParams } from "@modules";
import { signin, signout, signup } from "@lib";

import { MovieOptions } from "../MovieOptions";

const baseOptions: TMoviesParams = {
  genres: [],
  releaseYears: [],
  runtime: [60, 180],
  score: 0,
  page: 1,
};

const genresList = [
  { id: 2, name: "Drama" },
  { id: 1, name: "Action" },
];

jest.mock("@lib", () => ({
  signin: jest.fn(),
  signup: jest.fn(),
  signout: jest.fn(),
}));

describe("MovieOptions component", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (signout as jest.Mock).mockReturnValueOnce({});
    (signin as jest.Mock).mockReturnValueOnce({ user: { id: 1 } });
    (signup as jest.Mock).mockReturnValueOnce({ user: { id: 1 } });
  });

  it("should match snapshot", async () => {
    const { asFragment } = render(
      <MovieOptions
        options={baseOptions}
        genresList={genresList}
        onChange={mockOnChange}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should call onChange after rating field change", () => {
    const { container } = render(
      <MovieOptions
        options={baseOptions}
        genresList={genresList}
        onChange={mockOnChange}
      />,
    );

    const stars = container.getElementsByClassName("p-rating-item");
    expect(stars.length).toBe(11); // because a clear element also has this class
    userEvent.click(stars[4]);

    waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({
            name: "score",
          }),
          value: 4,
        }),
      );
    });
  });

  it("should call onChange after genres field change", async () => {
    render(
      <MovieOptions
        options={baseOptions}
        genresList={genresList}
        onChange={mockOnChange}
      />,
    );

    const select = screen.getByTestId("genres");
    await userEvent.click(select);

    const option = await screen.findByText("Action");
    await userEvent.click(option);

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({
            name: "genres",
          }),
          value: [1],
        }),
      );
    });
  });

  it("should call onChange after release year field change", async () => {
    render(
      <MovieOptions
        options={baseOptions}
        genresList={genresList}
        onChange={mockOnChange}
      />,
    );

    const calendar = screen.getByLabelText("Release year");
    await userEvent.click(calendar);
    const dateFrom = await screen.findByText("2020");
    await userEvent.click(dateFrom);

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ name: "releaseYears" }),
          value: [expect.any(Date), null],
        }),
      );
    });
  });

  it("should call onChange after runtime field change", () => {
    const { container } = render(
      <MovieOptions
        options={baseOptions}
        genresList={genresList}
        onChange={mockOnChange}
      />,
    );

    const slider = container.querySelector(".p-slider");
    expect(slider).toBeTruthy();

    slider!.dispatchEvent(
      new CustomEvent("change", {
        detail: {
          value: [90, 160],
        },
      }),
    );

    waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          value: [90, 160],
        }),
      );
    });
  });
});
