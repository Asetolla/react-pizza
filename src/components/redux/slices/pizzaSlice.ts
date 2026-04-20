import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
export type FetchPizzaParams = {
  category: string;
  order: string;
  sortBy: string;
  search: string;
  currentPage: string;
};
export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzas",
  async (params: FetchPizzaParams) => {
    const { category, order, sortBy, search, currentPage } = params;
    const data = await axios.get<Pizza[]>(
      `https://651a6b7c340309952f0d4341.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    // console.log("data", data);
    return data.data;
  },
);
type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};
interface PizzaSliceState {
  items: Pizza[];
  status: string;
}

const initialState: PizzaSliceState = {
  items: [],
  status: "loading",
};
const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = "loading";
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = "error";
      state.items = [];
    });
  },
  // extraReducers: {
  //   ['fetchPizzas.pending']: (state) => {
  //     // 'pizza/fetchPizzas/pending'
  //     state.status = 'loading'
  //     state.items = []
  //   },
  //   ['fetchPizzas.fulfilled']: (state, action) => {
  //     state.items = action.payload
  //     state.status = 'succes'
  //   },
  //   ['fetchPizzas.rejected']: (state) => {
  //     state.status = 'error'
  //     state.items = []
  //   },
  // },
});
export const selectPizzaData = (state: RootState) => state.pizza;
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
