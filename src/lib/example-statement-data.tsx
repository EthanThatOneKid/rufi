import { CircleDollarSignIcon } from "lucide-react";
import type { Statement, Transaction } from "@/lib/types";

/**
 * fetchExampleTransactions fetches an example transactions list from the server.
 */
export async function fetchExampleTransactions(): Promise<Transaction[]> {
  return await fetch("/api/getusertransaction?username=bob").then((response) =>
    response.json()
  );
}

export const exampleStatement: Statement = {
  id: "1",
  title: "November 2024",
  investments: [
    {
      id: "1",
      title: "Stocks",
      percentage: 60,
      color: "blue",
      icon: <CircleDollarSignIcon />,
    },
    {
      id: "2",
      title: "Bonds",
      percentage: 40,
      color: "green",
      icon: <CircleDollarSignIcon />,
    },
  ],
  transactions: [
    {
      username: "bob",
      transaction_id: "1",
      timestamp: "2024-11-10T17:36:04.000Z",
      bank: "Wells Fargo",
      product: "Starbucks",
      price: "5.99",
      processed: 0,
    },
    {
      username: "bob",
      transaction_id: "2",
      timestamp: "2024-11-10T17:36:04.000Z",
      bank: "Wells Fargo",
      product: "Apple",
      price: "10.99",
      processed: 0,
    },
  ],
};
