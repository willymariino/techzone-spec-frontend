import { useContext, useEffect } from "react"
import GlobalContext from "../context/GlobalContext"
import ProductCard from "../components/ProductCard"
import useStorage from "../hooks/useStorage"
import { Link } from "react-router-dom"

function WishList() {

    const { favorites } = useContext(GlobalContext)
    const [storedFavorites, setStoredFavorites] = useStorage("wishListItems", [])
    console.log("Favorites attuali:", favorites)

    // È necessario usare useEffect per sincronizzare storedFavorites con favorites,
    // perché chiamare direttamente setStoredFavorites(favorites) durante il render
    // causerebbe un ciclo infinito di rendering (React non permette di aggiornare lo stato
    // durante la fase di render). useEffect garantisce che l'aggiornamento avvenga solo
    // dopo il completamento del render e solo quando favorites cambia.
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