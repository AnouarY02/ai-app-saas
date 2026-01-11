import { NextRequest, NextResponse } from "next/server";
import { getWalletsByClub } from "../../../../../lib/data/wallet-store";

export async function GET(_: NextRequest, { params }: { params: { clubId: string } }) {
  const wallets = await getWalletsByClub(params.clubId);
  return NextResponse.json(wallets);
}

