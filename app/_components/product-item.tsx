import { Prisma } from "@prisma/client";
import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";
import { calculateProductTotalPrice, formatPrice } from "../_helpers/price";

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
}

export default function ProductItem({ product }: ProductItemProps) {
  const price = Number(product.price);
  const discount = Number(product.discountPercentage);
  const finalPrice = calculateProductTotalPrice(product);

  return (
    <div className="min-w-[150px]">
      <div className="relative h-[150px] w-full overflow-hidden rounded-lg shadow-md">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
        />
        {discount > 0 && (
          <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary px-[6px] py-[2px] text-white">
            <ArrowDownIcon size={12} className="" />
            <span className="text-xs font-semibold">{discount}%</span>
          </div>
        )}
      </div>

      <div>
        <h2 className="mt-2 truncate text-sm font-semibold">{product.name}</h2>
        <div className="flex items-center gap-2">
          <h3 className="font-extrabold ">{formatPrice(finalPrice)}</h3>
          {discount > 0 && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(price)}
            </span>
          )}
        </div>

        <span className="block text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>
    </div>
  );
}
