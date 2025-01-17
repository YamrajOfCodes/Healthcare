export interface StatusCardProps {
    status?: "Active" | "Waiting" | "New" | "Follow-up" | "Out";
    number: number;
  }
  export interface DeleteConfirmationProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName?: string;
  }
  