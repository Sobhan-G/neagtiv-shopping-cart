# Negativa/edge-case-tester för varukorgen

Testfil: `negative-cart.spec.js`

## Syfte
Verifierar att varukorgsfunktionaliteten på SauceDemo beter sig korrekt
i gränsfall och felaktiga scenarier, utöver det grundläggande "lägg till
i varukorg"-flödet.

## Testfall

| Test | Beskrivning | Förväntat resultat |
|------|-------------|---------------------|
| Tom varukorg | Ingen produkt tillagd | Ingen badge/räknare visas |
| Ta bort produkt | Lägg till och ta sedan bort en produkt | Badgen försvinner/uppdateras korrekt |
| Checkout utan uppgifter | Fortsätt i kassan utan ifyllda fält | Felmeddelande: "First Name is required" |
| Direktnavigering till checkout | Går till checkout-URL utan produkter i korgen | Sidan hanteras korrekt utan krasch |

## Hur man kör testerna
\`\`\`bash
npx playwright test negative-cart.spec.js
\`\`\`

## Varför dessa tester finns
Edge cases som en tom varukorg eller ofullständig kassaprocess missas ofta
av utvecklare som fokuserar på huvudflödet. Att testa dessa scenarier visar
att applikationens felhantering är robust och att användaren aldrig hamnar
i ett förvirrande eller trasigt tillstånd.
