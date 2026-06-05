import React, { useState, useEffect } from "react";

interface BlurImageProps {
  src: string;
  alt: string;
  containerClassName?: string;
  className?: string;
  referrerPolicy?: string;
  [key: string]: any;
}

export function BlurImage({
  src,
  alt,
  className = "",
  containerClassName = "",
  ...props
}: BlurImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // If the src changes, reset the loaded state to false to trigger the blur effect again
  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-gray-200 dark:bg-gray-800 ${containerClassName}`}>
      {/* Placeholder pulse effect that fades out when loaded */}
      <div 
        className={`absolute inset-0 animate-pulse bg-gray-300 dark:bg-gray-700 transition-opacity duration-500 ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`} 
      />
      
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${
          isLoaded ? "blur-0 opacity-100" : "blur-xl opacity-0"
        } ${className}`}
        {...props}
      />
    </div>
  );
}
