import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { SignForm } from "@modules";
import { signin, signout, signup } from "@lib";

import "@testing-library/jest-dom";

jest.mock("@lib", () => {
  const actual = jest.requireActual("@lib");

  return {
    ...actual,
    signin: jest.fn(),
    signup: jest.fn(),
    signout: jest.fn(),
  };
});

describe("SignForm component", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (signout as jest.Mock).mockResolvedValue({});
    (signin as jest.Mock).mockResolvedValue({ user: { id: 1 } });
    (signup as jest.Mock).mockResolvedValue({ user: { id: 1 } });
  });

  it("should match snapshot", async () => {
    const { asFragment } = render(<SignForm onClose={mockOnClose} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should display sign in form", async () => {
    render(<SignForm onClose={mockOnClose} />);

    const title = screen.getByText("Email");
    expect(title).toBeInTheDocument();
  });

  it("should submit sign in form", async () => {
    render(<SignForm onClose={mockOnClose} />);

    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "user@mail.com" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(signin).toHaveBeenCalledWith("user@mail.com", "123456");
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  it("should submit sign up form", async () => {
    render(<SignForm onClose={mockOnClose} />);

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "new-user@mail.com" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "654321" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(signup).toHaveBeenCalledWith("new-user@mail.com", "654321");
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });
});
