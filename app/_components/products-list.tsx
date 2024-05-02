import { Prisma } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";
import ProductItem from "./product-item";
import { Button } from "./ui/button";

interface ProductsListProps {
  title: string;
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
      category: true;
    };
  }>[];
  showRestaurantName?: boolean;
  showMore?: boolean;
}

export default function ProductsList({
  title,
  products,
  showRestaurantName = true,
  showMore = true,
}: ProductsListProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">{title}</h2>
        {showMore && (
          <Button
            variant="ghost"
            className="p-0 pr-5 font-semibold text-primary hover:bg-transparent"
          >
            Ver todos
            <ChevronRightIcon size={16} />
          </Button>
        )}
      </div>
      <div className="section-scroll mt-1">
        {products.map((p) => (
          <ProductItem
            product={p}
            key={p.id}
            showRestaurantName={showRestaurantName}
          />
        ))}
      </div>
    </>
  );
}
