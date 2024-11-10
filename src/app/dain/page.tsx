'use client';

import { startAnyoneClient } from '@/lib/anon';
import { useEffect, useState, Suspense, SetStateAction } from 'react';

// async function main() {
//   const anon = new Anon();
//   const anonSocksClient = new AnonSocksClient(anon);

//   try {
//     await anon.start();
//     await new Promise((resolve) => setTimeout(resolve, 15000));

//     const response = await anonSocksClient.get(
//       'https://api.ipify.org?format=json'
//     );
//     console.log('Response:', response.data);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     await anon.stop();
//   }
// }

export function SignalDataView() {
  const [data, setData] = useState(null);
  // useEffect(() => {
  //   startAnyoneClient().then(async (anon) => {
  //     await anon
  //       .request('/api/signals')
  //       .then((data: SetStateAction<null>) => setData(data));
  //   });
  // }, [startAnyoneClient]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Signal Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
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
