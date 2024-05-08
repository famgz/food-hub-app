"use client";

import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { CartContext } from "@/app/_context/cart";
import { getProduct } from "@/app/_actions/product";
import { formatPrice } from "@/app/_helpers/price";
import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      products: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

export default function OrderItem({ order }: OrderItemProps) {
  const router = useRouter();

  const statusMap = {
    [OrderStatus.CONFIRMED]: {
      text: "Confirmado",
      className: "text-white bg-gray-300",
    },
    [OrderStatus.PREPARING]: {
      text: "Em preparo",
      className: "text-white bg-gray-400",
    },
    [OrderStatus.DELIVERING]: {
      text: "Em rota de entrega",
      className: "text-white bg-green-300",
    },
    [OrderStatus.DELIVERED]: {
      text: "Entregue",
      className: "text-white bg-green-400",
    },
    [OrderStatus.COMPLETED]: {
      text: "Finalizado",
      className: "text-white bg-green-500",
    },
    [OrderStatus.CANCELLED]: {
      text: "Cancelado",
      className: "text-white bg-red-400",
    },
  };

  function isOrderReadyToReorder(status: OrderStatus) {
    return status === OrderStatus.COMPLETED || status === OrderStatus.CANCELLED;
  }

  const { addProductToCart } = useContext(CartContext);

  async function handleRedoOrderClick() {
    for (const orderProduct of order.products) {
      const product = await getProduct(orderProduct.productId);
      if (product) addProductToCart(product!, orderProduct.quantity);
    }
    router.push(`/restaurants/${order.restaurantId}`);
  }

  return (
    <Card>
      <CardContent className="space-y-4 p-5">
        <div>
          <span
            className={
              "w-fit rounded-full px-2 py-1 text-xs font-semibold " +
              statusMap[order.status].className
            }
          >
            {statusMap[order.status].text}
          </span>
        </div>

        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-2 ">
            <Avatar className="size-6">
              <AvatarImage src={order.restaurant.imageUrl} />
            </Avatar>

            <span className=" text-sm font-semibold">
              {order.restaurant.name}
            </span>
          </div>

          <Button variant="ghost" size="icon" className="size-7" asChild>
            <Link href={`/restaurants/${order.restaurantId}`}>
              <ChevronRightIcon />
            </Link>
          </Button>
        </div>

        <div className="space-y-2 border-b pb-4">
          {order.products.map((p) => (
            <div key={p.id} className="flex items-center gap-2">
              <div className="flex size-5 items-center justify-center rounded-full bg-muted-foreground ">
                <span className="text-xs text-muted">{p.quantity}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {p.product.name}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm">{formatPrice(order.totalPrice)}</p>
          <Button
            variant="link"
            className="text-sm"
            size="sm"
            disabled={!isOrderReadyToReorder(order.status)}
            onClick={handleRedoOrderClick}
          >
            Refazer Pedido
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
