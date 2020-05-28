import React, { Component } from 'react';

import './App.css';
import Web3 from 'web3';
import { sha256 } from 'js-sha256'

import Header from './Header/Header';
import Main from './Main/Main';
import SideNav from './SideNav/SideNav';
import Footer from './Footer/Footer';
import { ABI, ADDRESS } from './config/contract';

class App extends Component {

  componentDidMount = () => {
    //business logic here like Web3 and http request functions
    this.loadBlockchainData();
  }

  //Web3 functions to load up blockChain and smart contract data
  async loadBlockchainData() {
    if(this.state.userPublicKey)
      this.setState({
        isLoading: true
      });
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const accounts = await web3.eth.getAccounts();
    this.setState({ userPublicKey: accounts[0] });
    const FileBlockchain = new web3.eth.Contract(ABI, ADDRESS);
    // const taskCount = await todoList.methods.taskCount().call()
    this.setState({ FileBlockchain });
    this.setState({
      isLoading: false
    });
  }



  //to toggle dropdown menu of the upload menu
  DropDownMenuToggled = () => {
    let currentUploadMenu = this.state.UploadMenu;
    this.setState({
      UploadMenu: !currentUploadMenu
    });
  }


  //To handle file upload
  fileUploadHandler = async(file) => {
    let fr = new FileReader();

    fr.onload = async() => {
      let bf = fr.result;
      let arr = new Uint8Array(bf);
      let hexString = "";

      for (let i = 0; i < arr.length; i++)
        hexString += arr[i].toString(16);

      let hash = "0x" + sha256(hexString);
      
      const results = await this.state.FileBlockchain.methods.insertFile(hash, this.state.userPublicKey, file.name).send(
        {
          from: this.state.userPublicKey
        }
      );

      if(results.events['NewUpload'])
        alert("New File Uploaded");
      else if(results.events['DuplicateUpload'])
        alert("Duplicate Upload: Bandwidth saved");
      else if(results.events['DuplicateUploadAndUser'])
        alert("Duplicate User and File: Bandwidth saved");
    }

    fr.readAsArrayBuffer(file);
  }


  //state of the component. use setState to change the state. NOTE: change in state forces a rerender cycle
  state = {
    isLoading: true,
    files: [],
    userPublicKey: null,
    UploadMenu: false
  };

  //main function to call that renders the elements on screen
  render = () => {
    //Bare skeleton structure
    return (
      <div className="container">
        {!this.state.isLoading ?
        <React.Fragment> 
          <Header 
          uploadOnClick={(file) => this.DropDownMenuToggled(file)} 
          uploadMenu={this.state.UploadMenu}
          account={this.state.userPublicKey}
          uploadFile={(file) => this.fileUploadHandler(file)}
          />
          <SideNav />
          <Main />
          <Footer />
        </React.Fragment>
          : null}
      </div>
    );
  }
}

export default App;
