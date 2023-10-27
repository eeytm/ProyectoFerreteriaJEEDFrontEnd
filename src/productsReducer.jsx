import { createSlice } from "@reduxjs/toolkit";
import { productsList } from "./Data";
const initialState = {products:[], singleProduct:{}}
const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    codeIdProduct: (state, action) => {
      state.singleProduct=action.payload;
    },
    getAllProducts: (state, action) => {
      console.log (action.payload);
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
      console.log("Nuevo producto agregado al estado:", action.payload);
    },
    updateProduct: (state, action) => {
      const { codName, productName, quantity, price } = action.payload;
      const productToUpdate = state.products.find(product => product.codName === codName);
      if (productToUpdate) {
        productToUpdate.productName = productName;
        productToUpdate.quantity = quantity;
        productToUpdate.price = price;
      }
    },
    deleteProduct: (state, action) => {
      
      const { codName } = action.payload;
      
      // const productToDelete = state.products.find(product => product.codName === codName);
      // console.log(productToDelete);
      // if (productToDelete) {
      state.products = state.products.filter(product => product.codName !== codName )
      //}
    },
    
  },
    
});

export const { addProduct, updateProduct, deleteProduct, getAllProducts, codeIdProduct } = productsSlice.actions;
export default productsSlice.reducer;
