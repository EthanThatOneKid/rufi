import React from "react";
import type { Statement } from "@/lib/types";

export interface StatementViewProps {
  statement: Statement;
}

export default function StatementView(props: StatementViewProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your statement</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Investment Icon</th>
            <th className="py-2 px-4 border-b">Investment Title</th>
            <th className="py-2 px-4 border-b">Investment Percentage</th>
          </tr>
        </thead>
        <tbody>
          {props.statement.investments.map((investment) => (
            <tr key={investment.id}>
              <td className="py-2 px-4 border-b">{investment.icon}</td>
              <td className="py-2 px-4 border-b">{investment.title}</td>
              <td className="py-2 px-4 border-b">{investment.percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="min-w-full bg-white mt-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Product Description</th>
            <th className="py-2 px-4 border-b">Price</th>
          </tr>
        </thead>
        <tbody>
          {props.statement.transactions.map((transaction) => (
            <tr key={transaction.transactionID}>
              <td className="py-2 px-4 border-b">
                {transaction.productDescription}
              </td>
              <td className="py-2 px-4 border-b">{transaction.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
