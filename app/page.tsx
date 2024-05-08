import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import ProductsList from "./_components/products-list";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";
import Search from "./_components/search";
import { convertToPlainObject } from "./_helpers/utils";
import { db } from "./_lib/prisma";

export default async function Home() {
  let products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: true,
      category: true,
    },
    distinct: "name",
  });

  products = convertToPlainObject(products);

  return (
    <div className="pb-4">
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
        <ProductsList
          title="Pedidos Recomendados"
          products={products}
          goTo="/products/recommended"
        />
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
    </div>
  );
}
