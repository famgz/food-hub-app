import { OrderStatus } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { CartContext } from "../_context/cart";
import { createOrder } from "../_helpers/_actions/order";
import { formatPrice } from "../_helpers/price";
import CartItem from "./cart-item";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

export default function Cart() {
  const router = useRouter();
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);
  const { data } = useSession();
  const { cartProducts, totals, clearCart } = useContext(CartContext);
  const restaurant = cartProducts[0]?.restaurant;
  const deliveryFee = Number(restaurant?.deliveryFee || 0);

  async function handleCheckoutClick() {
    if (!data?.user) {
      console.log("Cannot proceed with order. Not logged in");
      return;
    }

    try {
      setIsSubmitLoading(true);

      await createOrder({
        restaurant: { connect: { id: restaurant.id } },
        status: OrderStatus.CONFIRMED,
        subTotalPrice: totals.gross,
        totalDiscounts: totals.discount,
        totalPrice: totals.net,
        deliveryFee: deliveryFee,
        deliveryTimeMinutes: restaurant.deliveryTimeMinutes,
        user: { connect: { id: data?.user.id } },
      });

      clearCart();

      // router.push("/");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitLoading(false);
    }
  }

  if (cartProducts.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>A sacola está vazia</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex max-h-[95%] flex-1 flex-col gap-3">
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

          <Button
            variant={"default"}
            className="w-full"
            onClick={() => setIsConfirmationDialogOpen(true)}
          >
            Finalizar Pedido
          </Button>
        </div>
      </div>

      {/* Checkout confirmation modal */}
      <AlertDialog
        open={isConfirmationDialogOpen}
        onOpenChange={setIsConfirmationDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja finalizar o pedido?</AlertDialogTitle>
            <AlertDialogDescription>
              Você será redirecionado para a página de pagamento.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <Button
              disabled={isSubmitLoading}
              onClick={handleCheckoutClick}
              className="flex gap-3"
            >
              <span>Finalizar</span>
              {isSubmitLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
