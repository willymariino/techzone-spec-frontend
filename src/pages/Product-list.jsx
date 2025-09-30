import ProductCard from "../components/ProductCard"
import GlobalContext from "../context/GlobalContext";
import { useState, useEffect, useContext, useCallback } from "react"
import axios from "axios"
import { Link } from "react-router-dom";

function debounce(callback, delay) {
    let timer
    return (value) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            callback(value)
        }, delay)
    }
}

async function fetchProducts(query, category, setProducts) {
    // verifico i parametri ricevuti dalla chiamata per debug
    console.log("query:", query) // dovrebbe essere la stringa che inserisci come filtro
    console.log("category:", category) // dovrebbe essere la stringa della categoria scelta
    //   console.log("setProducts:", setProducts) // dovrebbe essere la funzione setter di useState

    try {
        const res = await axios.get(`http://localhost:3001/products?search=${query}&category=${category}`)

        setProducts(res.data)
        console.log(res.data)
    }

    catch (error) {
        { console.error("errore nel caricamento dei dettagli dei prodotti", error) }
    }

    finally {
        // Messaggio di completamento operazione (sia successo che errore)
        console.log("operazione completata")
    }

}

function ProductList() {
    const [query, setQuery] = useState("")
    const [category, setCategory] = useState("")
    const [products, setProducts] = useState([])
    const [sortOrder, setSortOrder] = useState("");
    const { setCompareList } = useContext(GlobalContext)

    // funzione che svuota compareList al mount di Product-List per permettere nuove comparazioni
    useEffect(() => {
        setCompareList([]);
    }, []);

    const debouncedFetchProducts = useCallback(
        debounce((queryValue) => fetchProducts(queryValue, category, setProducts), 1000),
        [setCategory, setQuery]
    )


    useEffect(() => {
        debouncedFetchProducts(query) // ricordarsi che gli argomenti vanno scritti nello stesso ordine dei parametri
    }, [query, category, debouncedFetchProducts])

    const sortedProducts = [...products].sort((a, b) => { // uso lo spread operator per creare una nuova copia di products e lasciare l'originale invariato
        if (sortOrder === "ascending") return a.title.localeCompare(b.title)
        if (sortOrder === "descending") return b.title.localeCompare(a.title)
    })

    return (
        <main>

            <section className="title-section">

                <h1>prodotti disponibili</h1>

            </section>



            <div className="search-inputs">

                <section className="search-bar">

                    <label htmlFor="search-bar">cerca il prodotto</label>
                    <input
                        type="text"
                        id="search-bar"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="cerca il prodotto"
                    />

                </section>

                <section className="select-category">
                    <label htmlFor="category">filtra per categoria</label>
                    <select
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        id='category'
                    >
                        <option value=""> scegli la categoria</option>
                        <option value="laptop">laptop</option>
                        <option value="desktop">desktop</option>
                        <option value="smartphone">smartphone</option>
                        <option value="microcomputer">microcomputer</option>
                        <option value="gaming">gaming</option>
                        <option value="tablet">tablet</option>
                        <option value="wearable">wearable</option>
                        <option value="monitor">monitor</option>
                        <option value="networking">networking</option>
                        <option value="audio">audio</option>
                        <option value="storage">storage</option>
                    </select>
                </section>

                <section>
                    <label htmlFor="alphabetical-sorting">oridine alfabtico</label>

                    <select
                        id="alphabetical-sorting"
                        value={sortOrder}
                        onChange={e => setSortOrder(e.target.value)}
                    >
                        <option value="">seleziona un ordinamento</option>
                        <option value="ascending">a-z</option>
                        <option value="descending">z-a</option>
                    </select>
                </section>

            </div>

            {/* <pre>{JSON.stringify(products, null, 2)}</pre> */}

            <ul className="product-list">

                {sortedProducts.map(product => (
                    <li key={product.id} className="product-card">
                        <Link to={`/product-detail/slug/${product.slug}`}>
                            <ProductCard product={product} />
                        </Link>
                    </li>
                ))}

            </ul>

        </main>
    )
}

export default ProductList