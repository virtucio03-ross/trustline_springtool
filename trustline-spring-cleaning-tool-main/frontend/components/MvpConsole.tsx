"use client";

import { useMemo, useState } from "react";
import { ArrowRight, BadgeCheck, CircleDollarSign, RadioTower, WalletCards } from "lucide-react";
import { buildSep7PaymentUri, connectFreighter } from "../lib/stellar";

const project = {
  title: "Trustline Spring Cleaning Tool",
  domain: "payments",
  metric: "settlement score",
  action: "record",
  track: "Track 4 Stellar Tooling and Smart Contracts",
};

const records = [
  {
    "id": "TRUSTLINE-SPRING-001",
    "name": "payments pilot lane",
    "status": "READY_FOR_QUOTE",
    "amount": 125.5,
    "score": 88,
    "destination": "GBYH3E4WVFMKXJX6K6J4N5QPRZ2VQF5L6J2K3M4N5P6Q7R8S9T0U1V2"
  },
  {
    "id": "TRUSTLINE-SPRING-002",
    "name": "settlement score verification",
    "status": "AWAITING_SIGNATURE",
    "amount": 310.25,
    "score": 76,
    "destination": "GDMQ4W6ZK7P2V5S8T1U3X9Y4A6B8C2D5E7F9G1H3J5K7L9M2N4P6Q8"
  },
  {
    "id": "TRUSTLINE-SPRING-003",
    "name": "community settlement proof",
    "status": "ON_CHAIN_READY",
    "amount": 540,
    "score": 93,
    "destination": "GCR5T7V9X2Z4B6D8F1H3J5L7N9P2R4T6V8X1Z3B5D7F9H2J4L6N8"
  }
];

export function MvpConsole() {
  const [wallet, setWallet] = useState("Not connected");
  const [selectedId, setSelectedId] = useState(records[0].id);
  const selected = useMemo(() => records.find((record) => record.id === selectedId) ?? records[0], [selectedId]);
  const paymentUri = buildSep7PaymentUri({
    destination: selected.destination,
    amount: selected.amount.toFixed(2),
    memo: selected.id,
  });

  async function handleConnect() {
    const publicKey = await connectFreighter();
    setWallet(publicKey ?? "Demo wallet ready");
  }

  return (
    <main className="shell">
      <section className="hero">
        <div>
          <p className="network">Stellar testnet / Soroban workflow</p>
          <h1>{project.title}</h1>
          <p className="lede">
            A full-stack Stellar starter for {project.domain} teams that need wallet-signed actions,
            auditable {project.metric} records, and predictable settlement states.
          </p>
          <div className="actions">
            <button onClick={handleConnect}>
              <WalletCards size={18} />
              Connect Freighter
            </button>
            <a href={paymentUri}>
              <ArrowRight size={18} />
              Open SEP-7 Payment
            </a>
          </div>
        </div>
        <aside className="status">
          <span>Wallet</span>
          <strong>{wallet}</strong>
          <span>Selected record</span>
          <strong>{selected.id}</strong>
        </aside>
      </section>

      <section className="grid">
        <div className="panel records">
          <div className="panelHeader">
            <h2>Workflow Records</h2>
            <RadioTower size={20} />
          </div>
          {records.map((record) => (
            <button
              className={record.id === selectedId ? "row active" : "row"}
              key={record.id}
              onClick={() => setSelectedId(record.id)}
            >
              <span>
                <strong>{record.name}</strong>
                <small>{record.status}</small>
              </span>
              <b>{record.amount.toLocaleString()} XLM</b>
            </button>
          ))}
        </div>

        <div className="panel detail">
          <div className="panelHeader">
            <h2>Settlement Quote</h2>
            <CircleDollarSign size={20} />
          </div>
          <dl>
            <div><dt>Destination</dt><dd>{selected.destination}</dd></div>
            <div><dt>{project.metric}</dt><dd>{selected.score}/100</dd></div>
            <div><dt>Contract method</dt><dd>recordPaymentsRecord</dd></div>
            <div><dt>Memo</dt><dd>{selected.id}</dd></div>
          </dl>
          <div className="proof">
            <BadgeCheck size={20} />
            Ready for Soroban simulation and Stellar testnet submission.
          </div>
        </div>
      </section>

      <style jsx>{`
        .shell {
          min-height: 100vh;
          padding: 32px;
        }
        .hero {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 340px;
          gap: 24px;
          align-items: stretch;
          max-width: 1180px;
          margin: 0 auto 24px;
        }
        .network {
          margin: 0 0 12px;
          color: var(--accent);
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
        }
        h1 {
          max-width: 860px;
          margin: 0;
          font-size: clamp(40px, 6vw, 76px);
          line-height: 0.96;
          letter-spacing: 0;
        }
        .lede {
          max-width: 720px;
          color: var(--muted);
          font-size: 19px;
          line-height: 1.55;
        }
        .actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 24px;
        }
        .actions button,
        .actions a {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 44px;
          border: 1px solid var(--ink);
          border-radius: 8px;
          padding: 0 16px;
          background: var(--ink);
          color: white;
          text-decoration: none;
          cursor: pointer;
        }
        .actions a {
          background: white;
          color: var(--ink);
        }
        .status,
        .panel {
          border: 1px solid var(--line);
          border-radius: 8px;
          background: var(--panel);
          box-shadow: 0 18px 45px rgba(23, 32, 38, 0.08);
        }
        .status {
          display: grid;
          align-content: center;
          gap: 8px;
          padding: 24px;
          overflow-wrap: anywhere;
        }
        .status span,
        dt,
        small {
          color: var(--muted);
          font-size: 13px;
        }
        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          max-width: 1180px;
          margin: 0 auto;
        }
        .panel {
          padding: 20px;
        }
        .panelHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 16px;
        }
        h2 {
          margin: 0;
          font-size: 20px;
        }
        .row {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          border: 1px solid var(--line);
          border-radius: 8px;
          background: white;
          padding: 14px;
          text-align: left;
          cursor: pointer;
        }
        .row + .row {
          margin-top: 10px;
        }
        .row.active {
          border-color: var(--accent);
          background: var(--soft);
        }
        .row span {
          display: grid;
          gap: 4px;
        }
        dl {
          display: grid;
          gap: 12px;
          margin: 0;
        }
        dl div {
          border-bottom: 1px solid var(--line);
          padding-bottom: 12px;
        }
        dd {
          margin: 4px 0 0;
          overflow-wrap: anywhere;
          font-weight: 700;
        }
        .proof {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 20px;
          border-radius: 8px;
          background: #fff3eb;
          color: #813b17;
          padding: 14px;
        }
        @media (max-width: 820px) {
          .shell {
            padding: 18px;
          }
          .hero,
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
