import { NextRequest, NextResponse } from "next/server";
import { getWalletById, updateWallet } from "../../../../../../lib/data/wallet-store";

export async function GET(_: NextRequest, { params }: { params: { walletId: string } }) {
  const wallet = await getWalletById(params.walletId);
  if (!wallet) return NextResponse.json({ error: "Niet gevonden" }, { status: 404 });
  return NextResponse.json(wallet);
}

export async function PATCH(req: NextRequest, { params }: { params: { walletId: string } }) {
  const data = await req.json();
  const wallet = await updateWallet(params.walletId, data);
  if (!wallet) return NextResponse.json({ error: "Niet gevonden" }, { status: 404 });
  return NextResponse.json(wallet);
}

