import {
  render,
  screen,
  fireEvent,
  getByText,
  act,
  waitFor,
  getByRole,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UserDetails from "../UserDetails";
import { logRoles } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const userId = {
  params: {
    id: 1,
  },
};

const updatedPostObject = {
  userId: 1,
  id: 1,
  title: "updated title",
  body: "updated body",
};

const UsersDetailsPage = () => {
  return (
    <BrowserRouter>
      <UserDetails
        match={userId}
        validatedValues={updatedPostObject}
        updatedPost={updatedPostObject}
      />
    </BrowserRouter>
  );
};

describe("UserDetails", () => {
  beforeEach(() => {
    jest.mock("../../../__mocks__/getUserByIdAxios");
  });
  beforeEach(() => {
    jest.mock("../../../__mocks__/getUserPostsByIdAxios");
  });
  beforeEach(() => {
    jest.mock("../../../__mocks__/getAllPhotosByAlbumIdAxios");
  });

  it("should fetch and render a user", async () => {
    render(<UsersDetailsPage />);
    const user = await screen.findByTestId(`user-details-1`);
    expect(user).toBeInTheDocument();
  });

  it("should fetch and render all posts by userid", async () => {
    render(<UsersDetailsPage />);
    const all = await screen.findAllByTestId(/post-item/i);
    expect(all.length).toBe(10);
  });

  it("should fetch and render an album", async () => {
    render(<UsersDetailsPage />);
    const album = await screen.findByTestId(`album-item-1`);
    expect(album).toBeInTheDocument();
  });

  it("should fetch and render all albums by userid", async () => {
    render(<UsersDetailsPage />);
    const all = await screen.findAllByTestId(/album-item/i);
    expect(all.length).toBe(10);
  });

  it("should update a post", async () => {
    var updatePostBtn;
    render(<UsersDetailsPage />);

    const buttonElement = await screen.findByTestId(`update-btn-1`);

    fireEvent.click(buttonElement);
    await waitFor(() => {
      updatePostBtn = screen.getByText(/OK/).closest("button");
    });

    fireEvent.click(updatePostBtn);
    await waitFor(() => {
      const updatedPost = screen.getByText("updated title");
      logRoles(updatePostBtn);
      expect(updatedPost).toBeInTheDocument();
    });
  });

  it("should delete a post", async () => {
    render(<UsersDetailsPage />);

    const buttonElement = await screen.findByTestId(`delete-btn-1`);

    fireEvent.click(buttonElement);

    await waitFor(() => {
      // throw an error if not found any element
      expect(() => screen.getByTestId(`delete-btn-1`)).toThrow();
    });
  });
});
