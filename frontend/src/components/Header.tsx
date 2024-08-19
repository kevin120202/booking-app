import { Link } from "react-router-dom"
import logo from "../assets/logo.png"
import { useAppContext } from "../contexts/AppContext"
// import { useState } from "react";

function Header() {
    // const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isLoggedIn } = useAppContext()

    return (
        <div className="bg-gray-600 py-6">
            <div className="container mx-auto flex flex-wrap justify-between items-center">
                <Link to="/" className="flex-shrink-0">
                    <img src={logo} alt="" className="h-28 w-auto" />
                </Link>

                <button className="md:hidden text-white focus:outline-none" aria-label="Toggle Menu">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>

                <ul className="hidden md:flex space-x-5 items-center text-white">

                    <Link to="/about"><li>About</li></Link>
                    <Link to="/packages"><li>Packages</li></Link>
                    <Link to="/gallery"><li>Gallery</li></Link>
                    <Link to="/contact"><li>Contact</li></Link>
                    {isLoggedIn ? <>
                        <Link to="/my-bookings"><li>My Bookings</li></Link>
                        <Link to="/my-travels"><li>My Travels</li></Link>
                        <button className="flex items-center px-3 py-2 font-bold hover:bg-gray-100 hover:cursor-pointer bg-yellow-300 text-black">Sign out</button>
                    </> : <>
                        <Link to="/sign-in" className="flex items-center px-3 py-2 font-bold hover:bg-gray-100 hover:cursor-pointer bg-yellow-300 text-black"><li>Sign In</li></Link>
                    </>}
                </ul>
            </div>
        </div>
    )
}

export default Header