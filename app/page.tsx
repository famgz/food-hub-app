import Image from "next/image";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import ProductsList from "./_components/products-list";
import Search from "./_components/search";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";

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
        <PromoBanner
          src="/promo-banner-01.png"
          alt="Até 30% de descontos em pizzas"
        />
      </div>

      <div className="section !pr-0">
        <ProductsList products={products} />
      </div>

      <div className="section">
        <PromoBanner
          src="/promo-banner-02.png"
          alt="A partir de R$17,90 em lanches"
        />
      </div>

      <div className="section !pr-0">
        <RestaurantList />
      </div>
    </>
  );
}
