import { useContext } from "react"
import GlobalContext from "../context/GlobalContext"

function ComparePage() {

    const { compareList } = useContext(GlobalContext)

    if (compareList.length < 2) {
        return <h1 className="comparer-title">seleziona due prodotti per confrontarli</h1>
    }

    return (
        <>

        </>
    )
}

export default ComparePage