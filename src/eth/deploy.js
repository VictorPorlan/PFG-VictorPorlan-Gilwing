const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/Factory.json");
const path = require("path");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");

fs.ensureDirSync(buildPath);

const provider = new HDWalletProvider(
  "atom galaxy want baby strike alarm duck library shaft visual evoke planet",
  "https://rinkeby.infura.io/v3/5900cfbb7ceb4a5d8b7a0c112a20d221"
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ gas: "5000000", from: accounts[0] });

    fs.writeFileSync(
      path.resolve(buildPath, `FactoryAddress.json`),
      JSON.stringify({factory: result.options.address}, null, 2),
      "utf8"
    );
    console.log("Contract deployed at", result.options.address);

  };
deploy();
