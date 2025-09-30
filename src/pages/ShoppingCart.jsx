import { useContext } from "react"
import GlobalContext from "../context/GlobalContext"

function ShoppingCart() {

    const { cartProducts, removeFromCart, totalToPay, updateProductQuantity } = useContext(GlobalContext)

    return (
        <>

            <h1>Il tuo carrello acquisti</h1>

            <ul>
                {cartProducts.map((p, index) => (

                    <li key={index} className="cart-list">


                        <strong>   {p.title} </strong> prezzo: {p.price} €   quantità: {p.quantity}

                        <button onClick={() => updateProductQuantity(p.id)} className="increase-quantity-btn"> {/*qui passo solo la proprietà '.name' (cioè il valore stringa "mela" ad esempio) perchè mi basta il nome per identificare quale prodotto aggiornare. */}
                            incrementa quantità
                        </button>

                        <button onClick={() => removeFromCart(p.id)} className="increase-quantity-btn">
                            rimuovi dal carrello
                        </button>



                    </li>


                ))}

            </ul>

            <h3 className="total-To-Pay">totale da pagare: {totalToPay.toFixed(2)} €</h3>

        </>
    )
}

export default ShoppingCart