import React from "react";
import Ticket from "./Ticket.js";

export default function ViewTickets(props) {
  const { listOfTickets, setListOfTickets, deleteTicket } = props;
  return (
    <div className="ViewTickets">
      {listOfTickets.length === 0 && (
        <span>
          <strong>CREATE</strong> tickets to view them here!
        </span>
      )}

      {listOfTickets.length > 0 &&
        listOfTickets.map((ticket, index) => (
          <Ticket
            index={index}
            key={ticket.id}
            ticket={ticket}
            listOfTickets={listOfTickets}
            setListOfTickets={setListOfTickets}
            deleteTicket={deleteTicket}
          />
        ))}
    </div>
  );
}
