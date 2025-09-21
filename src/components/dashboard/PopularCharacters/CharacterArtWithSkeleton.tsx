"use client";

import Image from "next/image";
import { useState } from "react";

export default function CharacterArtWithSkeleton({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="rounded-2xl"
        onLoadingComplete={() => setLoaded(true)}
      />
      {!loaded && (
        <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md image-skeleton"></div>
      )}
    </div>
  );
}
