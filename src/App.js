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
import RegisterForm from "./components/registerForm";
import jwtDecode from "jwt-decode";
import Logout from "./components/logout";

class App extends Component {
  state = {};
  componentDidMount() {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      const user = jwtDecode(jwt);
      this.setState({ user });
    }
  }
  render() {
    return (
      <div className="App">
        <ToastContainer />
        <Navbar user={this.state.user} />
        <Switch>
          <Redirect exact from="/" to="/movies" />
          <Route
            path="/movies/:id"
            render={props => {
              if (!this.state.user) return <Redirect to="/login" />;
              return <MovieForm {...props} />;
            }}
          />
          <Route
            path="/movies"
            render={props => {
              return <Movies {...props} user={this.state.user} />;
            }}
          />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route
            path="/login"
            render={props => {
              return <LoginForm {...props} user={this.state.user} />;
            }}
          />
          <Route path="/register" component={RegisterForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/notfound" component={NotFound} />
          <Redirect to="/notfound" />
        </Switch>
      </div>
    );
  }
}

export default App;
