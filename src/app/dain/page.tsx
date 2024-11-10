'use client';

import type { SignalData, SignalType } from '@/lib/stock-algorithm';
import { mapStocksToSignals } from '@/lib/stock-algorithm';
import { useEffect, useState, Suspense } from 'react';

export function SignalDataView() {
  const [data, setData] = useState<Map<string, SignalType> | null>(null);
  useEffect(() => {
    fetch('/api/signals')
      .then((request) => request.json())
      .then((signalsRequest: Array<SignalData>) => {
        setData(mapStocksToSignals(signalsRequest));
      });
  }, [setData]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-4 bg-white shadow-md rounded-lg'>
      <h2 className='text-2xl font-bold mb-4'>DAIN, AI stock signals</h2>
      <ul className='list-disc pl-5'>
        {Array.from(data).map(([stock, signal]) => (
          <li key={stock} className='mb-2'>
            <span className='font-semibold'>{stock}:</span> {signal}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DainPage() {
  return (
    <div>
      {/* existing content */}
      <Suspense fallback={<div>Loading...</div>}>
        <SignalDataView />
      </Suspense>
    </div>
  );
}
