// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const ToDoList = await hre.ethers.getContractFactory("ToDoList");
  const toDoList = await ToDoList.deploy();

  await toDoList.deployed();

  console.log("Lock with 1 ETH deployed to:", toDoList.address);

  console.log("toDoList", toDoList);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
