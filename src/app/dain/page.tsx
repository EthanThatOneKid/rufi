'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';
// import type { SignalData, SignalType } from '@/lib/stock-algorithm';
import { mapStocksToSignals } from '@/lib/stock-algorithm';

type LowercaseSignalType = 'buy' | 'sell' | 'hold';

function SignalIcon({ signal }: { signal: LowercaseSignalType }) {
  switch (signal) {
    case 'buy':
      return <ArrowUpIcon className='w-6 h-6 text-green-500' />;
    case 'sell':
      return <ArrowDownIcon className='w-6 h-6 text-red-500' />;
    default:
      return <MinusIcon className='w-6 h-6 text-gray-500' />;
  }
}

function SignalBadge({ signal }: { signal: LowercaseSignalType }) {
  const colorClass =
    signal === 'buy'
      ? 'bg-green-200 text-green-800'
      : signal === 'sell'
      ? 'bg-red-200 text-red-800'
      : 'bg-gray-200 text-gray-800';

  return (
    <Tooltip content={`This is a ${signal} signal`}>
      <Badge
        className={`${colorClass} font-semibold px-3 py-1 rounded-full uppercase shadow-sm`}>
        {signal}
      </Badge>
    </Tooltip>
  );
}

function SignalDataView() {
  const [data, setData] = useState<Map<string, LowercaseSignalType> | null>(
    null
  );

  useEffect(() => {
    fetch('/api/signals')
      .then((request) => request.json())
      .then((signalsRequest) => {
        setData(
          mapStocksToSignals(signalsRequest) as Map<string, LowercaseSignalType>
        );
      });
  }, []);

  if (!data) {
    return (
      <Card className='shadow-lg rounded-lg p-6 max-w-2xl mx-auto bg-white border border-gray-200'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold text-blue-900'>
            DAIN AI Stock Signals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className='h-8 w-full rounded-lg' />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto'>
      {Array.from(data).map(([stock, signal]) => (
        <div
          key={stock}
          className='transform transition-transform hover:scale-105 duration-300'>
          <Card className='bg-white shadow-lg rounded-xl overflow-hidden'>
            <CardHeader className='bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 p-4'>
              <CardTitle className='text-xl font-semibold text-white flex items-center justify-between'>
                {stock}
                <SignalIcon signal={signal} />
              </CardTitle>
            </CardHeader>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <span className='text-lg font-semibold text-gray-800'>
                  {stock}
                </span>
                <SignalBadge signal={signal} />
              </div>
              <p className='mt-2 text-gray-500'>
                This stock has a <span className='font-bold'>{signal}</span>{' '}
                signal based on current AI analysis.
              </p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default function DainPage() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-100 to-white flex flex-col items-center justify-center p-8'>
      <div className='max-w-4xl w-full space-y-8'>
        <h1 className='text-5xl font-extrabold text-center text-gray-800 drop-shadow-md'>
          DAIN AI Stock Analysis
        </h1>
        <p className='text-lg text-center text-gray-600 mb-6'>
          Discover AI-powered stock recommendations in real time. Hover over
          each signal for details.
        </p>
        <SignalDataView />
      </div>
    </div>
  );
}
