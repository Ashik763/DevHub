import React, { Component } from "react";
import { BrowserRouter as Router, Route,Switch, RouterProvider } from "react-router-dom";
import {Provider} from 'react-redux';
import "./App.css";

import { routes } from "./Routes/Routes";
import store from "./store";



class App extends Component {
  render(){
    return (
      <Provider store={store}>
      <div className="">
          <RouterProvider router={routes} > </RouterProvider>
   
      </div>
      </Provider>
    );

  }
  
}

export default App;
