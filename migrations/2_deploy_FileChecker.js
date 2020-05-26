var FileChecker = artifacts.require("./FileCheck.sol");

module.exports = function(deployer) {
  deployer.deploy(FileChecker);
};
