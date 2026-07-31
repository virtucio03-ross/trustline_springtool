import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trustline Spring Cleaning Tool",
  description: "Trustline Spring Cleaning Tool gives operators a shared settlement score trail, signed wallet actions, and a Soroban-backed release path that can be audited from dashboard to ledger.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
