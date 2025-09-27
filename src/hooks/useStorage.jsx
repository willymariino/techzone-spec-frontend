import { useState } from "react";

function useStorage(itemKey, initialValue) {
    const [state, setState] = useState(() => {

        try {
            const raw = localStorage.getItem(itemKey);
            if (raw === null) {
                // inizializza lo storage con il valore iniziale
                localStorage.setItem(itemKey, JSON.stringify(initialValue));
                return initialValue;
            }
            // parsing del valore esistente
            return JSON.parse(raw);

        } catch (error) {
            console.error("useStorage: errore nel parsing da localStorage:", error);
            // se i dati sono corrotti, reimposto il valore iniziale
            try {
                localStorage.setItem(itemKey, JSON.stringify(initialValue));
            } catch (e) {
                console.error("useStorage: errore nel reimpostare initialValue:", e);
            }
            return initialValue;
        }
    });

    const changeState = (valueOrUpdater) => {
        // setState con updater così sono sicuro di usare il prev più aggiornato
        setState((prev) => {
            // calcolo il valore finale (supporto updater function)
            const valueToStore =
                typeof valueOrUpdater === "function" ? valueOrUpdater(prev) : valueOrUpdater;

            // fallback: se per qualche motivo è undefined, ripiego su initialValue
            const safeValue = valueToStore === undefined ? initialValue : valueToStore;

            try {
                localStorage.setItem(itemKey, JSON.stringify(safeValue));

            } catch (error) {
                console.error("useStorage: errore nel salvataggio su localStorage:", error);
            }

            return safeValue;
        });
    };

    return [state, changeState];
}

export default useStorage;
