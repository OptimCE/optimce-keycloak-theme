<p align="center">
  <img src="logo.svg" alt="OptimCE-logo" width="160">
</p>

# OptimCE Keycloak-thema

[![Website](https://img.shields.io/badge/Website-optimce.be-2e7d32.svg)](https://www.optimce.be/nl/)
[![Licentie](https://img.shields.io/badge/Licentie-MIT-blue.svg)](../LICENSE)
[![en](https://img.shields.io/badge/lang-en-lightgrey.svg)](../README.md)
[![fr](https://img.shields.io/badge/lang-fr-lightgrey.svg)](README.fr.md)
[![de](https://img.shields.io/badge/lang-de-lightgrey.svg)](README.de.md)
[![nl](https://img.shields.io/badge/lang-nl-43a047.svg)](README.nl.md)

Het **OptimCE Keycloak-thema** is de merkgebonden aanmeldervaring van het
[OptimCE](https://www.optimce.be/nl/)-platform. Het is een
[Keycloakify](https://keycloakify.dev)-thema dat de aanmeldpagina's van
Keycloak voorziet van de huisstijl van OptimCE — een groen kleurenpalet, het
DM Sans-lettertype en een aangepaste aanmeldpagina. Ga voor meer informatie
over het project naar [www.optimce.be](https://www.optimce.be/nl/).

Deze repository wordt normaal gesproken gebruikt als een git-submodule van de
[OptimCE-ontwikkelingsmonorepo](https://github.com/OptimCE/monorepo), waar het
gebouwde thema in de Keycloak-image wordt opgenomen. Het kan ook op zichzelf
worden gebouwd en gebruikt.

## Overzicht

Het thema past uitsluitend het thematype **login** aan (de thema's
„account", „admin" en „email" zijn niet geïmplementeerd):

- Een aangepaste **aanmeldpagina** (`src/login/pages/Login.tsx`) die de
  gebruikersnaam- en wachtwoordstappen combineert, met optionele
  passkey-/WebAuthn-ondersteuning.
- De pagina's voor registratie, wachtwoordherstel en informatie maken gebruik
  van de standaardpagina's van Keycloakify, opnieuw vormgegeven via één enkele
  stylesheet (`src/login/main.css`) gebaseerd op een groen design-tokensysteem
  en het DM Sans-lettertype.
- Een aangepaste lay-out (`src/login/Template.tsx`) met een `OptimCE`-koptekst
  en een taalkiezer.
- Internationalisatie voor **Engels, Frans, Nederlands en Duits**, waarbij de
  gekozen taal wordt bewaard in de lokale opslag van de browser.

## Vereisten

- [Node.js](https://nodejs.org) `^18` of `>=20`, met npm.
- Om het inzetbare thema (`.jar`) te bouwen, hebt u ook
  [Maven](https://maven.apache.org/) (`>= 3.1.1`) en een JDK in uw `PATH`
  nodig:
  - macOS: `brew install maven`
  - Debian/Ubuntu: `sudo apt-get install maven`
  - Windows: `choco install openjdk` en `choco install maven`

## Aan de slag

```bash
git clone https://github.com/optimce/optimce-keycloak-theme.git
cd optimce-keycloak-theme
npm install
```

Deze repository gebruikt **npm** (zie `package-lock.json`); de continue
integratie en de Docker-builds gebruiken het ook.

## Ontwikkeling

Bekijk het thema lokaal met Vite. `src/main.tsx` simuleert een
Keycloak-context zodat de pagina's worden weergegeven zonder een draaiende
Keycloak-instantie:

```bash
npm run dev
```

Blader door de afzonderlijke pagina's in Storybook (er zijn stories voor de
schermen aanmelden, registreren, wachtwoordherstel en verlopen pagina):

```bash
npm run storybook
```

Formatteer de code met Prettier voordat u commit:

```bash
npm run format
```

Zie de [Keycloakify-documentatie](https://docs.keycloakify.dev/) (in het
Engels) voor meer informatie over het testen en aanpassen van thema's.

## Het thema bouwen

```bash
npm run build-keycloak-theme
```

Dit voert de Vite-build uit en vervolgens `keycloakify build`, waarbij de
`.jar`-bestanden van het thema in `dist_keycloak/` worden geproduceerd.
Keycloakify genereert meerdere jars voor verschillende Keycloak-versies; zie de
[compileropties](https://docs.keycloakify.dev/features/compiler-options/keycloakversiontargets)
om dit gedrag aan te passen.

## Uitrollen naar Keycloak

Kopieer de gegenereerde `.jar` naar de map `providers/` van uw
Keycloak-instantie en start Keycloak opnieuw op. Selecteer vervolgens het
**optimce**-aanmeldthema in de **Login**-instellingen van het realm (of in de
thema-instellingen van een client).

De [`Dockerfile`](../Dockerfile) automatiseert deze verpakking: het bouwt het
thema, normaliseert de naam van de themamap naar `optimce`, beperkt het tot het
type `login` en produceert een klaar-om-uit-te-rollen jar. In de
OptimCE-monorepo wordt deze jar in de Keycloak-image gekopieerd.

## Projectstructuur

| Pad | Beschrijving |
|---|---|
| `src/login/` | Het aanmeldthema: `KcPage.tsx` (paginarouter), `Template.tsx` (lay-out), `i18n.ts`, `main.css` (alle styling) en `pages/Login.tsx` |
| `src/login/pages/*.stories.tsx` | Storybook-stories voor de aanmeldpagina's |
| `public/logo.svg` | OptimCE-logo dat door het thema (en deze README) wordt gebruikt |
| `keycloakify.config.ts` | Keycloakify-buildopties (themanaam, Keycloak-versie) |
| `vite.config.ts` | Configuratie van Vite en de Keycloakify-plugin |
| `.storybook/` | Storybook-configuratie |
| `Dockerfile` | Meertraps-build die de verpakte thema-jar produceert |
| `.github/workflows/ci.yaml` | CI: bouwt het thema en publiceert releases |

## Releases uitbrengen

Releases worden uitgebracht door het veld `version` in `package.json` te
verhogen op de `main`-branch. De CI-workflow (`.github/workflows/ci.yaml`)
detecteert de verhoging, bouwt het thema en publiceert de jar als een
GitHub-release.

## Bijdragen

Bijdragen zijn welkom! Lees de
[bijdragerichtlijnen](../CONTRIBUTING.md) en onze
[gedragscode](../CODE_OF_CONDUCT.md) (in het Engels) voordat u een issue of
pull request opent.

## Beveiliging

Om een beveiligingslek te melden, volgt u het
[beveiligingsbeleid](../SECURITY.md) — open geen openbaar issue.

## Licentie

Dit project is gelicentieerd onder de [MIT-licentie](../LICENSE).
