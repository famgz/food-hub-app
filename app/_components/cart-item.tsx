import { ChevronLeftIcon, ChevronRightIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";
import { CartContext, CartProduct } from "../_context/cart";
import { calculateProductTotalPrice, formatPrice } from "../_helpers/price";
import { Button } from "./ui/button";

interface CartItemProps {
  cartProduct: CartProduct;
}

export default function CartItem({ cartProduct }: CartItemProps) {
  const price = Number(cartProduct.price);
  const discountPercentage = Number(cartProduct.discountPercentage);
  const finalPrice = calculateProductTotalPrice(
    cartProduct.price,
    cartProduct.discountPercentage,
  );

  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeFromCart,
    maxProductQuantity,
  } = useContext(CartContext);

  function handleDecreaseQuantityClick() {
    if (cartProduct.quantity <= 1) return;
    decreaseProductQuantity(cartProduct.id);
  }

  function handleIncreaseQuantityClick() {
    if (cartProduct.quantity > maxProductQuantity) return;
    increaseProductQuantity(cartProduct.id);
  }

  function handleRemoveProductClick() {
    removeFromCart(cartProduct.id);
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Image */}
        <div className="relative aspect-square size-20 overflow-hidden rounded-lg">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            fill
            className="object-cover"
          />
        </div>
        {/* Info */}
        <div className="space-y-1">
          <h3 className="text-xs">{cartProduct.name}</h3>
          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">{formatPrice(finalPrice)}</h4>
            {discountPercentage > 0 && (
              <span className="ml-1 text-xs text-muted-foreground line-through">
                {formatPrice(price)}
              </span>
            )}
          </div>
          {/* Quantity buttons */}
          <div className="flex items-center">
            <div className="flex items-center gap-3 text-center">
              <Button
                size="icon"
                variant="ghost"
                className="size-7 border border-solid"
                onClick={handleDecreaseQuantityClick}
              >
                <ChevronLeftIcon size={18} />
              </Button>
              <span className="w-4 text-sm">{cartProduct.quantity}</span>
              <Button
                size="icon"
                className="size-7"
                onClick={handleIncreaseQuantityClick}
              >
                <ChevronRightIcon size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Delete button */}
      <div>
        <Button
          size="icon"
          variant="ghost"
          className="border text-muted-foreground"
          onClick={handleRemoveProductClick}
        >
          <Trash2Icon />
        </Button>
      </div>
    </div>
  );
}
