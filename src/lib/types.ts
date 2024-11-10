export interface Investment {
  id: string;
  title: string;
  percentage: number;
  color: string;
  icon: React.ReactNode;
}

export interface Transaction {
  userID: string;
  transactionID: string;
  timestamp: number;
  bankID: string;
  productDescription: string;
  price: number;
}

export interface Statement {
  id: string;
  title: string;
  // TODO: Include period property to represent the statement date range.
  investments: Investment[];
  transactions: Transaction[];
}
