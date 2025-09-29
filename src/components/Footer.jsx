import { NavLink } from "react-router-dom"
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa"
import { FaYoutube } from "react-icons/fa";

function Footer() {


    return (

        <>
            <footer className="footer">
                <div className="footer-top">
                    <div className="footer-brand">
                        <h2>TechZone</h2>
                        <p>La tua tecnologia di fiducia</p>
                    </div>
                    <div>
                        <h4>Supporto</h4>

                        <nav className="footer-link">

                            <NavLink to="#" className="nav-link"> FAQ </NavLink>
                            <NavLink to="#" className="nav-link">Contatti </NavLink>
                            <NavLink to="#" className="nav-link">Resi & Spedizioni</NavLink>

                        </nav>
                    </div>
                    <div className="footer-newsletter">
                        <h4>Iscriviti</h4>
                        <input type="email" placeholder="La tua email" />
                        <button>Invia</button>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2025 TechZone. Tutti i diritti riservati.</p>
                    <div className="social-icons">
                        <strong> <p> join us </p></strong>
                        <a href="#" className="nav-link"><FaInstagram /></a>
                        <a href="#" className="nav-link"><FaFacebook /></a>
                        <a href="#" className="nav-link"><FaXTwitter /></a>
                        <a href="#" className="nav-link"> <FaYoutube /></a>
                    </div>
                </div>
            </footer>


        </>
    )
}

export default Footer