import GlobalContext from "../context/GlobalContext";
import useStorage from "../hooks/useStorage";

function GlobalContextProvider({ children }) {
    const [favorites, setFavorites] = useStorage("favorites", [])

    function toggleFavorite(product) {

        console.log("Aggiungo/rimuovo:", product)

        setFavorites(prev => {

            if (prev.some(p => p.id === product.id)) { // verifico se il prodotto è già presente
                return prev.filter(p => p.id !== product.id) // se lo è, al click viene ricreato un nuovo array con quel prodotto filtrato fuori
            }
            else {
                return [...prev, product] // se non è presente, creo un nuovo array con tutti i prodotti precedenti, più il nuovo.
            }

        })
    }

    return (
        <GlobalContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider

