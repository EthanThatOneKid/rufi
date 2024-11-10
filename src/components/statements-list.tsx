import type { Statement } from '@/lib/types';
import Link from 'next/link';

export interface StatementsListProps {
  statements: Statement[];
}

export default function StatementsList(props: StatementsListProps) {
  return (
    <div className='p-6 bg-white rounded-lg shadow-lg space-y-6'>
      <h2 className='text-3xl font-bold text-gray-800'>Your Statements</h2>

      <ul className='space-y-4'>
        {props.statements.map((statement) => (
          <li
            key={statement.id}
            className='p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors shadow-sm'>
            <Link href={`/statements/${statement.id}`}>
              <div className='text-blue-600 hover:underline flex items-center'>
                <h3 className='text-xl font-semibold text-gray-800'>
                  {statement.title}
                </h3>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
