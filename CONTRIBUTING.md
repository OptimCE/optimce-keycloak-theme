# Contributing to the OptimCE Keycloak Theme

Thank you for your interest in contributing! Issues and pull requests are
welcome from everyone. By participating in this project, you agree to abide by
our [Code of Conduct](CODE_OF_CONDUCT.md).

## About This Repository

This repository contains the [Keycloakify](https://keycloakify.dev) login theme
for [OptimCE](https://www.optimce.be/en/). It is part of the wider OptimCE
platform, whose repositories live under the
[OptimCE organization](https://github.com/OptimCE) — the theme is normally built
and packaged from the [development monorepo](https://github.com/OptimCE/monorepo).
See the [README](README.md) for an overview of what the theme customises.

## Setting Up a Development Environment

```bash
git clone https://github.com/optimce/optimce-keycloak-theme.git
cd optimce-keycloak-theme
npm install
```

This project uses **npm**. Preview the theme with Vite and browse the
individual pages in Storybook:

```bash
npm run dev        # Vite preview with a mocked Keycloak context
npm run storybook  # the login pages as isolated stories
```

The [README](README.md) covers the prerequisites (including the Maven/JDK
requirement for building the deployable jar) and the full set of scripts.

## Reporting Bugs and Suggesting Features

Open a [GitHub issue](https://github.com/optimce/optimce-keycloak-theme/issues).
For bugs, include what you did, what you expected, and what happened instead —
screenshots of the affected Keycloak page and steps to reproduce help a lot.

For security vulnerabilities, **do not open a public issue**; follow the
[security policy](SECURITY.md) instead.

## Submitting Pull Requests

1. Fork the repository and create a feature branch from `main`.
2. Make your changes. Keep each pull request focused on a single topic.
3. Run `npm run format` (Prettier) and make sure the theme still builds
   (`npm run build-keycloak-theme`).
4. Open a pull request against `main`, describing **what** you changed and
   **why**. Screenshots or Storybook captures of visual changes are very
   welcome.

Small documentation fixes are welcome as direct pull requests; for larger
changes, opening an issue first to discuss the approach can save you time.

## Commit Messages

Use short, imperative commit messages, preferably following the
[Conventional Commits](https://www.conventionalcommits.org/) style:

```
feat: restyle the password-reset page
fix: correct the passkey button label
chore: bump keycloakify to 11.x
docs: document the theme deployment steps
```

## License

The OptimCE Keycloak theme is licensed under the [MIT License](LICENSE). By
contributing, you agree that your contributions will be licensed under the same
license.
