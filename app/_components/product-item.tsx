"use client";

import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { calculateProductTotalPrice, formatPrice } from "../_helpers/price";
import DiscountBadge from "./discount-badge";
import { cn } from "../_lib/utils";

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>;
  showRestaurantName?: boolean;
  className?: string;
}

export default function ProductItem({
  product,
  showRestaurantName = true,
  className,
}: ProductItemProps) {
  const price = Number(product.price);
  const discountPercentage = Number(product.discountPercentage);
  const finalPrice = calculateProductTotalPrice(
    product.price,
    product.discountPercentage,
  );

  return (
    // Prefer Link over Route due to the Link's pre-fetch
    <Link
      className={cn("w-[150px] min-w-[150px]", className)}
      href={`/products/${product.id}`}
    >
      <div className="w-full min-w-[150px]">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-md">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
          {discountPercentage > 0 && (
            <div className="absolute left-2 top-2">
              <DiscountBadge
                discountPercentage={discountPercentage}
                iconSize={12}
              />
            </div>
          )}
        </div>

        <div>
          <h2 className="mt-2 truncate text-sm font-semibold">
            {product.name}
          </h2>
          <div className="flex items-center gap-2">
            <h3 className="font-bold ">{formatPrice(finalPrice)}</h3>
            {discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(price)}
              </span>
            )}
          </div>

          {showRestaurantName && (
            <span className="block text-xs text-muted-foreground">
              {product.restaurant.name}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
