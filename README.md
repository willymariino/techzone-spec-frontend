| Nome            | Dove si trova                       | Tipo                     | Significato                                                         |
| --------------- | ----------------------------------- | ------------------------ | ------------------------------------------------------------------- |
| `query`         | stato React (`useState`)            | variabile di stato       | rappresenta **il valore attuale** del filtro di ricerca             |
| `category`      | stato React (`useState`)            | variabile di stato       | rappresenta **la categoria selezionata**                            |
| `queryValue`    | parametro della funzione `debounce` | valore passato “al volo” | rappresenta **il valore che l’utente ha appena digitato o scelto**  |
| `categoryValue` | parametro della funzione `debounce` | valore passato “al volo” | rappresenta **la categoria corrispondente a quel momento di input** |
