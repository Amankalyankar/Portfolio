import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import SplineLoader from "./SplineLoader";

const HeroSection = () => {
  const [typedText, setTypedText] = useState("");
  const fullText = "Where the love for gaming meets the art of development.";

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
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen relative overflow-hidden bg-black"
    >
      <div className="relative flex flex-col lg:block w-full h-full min-h-screen pt-24 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
        
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

        {/* Right side with Spline scene (Robot) */}
        {/* CHANGED: Added scale-75 to shrink the model on mobile, and lg:scale-100 to reset it on desktop */}
        <div className="w-full h-[50vh] flex items-center justify-center lg:absolute lg:top-0 lg:right-0 lg:w-1/2 lg:h-screen lg:pt-20 transform scale-75 lg:scale-100">
            <SplineLoader scene="https://prod.spline.design/SqdJqi-TwKVKAbeF/scene.splinecode" />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10 hidden lg:block">
        <ChevronDown className="w-8 h-8 text-secondary" />
      </div>
    </section>
  );
};

export default HeroSection;