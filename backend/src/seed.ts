import bcrypt from "bcrypt";
import { userStore } from "./models/UserModel";
import { brandingStore, defaultBranding } from "./models/BrandingModel";
import { featureFlagStore, defaultFeatureFlags } from "./models/FeatureFlagModel";
import { organisationFormatStore, defaultOrganisationFormats } from "./models/OrganisationFormatModel";

async function seed() {
  const adminHash = await bcrypt.hash("Admin123!", 10);
  const medewerkerHash = await bcrypt.hash("Medewerker123!", 10);

  userStore.set("admin-user-id", {
    id: "admin-user-id",
    name: "Beheerder",
    email: "admin@zorgai.nl",
    passwordHash: adminHash,
    role: "admin",
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  userStore.set("medewerker-user-id", {
    id: "medewerker-user-id",
    name: "Anna de Vries",
    email: "anna@zorgai.nl",
    passwordHash: medewerkerHash,
    role: "medewerker",
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  userStore.set("medewerker-2-id", {
    id: "medewerker-2-id",
    name: "Jan Bakker",
    email: "jan@zorgai.nl",
    passwordHash: medewerkerHash,
    role: "medewerker",
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  brandingStore.set("default", defaultBranding);

  for (const flag of defaultFeatureFlags) {
    featureFlagStore.set(flag.id, flag);
  }

  for (const fmt of defaultOrganisationFormats) {
    organisationFormatStore.set(fmt.id, fmt);
  }

  console.log("Seed data geladen:");
  console.log("   admin@zorgai.nl / Admin123!");
  console.log("   anna@zorgai.nl / Medewerker123!");
  console.log("   jan@zorgai.nl / Medewerker123!");
}

seed();
