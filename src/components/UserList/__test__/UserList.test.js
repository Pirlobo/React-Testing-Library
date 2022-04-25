import { render, screen, fireEvent, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UserList from "../UserList";

const UsersList = () => {
  return (
    <BrowserRouter>
      <UserList />
    </BrowserRouter>
  );
};

describe("UsersList", () => {

  // Sample Response instead of calling numerous times
  beforeEach(() => {
    // console.log("RUNS BEFORE EACH TEST")
    jest.mock("../../../__mocks__/getAllUserAxios");
  });

  it("should fetch and render userlist element", async () => {
    render(<UsersList />);
    const user = await screen.findByTestId(`user-item-1`);
    expect(user).toBeInTheDocument();
  });

  it("should fetch all into a list", async () => {
    render(<UsersList />);

    const all = await screen.findAllByTestId(/user-item/i);
    expect(all.length).toBe(10);
  });
});
