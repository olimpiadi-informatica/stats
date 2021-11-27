import {
  Navbar as BootstrapNavar,
  Container,
  Nav,
  NavItem,
} from "react-bootstrap";
import Link from "next/link";
import { Search } from "./search";
import styles from "./navbar.module.scss";

export function Navbar() {
  return (
    <BootstrapNavar bg="white" expand="lg" className={styles.navbar}>
      <Container>
        <BootstrapNavar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" passHref>
              <Nav.Link>Home</Nav.Link>
            </Link>
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
            <NavItem className="ml-lg-4">
              <Search />
            </NavItem>
          </Nav>
        </BootstrapNavar.Collapse>
      </Container>
    </BootstrapNavar>
  );
}
