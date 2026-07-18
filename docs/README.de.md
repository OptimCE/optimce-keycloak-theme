<p align="center">
  <img src="logo.svg" alt="OptimCE-Logo" width="160">
</p>

# OptimCE Keycloak-Theme

[![Website](https://img.shields.io/badge/Website-optimce.be-2e7d32.svg)](https://www.optimce.be/de/)
[![Lizenz](https://img.shields.io/badge/Lizenz-MIT-blue.svg)](../LICENSE)
[![en](https://img.shields.io/badge/lang-en-lightgrey.svg)](../README.md)
[![fr](https://img.shields.io/badge/lang-fr-lightgrey.svg)](README.fr.md)
[![de](https://img.shields.io/badge/lang-de-43a047.svg)](README.de.md)
[![nl](https://img.shields.io/badge/lang-nl-lightgrey.svg)](README.nl.md)

Das **OptimCE Keycloak-Theme** ist das gebrandete Anmeldeerlebnis der
[OptimCE](https://www.optimce.be/de/)-Plattform. Es ist ein
[Keycloakify](https://keycloakify.dev)-Theme, das die Anmeldeseiten von
Keycloak mit dem Erscheinungsbild von OptimCE gestaltet — einer grünen
Farbpalette, der Schriftart DM Sans und einer benutzerdefinierten
Anmeldeseite. Um mehr über das Projekt zu erfahren, besuchen Sie
[www.optimce.be](https://www.optimce.be/de/).

Dieses Repository wird üblicherweise als Git-Submodul des
[OptimCE-Entwicklungs-Monorepos](https://github.com/OptimCE/monorepo)
verwendet, wo das kompilierte Theme in das Keycloak-Image eingebunden wird. Es
kann auch eigenständig gebaut und verwendet werden.

## Überblick

Das Theme passt ausschließlich den Theme-Typ **login** an (die Themes
„account", „admin" und „email" sind nicht implementiert):

- Eine benutzerdefinierte **Anmeldeseite** (`src/login/pages/Login.tsx`), die
  den Benutzernamen- und den Passwortschritt kombiniert, mit optionaler
  Passkey-/WebAuthn-Unterstützung.
- Die Seiten für Registrierung, Passwort-Zurücksetzen und Informationen
  basieren auf den Standardseiten von Keycloakify, umgestaltet über ein
  einzelnes Stylesheet (`src/login/main.css`), das auf einem grünen
  Design-Token-System und der Schriftart DM Sans aufbaut.
- Ein benutzerdefiniertes Layout (`src/login/Template.tsx`) mit einer
  `OptimCE`-Kopfzeile und einer Sprachauswahl.
- Internationalisierung für **Englisch, Französisch, Niederländisch und
  Deutsch**, wobei die gewählte Sprache im lokalen Speicher des Browsers
  gespeichert wird.

## Voraussetzungen

- [Node.js](https://nodejs.org) `^18` oder `>=20`, mit npm.
- Um das bereitstellbare Theme (`.jar`) zu bauen, benötigen Sie außerdem
  [Maven](https://maven.apache.org/) (`>= 3.1.1`) und ein JDK in Ihrem `PATH`:
  - macOS: `brew install maven`
  - Debian/Ubuntu: `sudo apt-get install maven`
  - Windows: `choco install openjdk` und `choco install maven`

## Erste Schritte

```bash
git clone https://github.com/optimce/optimce-keycloak-theme.git
cd optimce-keycloak-theme
npm install
```

Dieses Repository verwendet **npm** (siehe `package-lock.json`); die
Continuous Integration und die Docker-Builds nutzen es ebenfalls.

## Entwicklung

Sehen Sie sich das Theme lokal mit Vite an. `src/main.tsx` simuliert einen
Keycloak-Kontext, sodass die Seiten ohne laufende Keycloak-Instanz gerendert
werden:

```bash
npm run dev
```

Durchsuchen Sie die einzelnen Seiten in Storybook (Stories gibt es für die
Seiten Anmeldung, Registrierung, Passwort-Zurücksetzen und abgelaufene Seite):

```bash
npm run storybook
```

Formatieren Sie den Code vor dem Commit mit Prettier:

```bash
npm run format
```

Weitere Informationen zum Testen und Anpassen von Themes finden Sie in der
[Keycloakify-Dokumentation](https://docs.keycloakify.dev/) (auf Englisch).

## Theme bauen

```bash
npm run build-keycloak-theme
```

Dieser Befehl führt den Vite-Build und anschließend `keycloakify build` aus und
erzeugt die `.jar`-Dateien des Themes in `dist_keycloak/`. Keycloakify
generiert mehrere Jars für verschiedene Keycloak-Versionen; siehe die
[Compiler-Optionen](https://docs.keycloakify.dev/features/compiler-options/keycloakversiontargets),
um dieses Verhalten anzupassen.

## Bereitstellung in Keycloak

Kopieren Sie die erzeugte `.jar` in das Verzeichnis `providers/` Ihrer
Keycloak-Instanz und starten Sie Keycloak neu. Wählen Sie anschließend das
**optimce**-Anmelde-Theme in den **Login**-Einstellungen des Realms (oder in
den Theme-Einstellungen eines Clients) aus.

Das [`Dockerfile`](../Dockerfile) automatisiert diese Paketierung: Es baut das
Theme, normalisiert den Namen des Theme-Ordners auf `optimce`, beschränkt es
auf den Typ `login` und erzeugt ein bereitstellungsfertiges Jar. Im
OptimCE-Monorepo wird dieses Jar in das Keycloak-Image kopiert.

## Projektstruktur

| Pfad | Beschreibung |
|---|---|
| `src/login/` | Das Anmelde-Theme: `KcPage.tsx` (Seiten-Router), `Template.tsx` (Layout), `i18n.ts`, `main.css` (das gesamte Styling) und `pages/Login.tsx` |
| `src/login/pages/*.stories.tsx` | Storybook-Stories für die Anmeldeseiten |
| `public/logo.svg` | OptimCE-Logo, das vom Theme (und dieser README) verwendet wird |
| `keycloakify.config.ts` | Keycloakify-Build-Optionen (Theme-Name, Keycloak-Version) |
| `vite.config.ts` | Konfiguration von Vite und des Keycloakify-Plugins |
| `.storybook/` | Storybook-Konfiguration |
| `Dockerfile` | Mehrstufiger Build, der das paketierte Theme-Jar erzeugt |
| `.github/workflows/ci.yaml` | CI: baut das Theme und veröffentlicht Releases |

## Releases

Releases werden durch Erhöhen des Felds `version` in der `package.json` auf dem
`main`-Branch erstellt. Der CI-Workflow (`.github/workflows/ci.yaml`) erkennt
die Erhöhung, baut das Theme und veröffentlicht das Jar als GitHub-Release.

## Mitwirken

Beiträge sind willkommen! Bitte lesen Sie die
[Beitragsrichtlinien](../CONTRIBUTING.md) und unseren
[Verhaltenskodex](../CODE_OF_CONDUCT.md) (auf Englisch), bevor Sie ein Issue
oder einen Pull Request eröffnen.

## Sicherheit

Um eine Sicherheitslücke zu melden, folgen Sie bitte der
[Sicherheitsrichtlinie](../SECURITY.md) — öffnen Sie kein öffentliches Issue.

## Lizenz

Dieses Projekt ist unter der [MIT-Lizenz](../LICENSE) lizenziert.
