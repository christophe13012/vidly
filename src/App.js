import React, { Component } from "react";
import "./App.css";
import Movies from "./components/movies";
import Customers from "./components/customers;";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/navBar";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ToastContainer />
        <Navbar />
        <Switch>
          <Redirect exact from="/" to="/movies" />
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/login" component={LoginForm} />
          <Route path="/notfound" component={NotFound} />
          <Redirect to="/notfound" />
        </Switch>
      </div>
    );
  }
}

export default App;
