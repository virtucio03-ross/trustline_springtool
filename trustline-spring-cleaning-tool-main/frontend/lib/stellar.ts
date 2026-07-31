import { isConnected, getAddress } from "@stellar/freighter-api";

export async function connectFreighter(): Promise<string | null> {
  try {
    const connected = await isConnected();
    if (!connected) return null;
    const response = await getAddress();
    return response.address;
  } catch {
    return null;
  }
}

export function buildSep7PaymentUri(input: { destination: string; amount: string; memo: string }) {
  const params = new URLSearchParams({
    destination: input.destination,
    amount: input.amount,
    asset_code: "XLM",
    memo: input.memo,
    msg: "Trustline Spring Cleaning Tool",
  });
  return `web+stellar:pay?${params.toString()}`;
}
