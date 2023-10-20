import { createSlice } from "@reduxjs/toolkit";
import { productsList } from "./Data";

const productsSlice = createSlice({
    name: "products",
    initialState: productsList,
    reducers: {

    }
})

export default productsSlice.reducer;