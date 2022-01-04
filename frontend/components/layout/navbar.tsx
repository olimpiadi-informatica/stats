import {
  Navbar as BootstrapNavar,
  Container,
  Nav,
  NavItem,
} from "react-bootstrap";
import Link from "next/link";
import { Search } from "./search";
import styles from "./navbar.module.scss";
import { useRouter } from "next/router";

export function Navbar() {
  const router = useRouter();

  return (
    <BootstrapNavar bg="white" expand="lg" className={styles.navbar}>
      <Container>
        <BootstrapNavar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavar.Collapse id="basic-navbar-nav">
          <Nav className="w-100">
            <Nav.Link
              href="/"
              onClick={(e) => {
                e.preventDefault();
                router.push(`/#${Math.floor(Math.random() * 100000)}`);
              }}
            >
              Home
            </Nav.Link>
            <Link href="/contests" passHref>
              <Nav.Link>Contests</Nav.Link>
            </Link>
            <Link href="/contestants" passHref>
              <Nav.Link>Hall of Fame</Nav.Link>
            </Link>
            <Link href="/regions" passHref>
              <Nav.Link>Regions</Nav.Link>
            </Link>
            <Link href="/tasks" passHref>
              <Nav.Link>Tasks</Nav.Link>
            </Link>
            <Link href="/contribute" passHref>
              <Nav.Link>Contribute</Nav.Link>
            </Link>
            <Link href="/about" passHref>
              <Nav.Link>About</Nav.Link>
            </Link>
            <NavItem className={styles.search}>
              <Search />
            </NavItem>
          </Nav>
        </BootstrapNavar.Collapse>
      </Container>
    </BootstrapNavar>
  );
}
