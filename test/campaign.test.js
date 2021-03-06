const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../src/eth/build/Factory.json");
const compiledCampaign = require("../src/eth/build/Campaign.json");

let accounts;
let factory;

let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  factory = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: "5000000" });

  await factory.methods
    .createCampaign("100", "Kickstarter", "Descripción")
    .send({ from: accounts[0], gas: "5000000" });
  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
});

describe("Campaigns", () => {
  it("deploy factory y campaign", () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it("marks caller as the manager", async () => {
    let manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  });
  it("become a donator", async () => {
    await campaign.methods.newDonatorContribution("Víctor", "Disfruta la donación").send({
      value:"200",
      from: accounts[1],
      gas: "5000000"
    })
    let isDonator = campaign.methods.members(accounts[1]).call()
    assert(isDonator)
  });

  it("correct name and comment", async () => {
    await campaign.methods.newDonatorContribution("Víctor", "Disfruta la donación").send({
      value:"200",
      from: accounts[1],
      gas: "5000000"
    })
    let donations = await campaign.methods.getDonations(accounts[1]).call()
    let donator =await campaign.methods.members(accounts[1]).call()
    let isCorrect = donations[0].comment === "Disfruta la donación" && donator.name === "Víctor"
    assert(isCorrect)
  })
  
  it("multiple donations", async () => {
    await campaign.methods.newDonatorContribution("Víctor", "Disfruta la donación").send({
      value:"200",
      from: accounts[1],
      gas: "5000000"
    })

    await campaign.methods.addDonation("Mi segunda donación").send({
      value:"200",
      from: accounts[1],
      gas: "5000000"
    })
    let donations = await campaign.methods.getDonations(accounts[1]).call()
    assert(donations.length = 2)

  });

  it("require minimum contribution", async () => {
    let executed;
    try {
      await campaign.methods.newDonatorContribution("Víctor", "Disfruta la donación").send({
        value:"5",
        from: accounts[1],
        gas: "5000000"
      })
  
      executed = "succ";
    } catch (err) {
      executed = "fail";
    }
    assert.equal("fail", executed);
  });

  it("require create new donatior profile", async () => {
    let executed;
    try {
      await campaign.methods.newDonatorContribution("Víctor", "Disfruta la donación").send({
        value:"200",
        from: accounts[1],
        gas: "5000000"
      })
  
      await campaign.methods.newDonatorContribution("Víctor", "Intento crear segunda donacion").send({
        value:"200",
        from: accounts[1],
        gas: "5000000"
      })

      executed = "succ";
    } catch (err) {
      executed = "fail";
    }
    assert.equal("fail", executed);
  });

  it("require created profile to add", async () => {
    let executed;
    try {
      await campaign.methods.addDonation("Mi primera donación").send({
        value:"200",
        from: accounts[1],
        gas: "5000000"
      })

      executed = "succ";
    } catch (err) {
      executed = "fail";
    }
    assert.equal("fail", executed);
  });

  it("memberList adds addresses", async () => {
      await campaign.methods.newDonatorContribution("Víctor", "Disfruta la donación").send({
        value:"200",
        from: accounts[1],
        gas: "5000000"
      })
      let list = await campaign.methods.getMemberList().call()

      assert(list.length === 1);

      await campaign.methods.newDonatorContribution("Víctor", "Intento crear segunda donacion").send({
        value:"200",
        from: accounts[2],
        gas: "5000000"
      })

      list = await campaign.methods.getMemberList().call()
    
    assert(list.length === 2);
  });

});
