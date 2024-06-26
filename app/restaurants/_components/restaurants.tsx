"use client";

import RestaurantItem from "@/app/_components/restaurant-item";
import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurant } from "../_actions/search";

interface RestaurantProps {
  userFavoriteRestaurants: UserFavoriteRestaurant[];
}

export default function Restaurants({
  userFavoriteRestaurants,
}: RestaurantProps) {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const searchFor = searchParams.get("search");

  useEffect(() => {
    async function fetchRestaurants() {
      if (!searchFor) return;
      const foundRestaurants = await searchForRestaurant(searchFor);
      setRestaurants(foundRestaurants);
    }

    fetchRestaurants();
  }, [searchFor]);

  if (!searchFor) {
    return notFound();
  }

  return (
    <>
      <div className="px-5 py-6">
        {restaurants.length > 0 ? (
          <>
            <h2 className="mb-6 text-lg font-semibold">
              Restaurantes Encontrados
            </h2>
            <div className="flex w-full flex-col gap-6 ">
              {restaurants.map((r) => (
                <RestaurantItem
                  key={r.id}
                  restaurant={r}
                  userFavoriteRestaurants={userFavoriteRestaurants}
                  className="min-w-full max-w-full"
                />
              ))}
            </div>
          </>
        ) : (
          <p>{`Nenhum restaurante foi encontrado com o termo "${searchFor}"`}</p>
        )}
      </div>
    </>
  );
}
