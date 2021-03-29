import React, { useRef } from "react";

export default function Ticket(props) {
  const {
    ticket,
    deleteTicket,
    listOfTickets,
    setListOfTickets,
    index
  } = props;

  const entryFillFormData = useRef();
  const stopFillFormData = useRef();
  const profitTargetFillFormData = useRef();

  function calculateEntrySlippage(
    direction,
    entryOrder,
    entryFill,
    quantity,
    rate
  ) {
    if (direction === "LONG") {
      var sl = (entryOrder - entryFill) * quantity * rate;
    } else {
      var sl = (entryFill - entryOrder) * quantity * rate;
    }
    return sl;
  }
  function calculateStopSlippage(
    direction,
    stopOrder,
    stopFill,
    quantity,
    rate
  ) {
    if (direction === "LONG") {
      var sl = (stopFill - stopOrder) * quantity * rate;
    } else {
      var sl = (stopOrder - stopFill) * quantity * rate;
    }
    return sl;
  }
  function calculateProfitTargetSlippage(
    direction,
    profitTargetOrder,
    profitTargetFill,
    quantity,
    rate
  ) {
    if (direction === "LONG") {
      var sl = (profitTargetFill - profitTargetOrder) * quantity * rate;
    } else {
      var sl = (profitTargetOrder - profitTargetFill) * quantity * rate;
    }
    return sl;
  }

  function calculateSum(direction, entry, exit, quantity, rate) {
    if (direction === "LONG") {
      //exitprice - entryprice
      var sum = (exit - entry) * quantity * rate;
    } else {
      var sum = (entry - exit) * quantity * rate;
    }
    return sum;
  }

  function applyFills(event, what) {
    event.preventDefault();

    let entryFill = parseFloat(entryFillFormData.current.value);
    let stopFill = parseFloat(stopFillFormData.current.value);
    let profitTargetFill = parseFloat(profitTargetFillFormData.current.value);
    let listOfObjects = [...listOfTickets];

    // VALIDATE
    // entryFill should always be filled
    // one of stopFill and exitFill should be filled
    if (
      isNaN(entryFill) ||
      (isNaN(stopFill) && isNaN(profitTargetFill)) ||
      (!isNaN(stopFill) && !isNaN(profitTargetFill))
    ) {
      listOfObjects[what].errorInApplyFills = "ERROR!";
    } else {
      listOfObjects[what].errorInApplyFills = "";
      listOfObjects[what].entryFill = entryFill;
      listOfObjects[what].stopFill = stopFill;
      listOfObjects[what].profitTargetFill = profitTargetFill;

      listOfObjects[what].entrySlippage = calculateEntrySlippage(
        ticket.direction,
        ticket.entryOrder,
        entryFill,
        ticket.quantity,
        ticket.rate
      );

      if (isNaN(profitTargetFill)) {
        //its a stop hit
        listOfObjects[what].stopSlippage = calculateStopSlippage(
          ticket.direction,
          ticket.stopOrder,
          stopFill,
          ticket.quantity,
          ticket.rate
        );
        listOfObjects[what].sum =
          calculateSum(
            ticket.direction,
            entryFill,
            stopFill,
            ticket.quantity,
            ticket.rate
          ) - ticket.commission;
      } else {
        //its an exit hit
        listOfObjects[
          what
        ].profitTargetSlippage = calculateProfitTargetSlippage(
          ticket.direction,
          ticket.profitTargetOrder,
          profitTargetFill,
          ticket.quantity,
          ticket.rate
        );
        listOfObjects[what].sum =
          calculateSum(
            ticket.direction,
            entryFill,
            profitTargetFill,
            ticket.quantity,
            ticket.rate
          ) - ticket.commission;
      }
    }

    setListOfTickets(listOfObjects);

    //deleteTicket(ticket.id);
  }

  return (
    <div className="Ticket">
      <p>
        <strong> 🠶 </strong>
        {ticket.date} - {ticket.symbol} - {ticket.direction} - {ticket.quantity}
      </p>

      <form>
        <div className="field">
          <label>ENTRY ORDER: </label>
          <span id="spanInField">{ticket.entryOrder}</span>
        </div>
        <div className="field">
          <label>ENTRY FILL: </label>
          <input
            ref={entryFillFormData}
            name="entryFill"
            id="entryFill"
            type="number"
            step="0.00001"
            placeholder={"setEntryFill..."}
          ></input>
        </div>
        <div className="field">
          <label>STOP ORDER: </label>
          <span id="spanInField">{ticket.stopOrder}</span>
        </div>
        <div className="field">
          <label>STOP FILL: </label>
          <input
            ref={stopFillFormData}
            id="stopFill"
            type="number"
            step="0.000001"
            placeholder="setStopFill..."
          ></input>
        </div>
        <div className="field">
          <label>PROFIT TARGET ORDER: </label>
          <span id="spanInField">{ticket.profitTargetOrder}</span>
        </div>
        <div className="field">
          <label>PROFIT TARGET FILL: </label>
          <input
            ref={profitTargetFillFormData}
            id="profitTargetFill"
            type="number"
            step="0.00001"
            placeholder="setProfitTargetFill..."
          ></input>
        </div>

        <div style={{ textAlign: "center" }}>
          <label
            style={{
              color: "red",
              fontWeight: "bold"
            }}
          >
            {ticket.errorInApplyFills}
          </label>
        </div>

        {ticket.sum !== 0 && <hr></hr>}

        {ticket.entrySlippage < 0 && (
          <div className="field">
            <label>ENTRY SLIPPAGE: </label>
            <span
              id="spanInField"
              style={{
                color: "red",
                fontWeight: "bold"
              }}
            >
              {ticket.entrySlippage.toFixed(2)} $
            </span>
          </div>
        )}
        {ticket.entrySlippage > 0 && (
          <div className="field">
            <label>ENTRY SLIPPAGE: </label>
            <span
              id="spanInField"
              style={{
                color: "green",
                fontWeight: "bold"
              }}
            >
              +{ticket.entrySlippage.toFixed(2)} $
            </span>
          </div>
        )}

        {ticket.stopSlippage < 0 && (
          <div className="field">
            <label>STOP SLIPPAGE: </label>
            <span
              id="spanInField"
              style={{
                color: "red",
                fontWeight: "bold"
              }}
            >
              {ticket.stopSlippage.toFixed(2)} $
            </span>
          </div>
        )}
        {ticket.stopSlippage > 0 && (
          <div className="field">
            <label>STOP SLIPPAGE: </label>
            <span
              id="spanInField"
              style={{
                color: "green",
                fontWeight: "bold"
              }}
            >
              +{ticket.stopSlippage.toFixed(2)} $
            </span>
          </div>
        )}

        {ticket.profitTargetSlippage < 0 && (
          <div className="field">
            <label>PROFIT TARGET SLIPPAGE: </label>
            <span
              id="spanInField"
              style={{
                color: "red",
                fontWeight: "bold"
              }}
            >
              {ticket.profitTargetSlippage.toFixed(2)} $
            </span>
          </div>
        )}
        {ticket.profitTargetSlippage > 0 && (
          <div className="field">
            <label>PROFIT TARGET SLIPPAGE: </label>
            <span
              id="spanInField"
              style={{
                color: "green",
                fontWeight: "bold"
              }}
            >
              +{ticket.profitTargetSlippage.toFixed(2)} $
            </span>
          </div>
        )}

        {ticket.sum < 0 && (
          <div className="field">
            <label>TOTAL SUM: </label>
            <span
              id="spanInField"
              style={{
                color: "red",
                fontWeight: "bold"
              }}
            >
              {ticket.sum.toFixed(2)} $
            </span>
          </div>
        )}
        {ticket.sum > 0 && (
          <div className="field">
            <label>TOTAL SUM: </label>
            <span
              id="spanInField"
              style={{
                color: "green",
                fontWeight: "bold"
              }}
            >
              +{ticket.sum.toFixed(2)} $
            </span>
          </div>
        )}

        <div className="buttons">
          <button
            className="button"
            onClick={(event) => applyFills(event, index)}
          >
            APPLY FILLS
          </button>
          <button type="button" onClick={() => deleteTicket(ticket.id)}>
            DELETE TICKET
          </button>
        </div>
      </form>
    </div>
  );
}
