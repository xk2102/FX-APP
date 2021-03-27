import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  let location = useLocation();
  return (
    <div className="NavBar">
      <div className={location.pathname === "/" ? "NavItem active" : "NavItem"}>
        <Link to="/">INFO</Link>
      </div>
      <div
        className={
          location.pathname === "/CreateTicket" ? "NavItem active" : "NavItem"
        }
      >
        <Link to="/CreateTicket">CREATE TICKET</Link>
      </div>
      <div
        className={
          location.pathname === "/ViewTickets" ? "NavItem active" : "NavItem"
        }
      >
        <Link to="/ViewTickets">VIEW TICKETS</Link>
      </div>
      <div
        className={
          location.pathname === "/Section4" ? "NavItem active" : "NavItem"
        }
      >
        <Link to="/Section4">SECTION4</Link>
      </div>
    </div>
  );
}
