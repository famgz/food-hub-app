import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
import { convertToPlainObject } from "@/app/_helpers/utils";
import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { getServerSession } from "next-auth";

export default async function RecomendedRestaurants() {
  const session = await getServerSession(authOptions);
  const restaurants = await db.restaurant.findMany({});

  let userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: { userId: session?.user?.id },
  });

  userFavoriteRestaurants = convertToPlainObject(userFavoriteRestaurants);

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
              userFavoriteRestaurants={userFavoriteRestaurants}
            />
          ))}
        </div>
      </div>
    </>
  );
}
