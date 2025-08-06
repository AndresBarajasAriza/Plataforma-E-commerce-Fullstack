import { useState } from 'react'

import './style.css'

function App() {
  const [producto, setProducto] = useState({
    nombre: '',
    talla: '',
    precio: '',
    stock: ''

  });

  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8080/api/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
      });

      if (res.ok) {
        alert('Producto guardado')
        setProducto({ nombre: '', talla: '', precio: '', stock: '' });
      } else {
        alert('error al guardar el producto')
      }
    } catch (err) {
      alert('error de conexion en el servidor')
    }
  };


  return (
    <div className="form-modern">
      <h1>Registrar Nuevo Producto</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre del Producto:</label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          value={producto.nombre}
          onChange={handleChange}
          placeholder="Ej: Camiseta Premium"
        />
        <label htmlFor="talla">Talla:</label>
        <input
          type="text"
          name="talla"
          id="talla"
          value={producto.talla}
          onChange={handleChange}
          placeholder="Ej: M, L, XL, 30, 42"
        />
        <label htmlFor="precio">Precio (USD):</label>
        <input
          type="number"
          name="precio"
          id="precio"
          value={producto.precio}
          onChange={handleChange}
          placeholder="Ej: 29.99"
          min="0"
          step="0.01"
        />
        <label htmlFor="stock">Stock Disponible:</label>
        <input
          type="number"
          name="stock"
          id="stock"
          value={producto.stock}
          onChange={handleChange}
          placeholder="Ej: 150"
          min="0"
          step="1"
        />
        <button type="submit">Guardar Producto</button>
      </form>
    </div>
  );
}

export default App;
