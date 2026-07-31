import { Networks } from "@stellar/stellar-sdk";

type QuoteInput = {
  recordId: string;
  amount: number;
  asset: "XLM" | "USDC";
  destination: string;
  project: string;
  method: string;
};

export function buildActionQuote(input: QuoteInput) {
  const memo = `trustline-spring-cleaning-tool:${input.recordId}`.slice(0, 28);
  const params = new URLSearchParams({
    destination: input.destination,
    amount: input.amount.toFixed(2),
    asset_code: input.asset,
    memo,
    msg: input.project,
  });

  return {
    networkPassphrase: Networks.TESTNET,
    rpcUrl: process.env.STELLAR_RPC_URL ?? "https://soroban-testnet.stellar.org",
    horizonUrl: process.env.HORIZON_URL ?? "https://horizon-testnet.stellar.org",
    contractMethod: input.method,
    memo,
    sep7: `web+stellar:pay?${params.toString()}`,
  };
}
