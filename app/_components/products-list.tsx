import { ChevronRightIcon } from "lucide-react";
import { db } from "../_lib/prisma";
import ProductItem from "./product-item";
import { Button } from "./ui/button";

export default async function ProductsList() {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

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
