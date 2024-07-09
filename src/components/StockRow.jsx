import React, { Component } from "react";
import { google_sheets_api } from "../config/api";
import axios from "axios";
import { StockTracker } from "./StockTracker";
import { myStocks } from "../config/myStocks";
import StockCard from "./stockCard";
import { Container, Row, Col, Button } from "react-bootstrap";

class StockRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      timestamp: new Date(),
      loading: true, // State to track loading status
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const csvUrl = `${google_sheets_api.base_url}`;

    axios
      .get(csvUrl)
      .then((response) => {
        const data = StockTracker(response.data); // Assuming StockTracker returns processed data
        this.setState({
          data: data,
          timestamp: `${new Date().toDateString()} ${this.formatAMPM(
            new Date()
          )}`,
          loading: false, // Set loading to false after data is fetched
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        this.setState({ loading: false }); // Set loading to false on error
      });
  };

  calculateTotals(stock) {
    const totalInvested = (
      parseFloat(stock.mystocks) * parseFloat(stock.avgprice)
    ).toFixed(2);
    const currentValue = (
      parseFloat(stock.mystocks) * parseFloat(stock.marketprice)
    ).toFixed(2);
    const currentpriceDiff =
      parseFloat(currentValue) - parseFloat(totalInvested);

    return { totalInvested, currentValue, currentpriceDiff };
  }

  formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const timeStr = hours + ":" + minutes + " " + ampm;
    return timeStr;
  };

  handleReload = () => {
    this.setState({ loading: true }); // Set loading to true before refetching data
    this.fetchData(); // Refetch data
  };

  render() {
    const { data, timestamp, loading } = this.state;

    return (
      <div className="fullscreen-preloader-wrapper">
        {loading ? (
          // Fullscreen preloader while loading is true
          <div className="fullscreen-preloader d-flex justify-content-center align-items-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          // Render content when loading is false
          <div>
            <Container fluid>
              <Row className="text-align-start">
                <Col sm={10}>
                  {" "}
                  <p>
                    Last Updated at <b>{timestamp}</b>{" "}
                  </p>
                </Col>
                <Col className="text-align-end" sm={2}>
                  <Button
                    onClick={this.handleReload}
                    variant="btn btn-outline-light w-100"
                  >
                    <i className="bi bi-arrow-clockwise"></i> Fetch
                  </Button>
                </Col>
              </Row>
            </Container>

            <br />

            <div className="container-fluid">
              <div className="row align-items-start">
                {data.map((stock, index) => {
                  const { totalInvested, currentValue, currentpriceDiff } =
                    this.calculateTotals(stock);
                  const stockValue = {
                    stockName: myStocks[stock.ticker].companyName,
                    stockLogo: myStocks[stock.ticker].logoUrl,
                    currentValue: currentValue,
                    stocksCount: stock.mystocks,
                    mktPrice: stock.marketprice,
                    investedPrice: totalInvested,
                    earnings: currentpriceDiff.toFixed(2),
                  };

                  return <StockCard key={index} stockValue={stockValue} />;
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default StockRow;
