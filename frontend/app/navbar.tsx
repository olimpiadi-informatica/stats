import Link from "next/link";

import {
  Navbar as BaseNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
} from "@olinfo/react-components";

import { Image } from "~/components/image";
import { Search } from "~/components/search";
import { getImageMetadata } from "~/lib/image";

export async function Navbar() {
  const logoDark = await getImageMetadata("navbar", "oiistats-dark");
  const logoLight = await getImageMetadata("navbar", "oiistats-light");

  return (
    <BaseNavbar color="bg-base-300 text-base-content">
      <NavbarBrand>
        <picture>
          {logoDark && (
            <source media="(prefers-color-scheme: dark)" srcSet={logoDark.srcSet || logoDark.src} />
          )}
          {logoLight && (
            <Image src={logoLight} alt="Logo OII stats" className="h-full w-auto flex-none" />
          )}
        </picture>
      </NavbarBrand>
      <NavbarMenu>
        <NavbarMenuItem>
          <Link href="/">Home</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="/contests">Edizioni</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="/contestants">Hall of Fame</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="/regions">Regioni</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="/tasks">Problemi</Link>
        </NavbarMenuItem>
      </NavbarMenu>
      <NavbarContent>
        <Search />
      </NavbarContent>
    </BaseNavbar>
  );
}
