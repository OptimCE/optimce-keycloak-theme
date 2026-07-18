<p align="center">
  <img src="logo.svg" alt="Logo OptimCE" width="160">
</p>

# Thème Keycloak OptimCE

[![Site web](https://img.shields.io/badge/Site%20web-optimce.be-2e7d32.svg)](https://www.optimce.be/fr/)
[![Licence](https://img.shields.io/badge/Licence-MIT-blue.svg)](../LICENSE)
[![en](https://img.shields.io/badge/lang-en-lightgrey.svg)](../README.md)
[![fr](https://img.shields.io/badge/lang-fr-43a047.svg)](README.fr.md)
[![de](https://img.shields.io/badge/lang-de-lightgrey.svg)](README.de.md)
[![nl](https://img.shields.io/badge/lang-nl-lightgrey.svg)](README.nl.md)

Le **thème Keycloak OptimCE** est l'expérience de connexion personnalisée de la
plateforme [OptimCE](https://www.optimce.be/fr/). Il s'agit d'un thème
[Keycloakify](https://keycloakify.dev) qui applique l'identité visuelle
d'OptimCE aux pages de connexion de Keycloak — une palette de couleurs verte,
la police DM Sans et une page de connexion personnalisée. Pour en savoir plus
sur le projet, consultez [www.optimce.be](https://www.optimce.be/fr/).

Ce dépôt est habituellement utilisé comme sous-module git du
[monorepo de développement OptimCE](https://github.com/OptimCE/monorepo), où le
thème compilé est intégré à l'image Keycloak. Il peut aussi être construit et
utilisé de façon autonome.

## Aperçu

Le thème personnalise uniquement le type de thème **login** (les thèmes
« account », « admin » et « email » ne sont pas implémentés) :

- Une **page de connexion** personnalisée (`src/login/pages/Login.tsx`)
  combinant les étapes du nom d'utilisateur et du mot de passe, avec prise en
  charge optionnelle des passkeys / WebAuthn.
- Les pages d'inscription, de réinitialisation du mot de passe et
  d'information reposent sur les pages par défaut de Keycloakify, restylées via
  une feuille de style unique (`src/login/main.css`) fondée sur un système de
  jetons de design verts et la police DM Sans.
- Une mise en page personnalisée (`src/login/Template.tsx`) avec un en-tête
  `OptimCE` et un sélecteur de langue.
- L'internationalisation en **anglais, français, néerlandais et allemand**, la
  langue choisie étant conservée dans le stockage local du navigateur.

## Prérequis

- [Node.js](https://nodejs.org) `^18` ou `>=20`, avec npm.
- Pour construire le thème déployable (`.jar`), vous avez également besoin de
  [Maven](https://maven.apache.org/) (`>= 3.1.1`) et d'un JDK dans votre
  `PATH` :
  - macOS : `brew install maven`
  - Debian/Ubuntu : `sudo apt-get install maven`
  - Windows : `choco install openjdk` et `choco install maven`

## Prise en main

```bash
git clone https://github.com/optimce/optimce-keycloak-theme.git
cd optimce-keycloak-theme
npm install
```

Ce dépôt utilise **npm** (voir `package-lock.json`) ; l'intégration continue et
les builds Docker l'utilisent également.

## Développement

Prévisualisez le thème localement avec Vite. `src/main.tsx` simule un contexte
Keycloak afin que les pages s'affichent sans instance Keycloak en cours
d'exécution :

```bash
npm run dev
```

Parcourez les différentes pages dans Storybook (des stories existent pour les
écrans de connexion, d'inscription, de réinitialisation du mot de passe et de
page expirée) :

```bash
npm run storybook
```

Formatez le code avec Prettier avant de valider :

```bash
npm run format
```

Consultez la [documentation Keycloakify](https://docs.keycloakify.dev/) (en
anglais) pour en savoir plus sur le test et la personnalisation des thèmes.

## Construire le thème

```bash
npm run build-keycloak-theme
```

Cette commande exécute le build Vite puis `keycloakify build`, produisant les
fichiers `.jar` du thème dans `dist_keycloak/`. Keycloakify génère plusieurs
jars ciblant différentes versions de Keycloak ; voir les
[options du compilateur](https://docs.keycloakify.dev/features/compiler-options/keycloakversiontargets)
pour personnaliser ce comportement.

## Déploiement dans Keycloak

Copiez le `.jar` généré dans le répertoire `providers/` de votre instance
Keycloak et redémarrez Keycloak, puis sélectionnez le thème de connexion
**optimce** dans les paramètres **Login** du realm (ou dans les paramètres de
thème d'un client).

Le [`Dockerfile`](../Dockerfile) automatise cet empaquetage : il construit le
thème, normalise le nom du dossier de thème en `optimce`, le restreint au type
`login` et produit un jar prêt à déployer. Dans le monorepo OptimCE, ce jar est
copié dans l'image Keycloak.

## Structure du projet

| Chemin | Description |
|---|---|
| `src/login/` | Le thème de connexion : `KcPage.tsx` (routeur de pages), `Template.tsx` (mise en page), `i18n.ts`, `main.css` (tout le style) et `pages/Login.tsx` |
| `src/login/pages/*.stories.tsx` | Stories Storybook pour les pages de connexion |
| `public/logo.svg` | Logo OptimCE utilisé par le thème (et ce README) |
| `keycloakify.config.ts` | Options de build Keycloakify (nom du thème, version de Keycloak) |
| `vite.config.ts` | Configuration de Vite et du plugin Keycloakify |
| `.storybook/` | Configuration de Storybook |
| `Dockerfile` | Build multi-étapes produisant le jar du thème empaqueté |
| `.github/workflows/ci.yaml` | CI : construit le thème et publie les versions |

## Publier une version

Les versions sont créées en incrémentant le champ `version` du fichier
`package.json` sur la branche `main`. Le workflow de CI
(`.github/workflows/ci.yaml`) détecte l'incrément, construit le thème et publie
le jar en tant que release GitHub.

## Contribuer

Les contributions sont les bienvenues ! Merci de lire le
[guide de contribution](../CONTRIBUTING.md) et notre
[code de conduite](../CODE_OF_CONDUCT.md) (en anglais) avant d'ouvrir une issue
ou une pull request.

## Sécurité

Pour signaler une faille de sécurité, veuillez suivre la
[politique de sécurité](../SECURITY.md) — n'ouvrez pas d'issue publique.

## Licence

Ce projet est distribué sous la [licence MIT](../LICENSE).
