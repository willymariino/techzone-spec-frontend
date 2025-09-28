import { useContext, useEffect } from "react"
import GlobalContext from "../context/GlobalContext"
import ProductCard from "../components/ProductCard"
import useStorage from "../hooks/useStorage"
import { Link } from "react-router-dom"

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
                        <Link to={`/product-detail/slug/${favorite.slug}`}>
                            <ProductCard product={favorite} />
                        </Link>
                    </li>

                )}

            </ul>
        </>
    )
}

export default WishList