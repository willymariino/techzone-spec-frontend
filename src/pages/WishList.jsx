import { useContext, useEffect } from "react"
import GlobalContext from "../context/GlobalContext"
import ProductCard from "../components/ProductCard"
import useStorage from "../hooks/useStorage"

function WishList() {

    const { favorites } = useContext(GlobalContext)
    const [storedFavorites, setStoredFavorites] = useStorage("wishListItems", [])
    console.log("Favorites attuali:", favorites)

    // sincronizza ogni volta che l'array favorites cambia
    useEffect(() => {
        setStoredFavorites(favorites)
    }, [favorites, setStoredFavorites])

    return (
        <>
            <ul className="product-list">
                {storedFavorites.map(favorite =>
                    <li key={favorite.id} className="product-card">
                        <ProductCard product={favorite} />
                    </li>

                )}

            </ul>
        </>
    )
}

export default WishList