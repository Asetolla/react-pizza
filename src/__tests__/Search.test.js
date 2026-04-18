import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "../components/Search";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../components/redux/slices/filterSlice";
import jest from "jest";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

// убираем debounce задержку
jest.mock("lodash.debounce", () => (fn) => fn);

describe("Search component", () => {
  test("updates input and dispatches value", async () => {
    const dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);

    render(<Search />);

    const user = userEvent.setup();

    const input = screen.getByPlaceholderText(/поиск пиццы/i);

    await waitFor(async () => {
      await user.type(input, "пепперони");
    });

    expect(input).toHaveValue("пепперони");

    expect(dispatchMock).toHaveBeenCalledWith(setSearchValue("пепперони"));
  });

  test("clears input and resets value", async () => {
    const dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);

    render(<Search />);

    const user = userEvent.setup();

    const input = screen.getByPlaceholderText(/поиск пиццы/i);

    await waitFor(async () => {
      await user.type(input, "cheese");
    });

    const svgClear = document.querySelector(".clearIcon");

    await waitFor(async () => {
      await user.click(svgClear);
    });

    expect(input).toHaveValue("");
    expect(dispatchMock).toHaveBeenCalledWith(setSearchValue(""));
  });
});
