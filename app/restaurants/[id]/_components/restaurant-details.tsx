import DeliveryInfoCard from "@/app/_components/delivery-info-card";
import ProductsList from "@/app/_components/products-list";
import RatingBadge from "@/app/_components/rating-badge";
import { convertToPlainObject } from "@/app/_helpers/utils";
import { db } from "@/app/_lib/prisma";
import { Prisma, Product, Restaurant } from "@prisma/client";
import Image from "next/image";

type ProductsByCategory = {
  [category: string]: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
      category: true;
    };
  }>[];
};

interface RestaurantDetailsProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      categories: true;
      products: {
        include: {
          restaurant: true;
          category: true;
        };
      };
    };
  }>;
}

export default async function RestaurantDetails({
  restaurant,
}: RestaurantDetailsProps) {
  const products = restaurant.products;

  const featuredProducts = products.slice(0, 10);

  const productsByCategory: ProductsByCategory = {};
  products.forEach((p) => {
    const category = p.category.name;
    if (!productsByCategory[category]) {
      productsByCategory[category] = [];
    }
    productsByCategory[category].push(p);
  });

  const deliveryFee = Number(restaurant.deliveryFee);

  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[0.375rem]">
          <div className="relative size-8 overflow-hidden rounded-full">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="object-cover"
            />
          </div>
          <h1 className="mb-2 mt-1 text-xl font-semibold">{restaurant.name}</h1>
        </div>
        <RatingBadge theme="dark" className="px-2 pb-1 pt-1" />
      </div>

      {/* Delivery info */}
      <div className="mt-5">
        <DeliveryInfoCard
          deliveryFee={deliveryFee}
          deliveryTimeMinutes={restaurant.deliveryTimeMinutes}
        />
      </div>

      {/* Categories list */}
      <div className="hide-scrollbar -mx-5 mt-5 flex gap-4 overflow-x-scroll pl-5">
        {restaurant.categories.map((c) => (
          <div
            key={c.id}
            className="min-w-[170px] bg-[#e1e1e1] px-3 py-1 text-center"
          >
            <span className="text-xs text-muted-foreground">{c.name}</span>
          </div>
        ))}
      </div>

      {/* Featured products */}
      {featuredProducts.length > 0 && (
        <div className="-mx-5 mt-6 space-y-3 pl-5">
          <ProductsList
            title="Mais Pedidos"
            products={featuredProducts}
            showRestaurantName={false}
            showMore={false}
          />
        </div>
      )}

      {/* Products by categories */}
      {Object.entries(productsByCategory)
        .reverse()
        .map(([category, products]) => (
          <div key={category} className="-mx-5 mt-6 space-y-3 pl-5 ">
            <ProductsList
              title={category}
              products={products}
              showRestaurantName={false}
              showMore={false}
            />
          </div>
        ))}
    </div>
  );
}
