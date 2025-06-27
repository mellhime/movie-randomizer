import { render, renderHook } from "@testing-library/react";
import { WatchList } from "../WatchList";
import { useFetch } from "../../hooks/useFetch";

describe("WatchList component", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<WatchList />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("useFetch hook", () => {
  it("gets data", () => {
    const { result } = renderHook(() => useFetch("watchList"));

    expect(result.current[0][0]).toHaveProperty("title");
  });
});
