# Trustline Spring Cleaning Tool

Trustline Spring Cleaning Tool addresses this by turning the workflow into a Stellar testnet record with clear state transitions. Everyday payment workflows need wallet-native settlement, verifiable records, and simple testnet onboarding.

## Problem

Trustline Spring Cleaning Tool addresses this by turning the workflow into a Stellar testnet record with clear state transitions. Everyday payment workflows need wallet-native settlement, verifiable records, and simple testnet onboarding.

## How It Works

1. A user connects Freighter on Stellar testnet.
2. The frontend creates a payments workspace and asks the backend for a Stellar-ready action quote.
3. The Express API validates the workflow, stores a Prisma audit record, and prepares transaction metadata.
4. The Soroban contract records the state, records the approved value path, and emits auditable events.
5. Operators verify the settlement score from the dashboard and export a ledger-friendly proof.

## How It Uses Stellar

- Stellar testnet for low-cost settlement and transparent account history.
- Soroban Rust smart contract for deterministic payments workflow state.
- Freighter for wallet connection and user-controlled signing.
- XLM and USDC SAC references for testnet payment and asset-transfer flows.
- Stellar SDK 16.1.0 for account, transaction, and Horizon/RPC helpers.
- SEP-7 compatible payment URI patterns for wallet handoff.
- Soroban RPC for simulation, submission, and confirmation.

## Track

Track 4 Stellar Tooling and Smart Contracts

## Tech Stack

- Framework: Next.js 16.2.12 + React 19.2.8 + TypeScript 7.0.2
- Backend: Express 5.2.1 + TypeScript
- Database: Prisma 7.9.1 + SQLite
- Smart contract: Rust + Soroban SDK 27.0.3
- Stellar SDK: @stellar/stellar-sdk 16.1.0
- Wallet: @stellar/freighter-api 6.0.1
- Network: Stellar testnet

## Rust Contract API

- `initialize(admin, asset, project_name)`
- `open_record(id, owner, target_amount)`
- `record_payments_record(id, actor, amount, score)`
- `mark_verified(id, verifier, status, score)`
- `get_record(id)`
- `total_locked()`

## Setup & Run

```bash
npm install
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

Frontend: http://localhost:3000
Backend: http://localhost:4000

## Contract

```bash
cd contract
cargo test
stellar contract build
```

Deploy after building:

```bash
stellar contract deploy --wasm target/wasm32v1-none/release/trustline_spring_cleaning_tool_contract.wasm --source alice --network testnet -- --admin alice --asset CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC --project_name "Trustline Spring Cleaning Tool"
```

## Network Details

- Network: Stellar testnet
- RPC URL: https://soroban-testnet.stellar.org
- Horizon URL: https://horizon-testnet.stellar.org
- XLM SAC: CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC
- USDC SAC: CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA
- Contract ID: configure after deployment

## Docs

- docs/Submission_Guideliness.md
- docs/stellar-fullstack-cheatsheet.md
- docs/dev_setup.md
- docs/contract.md
- docs/api.md

## Originality

This project is generated as an original StellarX Philippines full-stack starter from idea #27. It uses Stellar testnet, Soroban, Freighter, and current ecosystem SDKs as an extensible hackathon baseline rather than a barely modified template.

## License

MIT
