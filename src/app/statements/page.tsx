import StatementsList from "@/components/statements-list";
import { exampleStatement } from "@/lib/example-statement-data";

export default function StatementsPage() {
  return <StatementsList statements={[exampleStatement]} />;
}
