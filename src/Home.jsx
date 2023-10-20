import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  // Acceder al estado de productos utilizando useSelector
  const products = useSelector((state) => state.products);
  console.log(products)

  const handleDelete = (producto) => {
    console.log(producto, 'Hola ')
    alert("hola desde editar")
  }

  const handleEdit = (producto) => {
    console.log('Desde editar')
    alert("hola desde editar")
  }

  return (
    <div className="container ">
      <h2>Crud App with Jason Server</h2>
      <Link to="/create"className='btn btn-success my-3'>Create +</Link>
      <table className="table">
        <thead>
          <tr>
            <th>Product Code</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
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
                <button onClick={() => handleEdit(product)} className="btn btn-sm btn-primary">Edit</button>
                <button onClick={() => handleDelete(product)} className="btn btn-sm btn-danger ms-2">Delete</button>
                
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
