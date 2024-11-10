import type { Statement } from "@/lib/types";
import Link from "next/link";

export interface StatementsListProps {
  statements: Statement[];
}

export default function StatementsList(props: StatementsListProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold">Your statements</h2>

      <ul>
        {props.statements.map((statement) => (
          <li key={statement.id} className="space-y-4">
            <Link href={`/statements/${statement.id}`}>
              <h2 className="text-xl font-bold">{statement.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
