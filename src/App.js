import React, { Component } from 'react';

import './App.css';
import Web3 from 'web3';

import Header from './Header/Header';
import Main from './Main/Main';
import SideNav from './SideNav/SideNav';
import Footer from './Footer/Footer';
import UploadMenu from './UploadMenu/UploadMenu';

class App extends Component {

  componentDidMount = () => { // or willMount. wait up will confirm
    //business logic here
    //Web3 and http request functions
  }

  DropDownMenuToggled = () => {
    let currentUploadMenu = this.state.UploadMenu;
    this.setState({
      UploadMenu: !currentUploadMenu
    });
    console.log("lol");
  }


  state = {
    files: [],
    userPrivateKey: null,
    UploadMenu: false
  };

  render = () => {
    return (
      <div className="container">
          <Header uploadOnClick={() => this.DropDownMenuToggled()} uploadMenu={this.state.UploadMenu}/>
          <SideNav />
          <Main />
          <Footer />
          {/* Until up above is bare skeleton. Below is for debugging The dropdown menu for uploading */}
      </div>
    );
  }
}

export default App;
