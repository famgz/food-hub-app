import { UserFavoriteRestaurant } from "@prisma/client";

export function isRestaurantFavorite(
  userFavoriteRestaurants: UserFavoriteRestaurant[],
  restaurantId: string,
) {
  return userFavoriteRestaurants?.some(
    (ufr) => ufr.restaurantId === restaurantId,
  );
}
