# U.S. and Africa corridor product specification

The US routes are **reference network families**. Waypoint lists are planning-level and do not represent a surveyed road polyline, bookable sailing, dedicated rail service or operating rights. Use `/data/corridors.json` as application seed and `/site/assets/maps` for interactive geographic reference.

## U.S. corridor families
1. **Pacific / San Pedro Bay**: Port of Los Angeles and Port of Long Beach are distinct ports; inland distribution, road/rail planning, and port handoff data. Port LA source: https://portoflosangeles.org/about
2. **San Diego / National City**: Tenth Avenue Marine Terminal and National City Marine Terminal cargo options; distinct from container-intensive LA/Long Beach scope. https://www.portofsandiego.org/maritime/cargo-and-trade
3. **SF Bay**: Oakland and San Francisco should be treated as distinct ports; document correct cargo/terminal profile. Oakland reference https://www.portofoakland.com/
4. **Mississippi / Illinois M-55**: MARAD M-55 designation, Chicago/Illinois to Mississippi system, St Louis, Memphis and New Orleans reference. https://www.maritime.dot.gov/grants-finances/marine-highways/designated-us-marine-highway-routes
5. **Missouri / Ohio / Mississippi M-70**: designated inland network; water depth and navigable extent fluctuate. MARAD https://www.maritime.dot.gov/grants-finances/marine-highways/marine-highway-route-m-70-ohio-mississippi-and-missouri-rivers ; USACE https://www.nwo.usace.army.mil/missions/dam-and-lake-projects/missouri-river-navigation/
6. **Gulf M-10**: Houston, New Orleans, Gulfport, Mobile, Tampa as gateway references; do not assume all are connected by one service. https://www.maritime.dot.gov/grants-finances/marine-highways/designated-us-marine-highway-routes
7. **Great Lakes–Seaway M-90**: Chicago, Detroit, Cleveland, Buffalo, Duluth and St Lawrence. https://greatlakes-seaway.com/en/the-seaway/facts-figures/ . Vessel dimensions, seasons and draft impose constraints.
8. **Atlantic M-95**: East Coast port family, Boston to Miami; distinct from an established single carrier schedule. https://www.maritime.dot.gov/grants-finances/marine-highways/designated-us-marine-highway-routes

## Legacy project Africa and China coverage
Preserve all 14 prior African corridor scenario IDs and evidence grades in the JSON. Northern Mombasa–Uganda–Kigali (Gatuna and Kagitumba options), Burundi, eastern DRC, South Sudan; Ghana–Sahel and Abidjan–Lagos; Johannesburg–Lusaka–Kasumbalesa–Lubumbashi; Central Corridor, Lobito and Africa–Europe; China-to-Africa import documents. Sources retained in legacy CSV `data/legacy_corridors_v2.csv` and merged JSON.

## Product workflows per movement
- Customer order / quote reference; ports and waypoints (not predicted live route).
- Leg records: mode, commercial counterparty, scheduled vs confirmed event, evidence source and event timestamp, jurisdiction and confidence.
- Document checklist per country/product, no automatic duties/HS classification unless licensed data and verified rules.
- Container/asset/fleet cross-reference; exception owner and audit log.
- Partner integration via written agreement and credentialed API; no scraping or unverified GPS claims.

## China import commercial model
Orders from suppliers, commercial invoices, packing lists, bills of lading, origin certificates where relevant, inspection evidence, Incoterm recording and customs-broker handoff. U.S. imports may include CBP ISF, product-specific tariff/classification, trade remedy and FDA/USDA/EPA requirements depending on product; do not hard-code rates. Africa imports involve different country laws and Africa trade preference rules; Chinese goods are not automatically AfCFTA-origin goods.
