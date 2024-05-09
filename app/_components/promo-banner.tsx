/* eslint-disable jsx-a11y/alt-text */
import Image, { ImageProps } from "next/image";
import Link from "next/link";

interface PromoBannerProps {
  imageUrl: string;
  imageAlt: string;
  url: string;
}

export default function PromoBanner({
  imageUrl,
  imageAlt,
  url,
}: PromoBannerProps) {
  return (
    <Link href={url}>
      <Image
        src={imageUrl}
        alt={imageAlt}
        height={0}
        width={0}
        className="h-auto w-full object-contain"
        sizes="100vw"
        quality={100}
      />
    </Link>
  );
}
