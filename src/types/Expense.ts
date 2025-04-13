export interface Expense {
  id: string
  amount: string
  description: string
  userId: string
  categoryId: string
  createdAt: string
  updatedAt: string
  category: {
    title: string
    logo: string
  }
}

export interface SaveNewExpenseRequest {
  description: string;
  amount: number;
  categoryId: number;
}
