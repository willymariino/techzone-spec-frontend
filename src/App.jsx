import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProductList from "./pages/product-list"
import ProductDetail from "./pages/Product-detail"
import WishList from "./pages/WishList"
import ShoppingCart from "./pages/ShoppingCart"
import ComparePage from "./pages/ComparePage"
import DefaultLayout from "./Layouts/DefaultLayout"
import GlobalContextProvider from "./components/GlobalContextProvider"

function App() {


  return (

    <GlobalContextProvider>

      <BrowserRouter>

        <Routes>

          <Route Component={DefaultLayout}>

            <Route path="" index Component={ProductList} />
            <Route path="/Product-List" Component={ProductList} />
            <Route path="/product-detail/slug/:slug" Component={ProductDetail} />
            <Route path="/ShoppingCart" Component={ShoppingCart} />
            <Route path="/WishList" Component={WishList} />
            <Route path="/ComparePage" Component={ComparePage} />

          </Route>

        </Routes>

      </BrowserRouter>

    </GlobalContextProvider>
  )
}

export default App
