import React, { useState } from "react";
import { createPayment } from "@/lib/payments/payment-utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export function PaymentForm() {
  const [memberId, setMemberId] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("membership");
  const [referenceId, setReferenceId] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await createPayment({
      memberId,
      amount: parseFloat(amount),
      type,
      referenceId: referenceId || undefined
    });
    setLoading(false);
    setSuccess(true);
    setMemberId("");
    setAmount("");
    setReferenceId("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Member ID</label>
        <Input value={memberId} onChange={e => setMemberId(e.target.value)} required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Amount (€)</label>
        <Input type="number" min="0" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Type</label>
        <Select value={type} onValueChange={setType}>
          <Select.Trigger className="w-full" />
          <Select.Content>
            <Select.Item value="membership">Membership</Select.Item>
            <Select.Item value="booking">Booking</Select.Item>
            <Select.Item value="tournament">Tournament</Select.Item>
          </Select.Content>
        </Select>
      </div>
      <div>
        <label className="block mb-1 font-medium">Reference ID (optional)</label>
        <Input value={referenceId} onChange={e => setReferenceId(e.target.value)} />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Processing..." : "Submit Payment"}
      </Button>
      {success && <div className="text-green-600 text-sm mt-2">Payment recorded!</div>}
    </form>
  );
}
