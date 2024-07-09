import React, { Component } from "react";
import { google_sheets_api } from "../config/api";
import axios from "axios";
import { StockTracker } from "./StockTracker";
import { deposits } from "../config/myStocks";

class PortfolioAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      totalInvested: 0,
      currentAssets: 0,
      returns: 0,
    };
  }

  componentDidMount() {
    const csvUrl = `${google_sheets_api.base_url}`;

    axios
      .get(csvUrl)
      .then((response) => StockTracker(response.data))
      .then((data) => {
        const totalInvested = this.calculateTotalInvestment();
        const currentAssets = this.findCurrentAssets(data);

        this.setState({
          data: data,
          totalInvested: this.calculateTotalInvestment(),
          currentAssets: currentAssets,
          returns: (currentAssets - totalInvested).toFixed(2),
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  calculateTotalInvestment() {
    return deposits
      .reduce((total, investment) => total + parseFloat(investment.invested), 0)
      .toFixed(2);
  }

  findTotal(data) {
    let totalAmount = 0;
    data.forEach((stock) => {
      totalAmount += parseFloat(stock.mystocks) * parseFloat(stock.avgprice);
    });
    return totalAmount.toFixed(2);
  }

  findCurrentAssets(data) {
    let totalAmount = 0;
    data.forEach((stock) => {
      totalAmount +=
        parseFloat(stock.mystocks) * parseFloat(stock.marketprice || 0);
    });
    return totalAmount.toFixed(2);
  }

  render() {
    const { totalInvested, currentAssets, returns } = this.state;
    const returnsClass = returns > 0 ? "text-success" : "text-danger";

    return (
      <div class="card stock-card">
        <div class="card-body">
          <div className="d-flex flex-column align-items-start mini-stuff mt-3">
            <div className="col flex-column">
              <div className="stock-label">TOTAL INVESTED</div>
              <div className="big-stock stock-value">${totalInvested}</div>
            </div>
            <div className="col flex-column">
              <div className="stock-label">CURRENT ASSETS</div>
              <div className="big-stock stock-value">${currentAssets}</div>
            </div>
            <div className="col flex-column">
              <div className="stock-label">RETURNS</div>
              <div className={`big-stock stock-value ${returnsClass}`}>
                {returns > 0 ? (
                  <>
                    ${returns}{" "}
                    <i
                      className="bi bi-arrow-up-right"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                  </>
                ) : (
                  <>
                    ${returns}{" "}
                    <i
                      className="bi bi-arrow-bottom-left"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PortfolioAnalysis;
