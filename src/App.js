import React, { Component } from 'react';

import './App.css';
import Web3 from 'web3';

import Header from './Header/Header';
import Main from './Main/Main';
import SideNav from './SideNav/SideNav';
import Footer from './Footer/Footer';
import { ABI, ADDRESS } from './config/contract';

class App extends Component {

  componentWillMount = () => { // or willMount. wait up will confirm
    //business logic here
    //Web3 and http request functions
    this.loadBlockchainData();
  }

  //Web3 functions to load up blockChain and smart contract data
  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const accounts = await web3.eth.getAccounts();
    this.setState({ userPublicKey: accounts[0] });
    const FileBlockchain = new web3.eth.Contract(ABI, ADDRESS);
    // const taskCount = await todoList.methods.taskCount().call()
    this.setState({ FileBlockchain });
  }



  //to toggle dropdown menu of the upload menu
  DropDownMenuToggled = () => {
    let currentUploadMenu = this.state.UploadMenu;
    this.setState({
      UploadMenu: !currentUploadMenu
    });
  }


  //state of the component. use setState to change the state. NOTE: change in state forces a rerender cycle
  state = {
    files: [],
    userPublicKey: null,
    UploadMenu: false
  };

  //main function to call that renders the elements on screen
  render = () => {
    //Bare skeleton structure
    return (
      <div className="container">
          <Header 
          uploadOnClick={() => this.DropDownMenuToggled()} 
          uploadMenu={this.state.UploadMenu}
          account={this.state.userPublicKey}
          />
          <SideNav />
          <Main />
          <Footer />
      </div>
    );
  }
}

export default App;
