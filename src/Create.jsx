import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "./productsReducer"; // Importa la función addProduct desde productsReducer
import backendAPI from "./API/api";
import { useNavigate } from "react-router-dom";

function Create() {
  const dispatch = useDispatch(); // Obtiene la función de despacho
  const navigate = useNavigate()

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

    const isValid = addProductDb(newProduct)
    if (isValid) {
      // Despachar la acción para agregar un producto
    dispatch(addProduct(newProduct)); // Usa la función de despacho para agregar el producto
    }
    navigate("/home")
  };

  const addProductDb = async (producto) => {
    const response = await backendAPI.post("/products", {
      codName: producto.codName,
      productName: producto.productName,
      quantity: producto.quantity,
      price: producto.price,
    })
    if (response.status === 201){
      return true
    }else{
      return false
    }
    
  }

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
