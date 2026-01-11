import { cookies } from "next/headers";
import { getMemberByEmail } from "./data/member-store";

export async function getSession() {
  // MVP: geen echte sessie, maar haal user uit cookie (of null)
  const cookie = cookies().get("pcm_user");
  if (!cookie) return null;
  try {
    const user = JSON.parse(cookie.value);
    // Optioneel: valideren of user nog bestaat
    const member = await getMemberByEmail(user.email);
    if (!member) return null;
    return member;
  } catch {
    return null;
  }
}

