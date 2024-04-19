import { useState } from "react";
import "../InterfaceCSS/TypeTravaux.css"


const TypeTravaux = ({ onTypeTravauxChange }) => {
    const [selectedTypeTravaux, setSelectedTypeTravaux] = useState("");

    const handleTypeTravauxChange = (event) => {
        const newTypeTravaux = event.target.value;
        setSelectedTypeTravaux(newTypeTravaux);
        onTypeTravauxChange(newTypeTravaux);
    };

    return (
        <div className="TypeTravaux">
            <h1>Type de Travaux:</h1>
            <select id="liste" name="liste" onChange={handleTypeTravauxChange} value={selectedTypeTravaux}>
                <option value="" disabled>Select Type of Work</option>
                <option value="etudes_enrg">Etudes énergétiques</option>
                <option value="inst_enrg">Installations d'énergies renouvelables</option>
                <option value="renov_global">Rénovation Globale</option>
                <option value="Trav_eff_enrg">Travaux d'efficacité énergétique</option>
            </select>
        </div>
    );
};

export default TypeTravaux;