import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "hardhat-deploy";
import "@nomiclabs/hardhat-etherscan";

const ACCOUNT_A_PRIVATE_KEY = "";
const ACCOUNT_B_PRIVATE_KEY = "";
const ROPSTEN_RPC_URL = "";
const API_KEY = "";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export default {
  solidity: {
    version: "0.8.6",
    settings: {
      optimizer: {
        enabled: false,
        runs: 1000,
      },
    },
  },
  namedAccounts: {
    deployer: 0,
  },
  networks: {
    hardhat: {},
    ganache: {
      url: "HTTP://127.0.0.1:7545",
      accounts: [ACCOUNT_A_PRIVATE_KEY],
      chainId: 1337,
    },
    'ROPSTEN': {
      url: ROPSTEN_RPC_URL,
      accounts: [ACCOUNT_A_PRIVATE_KEY, ACCOUNT_B_PRIVATE_KEY],
      chainId: 3,
    },
  },
  mocha: {
    timeout: 500000,
  },
  typechain: {
    outDir: "artifacts/types",
  },
  etherscan: {
    apiKey: API_KEY,
  },
};
