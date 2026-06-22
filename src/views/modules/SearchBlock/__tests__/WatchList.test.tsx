import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { deleteDoc, getDocs } from "firebase/firestore";

import { WatchList } from "@modules";

import "@testing-library/jest-dom";

const currentUser = {
  uid: "user-1",
  displayName: "vasya",
  email: "email@test",
  phoneNumber: null,
  photoURL: null,
  providerId: "1",
};

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(() => ({})),
  deleteDoc: jest.fn(),
  doc: jest.fn(() => ({})),
  getDocs: jest.fn(),
  getFirestore: jest.fn(() => ({})),
}));

describe("WatchList component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (getDocs as jest.Mock).mockResolvedValue({
      docs: [
        {
          data: () => ({
            movieId: 1,
            title: "Titanic",
            posterPath: "/poster.jpg",
            addedAt: {
              toDate: () => new Date("2026-03-16T00:00:00.000Z"),
            },
          }),
        },
      ],
    });
    (deleteDoc as jest.Mock).mockResolvedValue(undefined);
  });

  it("should match snapshot", () => {
    const { asFragment } = render(<WatchList currentUser={null} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should display watchlist movie", async () => {
    render(<WatchList currentUser={currentUser} />);

    expect(await screen.findByText("Titanic")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /remove from watchlist/i }),
    ).toBeInTheDocument();
  });

  it("should remove movie from watchlist", async () => {
    render(<WatchList currentUser={currentUser} />);

    fireEvent.click(
      await screen.findByRole("button", { name: /remove from watchlist/i }),
    );

    await waitFor(() => {
      expect(deleteDoc).toHaveBeenCalledTimes(1);
      expect(screen.queryByText("Titanic")).not.toBeInTheDocument();
    });
  });
});
