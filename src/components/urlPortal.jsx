import React from "react";
import StockRow from "./StockRow";
import PortfolioAnalysis from "./PortfolioAnalysis";
import UpdatesModal from "./UpdatesModal";

function URLPortal() {
  return (
    <div className="container-fluid d-flex flex-column container-gap-2rem">
      <header></header>
      <div class="row">
        <div class="col-2 text-start">
          <h5>
            <i class="bi bi-chevron-double-right"></i> Overview <UpdatesModal />
          </h5>
          <PortfolioAnalysis />
          
          
        </div>
        <div class="col-10 text-start">
          <h5>
            <i class="bi bi-chevron-double-right"></i> My Stocks
          </h5>
          <StockRow />
        </div>
      </div>
    </div>
  );
}

export default URLPortal;
