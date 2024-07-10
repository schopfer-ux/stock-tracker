import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import URLPortal from "./components/urlPortal";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "@fontsource/montserrat";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";

import logo from "./logo.svg";

class App extends Component {
  constructor() {
    super();
    this.state = {
      secretKey: false,
      errorMsg: "",
      inputValue: "",
      data: { amazing: 0 },
    };
  }

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  checkKey = () => {
    const { inputValue } = this.state;
    if (inputValue.toLowerCase() === "thisisteja") {
      this.setState({ secretKey: true, errorMsg: "" });
    } else {
      this.setState({ errorMsg: "Invalid Secret Key" });
    }
  };

  resetKey = () => {
    this.setState({ secretKey: false });
  };

  render() {
    const { secretKey, errorMsg } = this.state;

    return (
      <div className="App">
        {secretKey ? (
          <>
            <Navbar bg="body-tertiary" variant="dark" className="mb-4">
              <Container>
                <Navbar.Brand>
                  <img
                    alt="logo"
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top me-2"
                  />
                  <span style={{ color: "var(--bodyBackground)" }}>Stock Tracker</span>
                </Navbar.Brand>
                <Button variant="danger" onClick={this.resetKey}>
                <i class="bi bi-escape"></i>
                  Exit
                </Button>
              </Container>
            </Navbar>
            <URLPortal />
          </>
        ) : (
          <Container fluid>
            <Row className="flex-column gap-3">
              <Col className="text-center">
                <h1>Stock Tracker | Schopfer</h1>
                <p>
                  This website is my personal playground for diving into
                  frontend technologies
                </p>
                <p style={{ color: "red" }}>{errorMsg}</p>
              </Col>
              <Col xs={12} className="text-center">
                <Row className="justify-content-center">
                  <Col xs={12} md="auto">
                    <InputGroup className="mb-3">
                      <FormControl
                        type="text"
                        placeholder="Enter secret key"
                        onChange={this.handleInputChange}
                      />
                      <Button variant="outline-light" onClick={this.checkKey}>
                        Validate
                      </Button>
                    </InputGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    );
  }
}

export default App;
