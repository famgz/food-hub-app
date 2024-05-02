import { Prisma } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";
import ProductItem from "./product-item";
import { Button } from "./ui/button";
import Link from "next/link";

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
  goTo?: string;
}

export default function ProductsList({
  title,
  products,
  showRestaurantName = true,
  showMore = true,
  goTo = "/",
}: ProductsListProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">{title}</h2>
        {showMore && (
          <Button
            variant="ghost"
            className="p-0 pr-5 font-semibold text-primary hover:bg-transparent"
            asChild
          >
            <Link href={goTo}>
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
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
