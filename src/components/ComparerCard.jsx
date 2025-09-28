import { useEffect, useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import axios from "axios";

async function getProductDetail(slug, setCurrentItem, setLoading) {

    try {
        const res = await axios.get(`http://localhost:3001/products/slug/${slug}`)
        setCurrentItem(res.data.product)
        setLoading(false)
        console.log("oggetto completo", res.data)
        console.log("solamente oggetto product", res.data.product)
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

    const [currentItem, setCurrentItem] = useState(null)
    const [loading, setLoading] = useState(true)

    const { slug } = useParams()

    // fallback: se ci sono meno di 2 prodotti, riempi con oggetti vuoti
    const first = compareList[0] || {};
    const second = compareList[1] || {};

    useEffect(() => {
        if (slug) {
            getProductDetail(slug, setCurrentItem, setLoading)
        }
    }, [slug])

    if (loading) {
        return (
            <div>caricamento in corso...</div>
        )
    }



    return (

        <div style={{ display: "flex", gap: "2rem" }}>

            <div style={{ flex: 1 }}>
                <h1>{first.title}</h1>
                <p>Price: {first.price}</p>
                <p>Category: {first.category}</p>
                <h2>Specifications:</h2>
                <p>Internal memory: {currentItem.internal_memory}</p>
                <p>RAM: {currentItem.ram}</p>
                <p>CPU: {currentItem.cpu}</p>
                <p>GPU: {currentItem.gpu}</p>
                <p>Cooling: {currentItem.cooling || "Not present"}</p>
                <h2>Description</h2>
                <p>{currentItem.description}</p>
                <ul>
                    {currentItem.optionals?.map((item, index) => (
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
                <p>Internal memory: {currentItem.internal_memory}</p>
                <p>RAM: {currentItem.ram}</p>
                <p>CPU: {currentItem.cpu}</p>
                <p>GPU: {currentItem.gpu}</p>
                <p>Cooling: {currentItem.cooling || "Not present"}</p>
                <h2>Description</h2>
                <p>{currentItem.description}</p>
                <ul>
                    {currentItem.optionals?.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>


        </div >




    )
}

export default ComparerCard