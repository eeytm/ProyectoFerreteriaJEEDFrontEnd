import React, { useState } from "react";

function Search({ onSearch, products, setSearchResults }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // Realiza la búsqueda en la lista de productos
    const results = products.filter(
      (product) =>
        product.codName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Llama a onSearch y pasa los resultados
    onSearch(searchTerm, results);
    setSearchResults(results);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter name or code"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default Search;
