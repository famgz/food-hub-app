import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import ProductsList from "./_components/products-list";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";
import Search from "./_components/search";
import { plainify } from "./_helpers/utils";
import { db } from "./_lib/prisma";

async function fetch() {
  const getProducts = db.product.findMany({
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

  const getBurgerCategory = db.category.findFirst({
    where: {
      name: "Hambúrgueres",
    },
  });

  const getPizzaCategory = db.category.findFirst({
    where: {
      name: "Pizzas",
    },
  });

  const [products, burgerCategory, pizzaCategory] = await Promise.all([
    getProducts,
    getBurgerCategory,
    getPizzaCategory,
  ]);

  return plainify({ products, burgerCategory, pizzaCategory });
}

export default async function Home() {
  const { products, burgerCategory, pizzaCategory } = await fetch();

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
          imageUrl="/promo-banner-01.png"
          imageAlt="Até 30% de descontos em pizzas"
          url={`/categories/${pizzaCategory!.id}/products`}
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
          imageUrl="/promo-banner-02.png"
          imageAlt="A partir de R$17,90 em lanches"
          url={`/categories/${burgerCategory!.id}/products`}
        />
      </div>

      <div className="section !pr-0">
        <RestaurantList />
      </div>
    </div>
  );
}
