import React, { useState } from 'react';

const AmountDetails = ({ language }) => {
  const [data, setData] = useState([]);
  const [templeData, setTempleData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [selectedTab, setSelectedTab] = useState(null);




  const newLocal = 'https://mahankali-temple-1f95132ebff6.herokuapp.com/';





  const templeAmountDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(newLocal + 'templeAmountDetails');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const responseData = await response.json();
      setTempleData(responseData);
      // Fetch total value
      const totalResponse = await fetch(newLocal + 'templeAmountDetailsTotal');
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

  const loadAmountDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(newLocal + 'amountDetails');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const responseData = await response.json();
      setData(responseData);
      // Fetch total value
      const totalResponse = await fetch(newLocal + 'amountDetailsTotal');
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
  const loadNetAmount = async () => {
    setLoading(true);
    try {
      // Fetch total value
      const totalResponse = await fetch(newLocal + 'netAmount');
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
  const handleTabClick = (tab) => {
    console.log('Tab clicked:', tab);
    setSelectedTab(tab);
    if (tab === 'receivedAmountDetails') {
      loadAmountDetails();
    } else if (tab === 'amountDetails') {
      templeAmountDetails();
    }else if (tab === 'nettAmount') {
      loadNetAmount();
    }
  };
  return (
    <div style={{ height: '400px', overflow: 'scroll' }}>
      <div className="banner">
        <h2
          style={{ fontStyle: 'italic', textAlign: 'center', textDecoration: 'underline', cursor: 'pointer', fontWeight: selectedTab === 'receivedAmountDetails' ? 'bold' : 'normal', }}
          onClick={() => handleTabClick('receivedAmountDetails')}>{language === 'en' ? 'Received Amount Details' : 'విరాళాలు ఇచ్చినవారు'}</h2>
        <h2
          style={{ fontStyle: 'italic', textAlign: 'center', textDecoration: 'underline', cursor: 'pointer', fontWeight: selectedTab === 'amountDetails' ? 'bold' : 'normal', }}
          onClick={() => handleTabClick('amountDetails')}
        >
          {language === 'en' ? 'Temple Amount Details' : 'ఖజానా వివరాలు'}
        </h2>
        <h2
          style={{ fontStyle: 'italic', textAlign: 'center', textDecoration: 'underline', cursor: 'pointer', fontWeight: selectedTab === 'nettAmount' ? 'bold' : 'normal', }}
          onClick={() => handleTabClick('nettAmount')}
        >
          {language === 'en' ? 'Amount Available' : 'నికర మొత్తం'}
        </h2>
      </div>
      {loading && <p>Loading data...</p>}
      {error && <p>Error: {error}</p>}
      {selectedTab === 'receivedAmountDetails' && data.length > 0 && (
       <div>
       <table style={{ minWidth: '250px', tableLayout: 'fixed', width: '100%' }}>
         <thead style={{ position: 'sticky', top: 0, backgroundColor: 'grey' }}>
           <tr>
             <th style={{ border: '1px solid black', textAlign: 'center', width: '10%' }}>Sl no</th>
             <th style={{ border: '1px solid black', textAlign: 'center', width: '30%' }}>Name</th>
             <th style={{ border: '1px solid black', textAlign: 'center', width: '20%' }}>Amount</th>
             <th style={{ border: '1px solid black', textAlign: 'center', width: '20%' }}>Taken By</th>
             <th style={{ border: '1px solid black', textAlign: 'center', width: '20%' }}>Date</th>
           </tr>
         </thead>
         <tbody>
           {data.map(item => (
             <tr key={item.id}>
               <td style={{ border: '1px solid black', textAlign: 'center', padding: '8px', wordWrap: 'break-word', whiteSpace: 'normal' }}>{item.id}</td>
               <td style={{ border: '1px solid black', textAlign: 'center', padding: '8px', wordWrap: 'break-word', whiteSpace: 'normal' }}>{item.name}</td>
               <td style={{ border: '1px solid black', textAlign: 'center', padding: '8px', wordWrap: 'break-word', whiteSpace: 'normal' }}>{item.amount}</td>
               <td style={{ border: '1px solid black', textAlign: 'center', padding: '8px', wordWrap: 'break-word', whiteSpace: 'normal' }}>{item.takenBy}</td>
               <td style={{ border: '1px solid black', textAlign: 'center', padding: '8px', wordWrap: 'break-word', whiteSpace: 'normal' }}>{item.takenDate}</td>
             </tr>
           ))}
           <tr>
             <td style={{ border: '1px solid black', textAlign: 'center', padding: '8px' }} colSpan="2">Total</td>
             <td style={{ border: '1px solid black', textAlign: 'center', padding: '8px' }}>{total}</td>
             <td style={{ border: '1px solid black', textAlign: 'center', padding: '8px' }} colSpan="3"></td>
           </tr>
         </tbody>
       </table>
     </div>
     
      )}

      {selectedTab === 'amountDetails' && templeData.length > 0 && (
        <div>
           <table style={{ minWidth: '250px', tableLayout: 'fixed', width: '250%'}}>

            <thead style={{ position: 'sticky', top: 0, backgroundColor: 'grey' }}>
              <tr>
                <th style={{ border: '1px solid black', textAlign: 'center'}}>Sl no</th>
                <th style={{ border: '1px solid black', textAlign: 'center'}}>Name</th>
                <th style={{ border: '1px solid black', textAlign: 'center'}}>Amount</th>
                {/* Add more columns as needed */}
              </tr>
            </thead>
            <tbody>
              {templeData.map(item => (
                <tr key={item.id}>
                  <td style={{ border: '1px solid black', textAlign: 'center', wordWrap: 'break-word' }}>{item.id}</td>
                  <td style={{ border: '1px solid black', textAlign: 'center', wordWrap: 'break-word', whiteSpace: 'normal' }}>{item.name}</td>
                  <td style={{ border: '1px solid black', textAlign: 'center', wordWrap: 'break-word', whiteSpace: 'normal' }}>{item.amount}</td>
                  {/* Add more cells as needed */}
                </tr>
              ))}
              <tr>
                <td style={{ border: '1px solid black', textAlign: 'center' }} colSpan="2">Total</td>
                <td style={{ border: '1px solid black', textAlign: 'center' }}>{total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

{selectedTab === 'nettAmount' && total > 0 && (
        <div>
           <table style={{ minWidth: '50px', tableLayout: 'auto', width: '50%'}}>

            <thead style={{ position: 'sticky', top: 0, backgroundColor: 'grey' }}>
              <tr>
                <th style={{ border: '1px solid black', textAlign: 'center'}}>Available Amount</th>
                {/* Add more columns as needed */}
              </tr>
            </thead>
            <tbody>
            <tr>
                <td style={{ border: '1px solid black', textAlign: 'center' }}>{total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};


export default AmountDetails;
