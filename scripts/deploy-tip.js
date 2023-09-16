//import { ethers } from "hardhat";

async function deploy() {
  const Tip = await ethers.getContractFactory("TipAttendantsContract");
  const tip = await Tip.deploy();
  await tip.deployed();

  return tip;
}

async function localFunctionTip(tip) {
  const array = [
    {
      wallet: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      tip: 100,
    },
  ];
  await tip.sendTips(array);
  // localFunctionSendTip(tip);
}

async function localFunctionSendTip(tip) {
  await tip.receiveTip();
  console.log("sent tip!");
}

deploy();
// .then(localFunctionTip);
