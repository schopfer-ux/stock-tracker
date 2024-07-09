import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class UpdatesModal extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  render() {
    const { show } = this.state;

    return (
      <>
        <Button variant="outline-warning" size="sm" onClick={this.handleShow}>
          Read Me
        </Button>

        <Modal show={show} onHide={this.handleClose}  dialogClassName="modal-lg">
          <Modal.Header closeButton>
            <Modal.Title>What's This Project?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Stock Tracker | Schopfer</h4>
            <span>
              This project is designed to facilitate stock analysis while also
              serving using the opportunity to learn frontend design principles.
              The main goal of this project is to create a user-friendly
              interface for analyzing stock data. It also serves as a learning
              ground to experiment with frontend technologies and design
              systems.
            </span>
            <br />
            <br />
            <h4>Features</h4>
            <ul>
                <li>Frontend: Developed using React JS and styled with Bootstrap.</li>
                <li>API Integration: Utilizes Google Sheets API to fetch my active stock information.</li>
                <li>Version Control: Managed with Git for effective collaboration and tracking of changes.</li>
                <li>Hosting: Hosted on GitHub repository for version control and collaboration.</li>
                <li>Deployment: Deployed and running on AWS Amplify for CI/CD</li>
            </ul>
            <br />
            <br />
            <h4>Upcoming Updates</h4>
            <ul>
                <li>Enhance search and filter options for more flexible analysis.</li>
                <li>Introduce graphical charts to visualize stock data trends and insights.</li>
                <li>Implement a robust authentication system for secure access.</li>
                <li>Enable support for multiple users with personalized stock portfolios.</li>
                <li>ptimize the platform for mobile devices to improve accessibility.</li>
            </ul>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-dark" onClick={this.handleClose}>
              Amazing!
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default UpdatesModal;
