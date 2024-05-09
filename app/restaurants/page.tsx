import { Suspense } from "react";
import Restaurants from "./_components/restaurants";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import Header from "../_components/header";
import { convertToPlainObject } from "../_helpers/utils";

export default async function RestaurantsPage() {
  const session = await getServerSession(authOptions);
  let userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      restaurant: true,
    },
  });

  userFavoriteRestaurants = convertToPlainObject(userFavoriteRestaurants);

  return (
    <Suspense>
      <Header />
      <Restaurants userFavoriteRestaurants={userFavoriteRestaurants} />
    </Suspense>
  );
}
