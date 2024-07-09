import React, { Component } from "react";

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
      <div class="col">
        <div
          className="card stock-card pointer-class"
          onClick={this.toggleDetails}
        >
          <div className="card-body">
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
                 
                        <button
                      className="btn toggle-icon mt-2"
                      aria-label="Toggle Details"
                      style={{
                        background: "none",
                        border: "none",
                        padding: "0",
                      }}
                    >
                      {showDetails ? (
                        <i
                          className="bi bi-caret-up-fill text-white"
                          style={{ fontSize: "1.5rem" }}
                        ></i>
                      ) : (
                        <i
                          className="bi bi-caret-down-fill text-white"
                          style={{ fontSize: "1.5rem" }}
                        ></i>
                      )}
                    </button>
              </div>

              {/* Details Section */}
              {showDetails && (
                <div className="d-flex justify-content-between w-100 mini-stuff mt-3">
                  <div className="flex-column">
                    <div className="stock-label">Quantity</div>
                    <div className="stock-value">{stockValue.stocksCount}</div>
                  </div>
                  <div className="flex-column">
                    <div className="stock-label">Mkt. Price</div>
                    <div className="stock-value">${stockValue.mktPrice}</div>
                  </div>
                  <div className="flex-column">
                    <div className="stock-label">Invested</div>
                    <div className="stock-value">
                      ${stockValue.investedPrice}
                    </div>
                  </div>
                  <div className="flex-column">
                    <div className="stock-label">Asset Value</div>
                    <div className="stock-value">
                      ${stockValue.currentValue}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StockCard;
