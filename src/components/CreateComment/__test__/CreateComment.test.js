import {
  render,
  screen,
  fireEvent,
  waitFor
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CreateComment from "../CreateComment";
import "@testing-library/jest-dom";

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

const postId = {
  params: {
    id: 1,
  },
};
const commentObject = {
  postId: 1,
  id: 501,
  name: "updated comment",
  email: "updated email",
  body: "updated body",
};
const CreateCommentPage = () => {
  return (
    <BrowserRouter>
      <CreateComment match={postId} validatedValues={commentObject} />
    </BrowserRouter>
  );
};

describe("UsersList", () => {
  beforeEach(() => {
    jest.mock("../../../__mocks__/getAllCommentsByPostIdAxios");
  });

  it("should fetch and render comment element", async () => {
    render(<CreateCommentPage />);
    const commentDivElement = await screen.findByTestId(`comment-item-1`);
    expect(commentDivElement).toBeInTheDocument();
  });

  it("should fetch all comments", async () => {
    render(<CreateCommentPage />);

    const all = await screen.findAllByTestId(/comment-item/i);
    expect(all.length).toBe(5);
  });

  it("should create comment", async () => {
    var createCommentBtn;
    render(<CreateCommentPage />);

    const buttonElement = screen.getByRole("button");

    fireEvent.click(buttonElement);
    await waitFor(() => {
      createCommentBtn = screen.getByText(/OK/).closest("button");
    });

    fireEvent.click(createCommentBtn);
    await waitFor(() => {
      const comment = screen.getByTestId(`comment-item-501`);
      expect(comment).toBeInTheDocument();
    });
  });
});
