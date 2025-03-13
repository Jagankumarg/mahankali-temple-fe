import React, { useState } from 'react';

const DataTab = ({language }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  /* const [tab, setTab] = useState('List of Donations/Status'); */
  const [selectedTab, setSelectedTab] = useState(null);
 
  
  const newLocal = 'https://mahankali-temple-1f95132ebff6.herokuapp.com/';


  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(newLocal+'chandaDonatorsList');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const responseData = await response.json();
      setData(responseData);
     // Fetch total value
     const totalResponse = await fetch(newLocal+'totalDonations');
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

  const fetchMembershipsData = async () => {
    setLoading(true);
    try {
      const membershipsResponse = await fetch(newLocal+'memberShips');
      if (!membershipsResponse.ok) {
        throw new Error('Failed to fetch memberships data');
      }
      const membershipsData = await membershipsResponse.json();
      setData(membershipsData);
      // Fetch total for memberships
      const membershipsTotalResponse = await fetch(newLocal+'membershipsTotal');
      if (!membershipsTotalResponse.ok) {
        throw new Error('Failed to fetch memberships total');
      }
      const membershipsTotalData = await membershipsTotalResponse.json();
      setTotal(membershipsTotalData.response);      

      

      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchVillageDonationsData = async () => {
    setLoading(true);
    try {
      const membershipsResponse = await fetch(newLocal+'villageDonations');
      if (!membershipsResponse.ok) {
        throw new Error('Failed to fetch memberships data');
      }
      const membershipsData = await membershipsResponse.json();
      setData(membershipsData);
      // Fetch total for memberships
      const membershipsTotalResponse = await fetch(newLocal+'villageDonationsTotal');
      if (!membershipsTotalResponse.ok) {
        throw new Error('Failed to fetch memberships total');
      }
      const membershipsTotalData = await membershipsTotalResponse.json();
      setTotal(membershipsTotalData.response);      

      

      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

   const handleTabClick = (tab) => {
    console.log('Tab clicked:', tab);
    setSelectedTab(tab);
    if (tab === 'memberships') {
      fetchMembershipsData();
    } else if (tab === 'List of Donations/Status') {
      fetchData();
    } else if(tab === 'villageDonations'){
      fetchVillageDonationsData();
    }
  }; 


  return (
    <div style={{ height: '400px', overflow: 'scroll' }}>
      <div className="banner">
      <h2 
          style={{ fontStyle: 'italic' , textAlign: 'center',textDecoration: 'underline',cursor: 'pointer',fontWeight: selectedTab === 'List of Donations/Status' ? 'bold' : 'normal', }} 
          onClick={()=>handleTabClick('List of Donations/Status')}>{language === 'en' ? 'Donations' : 'విరాళాలు'}</h2>
      <h2
          style={{ fontStyle: 'italic', textAlign: 'center', textDecoration: 'underline',cursor: 'pointer',fontWeight: selectedTab === 'memberships' ? 'bold' : 'normal', }}
          onClick={() => handleTabClick('memberships')}
        >
          {language === 'en' ? 'Village Memberships' : 'ఊరి సభ్యత్వాలు'}
        </h2>
        <h2
          style={{ fontStyle: 'italic', textAlign: 'center', textDecoration: 'underline',cursor: 'pointer',fontWeight: selectedTab === 'villageDonations' ? 'bold' : 'normal', }}
          onClick={() => handleTabClick('villageDonations')}
        >
          {language === 'en' ? 'Village Donations' : 'ఊరి విరాళాలు'}
        </h2>        
        </div>
      {loading && <p>Loading data...</p>}
      {error && <p>Error: {error}</p>}
      {data.length > 0 && (
        <div>
          <table style={{ minWidth: '250px', tableLayout: 'fixed', width: '250%'}}>
          
          <thead style={{ position: 'sticky', top: 0, backgroundColor: 'grey' }}>
              <tr>
                <th style={{ border: '1px solid black' , textAlign: 'center', padding: '8px'}}>Sl no</th>
                <th style={{ border: '1px solid black', textAlign: 'center', padding: '8px' }}>Name</th>
                <th style={{ border: '1px solid black', textAlign: 'center', padding: '8px' }}>Address</th>
                <th style={{ border: '1px solid black', textAlign: 'center', padding: '8px' }}>Amount</th>
                <th style={{ border: '1px solid black', textAlign: 'center', padding: '8px' }}>Status</th>
                <th style={{ border: '1px solid black', textAlign: 'center', padding: '8px' }}>Comments</th>
                <th style={{ border: '1px solid black' , textAlign: 'center', padding: '8px'}}>Phone No</th>
                {/* Add more columns as needed */}
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.id}>
                  <td style={{ border: '1px solid black', textAlign: 'center', padding: '8px',wordWrap: 'break-word' }}>{item.id}</td>
                  <td style={{ border: '1px solid black', textAlign: 'center' , padding: '8px',wordWrap: 'break-word', whiteSpace: 'normal'}}>{item.name}</td>
                  <td style={{ border: '1px solid black', textAlign: 'center' , padding: '8px',wordWrap: 'break-word', whiteSpace: 'normal'}}>{item.address}</td>
                  <td style={{ border: '1px solid black',  textAlign: 'center' , padding: '8px',wordWrap: 'break-word'}}>{item.amount}</td>
                  <td style={{ border: '1px solid black',  textAlign: 'center', padding: '8px',wordWrap: 'break-word' }}>{item.status}</td>
                  <td style={{ border: '1px solid black',  textAlign: 'center', padding: '8px', wordWrap: 'break-word', whiteSpace: 'normal'}}>{item.comments}</td>
                  <td style={{ border: '1px solid black',  textAlign: 'center', padding: '8px',wordWrap: 'break-word'}}>{item.phoneNumber}</td>
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
