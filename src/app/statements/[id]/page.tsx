import { Suspense, useState, useEffect } from "react";
import { StatementView } from "@/components/statement-view";
import { fetchExampleStatement } from "@/lib/example-statement-data";
import type { Statement } from "@/lib/types";

function StatementPage() {
  const [statement, setStatement] = useState<Statement | null>(null);

  useEffect(() => {
    fetchExampleStatement().then((data) => setStatement(data));
  }, []);

  if (!statement) {
    return <div>Loading...</div>;
  }

  return <StatementView statement={statement} />;
}

export default function SuspenseWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StatementPage />
    </Suspense>
  );
}
