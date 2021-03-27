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
  const exitFillFormData = useRef();

  function editFills(event, what) {
    event.preventDefault();
    // console.log(what);
    // console.log(entryFillFormData.current.value);
    // console.log(stopFillFormData.current.value);
    // console.log(exitFillFormData.current.value);

    let entryFill = parseFloat(entryFillFormData.current.value);
    let stopFill = parseFloat(stopFillFormData.current.value);
    let exitFill = parseFloat(exitFillFormData.current.value);

    let listOfObjects = [...listOfTickets];
    listOfObjects[what].entryFill = entryFill;
    if (stopFill !== "") {
      listOfObjects[what].stopFill = stopFill;
    }
    if (exitFill !== "") {
      listOfObjects[what].exitFill = exitFill;
    }

    if (ticket.direction === "LONG") {
    } else {
    }

    setListOfTickets(listOfObjects);
  }

  return (
    <div className="Ticket">
      <p>
        <strong> 🠶 </strong>
        {ticket.date} - {ticket.symbol} - {ticket.direction} - {ticket.quantity}{" "}
        -{ticket.entryOrder} - {ticket.stopOrder} - {ticket.exitPrice} {""}
      </p>

      <form>
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
        {/* <hr></hr> */}
        <div className="field">
          <label>STOP FILL: </label>
          <input
            ref={stopFillFormData}
            id="stopFill"
            type="number"
            step="0.00001"
            placeholder="setStopFill..."
          ></input>
        </div>
        <div className="field">
          <label>EXIT FILL: </label>
          <input
            ref={exitFillFormData}
            id="exitFill"
            type="number"
            step="0.00001"
            placeholder="setExitFill..."
          ></input>
        </div>

        <div className="buttons">
          <button
            className="button"
            onClick={(event) => editFills(event, index)}
          >
            SUBMIT TICKET
          </button>
          <button type="button" onClick={() => deleteTicket(ticket.id)}>
            DELETE TICKET
          </button>
        </div>
      </form>
    </div>
  );
}
