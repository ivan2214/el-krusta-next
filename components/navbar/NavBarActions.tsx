"use client";

import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import useCart from "@/hooks/useCart";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CartItem from "@/components/cart-item";
import Summary from "@/components/summary";

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
  const cart = useCart();

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex items-center gap-x-4">
      <Sheet>
        <SheetTrigger>
          <Button
            variant="ghost"
            className="flex items-center rounded-full px-4 py-2"
          >
            <ShoppingBag size={20} />
            <span className="ml-2 text-sm font-medium ">
              {cart.items.length}
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Carrito</SheetTitle>
          </SheetHeader>
          <div className="flex h-full w-full flex-col items-start gap-4  overflow-y-scroll">
            <div className="mt-3 overflow-y-scroll lg:overflow-y-auto">
              {cart.items.length === 0 && (
                <p className="text-neutral-500">No items added to cart.</p>
              )}
              <ul className="border-b">
                {cart.items.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </ul>
            </div>
            <Summary />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavbarActions;
