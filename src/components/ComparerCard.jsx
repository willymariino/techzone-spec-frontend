import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

function ComparerCard() {

    const { compareList } = useContext(GlobalContext)

    // fallback: se ci sono meno di 2 prodotti, riempi con oggetti vuoti
    const first = compareList[0] || {};
    const second = compareList[1] || {};

    return (

        <div style={{ display: "flex", gap: "2rem" }}>

            <div style={{ flex: 1 }}>
                <h1>{first.title}</h1>
                <p>Category: {first.category}</p>
                <h2>Specifications:</h2>
                <p>Internal memory: {first.internal_memory}</p>
                <p>RAM: {first.ram}</p>
                <p>CPU: {first.cpu}</p>
                <p>GPU: {first.gpu}</p>
                <p>Cooling: {first.cooling || "Not present"}</p>
                <h2>Description</h2>
                <p>{first.description}</p>
                <ul>
                    {first.optionals?.map((item, index) => (
                        <li key={index}>
                            {item}
                        </li>
                    ))}
                </ul>

            </div>

            <div style={{ flex: 1 }}>
                <h1>{second.title}</h1>
                <p>Category: {second.category}</p>
                <h2>Specifications:</h2>
                <p>Internal memory: {second.internal_memory}</p>
                <p>RAM: {second.ram}</p>
                <p>CPU: {second.cpu}</p>
                <p>GPU: {second.gpu}</p>
                <p>Cooling: {second.cooling || "Not present"}</p>
                <h2>Description</h2>
                <p>{second.description}</p>
                <ul>
                    {second.optionals?.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>


        </div >




    )
}

export default ComparerCard