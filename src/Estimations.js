import React, { useState } from 'react';

const Estimations = (props) => {
  const { language } = props; 

  const [data, setData] = useState([]);
  const [expensesData, setExpensesData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [selectedTab, setSelectedTab] = useState(null);

  
  //const newLocal = 'https://mahanakali-temple-ba20bcfbcbac.herokuapp.com/';
  const newLocal = 'http://localhost:8080/';



  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(newLocal+'estimations');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const responseData = await response.json();
      setData(responseData);
     // Fetch total value
     const totalResponse = await fetch(newLocal+'estimationsTotal');
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

  const fetchExpensesData = async () => {
    setLoading(true);
    try {
      const response = await fetch(newLocal+'expenses');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const responseData = await response.json();
      setExpensesData(responseData);
     // Fetch total value
     const expenseTotalResponse = await fetch(newLocal+'expensesTotal');
     if (!expenseTotalResponse.ok) {
       throw new Error('Failed to fetch total');
     }
     const expensesTotalData = await expenseTotalResponse.json();
     setTotal(expensesTotalData.response);

      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  const handleTabClick = (tab) => {
    console.log('Tab clicked:', tab);
    setSelectedTab(tab);
    if (tab === 'estimations') {
      fetchData();
    } else if (tab === 'expenses') {
      fetchExpensesData();
    } else if(tab === 'estimations'){
      fetchData();
    }
  }; 


  return (
    <div style={{ height: '400px', overflow: 'scroll' }}>
        <div className="banner">
     <h2 style={{ fontStyle: 'italic',textDecoration: 'underline', cursor: 'pointer',fontWeight: selectedTab === 'estimations' ? 'bold' : 'normal', }} 
      onClick={()=>handleTabClick('estimations')}>{language === 'en' ? 'Construction Estimations' : 'గుడి నిర్మాణ వ్యయం అంచనా'}</h2>
      <h2 style={{ fontStyle: 'italic',textDecoration: 'underline', cursor: 'pointer',fontWeight: selectedTab === 'expenses' ? 'bold' : 'normal', }} 
      onClick={()=>handleTabClick('expenses')}>{language === 'en' ? 'Expenses' : 'ఖర్చులు'}</h2>
      {loading && <p>Loading data...</p>}
      {error && <p>Error: {error}</p>}
      {selectedTab === 'estimations' && data.length > 0 && (
        <div>
           <table style={{ minWidth: '250px', tableLayout: 'fixed', width: '250%'}}>
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



{selectedTab === 'expenses' && expensesData.length > 0  && (
        <div>
          <table style={{ minWidth: '250px', tableLayout: 'fixed', width: '250%'}}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '8px' }}>Sl No</th>
                <th style={{ border: '1px solid black', padding: '10px' }}>Date</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Purpose</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Amount</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Comments</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Given By</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Taken By</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Witness</th>
                {/* Add more columns as needed */}
              </tr>
            </thead>
            <tbody>
              {expensesData.map(item => (
                <tr key={item.id}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{item.id}</td>
                  <td style={{ border: '1px solid black', padding: '10px' , wordWrap: 'break-word' }}>{item.date}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{item.purpose}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{item.amount}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{item.comments}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{item.givenBy}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{item.takenBy}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{item.witness}</td>
                  {/* Add more cells as needed */}
                </tr>
              ))}
              <tr>
                <td style={{ border: '1px solid black', padding: '8px' }} colSpan="3">Total</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{total}</td>
                <td style={{ border: '1px solid black', padding: '8px' }} colSpan="3"></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      </div>
    </div>
  );
};

export default Estimations;