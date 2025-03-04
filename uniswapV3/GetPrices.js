// https://github.com/Uniswap/v3-periphery/blob/main/deploys.md
// https://docs.uniswap.org/sdk/v3/guides/swaps/trading

const ethers = require("ethers");
const {
  abi: QuoterABI,
} = require("@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json");
require("dotenv").config();

// Mainenet provider
const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
);

async function getPrice(fromToken, toToken, amountInHuman) {
  const quoterAddress = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6";

  const quoterContract = new ethers.Contract(
    quoterAddress,
    QuoterABI,
    provider
  );

  const amountIn = ethers.utils.parseUnits(amountInHuman, 6); // 6 decimals

  const quoteAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
    fromToken,
    toToken,
    3000, // Fee, check out the SDK documentation (immutables.fee).
    amountIn.toString(),
    0
  );

  const amount = ethers.utils.formatUnits(quoteAmountOut.toString(), 18);
  return amount;
}

const main = async () => {
  // Network: Ethereum
  const fromToken = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"; // USDC
  const toToken = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; // WETH
  const amountInHuman = "3540"; // current ETH value

  const amountOut = await getPrice(fromToken, toToken, amountInHuman);
  console.log(amountOut);
};

main();
