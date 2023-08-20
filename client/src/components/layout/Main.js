import React, { Component } from 'react';
import "../../App.css";
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

class Main extends Component {
    render() {
        return (
            <div className="App">
            <Navbar/>
              <Outlet> </Outlet>
            <Footer/>
          </div>
        );
    }
}

export default Main;