import Button from "./Button";

export default function Header({ howItWorksRef, contactRef, variant }) {
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${
        variant === "normal" ? "bg-white" : "backdrop-blur-lg"
      } shadow-md`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="text-2xl font-bold text-primary font-display">
          InsertProjName
        </a>
        <nav className="hidden md:flex space-x-8">
          {/* Use button instead of Link for scrolling */}
          <button
            onClick={() => scrollToSection(howItWorksRef)}
            className="text-text-primary hover:text-accent focus:outline-none"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection(contactRef)}
            className="text-text-primary hover:text-accent focus:outline-none"
          >
            Contact
          </button>
        </nav>
        <div className="flex items-center space-x-4">
          <Button>
            <a href="/login">Log In</a>
          </Button>
          <Button>
            <a href="/register">Sign Up</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
