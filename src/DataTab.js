import React, { useState } from 'react';

const DataTab = ({language }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
 

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://mahanakali-temple-ba20bcfbcbac.herokuapp.com/chandaDonatorsList');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const responseData = await response.json();
      setData(responseData);
     // Fetch total value
     const totalResponse = await fetch('https://mahanakali-temple-ba20bcfbcbac.herokuapp.com/totalDonations');
     if (!totalResponse.ok) {
       throw new Error('Failed to fetch total');
     }
     const totalData = await totalResponse.json();
     setTotal(totalData.response);

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
    <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '500px' }}>
      <h2 style={{ fontStyle: 'italic' , textAlign: 'center', cursor: 'pointer' }} onClick={handleTabClick}>{language === 'en' ? 'List of Donations/Status' : 'చందా ఇచ్చు వారి వివరాలు'}</h2>
      {loading && <p>Loading data...</p>}
      {error && <p>Error: {error}</p>}
      {data.length > 0 && (
        <div>
          <table style={{ minWidth: '600px' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '8px' }}>Sl no</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Address</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Amount</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Status</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Comments</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Phone No</th>
                {/* Add more columns as needed */}
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.id}>
                  <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.id}</td>
                  <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.name}</td>
                  <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.address}</td>
                  <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.amount}</td>
                  <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.status}</td>
                  <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.comments}</td>
                  <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.phoneNumber}</td>
                  {/* Add more cells as needed */}
                </tr>
              ))}
              <tr>
              <td style={{ border: '1px solid black', padding: '8px',textAlign: 'center'}} colSpan="3">Total</td>
                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{total}</td>
                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }} colSpan="3"></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DataTab;