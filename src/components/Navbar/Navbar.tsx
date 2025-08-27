import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

function Navbar() {
    return (
        <div className="navbar">
            <Link to="/" className="navbar-link">
                <Logo />
            </Link>
            <Link to="/game" className="navbar-link">Game</Link>
            <Link to="/about" className="navbar-link">About</Link>
        </div>
    )
}

export default Navbar;