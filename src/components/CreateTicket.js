import React from "react";

export default function CreateTicket(props) {
  const {
    ticket,
    listOfTickets,
    moneyManagement,
    listOfSymbols,
    createTicket,
    saveTicket,
    resetTicket,
    handleSomething
  } = props;
  return (
    <div className="CreateTicket">
      <form onSubmit={createTicket}>
        <div className="field">
          <label>TRADING EQUITY ($): </label>
          <input
            type="number"
            step="1"
            placeholder="setTradingEquity..."
            value={moneyManagement.tradingEquity}
            onChange={(event) => handleSomething(event, "tradingEquity")}
          ></input>
        </div>

        <div className="field">
          <label>P/L RATIO: </label>
          <input
            type="number"
            step="0.1"
            placeholder="setProfitToLossRatio..."
            value={moneyManagement.profitToLossRatio}
            onChange={(event) => handleSomething(event, "profitToLossRatio")}
          ></input>
        </div>
        <div className="field">
          <label>LOT SIZE: </label>
          <input
            type="number"
            step="1"
            placeholder="setLotSize..."
            value={moneyManagement.lotSize}
            onChange={(event) => handleSomething(event, "lotSize")}
          ></input>
        </div>

        <div className="field">
          <label>RISK PER TRADE: </label>
          <input
            type="number"
            step="0.0001"
            placeholder="setRiskPerTrade..."
            value={moneyManagement.riskPerTrade}
            onChange={(event) => handleSomething(event, "riskPerTrade")}
          ></input>
        </div>

        <hr></hr>
        <div className="field">
          <label>SYMBOL: </label>
          <select
            value={ticket.symbol}
            onChange={(event) => handleSomething(event, "symbol")}
          >
            {listOfSymbols.map((symbol, index) => (
              <option value={symbol} key={index}>
                {symbol}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>DIRECTION: </label>
          <select
            value={ticket.direction}
            onChange={(event) => handleSomething(event, "direction")}
          >
            <option value="LONG">LONG</option>
            <option value="SHORT">SHORT</option>
          </select>
        </div>

        <div className="field">
          <label>ENTRY ORDER: </label>
          <input
            id="entryOrder"
            type="number"
            step="0.00001"
            placeholder="setEntryOrder..."
            value={ticket.entryOrder}
            onChange={(event) => handleSomething(event, "entryOrder")}
          ></input>
        </div>

        <div className="field">
          <label>STOP ORDER: </label>
          <input
            id="stopOrder"
            type="number"
            step="0.00001"
            placeholder="setStopOrder..."
            value={ticket.stopOrder}
            onChange={(event) => handleSomething(event, "stopOrder")}
          ></input>
        </div>

        <div style={{ textAlign: "center" }}>
          <label
            style={{
              color: "red",
              fontWeight: "bold"
            }}
          >
            {ticket.errorInCreateTicket}
          </label>
        </div>

        <button className="button">CREATE</button>
        <button type="button" className="reset" onClick={resetTicket}>
          RESET
        </button>
        <button type="button" className="save" onClick={saveTicket}>
          SAVE
        </button>
      </form>

      {ticket.ticketIsCreated && (
        <>
          <div className="field">
            <label>DISTANCE: </label>
            <span id="spanInResult">{ticket.distance}</span>
          </div>
          <div className="field">
            <label>RATE: </label>
            <span id="spanInResult">{ticket.rate}</span>
          </div>
          <div className="field">
            <label>UNITS: </label>
            <span id="spanInResult">{ticket.units}</span>
          </div>
          <div className="field">
            <label>CONTRACTS: </label>
            <span id="spanInResult">{ticket.contracts}</span>
          </div>
          <div className="field">
            <label>QUANTITY: </label>
            <span id="spanInResult">{ticket.quantity}</span>
          </div>
          <div className="field">
            <label>PROFIT TARGET ORDER: </label>
            <span id="spanInResult">{ticket.profitTargetOrder}</span>
          </div>
        </>
      )}

      {listOfTickets.length === 0 && (
        <span>
          Click <strong>SAVE</strong> to start saving tickets!
        </span>
      )}

      {listOfTickets.length > 0 && (
        <span>
          You have <strong>{listOfTickets.length}</strong>{" "}
          {listOfTickets.length === 1 ? "ticket" : "tickets"}.
        </span>
      )}
    </div>
  );
}
