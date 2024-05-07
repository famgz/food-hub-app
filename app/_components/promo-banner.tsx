/* eslint-disable jsx-a11y/alt-text */
import Image, { ImageProps } from "next/image";

interface PromoBannerProps {}

export default function PromoBanner(props: ImageProps) {
  return (
    <Image
      height={0}
      width={0}
      className="h-auto w-full object-contain"
      sizes="100vw"
      quality={100}
      {...props}
    />
  );
}
