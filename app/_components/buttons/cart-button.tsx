"use client";

import { ShoppingCartIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Cart from "../cart";
import { useContext } from "react";
import { CartContext } from "@/app/_context/cart";

export default function CartButton() {
  const { totals } = useContext(CartContext);

  return (
    <Sheet>
      <Button
        size="icon"
        variant="outline"
        className="relative border-none bg-transparent"
        asChild
      >
        <SheetTrigger>
          <ShoppingCartIcon />
          {totals.quantity > 0 && (
            <div className="absolute right-0 top-1 flex size-4 items-center justify-center rounded-full bg-primary text-xs text-white">
              {totals.quantity}
            </div>
          )}
        </SheetTrigger>
      </Button>
      <SheetContent className="cart-sheet-content">
        <SheetHeader>
          <SheetTitle>Sacola</SheetTitle>
        </SheetHeader>
        <Cart />
      </SheetContent>
    </Sheet>
  );
}
