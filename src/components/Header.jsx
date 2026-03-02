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

            <nav className="header-nav">
                <NavLink to="/WishList" className="nav-link"> <CiBookmark />  Wish List </NavLink>
                <NavLink to="/ShoppingCart" className="nav-link"> <FaCartShopping /> Shopping Cart </NavLink>
                <NavLink to="/ComparePage" className="nav-link"><MdOutlineCompare /> Comparatore</NavLink>
            </nav>


            <nav className="navbar hamburger-button">

                <input type="checkbox" id="menu-toggle" className="menu-toggle" />
                <label htmlFor="menu-toggle" className="hamburger">&#9776;</label>

                <ul className="nav-links">

                    <li> <NavLink to="/WishList" className="nav-link"> <CiBookmark />  Wish List </NavLink></li>
                    <li> <NavLink to="/ShoppingCart" className="nav-link"> <FaCartShopping /> Shopping Cart </NavLink></li>
                    <li> <NavLink to="/ComparePage" className="nav-link"><MdOutlineCompare /> Comparatore</NavLink></li>

                </ul>

            </nav>


        </header>
    )
}

export default Header