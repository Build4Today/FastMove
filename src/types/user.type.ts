export interface SubscriptionPayload {
  email: string;
  password: string;
}

export interface Payment {
  id: string;
  email: string;
  invoice_id: string;
  created_at: string;
  updated_at: string;
}

export interface UserQuery {
  user: Payment;
  isLoading: boolean;
  isFetching: boolean;
}
