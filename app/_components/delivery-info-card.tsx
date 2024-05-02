import { TimerIcon } from "lucide-react";
import { formatPrice } from "../_helpers/price";
import DeliveryIcon from "./icons/delivery-icon";
import { Card } from "./ui/card";

interface DeliveryInfoCardProps {
  deliveryFee: number;
  deliveryTimeMinutes: number;
}

export default function DeliveryInfoCard({
  deliveryFee,
  deliveryTimeMinutes,
}: DeliveryInfoCardProps) {
  return (
    <Card className="flex justify-around py-4">
      {/* Delivery fee */}
      <div className="text-center">
        <div className="mb-1 flex items-center gap-2 text-muted-foreground">
          <span className="text-sm">Entrega</span>
          <DeliveryIcon className="size-4" color="#777" />
        </div>
        <div>
          <span className="font-bold">
            {deliveryFee > 0 ? formatPrice(deliveryFee) : "Grátis"}
          </span>
        </div>
      </div>
      {/* Delivery time */}
      <div className="text-center">
        <div className="mb-1 flex items-center gap-2 text-muted-foreground">
          <span className="text-sm">Entrega</span>
          <TimerIcon size={16} />
        </div>
        <div>
          <span className="font-bold">{deliveryTimeMinutes} min</span>
        </div>
      </div>
    </Card>
  );
}
