import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function Dashboard({ inventory, sales }) {
  const totalRevenue = sales.reduce((acc, curr) => acc + curr.price, 0);
  const totalItems = inventory.reduce((acc, curr) => acc + curr.qty, 0);

  // Isku dhex rida xogta si loogu dhex tuso Shaxanka
  const chartData = inventory.map(item => ({
    name: item.name.substring(0, 10),
    Stock: item.qty
  }));

  return (
    <div>
      <h1 style={{ marginBottom: '24px' }}>📊 Operational Analytics</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Revenue</div>
          <div className="stat-value" style={{ color: '#10b981' }}>${totalRevenue.toFixed(2)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Stock Categories</div>
          <div className="stat-value">{inventory.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Vault items</div>
          <div className="stat-value">{totalItems} units</div>
        </div>
      </div>

      <div className="panel" style={{ height: '350px' }}>
        <h2 style={{ color: '#3b82f6', marginBottom: '20px' }}>Stock Level Chart</h2>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
            <Bar dataKey="Stock" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;