import { ChevronRightIcon } from "lucide-react";
import { db } from "../_lib/prisma";
import RestaurantItem from "./restaurant-item";
import { Button } from "./ui/button";

export default async function RestaurantList() {
  const restaurants = await db.restaurant.findMany({
    take: 10,
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Restaurantes Recomendados</h2>
        <Button
          variant="ghost"
          className="p-0 pr-5 text-primary hover:bg-transparent"
        >
          Ver todos
          <ChevronRightIcon size={16} />
        </Button>
      </div>
      <div className="section-scroll mt-1">
        {restaurants.map((r) => (
          <RestaurantItem restaurant={r} key={r.id} />
        ))}
      </div>
    </>
  );
}
