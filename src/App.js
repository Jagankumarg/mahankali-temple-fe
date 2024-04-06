import React, { useState, useEffect } from 'react';
import DataTab from './DataTab'; // Assuming DataTab is in the same directory
import Estimations from './Estimations'; 
import './App.css';
const Ribbon = ({ children }) => (
  <div style={{
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '10px',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '20px',
  }}>
    {children}
  </div>
);

const App = () => {
  const [showDataTab, setShowDataTab] = useState(true);
  const [showEstimationsTab, setShowEstimationsTab] = useState(false);
  const [data, setData] = useState(null);
  const [estimations, setEstimations] = useState(null);

  useEffect(() => {
    if (showEstimationsTab) {
      // Make API call for EstimationsTab
      fetch('http://localhost:8080/chandaDonatorsList')
        .then(response => response.json())
        .then(data => setEstimations(data))
        .catch(error => console.error('Error fetching estimations:', error));
    }
  }, [showEstimationsTab]);

  useEffect(() => {
    if (showDataTab) {
      // Make API call for DataTab
      fetch('http://localhost:8080/chandaDonatorsList')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [showDataTab]);

  const handleDataTabClick = () => {
    setShowDataTab(true);
    setShowEstimationsTab(false);
  };

  const handleEstimationsTabClick = () => {
    setShowDataTab(false);
    setShowEstimationsTab(true);
  };
  return (
    
    <div style={{ 
      backgroundImage: "url('C://Users//Sahithi//Documents//application//mahankali-temple//src//Mahankali.jpeg'), linear-gradient(orange, orange)",
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '600px',
        textAlign: 'center',
      }}>
      <h1>Nuvvulabanda Mahankali Temple Construction</h1>
      <Ribbon>
      <button onClick={handleDataTabClick} style={{ fontWeight: showDataTab ? 'bold' : 'normal' }}>Data Tab</button>
          <button onClick={handleEstimationsTabClick} style={{ fontWeight: showEstimationsTab ? 'bold' : 'normal' }}>Estimations Tab</button>
      </Ribbon>
      {showDataTab && data && <DataTab data={data} />}
      {showEstimationsTab && estimations && <Estimations estimations={estimations} />}
    </div>
    </div>
  );
};

export default App;