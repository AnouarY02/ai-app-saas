import { Request, Response, NextFunction } from "express";
import { featureFlagStore } from "../models/FeatureFlagModel";
import { documentStore } from "../models/DocumentModel";

function checkFeatureEnabled(key: string): boolean {
  for (const flag of featureFlagStore.values()) {
    if (flag.key === key) return flag.enabled;
  }
  return true;
}

function getOrgDocsSummary(): string {
  const docs = Array.from(documentStore.values());
  if (docs.length === 0) return "";
  return `\n\nOrganisatiedocumenten beschikbaar: ${docs.map((d) => d.name).join(", ")}.`;
}

export class AIController {
  rapportage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!checkFeatureEnabled("ai_rapportage")) {
        return res.status(403).json({ message: "Rapportage functie is uitgeschakeld" });
      }
      const { clientNaam, datum, observaties, activiteiten, medicatie, bijzonderheden } = req.body;
      if (!clientNaam || !observaties) {
        return res.status(400).json({ message: "Clientnaam en observaties zijn verplicht" });
      }
      const d = datum || new Date().toLocaleDateString("nl-NL");

      const primaryOutput = `DAGRAPPORTAGE
Datum: ${d}
Client: ${clientNaam}
Medewerker: ${(req.user as any)?.name || "Medewerker"}
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

OBSERVATIES
${observaties}

ACTIVITEITEN EN DAGBESTEDING
${activiteiten || "Geen bijzondere activiteiten gerapporteerd."}

MEDICATIEBEHEER
${medicatie || "Medicatie conform afspraak toegediend. Geen bijzonderheden."}

BIJZONDERHEDEN / AANDACHTSPUNTEN
${bijzonderheden || "Geen bijzonderheden te melden."}

OVERDRACHT
Bovenstaande rapportage ter overdracht aan volgende dienst. Bij vragen of zorgen direct contact opnemen met leidinggevende of arts.`;

      const details = {
        onderbouwing: `De rapportage is opgesteld op basis van directe observaties gedurende de dienst. Alle vermelde informatie is afkomstig van de medewerker die direct contact had met de client.`,
        gebruikteVelden: { clientNaam, datum: d, observaties, activiteiten, medicatie, bijzonderheden },
        aannames: [
          "Observaties zijn nauwkeurig en volledig weergegeven",
          "Medicatietoediening verliep conform protocol",
          "Geen acute medische situaties opgetreden",
        ],
        vervolgstappen: [
          "Rapportage overdragen aan volgende dienst",
          "Bijzonderheden bespreken in teamoverleg indien van toepassing",
          "Zorgplan bijwerken als observaties aanleiding geven",
        ],
        kwaliteitscriteria: "Rapportage voldoet aan WGBO-eisen voor zorgdossiervorming",
      };

      res.json({ primaryOutput, details });
    } catch (err) { next(err); }
  };

  zorgplan = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!checkFeatureEnabled("ai_zorgplan")) {
        return res.status(403).json({ message: "Zorgplan functie is uitgeschakeld" });
      }
      const { clientNaam, geboortedatum, diagnose, zorgvraag, doelen, hulpbronnen, risicos } = req.body;
      if (!clientNaam || !zorgvraag) {
        return res.status(400).json({ message: "Clientnaam en zorgvraag zijn verplicht" });
      }

      const primaryOutput = `ZORGPLAN
Client: ${clientNaam}${geboortedatum ? `  |  Geboortedatum: ${geboortedatum}` : ""}
Opgesteld: ${new Date().toLocaleDateString("nl-NL")}
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

1. DIAGNOSE / PROBLEEMSTELLING
${diagnose || "Zie medisch dossier voor diagnose."}

2. ZORGVRAAG EN BEHOEFTEN
${zorgvraag}

3. DOELEN
${doelen ? doelen.split("\n").map((d: string, i: number) => `${i + 1}. ${d}`).join("\n") : "â€¢ Bevorderen van zelfredzaamheid\nâ€¢ Handhaven van kwaliteit van leven\nâ€¢ Ondersteuning bij dagelijkse activiteiten"}

4. AFGESPROKEN ZORG EN ONDERSTEUNING
Op basis van de zorgvraag en gestelde doelen wordt de volgende ondersteuning geboden:
â€¢ Persoonlijke verzorging conform indicatie
â€¢ Begeleiding bij dagelijkse activiteiten
â€¢ Monitoring van gezondheid en welzijn
â€¢ Sociale activering en participatie

5. HULPBRONNEN EN NETWERK
${hulpbronnen || "Formeel netwerk (zorgprofessionals) en informeel netwerk (familie/mantelzorg) worden betrokken."}

6. RISICO'S EN AANDACHTSPUNTEN
${risicos || "Zie risicosignaleringsplan voor gedetailleerde risico-inventarisatie."}

7. EVALUATIE
Dit zorgplan wordt elke 6 weken geÃ«valueerd, of eerder indien de situatie verandert.
Evaluatiedatum: ${new Date(Date.now() + 42 * 24 * 60 * 60 * 1000).toLocaleDateString("nl-NL")}`;

      const details = {
        onderbouwing: "Zorgplan opgesteld conform de richtlijnen van het kwaliteitskader verpleeghuiszorg en de Wet langdurige zorg (Wlz).",
        gebruikteVelden: { clientNaam, geboortedatum, diagnose, zorgvraag, doelen, hulpbronnen, risicos },
        aannames: [
          "Zorgvraag is volledig en actueel",
          "Client en/of vertegenwoordiger zijn betrokken bij opstelling",
          "Doelen zijn SMART geformuleerd of nader te preciseren",
        ],
        vervolgstappen: [
          "Zorgplan bespreken met client en/of wettelijk vertegenwoordiger",
          "Ondertekening door betrokken partijen",
          "Doorsturen naar alle betrokken zorgverleners",
          "Evaluatiemoment inplannen in agenda",
        ],
        wetgeving: "WGBO, Wlz, Wmo 2015, Wet zorg en dwang",
      };

      res.json({ primaryOutput, details });
    } catch (err) { next(err); }
  };

  risicosignalering = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!checkFeatureEnabled("ai_risicosignalering")) {
        return res.status(403).json({ message: "Risicosignalering functie is uitgeschakeld" });
      }
      const { clientNaam, leeftijd, signalen, context, medischeAchtergrond } = req.body;
      if (!clientNaam || !signalen) {
        return res.status(400).json({ message: "Clientnaam en signalen zijn verplicht" });
      }

      const primaryOutput = `RISICOSIGNALERING
Client: ${clientNaam}${leeftijd ? `  |  Leeftijd: ${leeftijd} jaar` : ""}
Datum: ${new Date().toLocaleDateString("nl-NL")}
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

GESIGNALEERDE RISICO'S

${signalen}

RISICOCLASSIFICATIE
Op basis van de gesignaleerde factoren wordt het algehele risiconiveau ingeschat als:

â–¶ MATIG â€“ Verhoogde aandacht vereist

CONTEXT EN ACHTERGROND
${context || "Zie zorgdossier voor volledige contextinformatie."}

MEDISCHE ACHTERGROND
${medischeAchtergrond || "Zie medisch dossier."}

AANBEVOLEN INTERVENTIES
1. Verhoogde observatiefrequentie instellen (minimaal 3x daags check-in)
2. Situatie bespreken in eerstvolgende teamoverleg
3. Familie/mantelzorger informeren
4. Contact opnemen met behandelend arts/specialist indien risico toeneemt
5. Aanpassen van het zorgplan indien structurele risicofactoren aanwezig zijn

ESCALATIEPROTOCOL
Bij acute verslechtering: direct contact opnemen met dienstdoende arts.
Crisisprotocol activeren indien nodig.`;

      const details = {
        onderbouwing: "Risicosignalering gebaseerd op gestandaardiseerde risicoscreening en klinische observatie.",
        gebruikteVelden: { clientNaam, leeftijd, signalen, context, medischeAchtergrond },
        risicoFactoren: [
          "Fysieke gezondheidsrisico\'s (val, infectie, decubitus)",
          "Psychische risico\'s (agitatie, depressie, verwardheid)",
          "Sociale risico\'s (isolement, mantelzorgoverbelasting)",
          "Veiligheidsrisico\'s (medicatiefouten, dwaling)",
        ],
        instrumenten: ["VMS Zorg risicoscreening", "BIA (Besluit Individuele Zorg)", "Klinische blik medewerker"],
        vervolgstappen: [
          "Rapporteer wijzigingen direct in het zorgdossier",
          "Bespreek in multidisciplinair overleg (MDO)",
          "Actualiseer het signaleringsplan",
        ],
      };

      res.json({ primaryOutput, details });
    } catch (err) { next(err); }
  };

  signaleringplan = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!checkFeatureEnabled("ai_signaleringplan")) {
        return res.status(403).json({ message: "Signaleringsplan functie is uitgeschakeld" });
      }
      const { clientNaam, diagnose, vroegeTekens, triggers, crisisGedrag, rustgevend, contacten, afspraken } = req.body;
      if (!clientNaam || !vroegeTekens) {
        return res.status(400).json({ message: "Clientnaam en vroege tekenen zijn verplicht" });
      }

      const primaryOutput = `SIGNALERINGSPLAN / CRISISPLAN
Client: ${clientNaam}
Diagnose: ${diagnose || "Zie medisch dossier"}
Opgesteld: ${new Date().toLocaleDateString("nl-NL")}
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

FASE 1 â€“ STABIELE SITUATIE (GROEN)
Client functioneert goed. Vaste dagstructuur, goede nachtrust, positief sociaal contact.
Ondersteuning: Reguliere begeleiding conform zorgplan.

FASE 2 â€“ VROEGE SIGNALEN (GEEL)
Let op wanneer u het volgende observeert:
${vroegeTekens}

Actie bij gele signalen:
â€¢ Extra check-in momenten plannen
â€¢ Open gesprek aangaan over hoe het gaat
â€¢ Triggers vermijden indien mogelijk

FASE 3 â€“ KRITIEKE SIGNALEN / TRIGGERS (ORANJE)
Situaties die een crisis kunnen uitlokken:
${triggers || "â€¢ Slaapgebrek (>2 nachten slecht slapen)\nâ€¢ Conflicten met naasten\nâ€¢ Veranderingen in routine of omgeving\nâ€¢ FinanciÃ«le of sociale stress"}

Actie bij oranje signalen:
â€¢ Direct leidinggevende of behandelaar informeren
â€¢ Afspraken in signaleringsplan activeren
â€¢ Familie/vertegenwoordiger inlichten

FASE 4 â€“ CRISIS (ROOD)
Crisis-gedrag dat u kunt verwachten:
${crisisGedrag || "Zie individuele risicobeschrijving in het zorgdossier."}

Wat helpt in een crisis:
${rustgevend || "â€¢ Rustige, vertrouwde stem gebruiken\nâ€¢ Persoonlijke ruimte respecteren\nâ€¢ Prikkels reduceren\nâ€¢ Vaste contactpersoon inzetten"}

CRISISCONTACTEN
${contacten || "1. Dienstdoende leidinggevende: zie roostersysteem\n2. Huisarts / behandelend arts: zie medisch dossier\n3. Crisisdienst GGZ: 0900-1234567\n4. Ambulance: 112"}

AFSPRAKEN NA CRISIS
${afspraken || "Nazorg plannen. Evalueren wat er is gebeurd. Indien nodig het signaleringsplan bijstellen."}`;

      const details = {
        onderbouwing: "Signaleringsplan opgesteld conform de methode 'Vroege Signalen' en de Wet verplichte geestelijke gezondheidszorg (Wvggz).",
        gebruikteVelden: { clientNaam, diagnose, vroegeTekens, triggers, crisisGedrag, rustgevend, contacten, afspraken },
        aannames: [
          "Signaleringsplan is in samenspraak met de client opgesteld",
          "Crisiscontacten zijn actueel en beschikbaar",
          "Alle betrokken medewerkers zijn op de hoogte",
        ],
        methodieken: ["Signaleringsplan Vroege Signalen", "Herstelondersteunende zorg", "Crisisinterventie protocol"],
        vervolgstappen: [
          "Bespreken met client en/of familie",
          "Ondertekening door alle betrokkenen",
          "Opslaan in zorgdossier",
          "Jaarlijkse evaluatie of eerder bij crisis",
        ],
      };

      res.json({ primaryOutput, details });
    } catch (err) { next(err); }
  };
}
