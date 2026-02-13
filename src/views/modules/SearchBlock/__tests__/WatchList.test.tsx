import { render } from "@testing-library/react";

import { WatchList } from "@modules";
import { signin, signout, signup } from "@lib";

jest.mock("@lib", () => ({
  signin: jest.fn(),
  signup: jest.fn(),
  signout: jest.fn(),
}));

describe("WatchList component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (signout as jest.Mock).mockReturnValueOnce({});
    (signin as jest.Mock).mockReturnValueOnce({ user: { id: 1 } });
    (signup as jest.Mock).mockReturnValueOnce({ user: { id: 1 } });
  });

  it("should match snapshot", () => {
    const { asFragment } = render(<WatchList />);
    expect(asFragment()).toMatchSnapshot();
  });
});
