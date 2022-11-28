import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";

import { useAuth } from "@hooks/auth";

import menuData from "./menu.json";

const Separator = React.memo(function Separator() {
  return (
    <Nav.Item className="d-none d-md-block d-flex align-items-center">
      <span className="text-white mx-2">|</span>
    </Nav.Item>
  );
});

export default React.memo(function Header() {
  const { user, logout } = useAuth();
  const [_menu, setMenu] = useState([]);

  useEffect(() => {
    const key = user.isAdmin ? "ADMIN" : "USER";
    setMenu(menuData[key]);
  }, [user.isAdmin]);

  return (
    <Navbar
      className="dashboard-header"
      fixed="top"
      bg="dark"
      variant="dark"
      expand="lg"
    >
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand>Motonréel</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="pt-0">
          <Nav className="align-items-center">
            {_menu.map(({ key, name, path }, i) => (
              <React.Fragment key={key}>
                <LinkContainer to={path}>
                  <Nav.Link className="d-flex align-items-center">
                    {name}
                  </Nav.Link>
                </LinkContainer>
                {i < _menu.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </Nav>
        </Navbar.Collapse>
        <div className="d-flex align-items-center">
          <Nav.Item className="d-flex align-items-center">
            <span className="text-white mx-2">Bonjour, {user.name}</span>
          </Nav.Item>
          <Separator />
          <Nav.Link className="d-flex align-items-center" onClick={logout}>
            <span className="text-white">Se déconnecter</span>
          </Nav.Link>
        </div>
      </Container>
    </Navbar>
  );
});
