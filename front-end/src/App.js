import './App.css';
import logo_agr from "./Assets/logo_crd_agr.png"
import logo_app from "./Assets/ecoreno.png"
import InformationClient from './InterfaceJS/InformationClient';
import Travaux from './InterfaceJS/Travaux';
import TypeTravaux from './InterfaceJS/TypeTravaux';
import Reponse from './InterfaceJS/Reponse';
import React, { useState } from 'react';
import arrowRight from "./Assets/arrow_right.svg";
import arrowLeft  from "./Assets/arrow_left.svg";

const updateDataRegion = (region) => {
  const dataToUpdate = { region: region};
  fetch('http://localhost:5000/api/update_data', {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToUpdate)
  })
  .then(response => response.json())
  .then(data => {
      console.log(data.message);  // Affiche le message de succès renvoyé par l'API
  })
  .catch(error => {
      console.error('Error:', error);
  });
};


const updateDataTypeOfWorks = (typeOfWork) => {
  const dataToUpdate = { typeOfWork: typeOfWork};
  fetch('http://localhost:5000/api/update_data', {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToUpdate)
  })
  .then(response => response.json())
  .then(data => {
      console.log(data.message);  // Affiche le message de succès renvoyé par l'API
  })
  .catch(error => {
      console.error('Error:', error);
  });
};


const updateDataWorks = (work) => {
  const dataToUpdate = { Work: work};
  fetch('http://localhost:5000/api/update_data', {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToUpdate)
  })
  .then(response => response.json())
  .then(data => {
      console.log(data.message);  // Affiche le message de succès renvoyé par l'API
  })
  .catch(error => {
      console.error('Error:', error);
  });
};


const getDataWorks = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/get_data');
    if (!response.ok) {
      // Si la réponse n'est pas ok, lancez une erreur avec le statut de la réponse
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // Si une erreur se produit lors de la requête ou du traitement de la réponse, loggez-la
    console.error('Error:', error);
    return null;
  }
}

const getContact = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/get_answer');
    if (!response.ok) {
      // Si la réponse n'est pas ok, lancez une erreur avec le statut de la réponse
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data; // Retournez la valeur à afficher dans le composant Reponse
  } catch (error) {
    // Si une erreur se produit lors de la requête ou du traitement de la réponse, loggez-la
    console.error('Error:', error);
    return null;
  }
}
function App() {
  const [region, setRegion] = useState("");
  const [typeOfWork, setTypeOfWork] = useState("");
  const [dataToGet, setDataToGet] = useState("")
  const [answer, setAnswer] = useState("")
  const [Index, setIndex] = useState(0);
  const [work, setWork] = useState("");
  const InterfaceElement = [<InformationClient onRegionChange = {setRegion}/>, <TypeTravaux  onTypeTravauxChange={ setTypeOfWork}/>,<Travaux DeployDataToGet={dataToGet} setWork={setWork}/>, <Reponse onAnswer = {answer} />];
  const handlePrev = () => {
    if (Index > 0) {
      setIndex(prevIndex => prevIndex - 1); 
    }
  };
  
  const handleNext = () => {
    if (Index < 3) {
      setIndex(prevIndex => prevIndex + 1);
   
    }
    if (Index === 0) {
      console.log(Index)
      updateDataRegion(region);
      console.log(region[0])
    };

    if (Index === 1){
      console.log(Index)
      updateDataTypeOfWorks(typeOfWork);
      console.log(typeOfWork);
      getDataWorks().then(data => setDataToGet(data));
    }

    if (Index === 2){
      console.log(Index)
      console.log(work)
      updateDataWorks(work)
      getContact().then(data => setAnswer(data.data));
    }

 


  };

  return (
    <div className="App">
      <div className='interface_left'>
        <div className="interface">
          {InterfaceElement[Index]}
         </div>
         <div className='state__btnNav'>
            <button className='state__btn' onClick={handlePrev}>
              <img src={arrowLeft} alt="prev" />
            </button>
            <button className='state__btn' onClick={handleNext}>
              <img src={arrowRight} alt="next" />
            </button>
         </div>
      </div>
      <div className="interface_right">
        <img src={logo_agr} alt="Logo Crédit Agricole" className="logo_credit_agr"/>
        <img src={logo_app} alt="Logo application" className="logo_app"/>
        <p>v 0.0.1</p>
      </div>
    </div>
  );
}

export default App;
