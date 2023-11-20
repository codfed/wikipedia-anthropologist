import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand href="#home">Wikipedia Anthropologist</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/wikipedia-anthropologist/">Home</Nav.Link>
            <Nav.Link href="/wikipedia-anthropologist/#/about">About</Nav.Link>
            <NavDropdown
              title="Pages"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/wikipedia-anthropologist/#/edits">
                Edits
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/wikipedia-anthropologist/#/blocks">
                Blocks
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
