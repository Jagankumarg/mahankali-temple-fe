import React, { useState, useEffect } from 'react';
import DataTab from './DataTab'; // Assuming DataTab is in the same directory
import Estimations from './Estimations'; 
import './App.css';
import backgroundImage from './Mahankali.jpeg';

const Ribbon = ({ children }) => (
  <div style={{
    backgroundColor: 'rgba(60, 50, 19, 0.58)',
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
  const [showDataTab, setShowDataTab] = useState(false);
  const [showEstimationsTab, setShowEstimationsTab] = useState(false);
  const [showTotalChanda, setShowTotalChanda] = useState(false);
  const [data, setData] = useState(null);
  const [estimations, setEstimations] = useState(null);
  const [total, setTotal] = useState(null);

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
    setShowTotalChanda(true);
    setShowEstimationsTab(false);
  };

  const handleEstimationsTabClick = () => {
    setShowDataTab(false);
    setShowEstimationsTab(true);
    setShowTotalChanda(false);
  };
  return (
    
    <div style={{ 
      backgroundImage: `url(${backgroundImage}), linear-gradient(orange, orange)`,
     
    
      backgroundPosition: 'center',
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
        maxWidth: '300',
        textAlign: 'center',
      }}>
      <h1>Nuvvulabanda Mahankali Temple<br></br> Construction Details</h1>
      <Ribbon>
      <button onClick={handleDataTabClick} style={{ fontWeight: showDataTab ? 'bold' : 'normal' }}>Chanda Collection</button>
          <button onClick={handleEstimationsTabClick} style={{ fontWeight: showEstimationsTab ? 'bold' : 'normal' }}>Construction Estimations</button>
      </Ribbon>
      {showDataTab && data && <DataTab data={data} />}
      {showEstimationsTab && estimations && <Estimations estimations={estimations} />}
    </div>
    </div>
  );
};

export default App;