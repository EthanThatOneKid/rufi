import { CircleDollarSignIcon } from "lucide-react";
import type { Statement } from "@/lib/types";

/**
 * fetchExampleStatement fetches an example statement from the server.
 */
export async function fetchExampleStatement(): Promise<Statement> {
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
      userID: "1",
      transactionID: "1",
      timestamp: 1605549492,
      bankID: "1",
      productDescription: "Starbucks",
      price: 5.99,
    },
    {
      userID: "1",
      transactionID: "2",
      timestamp: 1605549492,
      bankID: "1",
      productDescription: "Apple",
      price: 10.99,
    },
  ],
};
