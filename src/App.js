import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserList from "./components/UserList/UserList";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import UserDetails from "./components/UserDetails/UserDetails";
import Photos from "./components/Photos/Photos";
import CreateComment from "./components/CreateComment/CreateComment";

const App = () => {

  return (
    <div data-testId = "app">
      <Router>
        <HeaderComponent />
        <div className="container">
          <Switch>
            <Route path="/" exact component={UserList}></Route>
            <Route path = "/user/:id" component = {UserDetails}></Route> 
            <Route path = "/albums/:id/photos" component = {Photos}></Route> +
            <Route path = "/posts/:id/comments" component = {CreateComment}></Route> +
          </Switch>
        </div>
        <FooterComponent/>
      </Router>
    </div>
  );
};

export default App;
