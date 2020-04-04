module.exports = {
  networks: {
    ganache: {
      protocol: 'http',
      host: '127.0.0.1',
      port: 7545,
      gas: 5000000,
      gasPrice: 5e9,
      networkId: '*',
    },

    development: {
      protocol: 'http',
      host: '127.0.0.1',
      port: 9545,
      gas: 5000000,
      gasPrice: 5e9,
      networkId: '*',
    },
  },
}
