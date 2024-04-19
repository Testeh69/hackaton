import "../InterfaceCSS/Reponse.css"


const Reponse = ({onAnswer}) => {
    return (
        <div className="Reponse">
            <h1>Réponse</h1>
            <p>{onAnswer}</p>
        </div>
    )
}

export default Reponse;