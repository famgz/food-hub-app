import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
import { db } from "@/app/_lib/prisma";

export default async function RecomendedRestaurants() {
  const restaurants = await db.restaurant.findMany({});

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">
          Restaurantes Recomendados
        </h2>
        <div className="flex w-full flex-col gap-6 ">
          {restaurants.map((r) => (
            <RestaurantItem
              key={r.id}
              restaurant={r}
              className="min-w-full max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
}
