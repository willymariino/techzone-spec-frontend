import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import GlobalContext from "../context/GlobalContext"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL;


async function getProductDetail(slug, setCurrentItem, setLoading) {

    try {
        const res = await axios.get(`${API_URL}/products/slug/${slug}`)
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

function ProductDetail() {

    const [currentItem, setCurrentItem] = useState(null)
    const [loading, setLoading] = useState(true)
    const { addToCart } = useContext(GlobalContext)

    const { slug } = useParams()


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

    function handleCart() {

        addToCart(currentItem)
    }


    return (

        <main>

            <h1>{currentItem.title}</h1>

            <p>Category: {currentItem.category}</p>

            <div className="detail-card">

                <div className="image-container">
                    <span> image placeholder</span>
                </div>


                <section>

                    <h2>Specifications:</h2>

                    <p>Internal memory: {currentItem.internal_memory}</p>
                    <p>RAM: {currentItem.ram}</p>
                    <p>CPU: {currentItem.cpu}</p>
                    <p>GPU: {currentItem.gpu}</p>
                    <p>Cooling: {currentItem.cooling || "Not present"}</p>
                    <p>price: {currentItem.price}</p>

                </section>

            </div>

            <section className="product-description">

                <h2>Description</h2>

                <p>{currentItem.description}</p>


                <p> Optionals: </p>


                <ul>

                    {currentItem.optionals.map((item, index) => (
                        <li key={index}>
                            {item}
                        </li>
                    ))}

                </ul>

                <div className="add-cart-wrapper">
                    <button className="btn-add-cart" onClick={handleCart}>
                        <span className="icon">🛒</span>
                        Aggiungi al carrello
                    </button>
                </div>



            </section>

        </main>

    )
}

export default ProductDetail