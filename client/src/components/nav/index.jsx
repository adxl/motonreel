import React, { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";

import { useAuth } from "@hooks/auth";

import menu from "./menu.json";

const Separator = React.memo(function Separator() {
  return (
    <Nav.Item className="d-none d-md-block d-flex align-items-center">
      <span className="text-white mx-2">|</span>
    </Nav.Item>
  );
});

export default React.memo(function Header() {
  const { user } = useAuth();

  return (
    <Navbar
      className="nav-header"
      fixed="top"
      bg="dark"
      variant="dark"
      expand="lg"
    >
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand>
            <i className="fa-solid fa-motorcycle">&nbsp;</i>
            <span>Motonréel</span>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="pt-0">
          <Nav className="align-items-center">
            {menu.map(({ key, name, path }, i) => (
              <React.Fragment key={key}>
                <LinkContainer to={path}>
                  <Nav.Link className="d-flex align-items-center">
                    {name}
                  </Nav.Link>
                </LinkContainer>
                {i < menu.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </Nav>
        </Navbar.Collapse>
        <div className="d-flex align-items-center">
          <Nav.Item className="d-flex align-items-center">
            <span className="text-white mx-2">Bonjour, {user.name}</span>
            <Badge bg="danger">{user.isAdmin && "Admin"}</Badge>
          </Nav.Item>
          <Separator />
          <LinkContainer to={"/logout"}>
            <Nav.Link className="d-flex align-items-center">
              <span className="text-white">Se déconnecter</span>
            </Nav.Link>
          </LinkContainer>
        </div>
      </Container>
    </Navbar>
  );
});
