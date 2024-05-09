import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import Header from "../_components/header";
import RestaurantItem from "../_components/restaurant-item";
import { plainify } from "../_helpers/utils";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";

export default async function MyFavoriteRestaurantsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }

  let userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
    },
  });

  userFavoriteRestaurants = plainify(userFavoriteRestaurants);

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes Favoritos</h2>
        <div className="flex w-full flex-col gap-6 ">
          {userFavoriteRestaurants.length > 0 ? (
            userFavoriteRestaurants.map(({ restaurant }) => (
              <RestaurantItem
                key={restaurant.id}
                restaurant={restaurant}
                userFavoriteRestaurants={userFavoriteRestaurants}
                className="min-w-full max-w-full"
              />
            ))
          ) : (
            <h3 className="font-medium">
              Você ainda não marcou nenhum restaurante como favorito.
            </h3>
          )}
        </div>
      </div>
    </>
  );
}
