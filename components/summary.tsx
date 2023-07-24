"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Currency from "@/components/ui/currency";
import useCart from "@/hooks/useCart";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const onCheckout = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: items.map((item) => item.id),
      },
    );

    window.location = response.data.url;
  };

  return (
    <div className="mb-5 flex flex-col items-start justify-between gap-2">
      <h2 className="text-lg font-medium ">Order summary</h2>
      <Currency value={totalPrice} />
      <Button size="sm" onClick={onCheckout} disabled={items.length === 0}>
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
