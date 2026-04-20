import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "../components/Search";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../components/redux/slices/filterSlice";
import { jest } from "@jest/globals";
// MOCK ОДИН РАЗ (без spyOn)
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("lodash.debounce", () => (fn) => fn);

describe("Search component", () => {
  let dispatchMock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("updates input and dispatches value", async () => {
    render(<Search />);

    const user = userEvent.setup();
    const input = screen.getByPlaceholderText(/поиск пиццы/i);

    await user.type(input, "пепперони");

    expect(input).toHaveValue("пепперони");
    expect(dispatchMock).toHaveBeenCalledWith(setSearchValue("пепперони"));
  });

  test("clears input and resets value", async () => {
    render(<Search />);

    const user = userEvent.setup();
    const input = screen.getByPlaceholderText(/поиск пиццы/i);

    await user.type(input, "cheese");

    const clearBtn = screen.getByLabelText("clear search");

    await user.click(clearBtn);

    expect(input).toHaveValue("");
    expect(dispatchMock).toHaveBeenCalledWith(setSearchValue(""));
  });
});
