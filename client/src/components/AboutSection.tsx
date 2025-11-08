import { useState, useEffect, useRef } from "react";
import { Code, Palette, Server, Gamepad2, Code2, BrainCircuit, Lightbulb } from "lucide-react";
import profilePhoto from "@/assets/image.avif"; // Make sure you have an image at this path

const AboutSection = () => {
  const [visibleWords, setVisibleWords] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const text = `I'm a second-year student passionate about web and game
  development. As a lifelong gamer, I'm driven to build the same
  immersive digital experiences I've always loved, honing my
  skills in creative problem-solving to bring new ideas to life.`;
  const words = text.split(" ");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible && visibleWords < words.length) {
      const timer = setTimeout(() => {
        setVisibleWords((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible, visibleWords, words.length]);

  const skills = [
    { icon: Code, title: "Frontend", description: "React, TypeScript, Next.js, Tailwind CSS", color: "glow-purple" },
    { icon: Server, title: "Backend", description: "Node.js, Python, Database, APIs", color: "glow-blue" },
    { icon: Palette, title: "Design", description: "AfterEffects, Unreal Engine", color: "glow-purple" },
  ];

  return (
    <section ref={sectionRef} id="about" className="min-h-screen py-20 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Picture Container */}
          <div className="group relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 mx-auto lg:mx-0 rounded-full overflow-hidden border-2 border-border">
            <img
              src={profilePhoto}
              alt="Your Name"
              className="w-full h-full object-cover rounded-full transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
          </div>

          {/* Content */}
          <div>
            <h2 className="text-5xl font-bold mb-8 gradient-text">About Me</h2>
            <div className="text-lg text-muted-foreground leading-relaxed mb-12">
              {words.map((word, index) => (
                <span
                  key={index}
                  className={`transition-opacity duration-300 ${
                    index < visibleWords ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {word}{" "}
                </span>
              ))}
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <div
                  key={skill.title}
                  className={`glass rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300 ${skill.color} fade-in-up`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <skill.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{skill.title}</h3>
                  <p className="text-muted-foreground text-sm">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-24">
          <h3 className="text-3xl font-bold mb-8 gradient-text">All about</h3>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-muted-foreground">
            <div className="hover:text-primary transition-transform duration-300 hover:scale-125 cursor-pointer">
              <Gamepad2 className="w-14 h-14" />
            </div>
            <span className="text-4xl text-border hidden sm:inline">|</span>
            <div className="hover:text-primary transition-transform duration-300 hover:scale-125 cursor-pointer">
              <Code2 className="w-14 h-14" />
            </div>
            <span className="text-4xl text-border hidden sm:inline">|</span>
            <div className="hover:text-primary transition-transform duration-300 hover:scale-125 cursor-pointer">
              <BrainCircuit className="w-14 h-14" />
            </div>
            <span className="text-4xl text-border hidden sm:inline">|</span>
            <div className="hover:text-primary transition-transform duration-300 hover:scale-125 cursor-pointer">
              <Lightbulb className="w-14 h-14" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;