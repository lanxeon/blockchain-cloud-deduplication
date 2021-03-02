const express = require("express");
const bp = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

//smart contract imports
const Web3 = require('web3');
const contract = require('truffle-contract');
const artifacts = require('../build/contracts/FileCheck.json');

//routers
const userRouter = require("./routes/UserRoutes");
const cloudRouter = require("./routes/FileRoutes");

let accounts, lms;

const app = express();
mongoose
	.connect("mongodb+srv://lanxion:Theandre2131@cluster0-e3flj.mongodb.net/blockchain-dedup?retryWrites=true&w=majority", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(async() => {
		console.log("MongoDB connection successful!");

		try {
			//setting up blockchain connection
			if (typeof web3 !== 'undefined') {
				var web3 = new Web3(web3.currentProvider)
			  } else {
				var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
			}
	
			const LMS = contract(artifacts);
			LMS.setProvider(web3.currentProvider);
	
			accounts = await web3.eth.getAccounts();
			lms = await LMS.deployed();

			console.log("Backend connected to Blockchain!");
		} catch(err) {
			console.log("Something went wrong connecting to blockchain!\nDetails: " + {lms, accounts});
		}
	})
	.catch(() => {
		console.log("MongoDB connection failed :(");
	});

//body-parser middleware
app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));
app.use("/files", express.static(path.join("backend/files")));

//For enabling CORS
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");

	next();
});

//for passing on smart contract variables to req
app.use((req, res, next) => {
	req.lms = lms;
	req.accounts = accounts;
});

//routes
app.use("/user", userRouter);
app.use("/cloud", cloudRouter);

module.exports = app;
