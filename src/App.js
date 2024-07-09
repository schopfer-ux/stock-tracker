import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import URLPortal from "./components/urlPortal";
import { Navbar, Container } from "react-bootstrap";

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
          <div>
            <Navbar className="bg-body-tertiary">
              <Container>
              
            <h3>Stock Tracker | Schopfer</h3> 

            <button
              type="button"
              className="btn btn-danger"
              onClick={this.resetKey}
            >
              <i class="bi bi-escape"></i>
            </button>

              </Container>
            </Navbar>
            
            <URLPortal />
          </div>
        ) : (
          <div className="container-fluid">
            <div className="row flex-column gap-3">
              <h1>Stock Tracker | Schopfer</h1>
              <p>
                This website is my personal playground for diving into frontend
                technologies
              </p>
              <p style={{ color: "red" }}>{errorMsg}</p>
              <div className="row flex-row w-25 mx-auto">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter secret key"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="col-auto">
                  <button
                    type="button"
                    className="btn btn-outline-light"
                    onClick={this.checkKey}
                  >
                    Validate
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
