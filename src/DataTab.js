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
    <div style={{ height: '400px', overflow: 'scroll' }}>
      <h2 style={{ fontStyle: 'italic' , textAlign: 'center', cursor: 'pointer' }} onClick={handleTabClick}>{language === 'en' ? 'List of Donations/Status' : 'చందా ఇచ్చు వారి వివరాలు'}</h2>
      {loading && <p>Loading data...</p>}
      {error && <p>Error: {error}</p>}
      {data.length > 0 && (
        <div style={{overflowScrolling: 'touch', WebkitOverflowScrolling: 'touch' }}/* style={{ overflowX: 'auto', maxWidth: '100%', overflowScrolling: 'touch', WebkitOverflowScrolling: 'touch' }} */>
          <table /* style={{ minWidth: '100px', tableLayout: 'fixed', width: '100%'}} */>
            <thead>
              <tr>
                <th style={{ border: '1px solid black' }}>Sl no</th>
                <th style={{ border: '1px solid black' }}>Name</th>
                <th style={{ border: '1px solid black' }}>Address</th>
                <th style={{ border: '1px solid black' }}>Amount</th>
                <th style={{ border: '1px solid black' }}>Status</th>
                <th style={{ border: '1px solid black' }}>Comments</th>
                <th style={{ border: '1px solid black' }}>Phone No</th>
                {/* Add more columns as needed */}
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.id}>
                  <td style={{ border: '1px solid black', textAlign: 'center' }}>{item.id}</td>
                  <td style={{ border: '1px solid black', textAlign: 'center' }}>{item.name}</td>
                  <td style={{ border: '1px solid black', textAlign: 'center' }}>{item.address}</td>
                  <td style={{ border: '1px solid black',  textAlign: 'center' }}>{item.amount}</td>
                  <td style={{ border: '1px solid black',  textAlign: 'center' }}>{item.status}</td>
                  <td style={{ border: '1px solid black',  textAlign: 'center' }}>{item.comments}</td>
                  <td style={{ border: '1px solid black',  textAlign: 'center' }}>{item.phoneNumber}</td>
                  {/* Add more cells as needed */}
                </tr>
              ))}
              <tr>
              <td style={{ border: '1px solid black', textAlign: 'center'}} colSpan="3">Total</td>
                <td style={{ border: '1px solid black', textAlign: 'center' }}>{total}</td>
                <td style={{ border: '1px solid black', textAlign: 'center' }} colSpan="3"></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DataTab;