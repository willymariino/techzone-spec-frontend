import { useContext } from "react"
import GlobalContext from "../context/GlobalContext"
import ComparerCard from "../components/ComparerCard"

function ComparePage() {

    const { compareList } = useContext(GlobalContext)

    if (compareList.length < 2) {
        return <h1 className="comparer-title">seleziona due prodotti per confrontarli</h1>
    }

    return (


        <div className="comparePage-columns-container">

            {/*prima colonna */}
            <div>
                <ComparerCard />
            </div>





        </div>


    )
}

export default ComparePage