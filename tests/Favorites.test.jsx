import {
  render,
  fireEvent,
  screen,
  act,
  renderHook,
} from "@testing-library/react";
import Favorites from "../src/scripts/Favorites";
import { useFetch } from "../src/scripts/useFetch";

describe("Favorites component", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<Favorites />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("increments count on button click", () => {
    render(<Favorites />);
    const button = screen.getAllByText(/Add to favorites/i)[0];
    act(() => {
      fireEvent.click(button);
    });
    expect(screen.getByTestId("count").textContent).toBe("Count: 1");
  });
});

describe("useFetch hook", () => {
  it("gets data", () => {
    const { result } = renderHook(() => useFetch("movies"));

    expect(result.current[0][0]).toHaveProperty("title");
  });
});
