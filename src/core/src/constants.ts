import { configuration } from './configuration'
import type { AppState } from './types'

export const APP_INITIAL_STATE: AppState = {
  wallets: [],
  walletModules: [],
  chains: [],
  accountCenter: {
    enabled: true,
    position: 'topRight',
    expanded: false,
    showTokenList: true
  },
  notify: {
    enabled: true,
    transactionHandler: () => {},
  },
  notifications: [],
  locale: 'en',
  connect: {}
}

export const STORAGE_KEYS = {
  TERMS_AGREEMENT: 'b-ee.io:agreement',
  LAST_CONNECTED_WALLET: 'b-ee.io:last_connected_wallet',
  BALANCES_SETTING: 'b-ee.io:balances_settings'
}

export const MOBILE_WINDOW_WIDTH = 768



// Balance plugin

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const TOKENS_PRICE_RATE_URL = "https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=";
export const CRYPTO_CURRENCY_ICONS_URL = "https://raw.githubusercontent.com/bee-io/b-ee-cryptocurreny-icons/b2e6cf083052ce6dcbb32d7f5b1166cb7ffd5dcc/svg/";
export const DEFAULT_CACHE_TIMEOUT = 15_000;

export const ETHERSCAN_URL = "https://etherscan.io/address/";
export const BSCSCAN_URL = "https://bscscan.com/address/";
export const POLYGON_URL = "https://polygonscan.com/address/";
export const BALANCE_CONTRACT_LIST = {
  MAINNET: '0xb1f8e55c7f64d203c1400b9d8555d050f94adf39',
  BSC: '0x2352c63A83f9Fd126af8676146721Fa00924d7e4',
  POLYGON: '0x2352c63A83f9Fd126af8676146721Fa00924d7e4',
}
export const NETWORK_LIST = {
  MAINNET: 'Ethereum Mainnet',
  BSC: 'Binance Smart Chain',
  POLYGON: 'Polygon',
}
export const RPC_LIST = {
  MAINNET: 'https://rpc.ankr.com/eth',
  BSC: 'https://bsc-dataseed1.ninicoin.io',
  POLYGON: 'https://polygon-rpc.com',
}

export const CHAIN_IDS = {
  MAINNET: '0x1',
  BSC: '0x38',
  POLYGON: '0x89',
}

export const DIGITS_PRICE = {
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  "10": "10",
};

export const TOGGLE_LIST = {
  On: "true",
  Off: "false",
};

export const SUPPORTED_TOKENS = {
  MAINNET: {
    included:[
      {
        isActive: true,
        address: ZERO_ADDRESS,
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
        name: 'Wrapped Bitcoin',
        symbol: 'WBTC',
        decimals: 8,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        name: 'WETH',
        symbol: 'WETH',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        name: 'Tether',
        symbol: 'USDT',
        decimals: 6,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 6,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0x4Fabb145d64652a948d72533023f6E7A623C7C53",
        name: 'Binance USD',
        symbol: 'BUSD',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
        name: 'Polygon',
        symbol: 'MATIC',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        name: 'Dai',
        symbol: 'DAI',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
        name: 'Shiba Inu',
        symbol: 'SHIB',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
        name: 'Uniswap',
        symbol: 'UNI',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0x2af5d2ad76741191d15dfe7bf6ac92d4bd912ca3",
        name: 'UNUS SED LEO',
        symbol: 'LEO',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0x582d872a1b094fc48f5de31d3b73f2d9be47def1",
        name: 'Toncoin',
        symbol: 'TON',
        decimals: 9,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0x514910771af9ca656af840dff83e8264ecf986ca",
        name: 'Chainlink',
        symbol: 'LINK',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0x8D983cb9388EaC77af0474fA441C4815500Cb7BB",
        name: 'Cosmos',
        symbol: 'ATOM',
        decimals: 6,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0xA0b73E1Ff0B80914AB6fe0444E65848C4C34450b",
        name: 'Cronos',
        symbol: 'CRO',
        decimals: 8,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0x75231f58b43240c9718dd58b4967c5114342a86c",
        name: 'OKB',
        symbol: 'OKB',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0x4d224452801aced8b2f0aebe155379bb5d594381",
        name: 'ApeCoin',
        symbol: 'APE',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      }
    ],
    excluded:[]
  },
  BSC: {
    included:[
      {
        isActive: true,
        address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
        name: 'Wrapped Bitcoin',
        symbol: 'WBTC',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0x55d398326f99059fF775485246999027B3197955",
        name: 'Tether',
        symbol: 'USDT',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: ZERO_ADDRESS,
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
        name: 'Binance USD',
        symbol: 'BUSD',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe",
        name: 'XRP',
        symbol: 'XRP',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0xbA2aE424d960c26247Dd6c32edC70B295c744C43",
        name: 'DOGE',
        symbol: 'DOGE',
        decimals: 8,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0x3ee2200efb3400fabb9aacf31297cbdd1d435d47",
        name: 'Cardano',
        symbol: 'ADA',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0xCC42724C6683B7E57334c4E856f4c9965ED682bD",
        name: 'Polygon',
        symbol: 'MATIC',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
        name: 'Dai',
        symbol: 'DAI',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402",
        name: 'Polkadot',
        symbol: 'DOT',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0xce7de646e7208a4ef112cb6ed5038fa6cc6b12e3",
        name: 'Tron',
        symbol: 'TRX',
        decimals: 6,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0x4338665CBB7B2485A8855A139b75D5e34AB0DB94",
        name: 'Litecoin',
        symbol: 'LTC',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0x2859e4544C4bB03966803b044A93563Bd2D0DD4D",
        name: 'Shiba Inu',
        symbol: 'SHIB',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0xBf5140A22578168FD562DCcF235E5D43A02ce9B1",
        name: 'Uniswap',
        symbol: 'UNI',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0x1CE0c2827e2eF14D5C4f29a091d735A204794041",
        name: 'Avalanche',
        symbol: 'AVAX',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0x76A797A59Ba2C17726896976B7B3747BfD1d220f",
        name: 'Toncoin',
        symbol: 'TON',
        decimals: 9,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD",
        name: 'Chainlink',
        symbol: 'LINK',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0x0Eb3a705fc54725037CC9e008bDede697f62F335",
        name: 'Cosmos',
        symbol: 'ATOM',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0x3d6545b08693dae087e957cb1180ee38b9e3c25e",
        name: 'Ethereum Classic',
        symbol: 'ETC',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0x8fF795a6F4D97E7887C79beA79aba5cc76444aDf",
        name: 'Bitcoin Cash',
        symbol: 'BCH',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      }

    ],
    excluded:[]
  },
  POLYGON: {
    included:[
      {
        isActive: true,
        address: ZERO_ADDRESS,
        name: 'Polygon',
        symbol: 'MATIC',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
        name: 'Tether',
        symbol: 'USDT',
        decimals: 6,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 6,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
        name: 'WETH',
        symbol: 'WETH',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0x3BA4c387f786bFEE076A58914F5Bd38d668B42c3",
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
        name: 'Wrapped Bitcoin',
        symbol: 'WBTC',
        decimals: 8,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
        name: 'Dai',
        symbol: 'DAI',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0xb33EaAd8d922B1083446DC23f610c2567fB5180f",
        name: 'Uniswap',
        symbol: 'UNI',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39",
        name: 'Chainlink',
        symbol: 'LINK',
        decimals: 18,
        balance:'0',
        price:'0',
        rateToUSD:0
      },
      {
        isActive: true,
        address: "0xac51C4c48Dc3116487eD4BC16542e27B5694Da1b",
        name: 'Cosmos',
        symbol: 'ATOM',
        decimals: 6,
        balance:'0',
        price:'0',
        rateToUSD:0
      }
    ],
    excluded:[]
  },
}
export const SUPPORTED_NETWORKS = [
  {
    name: NETWORK_LIST.MAINNET,
    balancesContract: BALANCE_CONTRACT_LIST.MAINNET,
    rpc: RPC_LIST.MAINNET,
    chainId: CHAIN_IDS.MAINNET,
    tokens: SUPPORTED_TOKENS.MAINNET,
    scanUrl:ETHERSCAN_URL,
    totalBalance: "0",
  },
  {
    name: NETWORK_LIST.BSC,
    balancesContract:  BALANCE_CONTRACT_LIST.BSC,
    rpc: RPC_LIST.BSC,
    chainId: CHAIN_IDS.BSC,
    tokens: SUPPORTED_TOKENS.BSC,
    scanUrl:BSCSCAN_URL,
    totalBalance: "0",
  },
  {
    name: NETWORK_LIST.POLYGON,
    balancesContract:  BALANCE_CONTRACT_LIST.POLYGON,
    rpc: RPC_LIST.POLYGON,
    chainId: CHAIN_IDS.POLYGON,
    tokens: SUPPORTED_TOKENS.POLYGON,
    scanUrl:POLYGON_URL,
    totalBalance: "0",
  }

];


export const DEFAULT_SETTING_LIST = {
  enableTotalByAllTokens: TOGGLE_LIST.On,
  digitsPrice: DIGITS_PRICE["6"],
  ethRpc: RPC_LIST.MAINNET,
  bscRpc: RPC_LIST.BSC,
  polygonRpc: RPC_LIST.POLYGON,
  defaultConfig: SUPPORTED_NETWORKS,
};
