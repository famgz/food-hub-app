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
import { useContext, useState } from "react";

interface CartBannerProps {
  restaurantId: string;
}

export default function CartBanner({ restaurantId }: CartBannerProps) {
  const { cartProducts, totals } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const restaurantHasProductsOnCart = cartProducts.some(
    (p) => p.restaurantId === restaurantId,
  );

  if (!restaurantHasProductsOnCart) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full border-t bg-white p-5 pt-3 shadow-md">
      <div className="mx-auto flex max-w-[678px] items-center justify-between">
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
              {totals.quantity > 1 ? " itens" : " item"}
            </span>
          </h3>
        </div>
        {/* Button */}
        <Sheet>
          <Button size="lg" asChild>
            <SheetTrigger>Ver Carrinho</SheetTrigger>
          </Button>
          <SheetContent className="cart-sheet-content">
            <SheetHeader>
              <SheetTitle>Carrinho</SheetTitle>
            </SheetHeader>
            <Cart setIsOpen={setIsCartOpen} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
