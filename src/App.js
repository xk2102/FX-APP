import "./styles.css";
import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Info from "./components/Info.js";
import CreateTicket from "./components/CreateTicket.js";
import ViewTickets from "./components/ViewTickets.js";
import Section4 from "./components/Section4.js";
import NoMatch from "./components/NoMatch.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  Redirect
} from "react-router-dom";
// https://www.npmjs.com/package/nanoid
import { nanoid } from "nanoid";

export default function App() {
  const [listOfSymbols] = useState([
    "EURAUD",
    "GBPAUD",
    "EURCAD",
    "USDCAD",
    "CADCHF",
    "EURCHF",
    "GBPCHF",
    "NZDCHF",
    "USDCHF",
    "USDCZK",
    "EURGBP",
    "EURHUF",
    "USDMXN",
    "EURNZD",
    "GBPNZD",
    "EURSEK",
    "USDSGD",
    "AUDUSD",
    "EURUSD",
    "GBPUSD",
    "USDZAR",
    "AUDJPY",
    "CADJPY",
    "CHFJPY",
    "EURJPY",
    "GBPJPY",
    "NZDJPY",
    "USDJPY"
  ]);

  const [toUSD, setToUSD] = useState([
    { symbol: "AUD", rate: 0.648995 },
    { symbol: "CAD", rate: 0.71388 },
    { symbol: "CHF", rate: 1.0277228231546 },
    { symbol: "CZK", rate: 0.039280923415948 },
    { symbol: "GBP", rate: 1.23363 },
    { symbol: "HUF", rate: 0.003086891361489 },
    { symbol: "JPY", rate: 0.009289449971667 },
    { symbol: "MXN", rate: 0.041828665602824 },
    { symbol: "NZD", rate: 0.606995 },
    { symbol: "SEK", rate: 0.101241217324397 },
    { symbol: "SGD", rate: 0.705651563371039 },
    { symbol: "USD", rate: 1 },
    { symbol: "ZAR", rate: 0.054295006488253 }
  ]);

  function getDate() {
    var d = new Date();
    var n = d.toISOString().slice(0, 10).replaceAll("-", "");
    return n;
  }

  //variables needed from the user
  const [moneyManagement, setMoneyManagement] = useState({
    tradingEquity: 100000,
    profitToLossRatio: 2,
    lotSize: 25000,
    riskPerTrade: 0.005
  });
  const [ticket, setTicket] = useState({
    id: "",
    date: getDate(),
    symbol: "USDCAD",
    direction: "LONG",
    entryOrder: 1.4036,
    entryFill: 0,
    entrySlippage: 0,
    stopOrder: 1.40099,
    stopFill: 0,
    stopSlippage: 0,
    profitTargetOrder: 0,
    profitTargetFill: 0,
    profitTargetSlippage: 0,
    errorInCreateTicket: "",
    errorInEditFills: "",
    ticketIsCreated: false,
    ticketIsSubmitted: false,
    distance: 0,
    rate: 0,
    units: 0,
    contracts: 0,
    quantity: 0
  });
  const [listOfTickets, setListOfTickets] = useState([]);

  async function getRatesFromApi() {
    var originalArray = toUSD;
    var response = await fetch(
      "https://api.exchangeratesapi.io/latest?base=USD"
    );
    var jsonData = await response.json();
    var objOfRates = jsonData.rates;
    originalArray.forEach((A) => {
      A.rate = 1 / objOfRates[A.symbol];
    });
    setToUSD(originalArray);
  }

  useEffect(() => {
    // comment out for unnecessary api calls
    // getRatesFromApi();
  }, []);
  useEffect(() => {
    console.log(ticket);
  }, [ticket]);
  useEffect(() => {
    console.log(listOfTickets);
  }, [listOfTickets]);
  useEffect(() => {
    console.log(moneyManagement);
  }, [moneyManagement]);

  function handleMoneyManagement(event, what) {
    if (what === "tradingEquity") {
      setMoneyManagement((prevMoneyManagement) => ({
        ...prevMoneyManagement,
        [what]: parseInt(event.target.value, 10)
      }));
    }
    if (what === "profitToLossRatio") {
      setMoneyManagement((prevMoneyManagement) => ({
        ...prevMoneyManagement,
        [what]: parseInt(event.target.value, 10)
      }));
    }
    if (what === "lotSize") {
      setMoneyManagement((prevMoneyManagement) => ({
        ...prevMoneyManagement,
        [what]: parseInt(event.target.value, 10)
      }));
    }
    if (what === "riskPerTrade") {
      setMoneyManagement((prevMoneyManagement) => ({
        ...prevMoneyManagement,
        [what]: parseFloat(event.target.value)
      }));
    }
  }
  function handleSomething(event, what, what2) {
    // if (what === "tradingEquity") {
    //   setMoneyManagement((prevMoneyManagement) => ({
    //     ...prevMoneyManagement,
    //     tradingEquity: event.target.value
    //   }));
    // }
    // if (what === "profitToLossRatio") {
    //   setMoneyManagement((prevMoneyManagement) => ({
    //     ...prevMoneyManagement,
    //     profitToLossRatio: event.target.value
    //   }));
    // }
    // if (what === "lotSize") {
    //   setMoneyManagement((prevMoneyManagement) => ({
    //     ...prevMoneyManagement,
    //     lotSize: event.target.value
    //   }));
    // }
    // if (what === "riskPerTrade") {
    //   setMoneyManagement((prevMoneyManagement) => ({
    //     ...prevMoneyManagement,
    //     riskPerTrade: event.target.value
    //   }));
    // }
    if (what === "symbol") {
      setTicket((prevTicket) => ({
        ...prevTicket,
        symbol: event.target.value
      }));
    }
    if (what === "direction") {
      setTicket((prevTicket) => ({
        ...prevTicket,
        direction: event.target.value
      }));
    }
    if (what === "entryOrder") {
      setTicket((prevTicket) => ({
        ...prevTicket,
        entryOrder: parseFloat(event.target.value)
      }));
    }
    if (what === "stopOrder") {
      setTicket((prevTicket) => ({
        ...prevTicket,
        stopOrder: parseFloat(event.target.value)
      }));
    }
  }

  function caclulateDistance() {
    let d = Math.abs(ticket.entryOrder - ticket.stopOrder).toFixed(5);
    return d;
  }
  function calculateRate() {
    let quote = ticket.symbol.substr(ticket.symbol.length - 3);
    let r = toUSD.find((o) => o.symbol === quote);
    return r.rate;
  }
  function calculateUnits(distance, rate) {
    let u = (
      (moneyManagement.tradingEquity * moneyManagement.riskPerTrade) /
      (distance * rate)
    ).toFixed(0);
    return u;
  }
  function calculateContracts(units) {
    let c = Math.trunc(units / moneyManagement.lotSize);
    return c;
  }
  function calculateQuantity(contracts) {
    let q = contracts * moneyManagement.lotSize;
    return q;
  }
  function calculateProfitTargetOrder(quantity, rate) {
    if (ticket.direction === "LONG") {
      let p = (
        ticket.entryOrder +
        (moneyManagement.tradingEquity *
          moneyManagement.riskPerTrade *
          moneyManagement.profitToLossRatio) /
          (quantity * rate)
      ).toFixed(5);
      return parseFloat(p);
    } else {
      let p = (
        ticket.entryOrder -
        (moneyManagement.tradingEquity *
          moneyManagement.riskPerTrade *
          moneyManagement.profitToLossRatio) /
          (quantity * rate)
      ).toFixed(5);
      return parseFloat(p);
    }
  }

  function validate() {
    var errorInCreateTicket = "";

    if (
      (ticket.direction === "LONG" && ticket.entryOrder < ticket.stopOrder) ||
      (ticket.direction === "SHORT" && ticket.entryOrder > ticket.stopOrder)
    ) {
      errorInCreateTicket = "PLEASE CHECH FOR ERRORS!";
      setTicket((prevTicket) => ({
        ...prevTicket,
        errorInCreateTicket: errorInCreateTicket,
        ticketIsCreated: false
      }));
      return false;
    }
    return true;
  }

  function createTicket(event) {
    event.preventDefault();

    const isValid = validate();

    if (isValid) {
      let d = caclulateDistance();
      let r = calculateRate();
      let u = calculateUnits(d, r);
      let c = calculateContracts(u);
      let q = calculateQuantity(c);
      let p = calculateProfitTargetOrder(q, r);

      setTicket((prevTicket) => ({
        ...prevTicket,
        ticketIsCreated: true,
        distance: d,
        rate: r,
        units: u,
        contracts: c,
        quantity: q,
        profitTargetOrder: p,
        errorInCreateTicket: ""
      }));
    }
  }

  function resetTicket() {
    setTicket(() => ({
      id: "",
      date: getDate(),
      symbol: "USDCAD",
      direction: "LONG",
      entryOrder: 1.4036,
      entryFill: 0,
      entrySlippage: 0,
      stopOrder: 1.40099,
      stopFill: 0,
      stopSlippage: 0,
      profitTargetOrder: 0,
      profitTargetFill: 0,
      profitTargetSlippage: 0,
      errorInCreateTicket: "",
      // not sure if needed
      // errorInFills:"",
      ticketIsCreated: false,
      ticketIsSubmitted: false,
      distance: 0,
      rate: 0,
      units: 0,
      contracts: 0,
      quantity: 0
    }));
  }

  function saveTicket() {
    if (ticket.ticketIsCreated) {
      setListOfTickets(() => [
        ...listOfTickets,
        { ...moneyManagement, ...ticket, id: nanoid(5) }
      ]);

      resetTicket();
    }
  }

  function deleteTicket(id) {
    console.log("In delete: " + id);

    setListOfTickets(() => listOfTickets.filter((ticket) => ticket.id !== id));
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <NavBar />

        <Switch>
          <Route exact path="/" render={() => <Info />} />
          <Route
            path="/CreateTicket"
            render={() => (
              <CreateTicket
                ticket={ticket}
                listOfTickets={listOfTickets}
                moneyManagement={moneyManagement}
                listOfSymbols={listOfSymbols}
                createTicket={createTicket}
                saveTicket={saveTicket}
                resetTicket={resetTicket}
                handleSomething={handleSomething}
                handleMoneyManagement={handleMoneyManagement}
              />
            )}
          />
          <Route
            path="/ViewTickets"
            render={() => (
              <ViewTickets
                listOfTickets={listOfTickets}
                setListOfTickets={setListOfTickets}
                handleSomething={handleSomething}
                deleteTicket={deleteTicket}
              />
            )}
          />
          <Route path="/Section4" render={() => <Section4 />} />
          <Route path="*">
            <NoMatch />
            <Redirect from="/noMatch" to="/" />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}
