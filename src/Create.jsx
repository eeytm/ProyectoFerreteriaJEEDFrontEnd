import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "./productsReducer"; // Importa la función addProduct desde productsReducer

function Create() {
  const dispatch = useDispatch(); // Obtiene la función de despacho

  const [formData, setFormData] = useState({
    codName: "",
    productName: "",
    quantity: 0,
    price: 0.0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Elimina la validación para permitir letras
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que los campos numéricos sean valores válidos
    if (isNaN(formData.quantity) || isNaN(formData.price)) {
      alert("Por favor, ingrese valores numéricos válidos.");
      return; // Detener el proceso si hay valores no numéricos
    }

    // Crear un nuevo producto a partir de formData
    const newProduct = {
      codName: formData.codName,
      productName: formData.productName,
      quantity: formData.quantity,
      price: formData.price,
    };

    // Despachar la acción para agregar un producto
    dispatch(addProduct(newProduct)); // Usa la función de despacho para agregar el producto

    // Luego, puedes guardar el producto en tu estado global o realizar otras acciones necesarias.
    console.log("Nuevo producto:", newProduct);
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-secondary text-white p-5">
        <h2>Create Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="codName" className="form-label">Product Code</label>
            <input
              type="text"
              className="form-control"
              id="codName"
              name="codName"
              value={formData.codName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productName" className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">Amount</label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Create Product</button>
        </form>
      </div>
    </div>
  );
}

export default Create;
