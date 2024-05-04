"use client";

import Cart from "@/app/_components/cart";
import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { CartContext } from "@/app/_context/cart";
import { formatPrice } from "@/app/_helpers/price";
import { useContext } from "react";

interface CartBannerProps {
  restaurantId: string;
}

export default function CartBanner({ restaurantId }: CartBannerProps) {
  const { cartProducts, totals } = useContext(CartContext);

  const restaurantHasProductsOnCart = cartProducts.some(
    (p) => p.restaurantId === restaurantId,
  );

  if (!restaurantHasProductsOnCart) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full border-t bg-white p-5 pt-3 shadow-md">
      <div className="flex items-center justify-between">
        {/* Price */}
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground">
            Total sem entrega
          </span>
          <h3>
            <span className="font-semibold">{formatPrice(totals.gross)}</span>
            <span className="text-xs text-muted-foreground">
              {" "}
              / {totals.quantity}
              {totals.quantity > 1 ? "itens" : "item"}
            </span>
          </h3>
        </div>
        {/* Button */}
        <Sheet>
          <SheetTrigger>
            <Button size="lg">Ver Sacola</Button>
          </SheetTrigger>
          <SheetContent className="flex w-[85%] max-w-[400px] flex-col">
            <SheetHeader>
              <SheetTitle>Sacola</SheetTitle>
            </SheetHeader>
            <Cart />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
