import type { KcContext } from "./KcContext";

export const LANGUAGE_STORAGE_KEY = "language";

const SUPPORTED_LANGUAGES = ["en", "fr", "nl", "de"] as const;
type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
    en: "English",
    fr: "Français",
    nl: "Nederlands",
    de: "Deutsch"
};

function readStoredLanguage(): SupportedLanguage | undefined {
    let stored: string | null;
    try {
        stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    } catch {
        return undefined;
    }
    if (stored === null) return undefined;
    return (SUPPORTED_LANGUAGES as readonly string[]).includes(stored)
        ? (stored as SupportedLanguage)
        : undefined;
}

// Runs in main.tsx BEFORE the first render, to keep this page and the parent
// OptimCE app on the same language.
//
// The sync only ever goes server -> localStorage. It is tempting to do the
// reverse — the app already knows the user's language, so why not just impose
// it here? — but the server has the last word whether we like it or not:
// keycloakify's FTL resolves every message-key-shaped string it finds in the
// kcContext through the server's own `msg()` and freezes the result into
// kcContext["x-keycloakify"].messages, which outranks every client-side
// translation. Switching the language here would only re-translate the half of
// the page that is resolved in the browser, and the user profile field labels
// ("First name", "Last name", ...) would stay in the server's language.
//
// So the language is chosen before the page is rendered: the app passes it as
// `ui_locales` on the login redirect, and the language selector navigates to
// Keycloak's own `kc_locale` URL. All we do here is carry the result back out,
// so a language picked on the login page follows the user into the app.
export function syncLanguage(kcContext: KcContext): void {
    if (!kcContext.realm.internationalizationEnabled || kcContext.locale === undefined) {
        applyLocalStorageLanguageFallback(kcContext);
        return;
    }

    // Only mirror a language the user actually asked for on this page. Keycloak
    // resolves a locale for every request, falling back to Accept-Language and
    // then the realm default — mirroring that unconditionally would overwrite
    // the app's stored language whenever the user lands here without stating
    // one, e.g. following a password-reset link from an email. `kc_locale` is
    // what Template.tsx's language selector navigates to, so its presence in
    // the URL is the signal that the language on screen was chosen, not guessed.
    if (!hasExplicitLocaleRequest()) {
        return;
    }

    const { currentLanguageTag } = kcContext.locale;

    if (isSupported(currentLanguageTag)) {
        persistLanguage(currentLanguageTag);
    }
}

function hasExplicitLocaleRequest(): boolean {
    try {
        return new URLSearchParams(window.location.search).has("kc_locale");
    } catch {
        return false;
    }
}

// Fallback for a realm that still has `Internationalization Enabled` turned
// off. We flip the flag locally and synthesize the `supported` list ourselves
// so the bundled translations (en/fr/nl/de) at least resolve client-side.
//
// This is strictly worse than the real thing and cannot be otherwise: anything
// the server resolved — user profile labels, field validation errors, the alert
// banner — stays in the server's language. Enable internationalization on the
// realm; this only exists so an unmigrated environment degrades to a mostly
// translated page rather than an entirely English one.
function applyLocalStorageLanguageFallback(kcContext: KcContext): void {
    const stored = readStoredLanguage();

    const currentLanguageTag: SupportedLanguage =
        stored ??
        (isSupported(kcContext.locale?.currentLanguageTag)
            ? (kcContext.locale!.currentLanguageTag as SupportedLanguage)
            : "en");

    const supported = SUPPORTED_LANGUAGES.map(tag => ({
        languageTag: tag,
        label: LANGUAGE_LABELS[tag],
        // `url` is unused: with no server-side locale support there is nothing
        // to navigate to, so Template.tsx's onChange handler falls back to
        // writing localStorage and reloading the page.
        url: "#"
    }));

    kcContext.realm.internationalizationEnabled = true;
    kcContext.locale = {
        ...(kcContext.locale ?? {}),
        currentLanguageTag,
        supported
    };
}

function isSupported(tag: string | undefined): boolean {
    return tag !== undefined && (SUPPORTED_LANGUAGES as readonly string[]).includes(tag);
}

export function persistLanguage(languageTag: string): void {
    try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, languageTag);
    } catch {
        /* ignore */
    }
}
