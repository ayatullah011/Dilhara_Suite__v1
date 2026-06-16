import React from 'react';

function Sales({ sales }) {
  return (
    <div className="panel">
      <h2>📜 System Sales Audit Trail</h2>
      <p style={{ color: '#94a3b8', marginBottom: '20px' }}>Risiidhadan waxaa loo soo saaray si toos ah marka aad gujiso badhanka Sell.</p>
      
      {sales.length === 0 ? (
        <p style={{ color: '#64748b', fontStyle: 'italic' }}>Ma jiro wax iib ah oo weli la diiwangeliyey.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ color: '#94a3b8', borderBottom: '1px solid #334155' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Receipt ID</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Product Name</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Value</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {sales.map(sale => (
              <tr key={sale.id} style={{ borderBottom: '1px solid #334155' }}>
                <td style={{ padding: '12px', color: '#64748b' }}>#{sale.id}</td>
                <td style={{ padding: '12px', fontWeight: '500' }}>{sale.productName}</td>
                <td style={{ padding: '12px', color: '#10b981' }}>+${sale.price.toFixed(2)}</td>
                <td style={{ padding: '12px', textAlign: 'right', color: '#94a3b8' }}>{sale.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Sales;