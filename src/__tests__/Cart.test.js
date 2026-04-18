import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import jest from "jest";
import pizzaReducer from "../components/redux/slices/pizzaSlice";
import filterReducer from "../components/redux/slices/filterSlice";
import cartReducer from "../components/redux/slices/cartSlice";
// ✅ Мокаем axios ДО всего
jest.mock("axios");
const mockedAxios = axios;
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Header from "../components/Header";

const createTestStore = () => {
  return configureStore({
    reducer: {
      filter: filterReducer,
      pizza: pizzaReducer,
      cart: cartReducer,
    },
  });
};

// 🧩 render helper
const renderWithProviders = (store) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
};

describe("Home component", () => {
  let response;
  beforeEach(() => {
    response = {
      data: [
        {
          id: "1",
          title: "Пепперони",
          price: 500,
          imageUrl: "",
          sizes: [26, 30, 40],
          types: [0, 1],
        },
        {
          id: "2",
          title: "Сырная",
          price: 400,
          imageUrl: "",
          sizes: [30, 40],
          types: [0, 1],
        },
      ],
    };
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("adds pizza to cart", async () => {
    const store = createTestStore();

    mockedAxios.get.mockResolvedValue(response);

    renderWithProviders(store);

    await screen.findByText("Пепперони");

    const addButton = screen.getAllByText(/добавить/i)[0];
    await waitFor(async () => {
      await userEvent.click(addButton);
    });
    const cartButton = screen.getByLabelText("cart-button");
    await waitFor(async () => {
      await userEvent.click(cartButton);
    });
    expect(await screen.findByText(/корзина/i)).toBeInTheDocument();
    // ✅ проверяем store напрямую
    const state = store.getState();
    expect(state.cart.items.length).toBe(1);
    expect(state.cart.items[0].title).toBe("Пепперони");
  });
});
