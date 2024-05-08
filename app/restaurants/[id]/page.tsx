import { isRestaurantFavorite } from "@/app/_helpers/restaurant";
import { convertToPlainObject } from "@/app/_helpers/utils";
import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import RestaurantDetails from "./_components/restaurant-details";
import RestaurantImage from "./_components/restaurant-image";

interface RestaurantPage {
  params: {
    id: string;
  };
}

export default async function RestaurantPage({
  params: { id },
}: RestaurantPage) {
  let restaurant = await db.restaurant.findUnique({
    where: { id },
    include: {
      categories: true,
      products: {
        include: {
          restaurant: true,
          category: true,
        },
      },
    },
  });

  restaurant = convertToPlainObject(restaurant);

  if (!restaurant) {
    return notFound();
  }

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  let userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: { userId },
  });
  userFavoriteRestaurants = convertToPlainObject(userFavoriteRestaurants);

  const isFavorite = isRestaurantFavorite(userFavoriteRestaurants, id);

  return (
    <div>
      {/* Product image */}
      <RestaurantImage
        userId={userId}
        restaurant={restaurant}
        isFavorite={isFavorite}
      />

      <div className="relative z-50 -mt-5 overflow-hidden rounded-tl-3xl rounded-tr-3xl bg-background pb-20">
        <RestaurantDetails restaurant={restaurant} />
      </div>
    </div>
  );
}
