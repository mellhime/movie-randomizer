import { render, renderHook } from "@testing-library/react";

import { WatchList } from "@modules";
import { useFetch } from "@hooks";

describe("WatchList component", () => {
  it("should match snapshot", () => {
    const { asFragment } = render(<WatchList />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("useFetch hook", () => {
  it("should get data from api", () => {
    const { result } = renderHook(() => useFetch("watchList"));

    expect(result.current[0][0]).toHaveProperty("title");
  });
});
