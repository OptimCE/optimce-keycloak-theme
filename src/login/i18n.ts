import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

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
