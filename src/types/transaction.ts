export interface Transaction {
    id: number;
    type: "Package" | "Service" | "pharmacy" | "expenses";
    description: string;
    patientName: string;
    date: string;
    amount: number;
    status?: string;
    category?: string;
  }
  
  export interface TransactionSummary {
    totalIncome: number;
    totalExpenses: number;
    netRevenue: number;
  }
  