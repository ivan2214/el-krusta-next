import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Color, Size } from "@/types";

import Filter from "./filter";
import { Button } from "@/components/ui/button";

interface MobileFiltersProps {
  sizes: Size[];
  colors: Color[];
}

const MobileFilters: React.FC<MobileFiltersProps> = ({ sizes, colors }) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button>Filtros</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filtre los productos</SheetTitle>
          <SheetDescription>
            Filtrar los productos por color y tamaño
          </SheetDescription>
        </SheetHeader>
        <div className="p-4">
          <Filter valueKey="sizeId" name="Sizes" data={sizes} />
          <Filter valueKey="colorId" name="Colors" data={colors} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilters;
