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

// Mutate kcContext BEFORE the first render so keycloakify resolves the UI in
// the language the parent OptimCE app stored. Works even when the realm has
// `Internationalization Enabled` turned off, because we flip the flag locally
// and synthesize the `supported` list ourselves — the bundled translations
// (en/fr/nl/de) ship inside the theme and resolve client-side.
export function applyLocalStorageLanguage(kcContext: KcContext): void {
    const stored = readStoredLanguage();

    const currentLanguageTag: SupportedLanguage =
        stored ??
        (isSupported(kcContext.locale?.currentLanguageTag) ? kcContext.locale!.currentLanguageTag as SupportedLanguage : "en");

    const supported = SUPPORTED_LANGUAGES.map(tag => ({
        languageTag: tag,
        label: LANGUAGE_LABELS[tag],
        // `url` is unused: Template.tsx's onChange handler writes to
        // localStorage and reloads the page instead of navigating here.
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
