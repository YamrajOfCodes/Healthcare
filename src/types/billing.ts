export interface BillingItem {
    id: number;
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }
  
  export interface ProfileInfoProps {
    icon: React.ElementType;
    children: React.ReactNode;
  }
  