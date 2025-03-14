import React, { useState, useEffect } from 'react';
import DataTab from './DataTab'; // Assuming DataTab is in the same directory
import Estimations from './Estimations'; 
import AmountDetails from './AmountDetails'; 
import './App.css';
import backgroundImage from './Mahankali.jpeg';
import { translationsEN, translationsTE } from './translation';

// English translations
const Ribbon = ({ children }) => (
  <div className="ribbon">{children}</div>
);

const newLocal = 'https://mahankali-temple-1f95132ebff6.herokuapp.com/';



const App = () => {
  const [showDataTab, setShowDataTab] = useState(false);
  const [showEstimationsTab, setShowEstimationsTab] = useState(false);
  const [showAmountDetails, setShowAmountDetails] = useState(false);
/*   const [showTotalChanda, setShowTotalChanda] = useState(false); */
  const [data, setData] = useState(null);
  const [amountData, setAmountData] = useState(null);
  const [estimations, setEstimations] = useState(null);
  const [amount, setAmount] = useState(null);
  const [total, setTotal] = useState(null);
  const [language, setLanguage] = useState('en'); // Default language is English

  useEffect(() => {
    if (showEstimationsTab) {
      // Make API call for EstimationsTab
      fetch(newLocal+'chandaDonatorsList')
        .then(response => response.json())
        .then(data => setEstimations(data))
        .catch(error => console.error('Error fetching estimations:', error));
    }
  }, [showEstimationsTab]);

  useEffect(() => {
    if (showDataTab) {
      // Make API call for DataTab
      fetch(newLocal+'chandaDonatorsList')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [showDataTab]);

  useEffect(() => {
    if (showAmountDetails) {
      // Make API call for DataTab
      fetch(newLocal+'amountDetails')
        .then(response => response.json())
        .then(amountData => setAmount(amountData))
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [showAmountDetails]);


  const handleDataTabClick = () => {
    setShowDataTab(true);
/*     setShowTotalChanda(true); */
    setShowEstimationsTab(false);
    setShowAmountDetails(false);
  };

  const handleEstimationsTabClick = () => {
    setShowDataTab(false);
    setShowEstimationsTab(true);
    setShowAmountDetails(false);
   /*  setShowTotalChanda(false); */
  };
  const handleAmountTabClick = () => {
    setShowDataTab(false);
    setShowEstimationsTab(false);
    setShowAmountDetails(true);
   /*  setShowTotalChanda(false); */
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'te' : 'en'); // Toggle between English and Telugu
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
      padding: '20px',
    }}>

      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '300',
        textAlign: 'center',
      }}>
      <h1>{language === 'en' ? translationsEN.title : translationsTE.title}</h1>
      <Ribbon>
      <button onClick={handleDataTabClick} style={{ fontWeight: showDataTab ? 'bold' : 'normal' }}>{language === 'en' ? translationsEN.chandaCollection : translationsTE.chandaCollection}</button>
      <button onClick={handleEstimationsTabClick} style={{ fontWeight: showEstimationsTab ? 'bold' : 'normal' }}>{language === 'en' ? translationsEN.constructionEstimations : translationsTE.constructionEstimations}</button>
      <button onClick={handleAmountTabClick} style={{ fontWeight: showAmountDetails ? 'bold' : 'normal' }}>{language === 'en' ? translationsEN.amount : translationsTE.amount}</button>
      <button onClick={toggleLanguage}>{language === 'en' ? translationsEN.toggleButton : translationsTE.toggleButton}</button>
      </Ribbon>
 
      {showDataTab && data && <DataTab data={data} language={language}/>}
      {showEstimationsTab && estimations && <Estimations estimations={estimations} language={language}/>}
      {showAmountDetails && amount && <AmountDetails estimations={amount} language={language}/>}

      
      
    </div>
    </div>
  );
};

export default App;
