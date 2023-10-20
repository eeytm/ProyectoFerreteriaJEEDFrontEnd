import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateProduct } from './productsReducer';
import './Update.css'; // Importa tu archivo CSS de estilos

export default function Update() {
  const { codName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const productToEdit = products.find((product) => product.codName === codName);

  const [editedProduct, setEditedProduct] = useState(
    productToEdit
      ? {
          codName: productToEdit.codName,
          productName: productToEdit.productName,
          quantity: productToEdit.quantity,
          price: productToEdit.price,
        }
      : {
          codName: '',
          productName: '',
          quantity: 0,
          price: 0,
        }
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    dispatch(updateProduct(editedProduct));
    navigate('/');
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-secondary text-white p-5">
        <h2>Edit Product</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="codName" className="form-label">Product Code:</label>
            <input type="text" className="form-control" id="codName" name="codName" value={editedProduct.codName} onChange={handleInputChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="productName" className="form-label">Product Name:</label>
            <input type="text" className="form-control" id="productName" name="productName" value={editedProduct.productName} onChange={handleInputChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">Quantity:</label>
            <input type="number" className="form-control" id="quantity" name="quantity" value={editedProduct.quantity} onChange={handleInputChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price:</label>
            <input type="number" step="0.01" className="form-control" id="price" name="price" value={editedProduct.price} onChange={handleInputChange} />
          </div>
          <button type="button" onClick={handleUpdate} className="btn btn-primary">Update Product</button>
        </form>
      </div>
    </div>
  );
}
