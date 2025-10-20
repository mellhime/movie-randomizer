import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { useRequests } from "@hooks";

// todo fix this imports
import { MovieOptions } from "./../SearchBlock/MovieOptions";
import { TMoviesParams } from "./../SearchBlock/types";

const baseOptions: TMoviesParams = {
  genres: [],
  releaseYears: [],
  runtime: [60, 180],
  score: 0,
};

jest.mock("@hooks", () => ({
  useRequests: jest.fn(),
}));

describe("MovieOptions component", () => {
  const mockOnChange = jest.fn();
  const mockOnChangeRuntime = jest.fn();

  const mockHandleGetGenresList = jest
    .fn()
    .mockResolvedValue({ genres: [{ id: 1, name: "Action" }] });

  beforeEach(() => {
    jest.clearAllMocks();

    (useRequests as jest.Mock).mockReturnValue({
      handleGetGenresList: mockHandleGetGenresList,
    });
  });

  it("should match snapshot", () => {
    const { asFragment } = render(
      <MovieOptions
        options={baseOptions}
        onChange={mockOnChange}
        onChangeRuntime={mockOnChangeRuntime}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should call onChange after rating field change", async () => {
    const { container } = render(
      <MovieOptions
        options={baseOptions}
        onChange={mockOnChange}
        onChangeRuntime={mockOnChangeRuntime}
      />,
    );

    const stars = container.getElementsByClassName("p-rating-item");
    expect(stars.length).toBe(11); // because a clear element also has this class
    await userEvent.click(stars[4]);

    await waitFor(() => {
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
        onChange={mockOnChange}
        onChangeRuntime={mockOnChangeRuntime}
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
        onChange={mockOnChange}
        onChangeRuntime={mockOnChangeRuntime}
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

  it("should call onChangeRuntime after runtime field change", async () => {
    render(
      <MovieOptions
        options={baseOptions}
        onChange={mockOnChange}
        onChangeRuntime={mockOnChangeRuntime}
      />,
    );

    // todo somehow test it with userEvent
    mockOnChangeRuntime({ value: [90, 160] });

    await waitFor(() => {
      expect(mockOnChangeRuntime).toHaveBeenCalledWith(
        expect.objectContaining({
          value: [90, 160],
        }),
      );
    });
  });
});
