'use client';

import type { SignalData, SignalType } from '@/lib/stock-algorithm';
import { mapStocksToSignals } from '@/lib/stock-algorithm';
import { useEffect, useState, Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from 'lucide-react';

function SignalIcon({ signal }: { signal: SignalType }) {
  switch (signal.toUpperCase()) {
    case 'BUY':
      return <ArrowUpIcon className='w-5 h-5 text-green-500' />;
    case 'SELL':
      return <ArrowDownIcon className='w-5 h-5 text-red-500' />;
    default:
      return <MinusIcon className='w-5 h-5 text-gray-500' />;
  }
}

function SignalBadge({ signal }: { signal: SignalType }) {
  const colorClass =
    signal.toUpperCase() === 'BUY'
      ? 'bg-green-100 text-green-800'
      : signal.toUpperCase() === 'SELL'
      ? 'bg-red-100 text-red-800'
      : 'bg-gray-100 text-gray-800';
  return (
    <Badge variant='outline' className={`${colorClass} font-semibold`}>
      {signal}
    </Badge>
  );
}

function SignalDataView() {
  const [data, setData] = useState<Map<string, SignalType> | null>(null);

  useEffect(() => {
    fetch('/api/signals')
      .then((request) => request.json())
      .then((signalsRequest: Array<SignalData>) => {
        setData(mapStocksToSignals(signalsRequest));
      });
  }, []);

  if (!data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>
            DAIN AI Stock Signals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-2'>
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className='h-8 w-full' />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>
          DAIN AI Stock Signals
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className='space-y-3'>
          {Array.from(data).map(([stock, signal]) => (
            <li
              key={stock}
              className='flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
              <div className='flex items-center space-x-3'>
                <SignalIcon signal={signal} />
                <span className='font-semibold'>{stock}</span>
              </div>
              <SignalBadge signal={signal} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function DainPageComponent() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-50 to-white p-8'>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-4xl font-bold text-center mb-8 text-blue-800'>
          DAIN AI Stock Analysis
        </h1>
        <Suspense
          fallback={
            <Card>
              <CardHeader>
                <CardTitle className='text-2xl font-bold'>Loading...</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-2'>
                  {[...Array(5)].map((_, index) => (
                    <Skeleton key={index} className='h-8 w-full' />
                  ))}
                </div>
              </CardContent>
            </Card>
          }>
          <SignalDataView />
        </Suspense>
      </div>
    </div>
  );
}
