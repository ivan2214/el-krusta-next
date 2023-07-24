import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ClassAttributes, InputHTMLAttributes } from "react";

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Search({ className, ...rest }: SearchProps) {
  return (
    <div>
      <Input
        type="search"
        placeholder="Search..."
        className={cn("md:flex md:w-[100px] lg:w-[200px]", className)}
        {...rest}
      />
    </div>
  );
}
