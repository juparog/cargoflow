import Image from "next/image";
import { useState } from "react";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export const ImageWithFallback = ({
  src,
  alt,
  width = 32,
  height = 32,
  className = "",
}: ImageWithFallbackProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <Image
        src={imageError ? "https://via.placeholder.com/150" : src}
        alt={alt}
        width={width}
        height={height}
        className="object-cover rounded-full shadow-sm hover:shadow-md transition-shadow"
        onError={() => setImageError(true)}
      />
    </div>
  );
};
