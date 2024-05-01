import { Prisma } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";
import ProductItem from "./product-item";
import { Button } from "./ui/button";

interface ProductsListProps {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>[];
}

export default async function ProductsList({ products }: ProductsListProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Pedidos Recomendados</h2>
        <Button
          variant="ghost"
          className="p-0 pr-5 text-primary hover:bg-transparent"
        >
          Ver todos
          <ChevronRightIcon size={16} />
        </Button>
      </div>
      <div className="section-scroll mt-1">
        {products.map((p) => (
          <ProductItem product={p} key={p.id} />
        ))}
      </div>
    </>
  );
}