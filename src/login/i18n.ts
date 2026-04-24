import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

/**
 * The login UI is shipped in English, French, Dutch and German only.
 * The Keycloak realm must have these locales enabled (Realm Settings →
 * Localization). `Template.tsx` filters the language <select> against this
 * list as a belt-and-suspenders safeguard.
 *
 * @see https://docs.keycloakify.dev/features/i18n
 */
export const ENABLED_LANGUAGE_TAGS = ["en", "fr", "nl", "de"] as const;
export type EnabledLanguageTag = (typeof ENABLED_LANGUAGE_TAGS)[number];

const { useI18n, ofTypeI18n } = i18nBuilder
    .withThemeName<ThemeName>()
    .withCustomTranslations({
        // Add theme-specific keys here — they will be available via i18n.msg() /
        // i18n.msgStr() in overridden pages. Example:
        //   en: { brandTagline: "Sign in to OptimCE" },
        //   fr: { brandTagline: "Connectez-vous à OptimCE" },
        //   nl: { brandTagline: "Log in bij OptimCE" },
        //   de: { brandTagline: "Bei OptimCE anmelden" }
        en: {},
        fr: {},
        nl: {},
        de: {}
    })
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
