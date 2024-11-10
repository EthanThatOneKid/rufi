/**
 * mapStocksToSignals returns a map from stock symbol to the winning signal.
 */
export function mapStocksToSignals(
  array: Array<SignalData>
): Map<string, SignalType> {
  const result = new Map<string, SignalType>();
  for (const stock of getStocks(array)) {
    result.set(
      stock,
      calculateWinningSignal(array.filter((data) => data.stock === stock))
    );
  }

  return result;
}

/**
 * getStocks returns a list of unique stock symbols from the given data.
 */
export function getStocks(data: Array<SignalData>): string[] {
  return Array.from(new Set(data.map(({ stock }) => stock)));
}

/**
 * calculateWinningSignal and choose the most recent when there is a tie.
 */
export function calculateWinningSignal(data: Array<SignalData>): SignalType {
  const signalCounts = new Map<SignalType, number>();
  for (const { signal } of data) {
    signalCounts.set(signal, (signalCounts.get(signal) ?? 0) + 1);
  }

  let maxSignalCount = 0;
  let winningSignals: SignalType[] = [];
  for (const [signal, count] of signalCounts) {
    if (count > maxSignalCount) {
      maxSignalCount = count;
      winningSignals = [signal];
    } else if (count === maxSignalCount) {
      winningSignals.push(signal);
    }
  }

  if (winningSignals.length === 1) {
    return winningSignals[0];
  }

  const recent = data
    .filter(({ signal }) => winningSignals.includes(signal))
    .toSorted(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .at(0)!;
  return recent.signal;
}

export interface SignalData {
  id: number;
  stock: string;
  signal: SignalType;
  algorithm: string;
  created_at: string;
}

export type SignalType = (typeof signals)[number];

export const signals = ["buy", "sell", "hold"] as const;
