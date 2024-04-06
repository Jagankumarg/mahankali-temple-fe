import React, { useState } from 'react';

const Estimations = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/chandaDonatorsList');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const responseData = await response.json();
      setData(responseData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleTabClick = () => {
    if (data.length === 0) { // Fetch data only if it's not already fetched
      fetchData();
    }
  };

  return (
    <div>
      <h2 style={{ fontStyle: 'italic' }} onClick={handleTabClick}>Estimations</h2>
      {loading && <p>Loading data...</p>}
      {error && <p>Error: {error}</p>}
      {data.length > 0 && (
        <div>
          <p>Data fetched successfully:</p>
          <table>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Address</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Amount</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Status</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Comments</th>
                {/* Add more columns as needed */}
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.id}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{item.name}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{item.address}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{item.amount}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{item.status}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{item.comments}</td>
                  {/* Add more cells as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Estimations;