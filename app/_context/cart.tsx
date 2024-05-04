"use client";

import { Prisma } from "@prisma/client";
import { ReactNode, createContext, useMemo, useState } from "react";
import { calculateProductTotalPrice } from "../_helpers/price";

type Product = Prisma.ProductGetPayload<{
  include: { restaurant: true; category: true };
}>;

export interface CartProduct extends Product {
  quantity: number;
}

interface ICartContext {
  cartProducts: CartProduct[];
  maxProductQuantity: number;
  addProductToCart: (product: Product, quantity: number) => void;
  removeProductFromCart: (productId: string) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  clearCart: () => void;
  totals: {
    gross: number;
    net: number;
    discount: number;
    quantity: number;
  };
}

export const CartContext = createContext<ICartContext>({
  cartProducts: [],
  maxProductQuantity: 50,
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  clearCart: () => {},
  totals: {
    gross: 0,
    net: 0,
    discount: 0,
    quantity: 0,
  },
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartProducts, setProducts] = useState<CartProduct[]>([]);
  const [totals, setTotals] = useState({
    gross: 0,
    net: 0,
    discount: 0,
    quantity: 0,
  });
  const maxProductQuantity = 50;

  useMemo(() => {
    function calculateTotals() {
      let gross = 0;
      let net = 0;
      let quantity = 0;

      cartProducts.forEach((p) => {
        gross += Number(p.price) * p.quantity;
        net +=
          calculateProductTotalPrice(p.price, p.discountPercentage) *
          p.quantity;
        quantity += p.quantity;
      });

      let discount = net - gross;

      setTotals({
        gross,
        net,
        discount,
        quantity,
      });
      // console.log({ products, totals });
    }

    calculateTotals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartProducts]);

  function addProductToCart(product: Product, quantity: number) {
    const hasDifferentRestaurantProcut = cartProducts.some(
      (p) => p.restaurantId !== product.restaurantId,
    );

    if (hasDifferentRestaurantProcut) {
      clearCart();
    }

    const isProductAlreadyOnCart = cartProducts.some(
      (p) => p.id === product.id,
    );

    if (isProductAlreadyOnCart) {
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

  function removeProductFromCart(productId: string) {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  }

  function decreaseProductQuantity(productId: string) {
    const product = cartProducts.find((p) => p.id === productId);
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
    const product = cartProducts.find((p) => p.id === productId);
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

  function clearCart() {
    setProducts([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addProductToCart,
        removeProductFromCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        clearCart,
        maxProductQuantity,
        totals,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
