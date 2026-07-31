# Stellar Full-Stack Cheat Sheet

- Use Freighter for browser wallet connection.
- Use Stellar SDK server-side for account lookup, memo construction, and transaction helpers.
- Use Soroban SDK in Rust for deterministic payments state.
- Keep secret keys out of frontend code.
- Use testnet SAC contract IDs for XLM and USDC during demos.
- Store local demo records in Prisma SQLite, then reconcile with on-chain event IDs.
