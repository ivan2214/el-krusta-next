import Image from "next/image";

import Currency from "@/components/ui/currency";
import useCart from "@/hooks/useCart";
import { Product } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface CartItemProps {
  data: Product;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();
  const toast = useToast();

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  return (
    <li className="relative flex flex-col items-start justify-center gap-6 border-b py-6 md:flex-row">
      <div className="absolute right-0 top-0 z-10 mt-5 md:m-0">
        <Button size="icon" className="h-6 w-6" onClick={onRemove}>
          <X size={10} />
        </Button>
      </div>
      <div className="relative h-10 w-10 overflow-hidden rounded-md sm:h-16 sm:w-16">
        <Image
          fill
          src={data.images[0].url}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative  flex flex-1 flex-col justify-between ">
        <div className="flex flex-col items-start gap-1">
          <div className="flex justify-between">
            <p className="text-base font-semibold md:text-lg ">{data.name}</p>
          </div>

          <div className="flex text-xs md:text-sm">
            <p className="text-primary dark:text-secondary-foreground">
              {data.color.name}
            </p>
            <p className="ml-4  border-l  pl-4 text-primary dark:border-gray-200 dark:text-secondary-foreground ">
              {data.size.name}
            </p>
          </div>
          <Currency value={data.price} />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
