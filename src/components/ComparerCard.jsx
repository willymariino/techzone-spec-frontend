import { useEffect, useState } from "react";
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import axios from "axios";

async function fetchDetails(product) {

    try {

        if (!product.ram) { // faccio la fetch solo se mancano i dettagli
            const res = await axios.get(`http://localhost:3001/products/slug/${product.slug}`)

            return res.data.product // restituisco l'oggetto completo
        }

        return product // altrimenti se è già completo, lo restituisco così comè dal provider
    }

    catch (error) {
        { console.error("errore nel caricamento dei dettagli del prodotto! 🙀🙀🙀🙀", error) }
    }

    finally {
        console.log("operazione terminata")
    }
}


function ComparerCard() {

    const { compareList } = useContext(GlobalContext)

    const [detailedProducts, setDetailedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadDetails() {

            if (compareList.length === 2) {


                const first = await fetchDetails(compareList[0])
                const second = await fetchDetails(compareList[1])

                setDetailedProducts([first, second])
                setLoading(false)
            }
        }

        loadDetails()
    }, [compareList])


    if (loading) {
        return <div>Caricamento in corso...</div>;
    }

    const [first, second] = detailedProducts


    return (

        <div style={{ display: "flex", gap: "2rem" }}>

            <div style={{ flex: 1 }}>
                <h1>{first.title}</h1>
                <p>Price: {first.price}</p>
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
                <p>Price: {first.price}</p>
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