import { useState } from "react";
import GlobalContext from "../context/GlobalContext";
import useStorage from "../hooks/useStorage";


function GlobalContextProvider({ children }) {
    const [favorites, setFavorites] = useStorage("favorites", [])
    const [compareList, setCompareList] = useState([])
    const [cartProducts, setCartProducts] = useState([])

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

        console.log("oggetto salvato in compareList", product)

        setCompareList(prev => {

            // se il prodotto è già stato selezionato, e viene cliccato di nuovo, rimuovilo
            if (prev.find(p => p.id === product.id)) {
                return prev.filter(p => p.id !== product.id)
            }

            // se meno di 2 sono selezionati, aggiungi il nuovo prodotto
            if (prev.length < 2) {
                return [...prev, product]
            }

            return prev
        })
    }

    function addTocart(currentItems) {

        // verifica se il prodotto è già presente
        const isProductAlreadyAdded = currentItems.some(item => item.id === currentItems.id)

        if (isProductAlreadyAdded) {
            updateProductQuantity(currentItems.id)
        }

        // se non è presente aagiungi il prodotto con quantità 1
        const productToAdd = {
            ...currentItems,
            quantity: 1
        }

        // aggiorna lo stato con il nuovo prodotto
        setCartProducts(curr => [...curr, productToAdd])

        const updateProductQuantity = (cartProduct) => { // cartProduct rappresenta il nome del prodotto già nel carrello, di cui vogliamo aumentare la quantità, ed è solo una **stringa** (es: "Mela"), usata per confronti

            setCartProducts(curr => {

                return curr.map(p => {  // uso .map per scorrere ogni prodotto nel carrello, di cui p è ogni singolo prodotto

                    if (p.id === cartProduct) { // qui vedo se il prodotto nel carrello che sto scorrendo ha lo stesso nome del prodotto selezionato, se true, aggiungo + 1 alla quantità
                        return {
                            ...p,
                            quantity: p.quantity + 1
                        }
                    }

                    else {
                        return p // altrimenti se non è il prodotto che voglio aggiornare, lo lascio invariato
                    }
                })
            })
        }

        // funzione per rimuovere un prodotto dal carrello
        const removeFromCart = (cartProduct) => {
            setCartProducts(curr => curr.filter(p => p.id !== cartProduct))

        }

        // Calcolo del totale da pagare sommando prezzo * quantità per ogni prodotto utilizzando reduce
        const totalToPay = cartProducts.reduce((acc, p) => acc + (p.price * p.quantity), 0)

    }

    return (
        <GlobalContext.Provider value={{ favorites, toggleFavorite, toggleCompare, compareList, setCompareList, addTocart, cartProducts }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider

