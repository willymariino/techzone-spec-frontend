import { useState } from "react";

/*
 * Custom hook per sincronizzare uno stato React con localStorage.
 * 
 * @param {string} itemKey - Chiave con cui leggere/scrivere in localStorage.
 * @param {*} initialValue - Valore di default se localStorage è vuoto o contiene dati non validi.
 * @returns {[any, Function]} - Array con lo stato attuale e una funzione per aggiornarlo (e salvarlo su localStorage).
 */
function useStorage(itemKey, initialValue) {

    // Inizializza lo stato leggendo da localStorage (o usando initialValue se necessario)
    const [state, setState] = useState(() => {

        try {
            // Recupera il valore associato a itemKey da localStorage (stringa JSON o null)
            const raw = localStorage.getItem(itemKey);

            // Se la chiave non esiste ancora in localStorage:
            if (raw === null) {
                // Salva initialValue come stringa JSON in localStorage
                localStorage.setItem(itemKey, JSON.stringify(initialValue));
                // Restituisce initialValue come valore iniziale dello stato
                return initialValue;
            }
            // se c'è già un valore nel localStorage, viene parsato per tornare da JSON al suo tipo originale (boolean, array, oggetto)
            return JSON.parse(raw);

        } catch (error) {
            // Se il parsing fallisce (dati corrotti o non validi), logga l'errore
            console.error("useStorage: errore nel parsing da localStorage:", error);
            // Prova a ripristinare initialValue in localStorage
            try {
                localStorage.setItem(itemKey, JSON.stringify(initialValue));
            } catch (e) {
                console.error("useStorage: errore nel reimpostare initialValue:", e);
            }
            // Usa comunque initialValue come fallback sicuro
            return initialValue;
        }

    });

    /*
     * Funzione per aggiornare sia lo stato React che il valore in localStorage.
     * Accetta sia un valore diretto che una funzione updater (come setState di React).
     */
    const changeState = (valueOrUpdater) => {

        // Usa la forma updater di setState per garantire di avere sempre lo stato più aggiornato
        setState((prev) => {
            // Calcola il nuovo valore (supporta sia valore diretto che funzione updater)
            // in pratica se ho un booleano ho bisogno della funzione updater per invertire lo stato precedente, mentre se ho una stringa, un oggetto un array, 
            // non mi interessa lo stato precedente, perché invece sovrascrivo direttamente con il nuovo stato
            const valueToStore =
                typeof valueOrUpdater === "function"
                    ? valueOrUpdater(prev)
                    : valueOrUpdater;

            // Se il nuovo valore è undefined, usa initialValue come fallback
            const safeValue = valueToStore === undefined ? initialValue : valueToStore;

            try {
                // Salva il nuovo valore (serializzato in JSON) su localStorage
                localStorage.setItem(itemKey, JSON.stringify(safeValue));
            } catch (error) {
                console.error("useStorage: errore nel salvataggio su localStorage:", error);
            }

            // Restituisce il valore aggiornato per aggiornare lo stato React (e quindi la UI)
            return safeValue;
        });
    };

    // Restituisce lo stato attuale e la funzione per aggiornarlo
    return [state, changeState];
}

export default useStorage;
