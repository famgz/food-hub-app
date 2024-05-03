"use client";

import Cart from "@/app/_components/cart";
import DeliveryInfoCard from "@/app/_components/delivery-info-card";
import DiscountBadge from "@/app/_components/discount-badge";
import ProductsList from "@/app/_components/products-list";
import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { CartContext } from "@/app/_context/cart";
import { calculateProductTotalPrice, formatPrice } from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
      category: true;
    };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
      category: true;
    };
  }>[];
}

export default function ProductDetails({
  product,
  complementaryProducts,
}: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const { products, addToCart } = useContext(CartContext);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const price = Number(product.price);
  const discountPercentage = Number(product.discountPercentage);
  const finalPrice = calculateProductTotalPrice(
    product.price,
    product.discountPercentage,
  );

  const restaurant = product.restaurant;
  const deliveryFee = Number(restaurant.deliveryFee);

  function handleAddToCartClick() {
    addToCart(product, quantity);
    setIsCartOpen(true);
  }

  function increaseQuantity() {
    setQuantity((prev) => prev + 1);
  }

  function decreaseQuantity() {
    if (quantity <= 1) {
      return;
    }
    setQuantity((prev) => prev - 1);
  }

  return (
    <>
      <div className="p-5">
        {/* Title and price */}
        <div className="flex items-center gap-[0.375rem]">
          <div className="relative size-6 overflow-hidden rounded-full">
            <Image
              src={product.restaurant.imageUrl}
              alt={product.restaurant.name}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-xs text-muted-foreground">
            {product.restaurant.name}
          </span>
        </div>

        {/* Product name */}
        <h1 className="mb-2 mt-1 text-xl font-semibold">{product.name}</h1>

        <div className="flex justify-between">
          <div>
            {/* Final price */}
            <div className="flex gap-2">
              <h2 className="text-xl font-semibold">
                {formatPrice(Number(finalPrice))}
              </h2>
              {discountPercentage > 0 && (
                <DiscountBadge
                  discountPercentage={discountPercentage}
                  iconSize={16}
                />
              )}
            </div>

            {/* Original price */}
            {discountPercentage > 0 && (
              <span className="text-sm text-muted-foreground ">
                De: {formatPrice(price)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-center">
            <Button
              size="icon"
              variant="ghost"
              className="border border-solid border-muted-foreground"
              onClick={decreaseQuantity}
            >
              <ChevronLeftIcon />
            </Button>
            <span className="w-6">{quantity}</span>
            <Button size="icon" className="" onClick={increaseQuantity}>
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        <div className="mt-5">
          <DeliveryInfoCard
            deliveryFee={deliveryFee}
            deliveryTimeMinutes={restaurant.deliveryTimeMinutes}
          />
        </div>

        {/* Product description */}
        <div className="mt-6 space-y-3">
          <h3 className="font-semibold">Sobre</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>

        {/* Extra products / recomendations */}
        {complementaryProducts.length > 0 && (
          <div className="-mx-5 mt-6 space-y-3 pl-5 ">
            <ProductsList
              title="Mais desta categoria"
              products={complementaryProducts}
            />
          </div>
        )}

        <Button className="mt-3 w-full" onClick={handleAddToCartClick}>
          Adicionar à Sacola
        </Button>
      </div>

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-[85%] max-w-[400px]">
          <SheetHeader>
            <SheetTitle className="text-left">Sacola</SheetTitle>
          </SheetHeader>
          <Cart />
        </SheetContent>
      </Sheet>
    </>
  );
}
