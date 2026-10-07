import { useEffect, useRef, useState } from "react";
import { getImageSize } from "@/data/portfolio";

type SkeletonImageProps = {
  src: string;
  alt: string;
  /** Classes for the frame around the image (rounding, background). */
  className?: string;
};

type LoadState = "server" | "loading" | "loaded";

/**
 * An image that reserves its final space before it loads and shows a soft pulsing placeholder
 * until the pixels arrive, then fades the picture in.
 *
 * - The frame uses the image's real aspect ratio (from the generated size manifest), so the
 *   page never jumps when the image loads.
 * - Before hydration the image is shown normally, so nothing is hidden without JavaScript.
 * - Images already in the browser cache skip the skeleton entirely.
 */
export function SkeletonImage({ src, alt, className = "" }: SkeletonImageProps) {
  const size = getImageSize(src);
  const imageRef = useRef<HTMLImageElement>(null);
  const [state, setState] = useState<LoadState>("server");

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;
    setState(image.complete && image.naturalWidth > 0 ? "loaded" : "loading");
  }, [src]);

  const loading = state === "loading";

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={size ? { aspectRatio: `${size.width} / ${size.height}` } : {}}
    >
      {loading ? (
        <span
          aria-hidden
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#e6e6e6] via-[#f2f2f2] to-[#e2e2e2] motion-reduce:animate-none"
        />
      ) : null}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        {...(size ? { width: size.width, height: size.height } : {})}
        loading="lazy"
        decoding="async"
        onLoad={() => setState("loaded")}
        onError={() => setState("loaded")}
        className={`block h-full w-full object-contain transition-opacity duration-500 motion-reduce:transition-none ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}
