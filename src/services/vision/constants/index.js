export const FACTORY_ADDRESS = "0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac";

export const BUNDLE_ID = "1";

export const timeframeOptions = {
  WEEK: "1 week",
  MONTH: "1 month",
  // THREE_MONTHS: '3 months',
  // YEAR: '1 year',
  ALL_TIME: "All time",
};

// token list urls to fetch tokens from - use for warnings on tokens and pairs
export const SUPPORTED_LIST_URLS__NO_ENS = [
  `${window.location.protocol}//${window.location.host}/tokens.json`,
];

// hide from overview list
export const OVERVIEW_TOKEN_BLACKLIST = [
  "0x495c7f3a713870f68f8b418b355c085dfdc412c3",
  "0xc3761eb917cd790b30dad99f6cc5b4ff93c4f9ea",
  "0xe31debd7abff90b06bca21010dd860d8701fd901",
  "0xfc989fbb6b3024de5ca0144dc23c18a063942ac1",
];

// pair blacklist
export const PAIR_BLACKLIST = ["0xb6a741f37d6e455ebcc9f17e2c16d0586c3f57a5"];

/**
 * For tokens that cause erros on fee calculations
 */
export const FEE_WARNING_TOKENS = [
  "0xd46ba6d942050d489dbd938a2c909a5d5039a161",
];

// sushiswap related token whitelist, must be lowercase
export const TOKEN_WHITELIST = [
  "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2",
  "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  "0xdac17f958d2ee523a2206206994597c13d831ec7",
  "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  "0x6b175474e89094c44da98b954eedeac495271d0f",
  "0x57ab1ec28d129707052df4df418d58a2d46d5f51",
  "0x04fa0d235c4abf4bcf4787af4cf447de572ef828",
  "0xba11d00c5f74255f56a5e366f4f77f5a186d7f55",
  "0x514910771af9ca656af840dff83e8264ecf986ca",
  "0xd46ba6d942050d489dbd938a2c909a5d5039a161",
  "0xc00e94cb662c3520282e6f5717214004a7f26888",
  "0x80fb784b7ed66730e8b1dbd9820afd29931aab03",
  "0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f",
  "0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e",
  "0x408e41876cccdc0f92210600ef50372656052a38",
  "0x476c5e26a75bd202a9683ffd34359c0cc15be0ff",
  "0xaba8cac6866b83ae4eec97dd07ed254282f6ad8a",
  "0xd533a949740bb3306d119cc777fa900ba034cd52",
];

export const SUSHI_TOKENS = [
  {
    address: "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2",
    chainId: 1,
    name: "SushiSwap",
    symbol: "SUSHI",
    decimals: 18,
    logoURI:
      "https://raw.githubusercontent.com/sushiswapclassic/token-list/master/assets/SUSHI.png",
  },
  {
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    chainId: 1,
    name: "WrappedEther",
    symbol: "WETH",
    decimals: 18,
    logoURI:
      "https://1inch.exchange/assets/tokens/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png",
  },
  {
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    chainId: 1,
    name: "TetherUSD",
    symbol: "USDT",
    decimals: 6,
    logoURI:
      "https://1inch.exchange/assets/tokens/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
  },
  {
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    chainId: 1,
    name: "USDCoin",
    symbol: "USDC",
    decimals: 6,
    logoURI:
      "https://1inch.exchange/assets/tokens/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
  },
  {
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    chainId: 1,
    name: "DaiStablecoin",
    symbol: "DAI",
    decimals: 18,
    logoURI:
      "https://1inch.exchange/assets/tokens/0x6b175474e89094c44da98b954eedeac495271d0f.png",
  },
  {
    address: "0x57Ab1ec28D129707052df4dF418D58a2D46d5f51",
    chainId: 1,
    name: "SynthsUSD",
    symbol: "sUSD",
    decimals: 18,
    logoURI:
      "https://1inch.exchange/assets/tokens/0x57ab1ec28d129707052df4df418d58a2d46d5f51.png",
  },
  {
    address: "0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828",
    chainId: 1,
    name: "UMAVotingTokenv1",
    symbol: "UMA",
    decimals: 18,
    logoURI:
      "https://1inch.exchange/assets/tokens/0x04fa0d235c4abf4bcf4787af4cf447de572ef828.png",
  },
  {
    address: "0xBA11D00c5f74255f56a5E366F4F77f5A186d7f55",
    chainId: 1,
    name: "BandProtocol",
    symbol: "BAND",
    decimals: 18,
    logoURI:
      "https://1inch.exchange/assets/tokens/0xba11d00c5f74255f56a5e366f4f77f5a186d7f55.png",
  },
  {
    address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    chainId: 1,
    name: "ChainLink",
    symbol: "LINK",
    decimals: 18,
    logoURI:
      "https://1inch.exchange/assets/tokens/0x514910771af9ca656af840dff83e8264ecf986ca.png",
  },
  {
    address: "0xD46bA6D942050d489DBd938a2C909A5d5039A161",
    chainId: 1,
    name: "Ampleforth",
    symbol: "AMPL",
    decimals: 9,
    logoURI:
      "https://1inch.exchange/assets/tokens/0xd46ba6d942050d489dbd938a2c909a5d5039a161.png",
  },
  {
    address: "0xc00e94Cb662C3520282E6f5717214004A7f26888",
    chainId: 1,
    name: "Compound",
    symbol: "COMP",
    decimals: 18,
    logoURI:
      "https://1inch.exchange/assets/tokens/0xc00e94cb662c3520282e6f5717214004a7f26888.png",
  },
  {
    address: "0x80fB784B7eD66730e8b1DBd9820aFD29931aab03",
    chainId: 1,
    name: "EthLend",
    symbol: "LEND",
    decimals: 18,
    logoURI:
      "https://1inch.exchange/assets/tokens/0x80fb784b7ed66730e8b1dbd9820afd29931aab03.png",
  },
  {
    address: "0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F",
    chainId: 1,
    name: "SynthetixNetworkToken",
    symbol: "SNX",
    decimals: 18,
    logoURI:
      "https://1inch.exchange/assets/tokens/0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f.png",
  },
  {
    address: "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e",
    chainId: 1,
    name: "yearn.finance",
    symbol: "YFI",
    decimals: 18,
    logoURI:
      "https://1inch.exchange/assets/tokens/0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e.png",
  },
  {
    address: "0x408e41876cCCDC0F92210600ef50372656052a38",
    chainId: 1,
    name: "Republic",
    symbol: "REN",
    decimals: 18,
    logoURI:
      "https://1inch.exchange/assets/tokens/0x408e41876cccdc0f92210600ef50372656052a38.png",
  },
  {
    address: "0x476c5E26a75bd202a9683ffD34359C0CC15be0fF",
    chainId: 1,
    name: "Serum",
    symbol: "SRM",
    decimals: 6,
    logoURI:
      "https://1inch.exchange/assets/tokens/0x476c5e26a75bd202a9683ffd34359c0cc15be0ff.png",
  },
  {
    address: "0xAba8cAc6866B83Ae4eec97DD07ED254282f6aD8A",
    chainId: 1,
    name: "YAMv2",
    symbol: "YAMv2",
    decimals: 24,
    logoURI:
      "https://1inch.exchange/assets/tokens/0xaba8cac6866b83ae4eec97dd07ed254282f6ad8a.png",
  },
  {
    address: "0xD533a949740bb3306d119CC777fa900bA034cd52",
    chainId: 1,
    name: "CurveDAOToken",
    symbol: "CRV",
    decimals: 18,
    logoURI:
      "https://1inch.exchange/assets/tokens/0xd533a949740bb3306d119cc777fa900ba034cd52.png",
  },
];
