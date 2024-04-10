import React, { useState } from 'react';

const Estimations = (props) => {
  const { language } = props; 

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://mahanakali-temple-ba20bcfbcbac.herokuapp.com/estimations');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const responseData = await response.json();
      setData(responseData);
     // Fetch total value
     const totalResponse = await fetch('https://mahanakali-temple-ba20bcfbcbac.herokuapp.com/estimationsTotal');
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
      <h2 style={{ fontStyle: 'italic',textDecoration: 'underline', cursor: 'pointer' }}  onClick={handleTabClick}>{language === 'en' ? 'Construction Estimation/Expenses' : 'గుడి నిర్మాణ వ్యయం అంచనా'}</h2>
      {loading && <p>Loading data...</p>}
      {error && <p>Error: {error}</p>}
      {data.length > 0 && (
        <div>
          <table>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '8px' }}>Sl No</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Purpose</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Amount</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Comments</th>
                {/* Add more columns as needed */}
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.id}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{item.id}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{item.purpose}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{item.amount}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{item.comments}</td>
                  {/* Add more cells as needed */}
                </tr>
              ))}
              <tr>
                <td style={{ border: '1px solid black', padding: '8px' }} colSpan="2">Total</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{total}</td>
                <td style={{ border: '1px solid black', padding: '8px' }} colSpan="3"></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Estimations;