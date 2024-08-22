import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductList from './components/products/ProductList';
import Dashboard from './components/dashboard/Dashboard';
import NavBar from './components/navBar/NavaBar';
import AddProduct from './components/products/AddProducts';
import SalesList from './components/sales/SalesList';
import ProductEdit from './components/products/ProductEdit';
import AddSale from './components/sales/AddSales';


const App: React.FC = () => {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/productos" element={<ProductList />} />
        <Route path='/productos/add_products' element={<AddProduct/>}/>
        <Route path='/ventas' element={<SalesList/>}/>
        <Route path="/productos/product-edit/:id" element={<ProductEdit />} />
        <Route path='/ventas/add-ventas' element={<AddSale/>} />
      </Routes>
    </div>
  );
};

export default App;
