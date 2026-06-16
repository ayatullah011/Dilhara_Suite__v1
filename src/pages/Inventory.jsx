import React, { useState } from 'react';

function Inventory({ inventory, setInventory, onSell }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [qty, setQty] = useState('');
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !qty) return;

    if (editId) {
      setInventory(prev => prev.map(item => 
        item.id === editId ? { ...item, name, price: parseFloat(price), qty: parseInt(qty) } : item
      ));
      setEditId(null);
    } else {
      const newItem = { id: Date.now(), name, price: parseFloat(price), qty: parseInt(qty) };
      setInventory(prev => [...prev, newItem]);
    }
    setName(''); setPrice(''); setQty('');
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setName(item.name);
    setPrice(item.price);
    setQty(item.qty);
  };

  const deleteItem = (id) => {
    if (window.confirm("Ma hubtaa inaad tirtirayso alaabtan?")) {
      setInventory(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
      <div className="panel">
        <h2>{editId ? '📝 Edit Item' : '➕ Add Item'}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="text" placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} style={{ padding: '10px', borderRadius: '6px', background: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
          <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} style={{ padding: '10px', borderRadius: '6px', background: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
          <input type="number" placeholder="Quantity" value={qty} onChange={e => setQty(e.target.value)} style={{ padding: '10px', borderRadius: '6px', background: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
          <button type="submit" style={{ padding: '12px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Save Parameters</button>
        </form>
      </div>

      <div className="panel">
        <h2>Live Stock Ledger</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
          <thead>
            <tr style={{ color: '#94a3b8', borderBottom: '1px solid #334155' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Item</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Price</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Stock</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid #334155' }}>
                <td style={{ padding: '12px' }}>{item.name}</td>
                <td style={{ padding: '12px' }}>${item.price.toFixed(2)}</td>
                <td style={{ padding: '12px' }}>{item.qty} pcs</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <button onClick={() => onSell(item.id)} style={{ marginRight: '8px', color: '#10b981', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Sell</button>
                  <button onClick={() => startEdit(item)} style={{ marginRight: '8px', color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Edit</button>
                  <button onClick={() => deleteItem(item.id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;