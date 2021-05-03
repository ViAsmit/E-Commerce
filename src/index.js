import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Album from "./Components/Album";
import Footer from "./Components/Footer";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";

const routing = (
  <Router>
    <React.StrictMode>
      {/* <Header /> */}
      <Switch>
        <Route exact path="/" component={Album} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />
      </Switch>
      <Footer />
    </React.StrictMode>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
