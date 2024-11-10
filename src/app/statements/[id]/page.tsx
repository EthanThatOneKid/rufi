"use client";

import { Suspense, useState, useEffect } from "react";
import { StatementView } from "@/components/statement-view";
import { fetchExampleTransactions } from "@/lib/example-statement-data";
import type { Transaction } from "@/lib/types";
import { exampleInvestments } from "@/components/investments-manager";

function StatementPage() {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);

  useEffect(() => {
    fetchExampleTransactions().then((data) => setTransactions(data));
  }, []);

  if (!transactions) {
    return <div>Loading...</div>;
  }

  return (
    <StatementView
      statement={{
        id: "1",
        title: "November 2024",
        investments: exampleInvestments,
        transactions,
      }}
    />
  );
}

export default function SuspenseWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StatementPage />
    </Suspense>
  );
}
