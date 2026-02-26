import { render } from "@testing-library/react";

import { WatchList } from "@modules";

jest.mock("@lib", () => {
  const actual = jest.requireActual("@lib");

  return {
    ...actual,
    signin: jest.fn(),
    signup: jest.fn(),
    signout: jest.fn(),
  };
});

describe("WatchList component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(<WatchList />);
    expect(asFragment()).toMatchSnapshot();
  });
});
