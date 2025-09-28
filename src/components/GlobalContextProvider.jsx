import { useState } from "react";
import GlobalContext from "../context/GlobalContext";
import useStorage from "../hooks/useStorage";


function GlobalContextProvider({ children }) {
    const [favorites, setFavorites] = useStorage("favorites", [])
    const [compareList, setCompareList] = useState([])

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

    function toggleCompare(product) {

        setCompareList(prev => {

            // se il prodotto è già stato selezionato, e viene cliccato di nuovo, rimuovilo
            if (prev.find(p => p.id === product.id)) {
                return prev.filter(p => p.id !== product.id)
            }

            // se meno di 2 sono selezionati, aggiungi il nuovo prodotto
            if (prev.length < 2) {
                return [...prev, product]
            }
        })
    }

    return (
        <GlobalContext.Provider value={{ favorites, toggleFavorite, toggleCompare, compareList }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider

