import Image from "next/image";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import ProductsList from "./_components/products-list";
import Search from "./_components/search";
import { db } from "./_lib/prisma";

export default async function Home() {
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
      <Header />

      <div className="section">
        <Search />
      </div>

      <div className="section !pr-0">
        <CategoryList />
      </div>

      <div className="section">
        <Image
          src="/promo-banner-01.png"
          alt="Até 30% de descontos em pizzas"
          height={0}
          width={0}
          className="h-auto w-full object-contain"
          sizes="100vw"
          quality={100}
        />
      </div>

      <div className="section !pr-0">
        <ProductsList products={products} />
      </div>
    </>
  );
}
