import { configureStore } from "@reduxjs/toolkit";
import React from "react";

import { Provider } from "react-redux";
import App from './App';
import productsReducer from "./productsReducer";
import { createRoot } from 'react-dom/client'; // Actualiza esta línea

const store = configureStore({
  reducer: {
    products: productsReducer
  }
});



createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
