import { useState } from "react";

function useStorage(itemKey, initialValue) {

    const [state, setState] = useState(() => {

        const prevState = localStorage.getItem(itemKey)
        if (prevState !== null) {
            try {
                return JSON.parse(prevState)
            }
            catch (error) {
                console.error("errore nel parsing da localStorage", error)
                localStorage.setItem(itemKey, JSON.stringify(initialValue));
                return initialValue;
            }
        }
        else {
            localStorage.setItem(itemKey, JSON.stringify(initialValue))
            return initialValue
        }


    })

    const changeState = newState => {
        const valueTostore = typeof newState === "function" ? newState(state) : newState

        setState(valueTostore)
        localStorage.setItem(itemKey, JSON.stringify(newState))
    }

    return [state, changeState]

}

export default useStorage