import { render } from "@testing-library/react";

import { WatchList } from "@modules";

describe("WatchList component", () => {
  it("should match snapshot", () => {
    const { asFragment } = render(<WatchList />);
    expect(asFragment()).toMatchSnapshot();
  });
});
