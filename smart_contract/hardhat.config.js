require("@nomiclabs/hardhat-waffle");


module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/0ntn4ehpbpe9TDUEC7TxvwhBl0WM0nbG",
      accounts: [
        "b6028bd66d70dc2cac1b1c6847b2b510e9f3967d3e924a04a687abdad7473c5d",
      ],
    },
  },
};
