import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from "./pages/Signup";
import Category from './pages/Category';
import Brands from './pages/Brands';
import Products from './pages/Products';
import StockMovements from './pages/StockMovements';
import Deposits from './pages/Deposits';
import Sales from './pages/Sales';
import Buttons from './pages/Buttons';
import ErrorPage404 from './components/common/errorPage';

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/category" element={<Category />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/products" element={<Products />} />
          <Route path="/movements" element={<StockMovements />} />
          <Route path="/warehouses" element={<Deposits />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/buttons" element={<Buttons />} />
          <Route path= "*" element={<ErrorPage404/>} />
        </Routes>
      </BrowserRouter>
  );
}
