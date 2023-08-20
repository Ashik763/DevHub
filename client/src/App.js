import React, { Component } from "react";
import { BrowserRouter as Router, Route,Switch, RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import { routes } from "./Routes/Routes";

class App extends Component {
  render(){
    return (
      <div className="">
          <RouterProvider router={routes} > </RouterProvider>
   
      </div>
    );

  }
  
}

export default App;
