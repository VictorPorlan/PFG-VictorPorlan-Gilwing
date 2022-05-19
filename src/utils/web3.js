import Web3 from "web3";
 
let web3;
 
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "atom galaxy want baby strike alarm duck library shaft visual evoke planet",
    "https://rinkeby.infura.io/v3/5900cfbb7ceb4a5d8b7a0c112a20d221"  );
  web3 = new Web3(provider);
}
 
export default web3;