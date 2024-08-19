import { Link } from "react-router-dom"

function Header() {
    return (
        <div className="bg-gray-600 py-6">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to="/">Coco & Sun Travel and Tours</Link>
                </span>
                <span className="flex space-x-2">
                    <Link to="/sign-in" className="flex items-center px-3 font-bold hover:bg-gray-100 hover:cursor-pointer bg-yellow-300">Sign In</Link>
                </span>
            </div>
        </div>
    )
}

export default Header