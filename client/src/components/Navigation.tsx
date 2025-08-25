import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react"; // Import icons for the menu button

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false); // IMPORTANT: Close the menu when a link is clicked
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = ["About", "Work", "Contact"];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass py-4" : "py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <button onClick={() => scrollToSection("home")}>
          <div className="text-2xl font-bold gradient-text">Portfolio</div>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Hamburger Menu Button (for mobile) */}
        <button
          className="md:hidden z-50 text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 w-full h-screen bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center space-y-8"
          onClick={() => setIsMenuOpen(false)} // Optional: close menu by clicking overlay
        >
          {navLinks.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-4xl font-semibold text-foreground hover:text-primary transition-colors duration-300"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;