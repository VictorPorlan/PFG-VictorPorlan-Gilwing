const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../eth/build/CampaignFactory.json");
const compiledCampaign = require("../eth/build/Campaign.json");

let accounts;
let factory;

let campaignAddress;
let campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    factory = await new web3.eth.Contract(compiledFactory.abi)
      .deploy({ data: compiledFactory.evm.bytecode.object })
      .send({ from: accounts[0], gas: "2000000" });
  
    await factory.methods
      .createCampaign("100", "Kickstarter", "Descripción")
      .send({ from: accounts[0], gas: "2000000" });
    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
    campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
  });

describe("Campaigns", () => {
    it("deploy factory y campaign", () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
      });
})