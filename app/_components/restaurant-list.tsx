import { Restaurant } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import RestaurantItem from "./restaurant-item";
import { Button } from "./ui/button";

interface RestaurantsListProps {
  restaurants: Restaurant[];
}

export default async function RestaurantList({
  restaurants,
}: RestaurantsListProps) {
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
          <RestaurantItem restaurant={r} key={r.id} />
        ))}
      </div>
    </>
  );
}
