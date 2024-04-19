import '../InterfaceCSS/InformationClient.css';
import React, { useState } from 'react';




const InformationClient = ({onRegionChange}) => {
    const [region, setRegion] = useState('');

    const handleRegionChange = (event) => {
        const newRegion = event.target.value;
        setRegion(newRegion);
        onRegionChange(newRegion);
    };



    return (
        <div className = "information_client">
            <h1>Informations client:</h1>
            <div className="segment" id="one">
                <p className="segment__champ" id="nom">Nom: </p>
                <input type="text" className="segment__input"></input>
            </div>
            <div className="segment" id="one">
                <p className="segment__champ" id="prenom">Pr&eacute;nom:</p>
                <input type="text" className="segment__input"></input>
            </div>
            <div className="segment" id="one">
                <p className="segment__champ" id="adresse">Adresse: </p>
                <input type="text" className="segment__input"></input>
            </div>
            <div className="segment" id="one">
                <p className="segment__champ" id="région">Région: </p>
                <input
                type="text"
                className="segment__input"
                value={region}
                onChange={handleRegionChange} 
                ></input>
            </div>
            <div className="segment" id="one">
                <p className="segment__champ" id="n&deg; de t&eacute;l">Num&eacute;ro de t&eacute;l&eacute;phone: </p>
                <input type="text" className="segment__input"></input>
            </div>
        </div>
    )
}

export default InformationClient;