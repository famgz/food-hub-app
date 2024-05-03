import { useContext } from "react";
import { CartContext } from "../_context/cart";
import { formatPrice } from "../_helpers/price";
import CartItem from "./cart-item";
import { Button } from "./ui/button";

export default function Cart() {
  const { products, totals } = useContext(CartContext);
  const deliveryFee = Number(products[0]?.restaurant?.deliveryFee) || 0;

  return (
    <>
      {products.length > 0 ? (
        <div className="flex h-full flex-col justify-between pb-8 pt-5">
          {/* Cart items */}
          <div className="space-y-4">
            {products.map((p) => (
              <CartItem key={p.id} cartProduct={p} />
            ))}
          </div>

          {/* Checkout details */}
          <div className="space-y-4">
            {/* Totals */}
            <div className="flex flex-col gap-2 rounded-2xl border bg-white p-5">
              {/* Subtotal */}
              <div className="flex justify-between border-b pb-2 text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="">{formatPrice(totals.gross)}</span>
              </div>
              {/* Delivery fee */}
              <div className="flex justify-between border-b  pb-2 text-sm">
                <span className="text-muted-foreground">Entrega</span>
                {deliveryFee > 0 ? (
                  <span className="">{formatPrice(Number(deliveryFee))}</span>
                ) : (
                  <span className=" uppercase text-primary">Grátis</span>
                )}
              </div>
              {/* Discounts */}
              <div className="flex justify-between border-b  pb-2 text-sm">
                <span className="text-muted-foreground">Descontos</span>
                <span className="">{formatPrice(totals.discount)}</span>
              </div>
              {/* Total */}
              <div className="flex justify-between font-semibold ">
                <span className="">Total</span>
                <span className="font-semibold">{formatPrice(totals.net)}</span>
              </div>
            </div>

            <Button variant={"default"} className="w-full">
              Finalizar Pedido
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <p>A sacola está vazia</p>
        </div>
      )}
    </>
  );
}
