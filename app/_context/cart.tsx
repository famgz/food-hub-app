"use client";

import { Prisma, Product } from "@prisma/client";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import { calculateProductTotalPrice } from "../_helpers/price";

export interface CartProduct
  extends Prisma.ProductGetPayload<{ include: { restaurant: true } }> {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  maxProductQuantity: number;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  totals: {
    gross: number;
    net: number;
    discount: number;
  };
}

export const CartContext = createContext<ICartContext>({
  products: [],
  maxProductQuantity: 50,
  addToCart: () => {},
  removeFromCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  totals: {
    gross: 0,
    net: 0,
    discount: 0,
  },
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [totals, setTotals] = useState({
    gross: 0,
    net: 0,
    discount: 0,
  });
  const maxProductQuantity = 50;

  useMemo(() => {
    function calculateTotals() {
      let gross = 0;
      let net = 0;

      products.forEach((p) => {
        gross += Number(p.price) * p.quantity;
        net += calculateProductTotalPrice(p) * p.quantity;
      });

      let discount = net - gross;

      setTotals({
        gross,
        net,
        discount,
      });
      console.log({ products, totals });
    }

    calculateTotals();
  }, [products]);

  function addToCart(product: Product, quantity: number) {
    const isOnCart = products.some((p) => p.id === product.id);
    if (isOnCart) {
      return setProducts((prev) =>
        prev.map((p) => {
          if (p.id === product.id) {
            return {
              ...p,
              quantity: p.quantity + quantity,
            };
          }
          return p;
        }),
      );
    }
    setProducts((prev) => [...prev, { ...product, quantity }]);
  }

  function removeFromCart(productId: string) {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  }

  function decreaseProductQuantity(productId: string) {
    const product = products.find((p) => p.id === productId);
    if (!product || product.quantity <= 1) return;
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          return {
            ...p,
            quantity: p.quantity > 1 ? p.quantity - 1 : p.quantity,
          };
        }
        return p;
      }),
    );
  }

  function increaseProductQuantity(productId: string) {
    const product = products.find((p) => p.id === productId);
    if (product && product.quantity > maxProductQuantity) return;

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          return {
            ...p,
            quantity: p.quantity + 1,
          };
        }
        return p;
      }),
    );
  }

  return (
    <CartContext.Provider
      value={{
        products,
        addToCart,
        removeFromCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        maxProductQuantity,
        totals,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
