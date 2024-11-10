export interface Investment {
  id: string;
  title: string;
  percentage: number;
  color: string;
  icon: React.ReactNode;
}

export interface Transaction {
  username: string;
  transaction_id: string;
  timestamp: string;
  bank: string;
  product: string;
  price: string;
  processed: number;
}

export interface Statement {
  id: string;
  title: string;

  // TODO: Include period property to represent the statement date range.
  investments: Investment[];
  transactions: Transaction[];
}
