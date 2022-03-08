const hre = require('hardhat')


const main = async () => {
 

  // We get the contract to deploy
  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy();

  await transactions.deployed();

  console.log("transactions deployed to:", transactions.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch {
console.error(error);
process.exit(1);
  }
}

runMain();
