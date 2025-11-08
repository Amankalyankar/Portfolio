// src/components/FloatingIcons.tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Gamepad2, Code2, BrainCircuit, Lightbulb, Palette, Server } from 'lucide-react';

// We'll define our icons here with custom positions and sizes
const icons = [
  { Icon: Gamepad2, size: 'w-16 h-16', position: 'top-[20%] left-[25%]' },
  { Icon: Code2, size: 'w-12 h-12', position: 'top-[15%] left-[60%]' },
  { Icon: BrainCircuit, size: 'w-20 h-20', position: 'top-[45%] left-[45%]' },
  { Icon: Lightbulb, size: 'w-10 h-10', position: 'top-[70%] left-[70%]' },
  { Icon: Palette, size: 'w-14 h-14', position: 'top-[80%] left-[15%]' },
  { Icon: Server, size: 'w-12 h-12', position: 'top-[50%] left-[85%]' },
];

const FloatingIcons = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Select all icons
      const floatingIcons = gsap.utils.toArray('.floating-icon');
      
      floatingIcons.forEach((icon) => {
        // Create an infinitely looping timeline for each icon
        gsap.to(icon as Element, {
          // Animate to a random x/y position within 100px of its start
          x: gsap.utils.random(-100, 100, 1), 
          y: gsap.utils.random(-100, 100, 1),
          // Animate scale and rotation
          scale: gsap.utils.random(0.8, 1.4, 0.1),
          rotation: gsap.utils.random(-90, 90, 1),
          // Random duration for a more natural feel
          duration: gsap.utils.random(4, 8, 1),
          ease: 'sine.inOut', // Smooth easing
          yoyo: true, // Animates back and forth
          repeat: -1, // Loop forever
          // Add a random delay to stagger the animations
          delay: gsap.utils.random(0, 3, 0.5), 
        });
      });
    }, containerRef); // Scope the animation to our container

    // Cleanup function
    return () => ctx.revert(); 
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-96 max-w-lg" // Container for our animation
    >
      {icons.map(({ Icon, size, position }, index) => (
        <div
          key={index}
          className={`floating-icon absolute ${position} ${size} text-primary opacity-30 glow-purple`}
        >
          <Icon className="w-full h-full" />
        </div>
      ))}
    </div>
  );
};

export default FloatingIcons;