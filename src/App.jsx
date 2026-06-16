import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';

function App() {
  const [inventory, setInventory] = useState(() => {
    return JSON.parse(localStorage.getItem('dilhara_inventory')) || [
      { id: 1, name: "Dilhara Coffee Roast", price: 15.00, qty: 40 },
      { id: 2, name: "Premium Mug Edition", price: 25.00, qty: 4 }
    ];
  });

  const [sales, setSales] = useState(() => {
    return JSON.parse(localStorage.getItem('dilhara_sales')) || [];
  });

  useEffect(() => {
    localStorage.setItem('dilhara_inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('dilhara_sales', JSON.stringify(sales));
  }, [sales]);

  const handleSell = (id) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id && item.qty > 0) {
        const updatedQty = item.qty - 1;
        
        // Diiwaangeli iibka cusub
        const newSale = {
          id: Date.now(),
          productName: item.name,
          price: item.price,
          date: new Date().toLocaleTimeString()
        };
        setSales(prevSales => [newSale, ...prevSales]);

        return { ...item, qty: updatedQty };
      }
      return item;
    }));
  };

  return (
    <Router>
      <div className="app-container">
        <aside className="sidebar">
          <h2>💎 Dilhara Suite</h2>
          <nav>
            <Link to="/">📊 Dashboard</Link>
            <Link to="/inventory">📦 Inventory (CRUD)</Link>
            <Link to="/sales">📜 Sales Registry</Link>
          </nav>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard inventory={inventory} sales={sales} />} />
            <Route path="/inventory" element={<Inventory inventory={inventory} setInventory={setInventory} onSell={handleSell} />} />
            <Route path="/sales" element={<Sales sales={sales} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;