import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { convertToPlainObject } from "@/app/_helpers/utils";
import { db } from "@/app/_lib/prisma";

export default async function RecommendedProductsPage() {
  // TODO: get most requested products

  let products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 20,
    include: {
      restaurant: true,
      category: true,
    },
    distinct: "name",
  });

  products = convertToPlainObject(products);

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Pedidos Recomendados</h2>
        <div className="grid w-full grid-cols-2  gap-6 ">
          {products.map((p) => (
            <ProductItem key={p.id} product={p} className="min-w-full" />
          ))}
        </div>
      </div>
    </>
  );
}
