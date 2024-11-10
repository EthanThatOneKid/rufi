"use client";

import { startAnyoneClient } from "@/lib/anon";
import { useEffect, useState, Suspense, SetStateAction } from "react";

export function SignalDataView() {
  const [data, setData] = useState(null);
  useEffect(() => {
    startAnyoneClient().then(async (anon) => {
      await anon
        .request("/api/signals")
        .then((data: SetStateAction<null>) => setData(data));
    });
  }, [startAnyoneClient]);

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
