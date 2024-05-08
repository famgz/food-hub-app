import { ChevronRightIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { convertToPlainObject } from "../_helpers/utils";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import RestaurantItem from "./restaurant-item";
import { Button } from "./ui/button";

export default async function RestaurantList() {
  const session = await getServerSession(authOptions);

  let restaurants = await db.restaurant.findMany({
    take: 10,
  });

  let userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: { userId: session?.user?.id },
  });

  restaurants = convertToPlainObject(restaurants);
  userFavoriteRestaurants = convertToPlainObject(userFavoriteRestaurants);

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Restaurantes Recomendados</h2>
        <Link href="/restaurants/recommended">
          <Button
            variant="ghost"
            className="p-0 pr-5 font-semibold text-primary hover:bg-transparent"
          >
            Ver todos
            <ChevronRightIcon size={16} />
          </Button>
        </Link>
      </div>
      <div className="section-scroll mt-1">
        {restaurants.map((r) => (
          <RestaurantItem
            restaurant={r}
            key={r.id}
            userFavoriteRestaurants={userFavoriteRestaurants}
          />
        ))}
      </div>
    </>
  );
}
