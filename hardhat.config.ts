import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.19", // Ensure this matches your pragma statements in your .sol files
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/", // Default Hardhat network URL
    },
    // You can add other networks here, e.g., Sepolia testnet
    // sepolia: {
    //   url: process.env.SEPOLIA_RPC_URL || "", // Use environment variable for RPC URL
    //   accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [], // Use environment variable for private key
    // },
  },
  // Optionally, you can add named accounts for easier access in scripts/tests
  // namedAccounts: {
  //   deployer: {
  //     default: 0, // here this will by default take the first account as deployer
  //   },
  // },
};

export default config;