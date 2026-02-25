import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
