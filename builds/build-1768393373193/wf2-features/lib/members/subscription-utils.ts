import { getMemberById, updateMember } from "@/lib/members/data";

export async function getMemberSubscription(memberId: string) {
  const member = await getMemberById(memberId);
  if (!member) throw new Error("Member not found");
  return {
    status: member.membershipStatus,
    joinedAt: member.joinedAt
  };
}

export async function updateMemberSubscription(memberId: string, status: "active" | "inactive") {
  const member = await getMemberById(memberId);
  if (!member) throw new Error("Member not found");
  await updateMember(memberId, { membershipStatus: status });
}
