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

import CartItem from "@/app/(routes)/cart/components/cart-item";
import Summary from "@/app/(routes)/cart/components/summary";

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
    <div className="flex items-center gap-x-4 ">
      {/*   <Button
        onClick={() => router.push("/cart")}
        
      >
       
      </Button> */}
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
            <SheetTitle>Shopping Cart</SheetTitle>
            <SheetDescription>View your shopping cart</SheetDescription>
          </SheetHeader>
          <div className="gap-x-12 lg:grid lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              {cart.items.length === 0 && (
                <p className="text-neutral-500">No items added to cart.</p>
              )}
              <ul>
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
