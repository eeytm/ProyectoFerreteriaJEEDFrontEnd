import { createSlice } from "@reduxjs/toolkit";
import { productsList } from "./Data";

const productsSlice = createSlice({
  name: "products",
  initialState: productsList,
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
      console.log("Nuevo producto agregado al estado:", action.payload);
    },
    updateProduct: (state, action) => {
      const { codName, productName, quantity, price } = action.payload;
      const productToUpdate = state.find(product => product.codName === codName);
      if (productToUpdate) {
        productToUpdate.productName = productName;
        productToUpdate.quantity = quantity;
        productToUpdate.price = price;
      }
    },
  },
});

export const { addProduct, updateProduct } = productsSlice.actions;
export default productsSlice.reducer;
