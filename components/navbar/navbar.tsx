import { ThemeToggle } from "../theme-toggle";
import { MainNavMobile } from "./MainNavMobile";

import UserMenu from "./UserMenu";
import { User } from "@prisma/client";
import { Search } from "@/app/(root)/components/search";
import Container from "../ui/container";
import Link from "next/link";
import NavbarActions from "./NavBarActions";
import getCategories from "@/actions/getCategories";
import MainNav from "./MainNav";

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar: React.FC<NavbarProps> = async ({ currentUser }) => {
  const categories = await getCategories();

  return (
    <div className="container sticky top-0 border-b bg-background z-50">
      <Container>
        <div className=" flex h-16 items-center justify-center sm:px-6 md:px-8">
          <Link href="/" className=" hidden md:flex ">
            <p className="text-sm font-bold md:text-xl">El Krusta</p>
          </Link>
          <MainNav data={categories} />
          <section className="flex w-full items-center justify-center gap-2 md:ml-auto md:w-auto">
            <div className="flex items-center justify-center gap-x-4 md:space-x-4">
              <Search className="hidden" />
              <ThemeToggle />
              <UserMenu currentUser={currentUser} />
            </div>
            <NavbarActions />
            <MainNavMobile data={categories} />
          </section>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
