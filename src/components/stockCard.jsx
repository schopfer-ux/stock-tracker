import React, { Component } from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

class StockCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false, // Initially, details are hidden
    };
  }

  toggleDetails = () => {
    this.setState((prevState) => ({
      showDetails: !prevState.showDetails,
    }));
  };

  render() {
    const { stockValue } = this.props;
    const { showDetails } = this.state;

    return (
      <Col md={4} sm={6} xs={12} className="mb-3">
        <Card className="stock-card pointer-class">
          <Card.Body>
            <div className="d-flex flex-column align-items-center">
              <div className="d-flex flex-row align-items-center w-100 gap-4">
                <img
                  className="logo"
                  src={stockValue.stockLogo}
                  alt="Stock Logo"
                />
                <div className="d-flex flex-column align-items-start w-100">
                  <div className="stock-title">
                    {stockValue.stockName}
                  </div>
                  <div
                    className={`large-value ${
                      stockValue.earnings > 0
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >
                    ${Math.abs(stockValue.earnings)}
                  </div>
                </div>
                <Button
                  className="btn toggle-icon mt-2"
                  aria-label="Toggle Details"
                  variant="link"
                  onClick={this.toggleDetails}
                >
                  {showDetails ? (
                    <i className="bi bi-caret-up-fill text-white" style={{ fontSize: "1.5rem" }}></i>
                  ) : (
                    <i className="bi bi-caret-down-fill text-white" style={{ fontSize: "1.5rem" }}></i>
                  )}
                </Button>
              </div>

              {/* Details Section */}
              {showDetails && (
                <Container fluid className="mt-3">
                  <Row>
                    <Col xs={12} className="text-start mb-3">
                      <div className="flex-column">
                        <div className="stock-label">Quantity</div>
                        <div className="stock-value">{stockValue.stocksCount}</div>
                      </div>
                    </Col>
                    <Col xs={12} className="text-start mb-3">
                      <div className="flex-column">
                        <div className="stock-label">Mkt. Price</div>
                        <div className="stock-value">${stockValue.mktPrice}</div>
                      </div>
                    </Col>
                    <Col xs={12} className="text-start mb-3">
                      <div className="flex-column">
                        <div className="stock-label">Invested</div>
                        <div className="stock-value">${stockValue.investedPrice}</div>
                      </div>
                    </Col>
                  </Row>
                </Container>
              )}
            </div>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default StockCard;
