import { NavLink } from "react-router-dom"
import { FaComputer } from "react-icons/fa6";
import { FaLaptopCode } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import { MdOutlineCompare } from "react-icons/md";
import { Link } from "react-router-dom";

function Header() {

    return (

        <header>

            <Link to={"/Product-list"}>
                <h1 className="Header-title"> <FaComputer />  TechZone <FaLaptopCode /> </h1>
            </Link>

            <nav>
                <NavLink to="/WishList" className="nav-link"> <CiBookmark />  Wish List </NavLink>
                <NavLink to="/ShoppingCart" className="nav-link"> <FaCartShopping /> Shopping Cart </NavLink>
                <NavLink to="/Comparer" className="nav-link"><MdOutlineCompare /> Comparatore</NavLink>
            </nav>


        </header>
    )
}

export default Header