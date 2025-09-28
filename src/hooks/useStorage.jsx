import { useState } from "react";

// itemkey: la chiave con cui leggere e scrivere in localStorage
// initialValue: il valore di default da usare se il localStorage è vuoto o invalido
function useStorage(itemKey, initialValue) {

    const [state, setState] = useState(() => {

        try {
            // prendimi la chiave del del localStorage 
            const raw = localStorage.getItem(itemKey);

            // se non esiste ancora nulla per questa chiave
            if (raw === null) {
                // inizializziamo initialValue come stringa json
                localStorage.setItem(itemKey, JSON.stringify(initialValue));
                // e lo restituiamo come valore iniziale
                return initialValue;
            }
            // se c'è già un valore nel localStorage, viene parsato per tornare da JSON al suo tipo originale (boolean, array, oggetto)
            return JSON.parse(raw);

        }

        catch (error) {
            console.error("useStorage: errore nel parsing da localStorage:", error);
            // se i dati sono corrotti, reimposto il valore iniziale
            try {
                localStorage.setItem(itemKey, JSON.stringify(initialValue));

            }

            catch (e) {
                console.error("useStorage: errore nel reimpostare initialValue:", e);
            }

            // il catch restituisce comunque initialValue come fallback sicuro
            return initialValue;
        }

    });


    // funzione che verrà usata per modificare e salvare lo stato in localStorage
    const changeState = (valueOrUpdater) => {

        // setState con updater così sono sicuro di avere sempre lo stato più aggiornato 
        setState((prev) => {
            // calcolo il valore finale usando lo stato precedente (supporto updater function)
            const valueToStore =
                typeof valueOrUpdater === "function"
                    ? valueOrUpdater(prev)
                    : valueOrUpdater;


            // fallback: se per qualche motivo è undefined, ripiego su initialValue
            const safeValue = valueToStore === undefined ? initialValue : valueToStore;

            try {
                localStorage.setItem(itemKey, JSON.stringify(safeValue));

            } catch (error) {
                console.error("useStorage: errore nel salvataggio su localStorage:", error);
            }

            // restituiamo il valore più aggiornato allo stato react, così la UI può aggiornarsi immediatamente
            return safeValue;
        });
    };

    return [state, changeState];
}

export default useStorage;
