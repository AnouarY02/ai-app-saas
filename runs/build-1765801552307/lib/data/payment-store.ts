import { v4 as uuidv4 } from 'uuid';

export type Payment = {
  id: string;
  reservationId: string;
  userId: string;
  amount: number;
  status: 'pending' | 'paid' | 'failed';
  createdAt: string;
};

const payments: Payment[] = [];

export function getAllPayments(userId?: string): Payment[] {
  return userId ? payments.filter(p => p.userId === userId) : payments;
}

export function getPaymentById(id: string): Payment | undefined {
  return payments.find(p => p.id === id);
}

export function createPayment({ reservationId, userId, amount }: { reservationId: string; userId: string; amount: number }): Payment {
  const payment: Payment = {
    id: uuidv4(),
    reservationId,
    userId,
    amount,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  payments.push(payment);
  return payment;
}

export function updatePayment(id: string, data: Partial<Omit<Payment, 'id' | 'reservationId' | 'userId' | 'createdAt'>>): Payment | undefined {
  const payment = getPaymentById(id);
  if (!payment) return undefined;
  Object.assign(payment, data);
  return payment;
}

