# -*- coding: utf-8 -*-
import json

path = r'C:\claude\rapportage-workflow\chatbot-rapportage-full.json'
with open(path, 'r', encoding='utf-8') as f:
    data = json.load(f)

for node in data.get('nodes', []):
    if node.get('type') == 'n8n-nodes-base.code':
        code = node['parameters']['jsCode']
        old1 = "- GEEN brief-header of -footer: geen 'Rapportage Begeleid Wonen', 'Datum', 'Cliënt', 'Begeleider', 'Onderwerp' bovenaan. Geen 'Afgesproken Acties', 'Vervolgafspraak', 'Opmerkingen' of handtekening onderaan. Het is een rapportage met actualiteiten, geen formele brief."
        new1 = "- GEEN header: nooit Rapportage, Datum, Cliënt, Begeleider of Onderwerp bovenaan. GEEN footer: nooit Vervolgafspraak, Bijzonderheden of Einde rapportage."
        code = code.replace(old1, new1)
        code = code.replace('financiÃƒÂ«n', 'financiën')
        node['parameters']['jsCode'] = code
        print('Replaced')
        break

with open(path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
print('Done')
