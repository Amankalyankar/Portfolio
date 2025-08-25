// components/SplineLoader.tsx
import React, { useState } from 'react';
import Spline from '@splinetool/react-spline'; // This import needs to be resolvable in your project environment

interface SplineLoaderProps {
  scene: string;
  className?: string; // Optional className for the container
}

const SplineLoader: React.FC<SplineLoaderProps> = ({ scene, className }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Handle the Spline load event
  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`relative ${className || 'w-full h-full'}`}>
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black text-white text-xl font-semibold rounded-lg z-20">
          Loading 3D Design...
        </div>
      )}

      {/* Spline component */}
      <Spline
        scene={scene}
        onLoad={handleLoad} // Attach the onLoad event handler
        className={isLoading ? 'invisible' : 'visible'} // Hide Spline until loaded
      />
    </div>
  );
};

export default SplineLoader;
