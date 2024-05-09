import Link from "next/link";

import {
  Navbar as BaseNavbar,
  NavbarMenu as BaseNavbarMenu,
  Dropdown,
  DropdownButton,
  DropdownMenu,
} from "@olinfo/react-components";
import { MenuIcon } from "lucide-react";

import { Image } from "~/components/image";
import { Search } from "~/components/search";

// @ts-expect-error
import logoDark from "./oiistats-dark.png?h=32";
// @ts-expect-error
import logoLight from "./oiistats-light.png?h=32";

export function Navbar() {
  return (
    <BaseNavbar color="bg-base-300 text-base-content">
      <div>
        <Dropdown className="lg:hidden">
          <DropdownButton>
            <MenuIcon aria-label="Menu" />
          </DropdownButton>
          <DropdownMenu>
            <NavbarMenu />
          </DropdownMenu>
        </Dropdown>
        <picture>
          <source media="(prefers-color-scheme: dark)" srcSet={logoDark.srcSet} />
          <Image src={logoLight} alt="Logo OII stats" className="mx-2 h-8 w-auto flex-none" />
        </picture>
        <div className="max-lg:hidden">
          <BaseNavbarMenu>
            <NavbarMenu />
          </BaseNavbarMenu>
        </div>
      </div>
      <div className="max-sm:hidden">
        <Search />
      </div>
    </BaseNavbar>
  );
}

function NavbarMenu() {
  return (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/contests">Edizioni</Link>
      </li>
      <li>
        <Link href="/contestants">Hall of Fame</Link>
      </li>
      <li>
        <Link href="/regions">Regioni</Link>
      </li>
      <li>
        <Link href="/tasks">Problemi</Link>
      </li>
    </>
  );
}
