import { createSlice } from "@reduxjs/toolkit";
import { productsList } from "./Data";

const productsSlice = createSlice({
  name: "products",
  initialState: productsList,
  reducers: {
    // Agrega la función addProduct dentro de los reducers
    addProduct: (state, action) => {
      // Esta función debe manejar la lógica para agregar un nuevo producto al estado
      state.push(action.payload); // Agrega el nuevo producto a la lista
      console.log("Nuevo producto agregado al estado:", action.payload); // Agrega un console.log
    },
  },
});

export const { addProduct } = productsSlice.actions; // Exporta addProduct
export default productsSlice.reducer;
