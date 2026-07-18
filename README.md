<p align="center">
  <img src="docs/logo.svg" alt="OptimCE logo" width="160">
</p>

# OptimCE Keycloak Theme

[![Website](https://img.shields.io/badge/Website-optimce.be-2e7d32.svg)](https://www.optimce.be/en/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![en](https://img.shields.io/badge/lang-en-43a047.svg)](README.md)
[![fr](https://img.shields.io/badge/lang-fr-lightgrey.svg)](docs/README.fr.md)
[![de](https://img.shields.io/badge/lang-de-lightgrey.svg)](docs/README.de.md)
[![nl](https://img.shields.io/badge/lang-nl-lightgrey.svg)](docs/README.nl.md)

The **OptimCE Keycloak theme** is the branded login experience for the
[OptimCE](https://www.optimce.be/en/) platform. It is a
[Keycloakify](https://keycloakify.dev) theme that restyles Keycloak's login
pages with OptimCE's visual identity — a green colour palette, the DM Sans
typeface, and a custom login page. To learn more about the project, visit
[www.optimce.be](https://www.optimce.be/en/).

This repository is normally consumed as a git submodule of the
[OptimCE development monorepo](https://github.com/OptimCE/monorepo), where the
built theme is packaged into the Keycloak image. It can also be built and used
on its own.

## Overview

The theme customises the **login** theme type only (the account, admin, and
email themes are not implemented):

- A custom **login page** (`src/login/pages/Login.tsx`) combining the username
  and password steps, with optional passkey / WebAuthn support.
- The registration, password-reset, and informational pages fall back to
  Keycloakify's default pages, restyled through a single stylesheet
  (`src/login/main.css`) built on a green design-token system and the DM Sans
  font.
- A custom layout (`src/login/Template.tsx`) with an `OptimCE` header and a
  language selector.
- Internationalisation for **English, French, Dutch, and German**, with the
  selected language persisted in the browser's local storage.

## Prerequisites

- [Node.js](https://nodejs.org) `^18` or `>=20`, with npm.
- To build the deployable theme (`.jar`), you also need
  [Maven](https://maven.apache.org/) (`>= 3.1.1`) and a JDK on your `PATH`:
  - macOS: `brew install maven`
  - Debian/Ubuntu: `sudo apt-get install maven`
  - Windows: `choco install openjdk` and `choco install maven`

## Getting Started

```bash
git clone https://github.com/optimce/optimce-keycloak-theme.git
cd optimce-keycloak-theme
npm install
```

This repository uses **npm** (see `package-lock.json`); the continuous
integration and Docker builds use it too.

## Development

Preview the theme locally with Vite. `src/main.tsx` mocks a Keycloak context so
the pages render without a running Keycloak instance:

```bash
npm run dev
```

Browse the individual pages in Storybook (stories exist for the login,
registration, password-reset, and page-expired screens):

```bash
npm run storybook
```

Format the code with Prettier before committing:

```bash
npm run format
```

See the [Keycloakify documentation](https://docs.keycloakify.dev/) for more on
testing and customising themes.

## Building the Theme

```bash
npm run build-keycloak-theme
```

This runs the Vite build and then `keycloakify build`, producing the theme
`.jar` files in `dist_keycloak/`. Keycloakify generates several jars targeting
different Keycloak versions; see the
[compiler options](https://docs.keycloakify.dev/features/compiler-options/keycloakversiontargets)
to customise this.

## Deploying to Keycloak

Copy the generated `.jar` into your Keycloak instance's `providers/` directory
and restart Keycloak, then select the **optimce** login theme in the realm's
**Login** settings (or in a client's theme settings).

The [`Dockerfile`](Dockerfile) automates this packaging: it builds the theme,
normalises the theme folder name to `optimce`, restricts it to the `login`
type, and outputs a ready-to-deploy jar. In the OptimCE monorepo this jar is
copied into the Keycloak image.

## Project Structure

| Path | Description |
|---|---|
| `src/login/` | The login theme: `KcPage.tsx` (page router), `Template.tsx` (layout), `i18n.ts`, `main.css` (all styling), and `pages/Login.tsx` |
| `src/login/pages/*.stories.tsx` | Storybook stories for the login pages |
| `public/logo.svg` | OptimCE logo used by the theme (and this README) |
| `keycloakify.config.ts` | Keycloakify build options (theme name, Keycloak version) |
| `vite.config.ts` | Vite + Keycloakify plugin configuration |
| `.storybook/` | Storybook configuration |
| `Dockerfile` | Multi-stage build that produces the packaged theme jar |
| `.github/workflows/ci.yaml` | CI: builds the theme and publishes releases |

## Releasing

Releases are cut by bumping the `version` field in `package.json` on the `main`
branch. The CI workflow (`.github/workflows/ci.yaml`) detects the bump, builds
the theme, and publishes the jar as a GitHub release.

## Contributing

Contributions are welcome! Please read the
[contributing guidelines](CONTRIBUTING.md) and our
[Code of Conduct](CODE_OF_CONDUCT.md) before opening an issue or pull request.

## Security

To report a security vulnerability, please follow the
[security policy](SECURITY.md) — do not open a public issue.

## License

This project is licensed under the [MIT License](LICENSE).
