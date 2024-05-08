import { toggleFavoriteRestaurant } from "@/app/_actions/restaurant";
import { Button } from "@/app/_components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UseToggleFavoriteRestaurantProps {
  userId?: string;
  restaurantId: string;
  isFavorite: boolean;
}

export default function UseToggleFavoriteRestaurant({
  userId,
  restaurantId,
  isFavorite,
}: UseToggleFavoriteRestaurantProps) {
  const router = useRouter();

  async function handleFavoriteClick() {
    if (!userId) {
      toast.error("Faça login para favoritar este restaurante");
      return;
    }
    try {
      await toggleFavoriteRestaurant(userId, restaurantId);
      if (isFavorite) {
        toast("Restaurante removido dos favoritos");
      } else {
        toast("Restaurante adicionado aos favoritos", {
          action: (
            <Button
              size="sm"
              className="px-2 py-2"
              onClick={() => router.push("/my-favorite-restaurants")}
            >
              <span className="text-xs">Ver favoritos</span>
            </Button>
          ),
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro ao favoritar restaurante");
    }
  }

  return { handleFavoriteClick };
}
