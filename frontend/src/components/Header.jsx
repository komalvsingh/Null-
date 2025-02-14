import {Link} from "react-router-dom"
import Button from "./Button"

export default function Header({variant}) {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${variant=="normal"?"bg-white":"backdrop-blur-lg"} shadow-md`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary font-display">
          InsertProjName
        </Link>
        <nav className="hidden md:flex space-x-8">
          <Link href="#" className="text-text-primary hover:text-accent">
            About
          </Link>
          <Link href="#" className="text-text-primary hover:text-accent">
            How It Works
          </Link>
          <Link href="#" className="text-text-primary hover:text-accent">
            Contact
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button >
            <Link to="/login">
            Log In
            </Link>
          </Button>
          <Button >
            <Link to="/register">
            Sign Up
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

