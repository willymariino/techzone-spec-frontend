import { useState } from "react";
import { useContext } from "react";
import { CiBookmark } from "react-icons/ci";
import { MdOutlineCompare } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import GlobalContext from "../context/GlobalContext";
import useStorage from "../hooks/useStorage";

function ProductCard({ product }) {

    const storageKey = `bookmark-${product.id}`

    const [isBookMarked, setIsBookMarked] = useStorage(storageKey, false)
    const [isCompared, setIsCompared] = useState(false)
    const { toggleFavorite, toggleCompare } = useContext(GlobalContext)

    const handleBookmark = (e) => {
        // Blocca la propagazione dell'evento verso i genitori.
        // Serve perché il click sul bottone non deve attivare il Link della card.
        e.stopPropagation()

        // Previene il comportamento di default dell'evento.
        //  necessario, se il bottone è dentro un form o un link.
        e.preventDefault()

        // Metodo consigliato quando lo stato dipende dal valore precedente.
        // React passa automaticamente il valore più aggiornato dello stato come 'prev'.
        setIsBookMarked(prev => {
            const newValue = !prev
            console.log("salvo in localStorage:", newValue)
            return newValue
        })
        // usare invece: setIsBookMarked(!isBookMarked) legge direttamente lo stato attuale e lo inverte; più semplice, ma rischioso se ci sono aggiornamenti asincroni o rapidi.

        toggleFavorite(product) //aggiorna il contesto globale
    }

    function handleCompare(e) {

        e.stopPropagation()
        e.preventDefault()
        toggleCompare(product)

        setIsCompared(prev => !prev)

    }



    // console.log("title:", product.title)
    // console.log("category:", product.category)
    // console.log("price:", product.price)

    return (
        <>

            <div>

                <div className="card-header">

                    <p>{product.title}</p>

                    <div className="card-action">
                        <button className="add-button" onClick={handleBookmark}>
                            {isBookMarked ? <FaBookmark /> : <CiBookmark />}
                        </button>
                        <button className="add-button" onClick={handleCompare}>
                            {isCompared ? <FaCheck /> : <MdOutlineCompare />}
                        </button>
                    </div>

                </div>

                <p>category:{product.category}</p>
                <p>price: {product.price}</p>

            </div>

        </>
    )
}

export default ProductCard