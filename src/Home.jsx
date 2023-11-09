import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { codeIdProduct, deleteProduct, getAllProducts } from "./productsReducer";
import Search from "./Search"; // Importa el componente de búsqueda
import "./Home.css";
import { Link } from 'react-router-dom'; // Importa useNavigate
import backendAPI from "./API/api";
import jsPDF from "jspdf";

function Home() {
  const products = useSelector((state) => state.products.products);
  console.log(products.products, "d");
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState(products); // Inicializa con todos los productos


  const [showPopup, setShowPopup] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [addedProductCount, setAddedProductCount] = useState(0);


  const handleAddToSelected = (product) => {
    setSelectedProducts([...selectedProducts, product]);
    setAddedProductCount(addedProductCount + 1);
  };
  
  const handleRemoveFromSelected = () => {
    if (selectedProducts.length > 0) {
      setSelectedProducts(selectedProducts.slice(0, -1)); // Elimina el último producto
      setAddedProductCount(addedProductCount - 1); // Resta uno del contador
    }
  };
  

  const handleCalculateTotal = () => {
    const calculatedTotal = selectedProducts.reduce(
      (acc, product) => acc + product.price,
      0
    );
    setTotal(calculatedTotal);
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };


  const generateInvoice = () => {
    // Crear un nuevo documento PDF para la factura
    const doc = new jsPDF();
  
    // Agregar los detalles de la factura
    doc.setFontSize(16);
    doc.text("Factura", 10, 10);
    doc.setFontSize(12);
    doc.text("Productos en la factura:", 10, 20);
  
    let yOffset = 30;
    selectedProducts.forEach((product, index) => {
      doc.text(`${product.productName} - $${product.price.toFixed(2)}`, 20, yOffset);
      yOffset += 10;
    })
  
    // Calcular el total de la factura
    const invoiceTotal = selectedProducts.reduce((total, product) => total + product.price, 0);
  
    // Agregar el total de la factura
    doc.text(`Total: $${invoiceTotal.toFixed(2)}`, 10, yOffset + 10);
  
    // Guardar el PDF de la factura
    doc.save('factura.pdf');
  };
  


  useEffect(() => {
    setSearchResults(products); // Actualiza los resultados cuando cambie la lista de productos
  }, [products]);
  const handleDelete = async(producto) => {
    const response = await backendAPI.delete(`/products/${producto.id}`)
    if(response.status === 200){
      dispatch(deleteProduct({ codName: producto.codName }));
    }
    
  }

  const handleEdit = (producto) => {
    dispatch(codeIdProduct(producto.id))

  }

  const handleSearch = (searchTerm) => {
    // Realiza la búsqueda en la lista de productos
    const results = products.filter(
      (product) =>
        product.codName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };
  console.log(products);

  const getDbProducts = async () => {
    const response = await backendAPI.get("/products")
    //  console.log(response.data)
    dispatch(getAllProducts(response.data))
  }

  useEffect(() => {
    getDbProducts()
  }, []);



  const generatePdf = () => {
    // Crear un nuevo documento PDF
    const doc = new jsPDF();
  
    // Establecer la fuente y el tamaño de texto para el título
    doc.setFont('helvetica');
    doc.setFontSize(16);
  
    // Configurar el color del título
    doc.setTextColor(0, 0, 0); // Texto en negro
  
    // Agregar el título
    doc.text('Lista de Productos', 10, 10);
  
    // Restablecer la fuente y el tamaño de texto para los detalles de productos
    doc.setFont('helvetica');
    doc.setFontSize(12);
  
    // Configurar el color del texto
    doc.setTextColor(0, 0, 0); // Texto en negro
  
    // Iterar sobre los productos y agregarlos al PDF
    let yOffset = 20;
    products.forEach((product, index) => {
      yOffset += 10;
  
      // Agregar el número de producto
      doc.text(`Producto ${index + 1}:`, 10, yOffset);
  
      // Configurar el color del código de producto
      doc.setTextColor(0, 0, 255); // Texto en azul
      // Agregar el código de producto
      doc.text(`Código: ${product.codName}`, 20, yOffset + 10);
  
      // Restablecer el color del texto
      doc.setTextColor(0, 0, 0); // Texto en negro
  
      // Agregar el nombre de producto, cantidad y precio
      doc.text(`Nombre: ${product.productName}`, 20, yOffset + 20);
      doc.text(`Cantidad: ${product.quantity}`, 20, yOffset + 30);
      doc.text(`Precio: $${product.price.toFixed(2)}`, 20, yOffset + 40);
  
      yOffset += 50; // Aumentar el espaciado entre productos
    });
  
    // Guardar el PDF con un nombre específico
    doc.save('productos.pdf');
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
            <div className="container">
        {/* Resto de tu código... */}
        <button onClick={generatePdf} className="action-button">Print PDF Report</button>
        <button onClick={handleOpenPopup} className="action-button">Generate Invoice</button>
      </div>



      {showPopup && (
      <div className="popup">
        <h2>Add Products to Invoice</h2>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.productName}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => handleAddToSelected(product)}
                    className="btn btn-add-to-invoice"
                  >
                    +1
                  </button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleCalculateTotal}>Calculate Total</button>
        <p>Total: ${total.toFixed(2)}</p>
        <button onClick={generateInvoice}>Print Invoice</button>
        <button onClick={handleClosePopup} className="close-button">
          Close
        </button>
          <button onClick={handleRemoveFromSelected} className="btn btn-remove-from-invoice">
        -1
      </button>
    </div>
    )}



      <Search onSearch={handleSearch} products={products} setSearchResults={setSearchResults} />
      <div>
        <Link
          to={`/create`}
          
          className="btn btn-truper"
        >
          Create
        </Link>
      </div>

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