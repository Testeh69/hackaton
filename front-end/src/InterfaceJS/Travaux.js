import { useState } from "react";
import "../InterfaceCSS/Travaux.css"

const Travaux = ({ DeployDataToGet, setWork }) => {
  console.log(DeployDataToGet);
  console.log(DeployDataToGet.data)
  DeployDataToGet = DeployDataToGet.data;
  const [travaux, setTravaux] = useState("");
  
  const handleTravauxChange = (event) => {
    const newTravaux = event.target.value;
    setTravaux(newTravaux);
    setWork(newTravaux); // Passer newTravaux au lieu de setTravaux
  }

  return (
    <div className="Travaux">
      <h1>Travaux</h1>
      <div>
        <select id="list" name="list" onChange={handleTravauxChange} value={travaux}>
          <option key="index" value = "" disabled> </option>
          {Array.isArray(DeployDataToGet) && DeployDataToGet.map((item, index) => (
            <option key={index}  value={item} >{item} </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Travaux;