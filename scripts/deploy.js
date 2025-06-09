// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require('hardhat');

const tokens = (n) => {
  return ethers.parseUnits(n.toString(), 'ether');
}

async function main() {
  const [buyer, seller, inspector, lender] = await ethers.getSigners();

  // Deploy RealEstate contract
  const RealEstate = await ethers.getContractFactory('RealEstate');
  const realEstate = await RealEstate.deploy();
  console.log("RealEstate deployed to:", realEstate.target); // Use .target instead of .address

  console.log("Minting 3 properties...");
  for(let i = 0; i < 3; i++) {
    const transaction = await realEstate.connect(seller).mint(
      `https://ipfs.io/ipfs/QmQVcpsjrA6cr1iJjZAodYwmPekYgbnXGo4DFubJiLc2EB/${i + 1}.json`
    );
    await transaction.wait();
  }

  // Deploy Escrow contract
  const Escrow = await ethers.getContractFactory('Escrow');
  const escrow = await Escrow.deploy(
    realEstate.target, // Use .target here
    seller.address,
    inspector.address,
    lender.address
  );
  
  console.log("Escrow deployed to:", escrow.target);

  // Approve and list properties
  for(let i = 1; i <= 3; i++) {
    let transaction = await realEstate.connect(seller).approve(escrow.target, i);
    await transaction.wait();
    
    transaction = await escrow.connect(seller).list(
      i,
      tokens(20 - (i-1)*5), // Prices: 20, 15, 10 ETH
      tokens(10 - (i-1)*5), // Deposits: 10, 5, 5 ETH
      buyer.address
    );
    await transaction.wait();
  }

  console.log("Finished deployment and listing!");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});