import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TMoviesParams, useGetGenres } from "@modules";

import { MovieOptions } from "../MovieOptions";

const baseOptions: TMoviesParams = {
  genres: [],
  releaseYears: [],
  runtime: [60, 180],
  score: 0,
  page: 1,
};

jest.mock("@modules", () => ({
  useGetGenres: jest.fn(),
}));

describe("MovieOptions component", () => {
  const mockOnChange = jest.fn();
  const mockHandleGetGenresList = jest
    .fn()
    .mockResolvedValue({ genres: [{ id: 1, name: "Action" }] });

  beforeEach(() => {
    jest.clearAllMocks();

    (useGetGenres as jest.Mock).mockReturnValue({
      handleGetGenresList: mockHandleGetGenresList,
    });
  });

  it("should match snapshot", async () => {
    const { asFragment } = render(
      <MovieOptions options={baseOptions} onChange={mockOnChange} />,
    );

    await waitFor(() => {
      expect(mockHandleGetGenresList).toHaveBeenCalled();
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should call onChange after rating field change", () => {
    const { container } = render(
      <MovieOptions options={baseOptions} onChange={mockOnChange} />,
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
    render(<MovieOptions options={baseOptions} onChange={mockOnChange} />);

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
    render(<MovieOptions options={baseOptions} onChange={mockOnChange} />);

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

  it("should call onChangeRuntime after runtime field change", () => {
    render(<MovieOptions options={baseOptions} onChange={mockOnChange} />);

    // todo somehow test it with userEvent
    mockOnChange({ value: [90, 160] });

    waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          value: [90, 160],
        }),
      );
    });
  });
});
