import { createPayment as apiCreatePayment } from "@/lib/payments/data";

export async function createPayment({ memberId, amount, type, referenceId }: {
  memberId: string;
  amount: number;
  type: "membership" | "booking" | "tournament";
  referenceId?: string;
}) {
  await apiCreatePayment({
    memberId,
    amount,
    type,
    referenceId,
    date: new Date()
  });
}
