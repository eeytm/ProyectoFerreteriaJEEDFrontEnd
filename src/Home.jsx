import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "./productsReducer";
import Search from "./Search"; // Importa el componente de búsqueda
import "./Home.css";
import { Link} from 'react-router-dom'; // Importa useNavigate

function Home() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState(products); // Inicializa con todos los productos

  useEffect(() => {
    setSearchResults(products); // Actualiza los resultados cuando cambie la lista de productos
  }, [products]);
  const handleDelete = (producto) => {
    dispatch(deleteProduct({ codName: producto.codName }));
  }

  const handleEdit = (producto) => {
    console.log(producto);
  }
 console.log (process.env.REACT_APP_BACKEND_URL)
 
  const handleSearch = (searchTerm) => {
    // Realiza la búsqueda en la lista de productos
    const results = products.filter(
      (product) =>
        product.codName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

 

  return (
    <div className="container">
      <div className="logo-and-text">
        <img src="JEED 1000X1000.png" alt="Ferretería Jeed Logo" />
        <div className="text">
          <p className="big-text">FERRETERIA Y HERRAMIENTAS JEED</p>
        </div>
      </div>

      {/* Barra de búsqueda en la misma ventana de Home */}
      <Search onSearch={handleSearch} products={products} setSearchResults={setSearchResults} />

      {/* Resto del contenido de la página de inicio */}
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
          {searchResults.length > 0
            ? searchResults.map((product, index) => (
                // Renderiza los resultados de la búsqueda
                <tr key={index}>
                  <td>{product.codName}</td>
                  <td>{product.productName}</td>
                  <td>{product.quantity}</td>
                  <td>${Number(product.price).toFixed(2)}</td>
                  <td>
                    <Link
                      to={`/edit/${product.codName}`}
                      onClick={() => handleEdit(product)}
                      className="btn btn-truper"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product)}
                      className="btn btn-truper delete-btn ms-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            : // Si no hay resultados, muestra un mensaje
              <tr>
                <td colSpan="5">No results found.</td>
              </tr>}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
