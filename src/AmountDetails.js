import React, { useState } from 'react';

const AmountDetails = ({language }) => {
    const [data, setData] = useState([]);
    const [templeData, setTempleData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [selectedTab, setSelectedTab] = useState(null);



    const newLocal = 'https://mahanakali-temple-ba20bcfbcbac.herokuapp.com/';

    

    const templeAmountDetails = async () => {
        setLoading(true);
        try {
          const response = await fetch(newLocal+'templeAmountDetails');
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const responseData = await response.json();
          setTempleData(responseData);
         // Fetch total value
         const totalResponse = await fetch(newLocal+'templeAmountDetailsTotal');
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
          const response = await fetch(newLocal+'amountDetails');
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const responseData = await response.json();
          setData(responseData);
         // Fetch total value
         const totalResponse = await fetch(newLocal+'amountDetailsTotal');
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
        } 
      };     
      return (
        <div style={{ height: '400px', overflow: 'scroll' }}>
          <div className="banner">
          <h2 
              style={{ fontStyle: 'italic' , textAlign: 'center',textDecoration: 'underline',cursor: 'pointer',fontWeight: selectedTab === 'receivedAmountDetails' ? 'bold' : 'normal', }} 
              onClick={()=>handleTabClick('receivedAmountDetails')}>{language === 'en' ? 'Received Amount Details' : 'విరాళాలు ఇచ్చినవారు'}</h2>
{          <h2
              style={{ fontStyle: 'italic', textAlign: 'center', textDecoration: 'underline',cursor: 'pointer',fontWeight: selectedTab === 'amountDetails' ? 'bold' : 'normal', }}
              onClick={() => handleTabClick('amountDetails')}
            >
              {language === 'en' ? 'Temple Amount Details' : 'ఖజానా వివరాలు'}
            </h2> }     
            </div>
          {loading && <p>Loading data...</p>}
          {error && <p>Error: {error}</p>}
          {selectedTab === 'receivedAmountDetails' && data.length > 0 && (
            <div>
              <table style={{ minWidth: '150px', tableLayout: 'auto', width: '150%'}}>
              
                <thead>
                  <tr>
                    <th style={{ border: '1px solid black' , textAlign: 'center', padding: '8px'}}>Sl no</th>
                    <th style={{ border: '1px solid black', textAlign: 'center', padding: '8px' }}>Name</th>
                    <th style={{ border: '1px solid black', textAlign: 'center', padding: '8px' }}>Amount</th>
                    <th style={{ border: '1px solid black', textAlign: 'center', padding: '8px' }}>Taken By</th>
                    {/* Add more columns as needed */}
                  </tr>
                </thead>
                <tbody>
                  {data.map(item => (
                    <tr key={item.id}>
                      <td style={{ border: '1px solid black', textAlign: 'center', padding: '8px',wordWrap: 'break-word' }}>{item.id}</td>
                      <td style={{ border: '1px solid black', textAlign: 'center' , padding: '8px',wordWrap: 'break-word', whiteSpace: 'normal'}}>{item.name}</td>
                      <td style={{ border: '1px solid black', textAlign: 'center' , padding: '8px',wordWrap: 'break-word', whiteSpace: 'normal'}}>{item.amount}</td>
                      <td style={{ border: '1px solid black', textAlign: 'center' , padding: '8px',wordWrap: 'break-word', whiteSpace: 'normal'}}>{item.takenBy}</td>
                      {/* Add more cells as needed */}
                    </tr>
                  ))}
                  <tr>
                  <td style={{ border: '1px solid black', textAlign: 'center'}} colSpan="2">Total</td>
                    <td style={{ border: '1px solid black', textAlign: 'center' }}>{total}</td>
                    <td style={{ border: '1px solid black', textAlign: 'center' }} colSpan="3"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

{ selectedTab === 'amountDetails' && templeData.length > 0 && (
            <div>
              <table style={{ minWidth: '250px', tableLayout: 'fixed', width: '250%'}}>
              
                <thead>
                  <tr>
                    <th style={{ border: '1px solid black' , textAlign: 'center'}}>Sl no</th>
                    <th style={{ border: '1px solid black', textAlign: 'center' }}>Name</th>
                    <th style={{ border: '1px solid black', textAlign: 'center' }}>Amount</th>
                    {/* Add more columns as needed */}
                  </tr>
                </thead>
                <tbody>
                  {templeData.map(item => (
                    <tr key={item.id}>
                      <td style={{ border: '1px solid black', textAlign: 'center',wordWrap: 'break-word' }}>{item.id}</td>
                      <td style={{ border: '1px solid black', textAlign: 'center' ,wordWrap: 'break-word', whiteSpace: 'normal'}}>{item.name}</td>
                      <td style={{ border: '1px solid black', textAlign: 'center' ,wordWrap: 'break-word', whiteSpace: 'normal'}}>{item.amount}</td>
                      {/* Add more cells as needed */}
                    </tr>
                  ))}
                  <tr>
                  <td style={{ border: '1px solid black', textAlign: 'center'}} colSpan="2">Total</td>
                  <td style={{ border: '1px solid black', textAlign: 'center' }}>{total}</td>
                  <td style={{ border: '1px solid black', textAlign: 'center' }} colSpan="1"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      );
    };
    

export default AmountDetails;