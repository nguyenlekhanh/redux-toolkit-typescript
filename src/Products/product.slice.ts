import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { validateProduct } from "../fake.api";

export interface Product {
  id: string;
  price: number;
  title: string;
}

export enum ValidationState {
  Fulfilled,
  Pending,
  Rejected,
}

interface ProductsSliceState {
  products: Product[];
  validationState?: ValidationState;
  errorMessage?: string;
}

const initialProducts: Product[] = [
  { title: "Game 1", price: 60, id: "g1" },
  { title: "Game 2", price: 70, id: "g2" },
  { title: "Game 3", price: 55, id: "g3" },
];

//init values for state with type ProductsSliceState
const initialState: ProductsSliceState = {
  products: initialProducts,
  validationState: undefined,
  errorMessage: undefined,
};

export const addProductAsync = createAsyncThunk(
  "products/addNewProduct",
  async (initialProduct: Product) => {
    //console.log("1:validate");
    const product = await validateProduct(initialProduct);
    //it come through here if validate resolve, otherwise it doesn't come through here
    //console.log("2:validate");
    return product;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      //return [action.payload, ...state]
      state.products.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<string>) => ({
      ...state,
      products: state.products.filter(
        (product) => product.id !== action.payload
      ),
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductAsync.fulfilled, (state, action) => ({
        ...state,
        validationState: ValidationState.Fulfilled,
        errorMessage: undefined,
        products: [...state.products, action.payload],
      }))
      .addCase(addProductAsync.rejected, (state, action) => ({
        ...state,
        validationState: ValidationState.Rejected,
        errorMessage: action.error.message,
      }))
      .addCase(addProductAsync.pending, (state, action) => ({
        ...state,
        validationState: ValidationState.Pending,
        errorMessage: undefined,
      }));
  },
});

export const getProductsSeletor = (state: RootState) => state.products.products;
export const getErrorMessage = (state: RootState) =>
  state.products.errorMessage;

export const { addProduct, removeProduct } = productsSlice.actions;

export default productsSlice.reducer;
