import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar collapseOnSelect expand="md" className="mb-3 container">
        <LinkContainer to="/">
          <Navbar.Brand href="/" className="brand">
            Cupido Online
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
            <LinkContainer to="/signup">
              <Nav.Link>Cadastrar-se</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link>Entrar</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
    </div>
  );
}

export default App;