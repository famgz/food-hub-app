import { useContext } from "react";
import { CartContext } from "../_context/cart";
import { formatPrice } from "../_helpers/price";
import CartItem from "./cart-item";
import { Button } from "./ui/button";
import Image from "next/image";
import { ScrollArea } from "./ui/scroll-area";

export default function Cart() {
  const { cartProducts, totals } = useContext(CartContext);
  const restaurant = cartProducts[0]?.restaurant;
  const deliveryFee = Number(restaurant?.deliveryFee || 0);

  if (cartProducts.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>A sacola está vazia</p>
      </div>
    );
  }
  return (
    <div
      className="flex max-h-[95%] flex-1 flex-col
    gap-3"
    >
      {/* Restaurant */}
      <div className="flex items-center gap-[0.375rem]">
        <div className="relative size-5 overflow-hidden rounded-full">
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            className="object-cover"
          />
        </div>
        <p className="text-sm font-semibold">{restaurant.name}</p>
      </div>

      {/* Cart items */}
      {/* <div className="mt-5  flex-auto"> */}
      <ScrollArea className="min-h-[200px] flex-auto">
        <div className="space-y-4">
          {cartProducts.map((p) => (
            <CartItem key={p.id} cartProduct={p} />
          ))}
        </div>
      </ScrollArea>
      {/* </div> */}

      {/* Checkout details */}
      <div className="space-y-4">
        {/* Totals */}
        <div className="flex flex-col gap-2 rounded-2xl border bg-white p-5">
          {/* Subtotal */}
          <div className="flex justify-between border-b pb-2 text-xs">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="">{formatPrice(totals.gross)}</span>
          </div>
          {/* Delivery fee */}
          <div className="flex justify-between border-b  pb-2 text-xs">
            <span className="text-muted-foreground">Entrega</span>
            {deliveryFee > 0 ? (
              <span className="">{formatPrice(Number(deliveryFee))}</span>
            ) : (
              <span className=" uppercase text-primary">Grátis</span>
            )}
          </div>
          {/* Discounts */}
          <div className="flex justify-between border-b  pb-2 text-xs">
            <span className="text-muted-foreground">Descontos</span>
            <span className="">{formatPrice(totals.discount)}</span>
          </div>
          {/* Total */}
          <div className="flex justify-between text-sm font-semibold">
            <span className="">Total</span>
            <span className="font-semibold">
              {formatPrice(totals.net + deliveryFee)}
            </span>
          </div>
        </div>

        <Button variant={"default"} className="w-full">
          Finalizar Pedido
        </Button>
      </div>
    </div>
  );
}
