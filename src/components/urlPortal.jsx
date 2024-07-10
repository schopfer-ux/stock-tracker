import React from "react";
import StockRow from "./StockRow";
import PortfolioAnalysis from "./PortfolioAnalysis";
import UpdatesModal from "./UpdatesModal";
import { Container, Row, Col } from 'react-bootstrap';

function URLPortal() {
  return (
    <Container fluid>
    <Row>
      <Col md={2} xs={12} className="text-start mb-3">
        <h5>
          <i className="bi bi-chevron-double-right"></i> Overview <UpdatesModal />
        </h5>
        <PortfolioAnalysis />
      </Col>
      <Col md={10} xs={12} className="text-start">
        <h5>
          <i className="bi bi-chevron-double-right"></i> My Stocks
        </h5>
        <StockRow />
      </Col>
    </Row>
  </Container>
  );
}

export default URLPortal;
