// components/Slider.tsx
'use client';

import Image from "next/image";
import { useState, useEffect } from "react";

interface Slide {
  src: string;
  alt: string;
}

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const slides: Slide[] = [
    { src: "/slide1.jpg", alt: "Slide 1" },
    { src: "/slide2.png", alt: "Slide 2" },
    { src: "/slide3.jpg", alt: "Slide 3" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev: number) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-screen h-[500px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide: Slide, index: number) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            width={3000}
            height={1000}
            className="w-screen object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Dots navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_: Slide, index: number) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;