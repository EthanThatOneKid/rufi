import { StatementView } from '@/components/statement-view';
import { exampleStatement } from '@/lib/example-statement-data';

export default function StatementPage() {
  return <StatementView statement={exampleStatement} />;
}
