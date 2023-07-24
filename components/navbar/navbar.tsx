import { ThemeToggle } from "../theme-toggle";
import { MainNavMobile } from "./MainNavMobile";

import UserMenu from "./UserMenu";
import { User } from "@prisma/client";
import { Search } from "@/app/(root)/components/search";
import Container from "../ui/container";
import Link from "next/link";
import NavbarActions from "./NavBarActions";
import getCategories from "@/actions/get-categories";
import MainNav from "./MainNav";

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar: React.FC<NavbarProps> = async ({ currentUser }) => {
  const categories = await getCategories();

  return (
    <div className="container border-b">
      <Container>
        <div className="relative flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="ml-4 flex gap-x-2 lg:ml-0">
            <p className="text-xl font-bold">STORE</p>
          </Link>
          <MainNav data={categories} />
          <section className="ml-auto flex space-x-2">
            <div className=" flex items-center space-x-4">
              <Search />
              <ThemeToggle />
              <UserMenu currentUser={currentUser} />
            </div>
            <MainNavMobile data={categories} />
            <NavbarActions />
          </section>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
