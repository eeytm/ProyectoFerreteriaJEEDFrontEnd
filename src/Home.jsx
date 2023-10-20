import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct } from "./productsReducer";

import "./Home.css"; // Importa un archivo CSS personalizado

function Home() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleDelete = (producto) => {
    dispatch(deleteProduct({ codName: producto.codName }));
  }

  const handleEdit = (producto) => {
    console.log(producto);
  }

  return (
    <div className="container">
        <div className="logo-and-text">
          <img src="JEED 1000X1000.png" alt="Ferretería Jeed Logo" />
          <div className="text">
            <p className="big-text">FERRETERIA Y HERRAMIENTAS JEED</p>
          </div>
        </div>
      <Link to="/create" className="btn btn-truper my-3">Create +</Link>

      <table className="table table-truper">
        <thead>
          <tr>
            <th className="truper-table-header">Product Code</th>
            <th className="truper-table-header">Product Name</th>
            <th className="truper-table-header">Quantity</th>
            <th className="truper-table-header">Price</th>
            <th className="truper-table-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.codName}</td>
              <td>{product.productName}</td>
              <td>{product.quantity}</td>
              <td>${Number(product.price).toFixed(2)}</td>
              <td>
                <Link to={`/edit/${product.codName}`} onClick={() => handleEdit(product)} className="btn btn-truper">Edit</Link>
                <button onClick={() => handleDelete(product)} className="btn btn-truper delete-btn ms-2">Delete</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
