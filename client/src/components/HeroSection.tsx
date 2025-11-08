// src/components/HeroSection.tsx
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import FloatingIcons from "./FloatingIcons"; // Make sure this is imported

const HeroSection = () => {
  const [typedText, setTypedText] = useState("");
  const fullText = "Where the love for gaming meets the art of development.";

  // 1. 👇 --- FIX: The typing animation logic is restored here
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []); // The empty dependency array is correct

  return (
    // 2. 👇 --- FIX: Reverted to your original layout structure
    <section
      id="home"
      className="min-h-screen relative overflow-hidden bg-black"
    >
      {/* This container uses relative/block for the 2-column layout */}
      <div className="relative flex flex-col lg:block w-full h-full min-h-screen pt-24 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
        
        {/* --- 1. TEXT CONTENT (LEFT COLUMN) --- */}
        {/* This div is absolutely positioned on large screens */}
        <div className="flex flex-col justify-center text-center lg:text-left w-full z-10 lg:absolute lg:left-0 lg:top-0 lg:w-1/2 lg:h-screen lg:pl-24 xl:pl-32">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 gradient-text animate-fade-in break-words">
            Creative
            <br />
            Developer
          </h1>

          <div className="text-xl md:text-2xl text-muted-foreground mb-12 h-16 lg:h-8">
            {typedText}
            <span className="typing"></span>
          </div>

          <div className="mb-10 flex items-center justify-center lg:justify-start gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            <span className="text-lg uppercase tracking-wider text-muted-foreground">
              Available for Projects
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={() =>
                document
                  .getElementById("work")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-3 border border-border text-muted-foreground rounded-lg font-semibold hover:bg-secondary hover:text-background transition-all duration-300"
            >
              View my work
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-3 border border-border text-muted-foreground rounded-lg font-semibold hover:bg-secondary hover:text-background transition-all duration-300"
            >
              Get In Touch
            </button>
          </div>
        </div>

        {/* --- 2. GSAP ANIMATION (RIGHT COLUMN) --- */}
        {/* This div is also absolutely positioned on large screens */}
        <div className="hidden lg:flex items-center justify-center lg:absolute lg:right-0 lg:top-0 lg:w-1/2 lg:h-screen z-0">
          <FloatingIcons />
        </div>

      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10 hidden lg:block">
        <ChevronDown className="w-8 h-8 text-secondary" />
      </div>
    </section>
  );
};

export default HeroSection