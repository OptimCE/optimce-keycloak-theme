import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

// Gap-filling, not theme wording. Keycloakify's bundled translations are
// incomplete for some languages: among the keys the pages this realm can reach
// actually render, Dutch was missing all 33 below and French 3 of them, so they
// silently fell back to English. `withCustomTranslations` outranks the bundled
// sets, and it requires every key in every language — hence English and German
// are listed too, even though their bundles were already complete.
//
// The strings are Keycloak's own (theme/base/login/messages inside the
// keycloak-themes jar of the pinned server image), with two mechanical
// adjustments, because keycloakify resolves messages in the browser with a
// plain `{N}` substitution and does not implement java.text.MessageFormat:
//   - `''` unescaped to `'`
//   - `{2,choice,0#values|1#value|1<values}` collapsed to `value(s)`, which is
//     what keycloakify's own English bundle does
//
// To recompute after a keycloakify upgrade, diff the key sets in
// node_modules/keycloakify/login/i18n/messages_defaultSet/{en,fr,nl,de}.js.
//
// Careful when adding a fifth locale to the realm: keycloakify gives every
// language it does NOT find here the `en` overrides, so the generated
// messages_es/it/pt/... .properties currently carry these keys in English. That
// is inert while supportedLocales is en/fr/nl/de, but a new locale needs its
// own entry below or it will render these 33 keys in English.
//
// Theme-specific wording (keys Keycloak does not define at all) belongs here
// too. Keep this argument a plain object literal: the keycloakify build
// statically evaluates it to also emit the server-side
// messages_<lang>.properties, and gives up on anything it cannot `eval`.
const { useI18n, ofTypeI18n } = i18nBuilder
    .withThemeName<ThemeName>()
    .withCustomTranslations({
        en: {
            showPassword: "Show password",
            hidePassword: "Hide password",
            requiredFields: "Required fields",
            restartLoginTooltip: "Restart login",
            acceptTerms: "I agree to the terms and conditions",
            doLogout: "Logout",
            emailInstructionUsername:
                "Enter your username and we will send you instructions on how to create a new password.",
            logoutConfirmHeader: "Do you want to log out?",
            logoutConfirmTitle: "Logging out",
            logoutOtherSessions: "Sign out from other devices",
            invalidPasswordMaxLengthMessage: "Invalid password: maximum length {0}.",
            invalidPasswordNotEmailMessage:
                "Invalid password: must not be equal to the email.",
            "error-empty": "Please specify value.",
            "error-invalid-blank": "Please specify value.",
            "error-invalid-date": "Invalid date.",
            "error-invalid-email": "Invalid email address.",
            "error-invalid-length": "Length must be between {1} and {2}.",
            "error-invalid-length-too-long": "Maximal length is {2}.",
            "error-invalid-length-too-short": "Minimal length is {1}.",
            "error-invalid-multivalued-size":
                "Attribute {0} must have at least {1} and at most {2} value(s).",
            "error-invalid-number": "Invalid number.",
            "error-invalid-uri": "Invalid URL.",
            "error-invalid-uri-fragment": "Invalid URL fragment.",
            "error-invalid-uri-scheme": "Invalid URL scheme.",
            "error-invalid-value": "Invalid value.",
            "error-number-out-of-range": "Number must be between {1} and {2}.",
            "error-number-out-of-range-too-big": "Number must have maximal value of {2}.",
            "error-number-out-of-range-too-small":
                "Number must have minimal value of {1}.",
            "error-pattern-no-match": "Invalid value.",
            "error-person-name-invalid-character": "Value contains invalid character.",
            "error-user-attribute-read-only": "This field is read only.",
            "error-user-attribute-required": "Please specify this field.",
            "error-username-invalid-character": "Value contains invalid character."
        },
        fr: {
            showPassword: "Montrer le mot de passe",
            hidePassword: "Masquer le mot de passe",
            requiredFields: "Champs obligatoires",
            restartLoginTooltip: "Redémarrer la connexion",
            acceptTerms: "J'accepte les conditions générales d'utilisation",
            doLogout: "Déconnexion",
            emailInstructionUsername:
                "Entrez votre nom d'utilisateur et nous vous enverrons un courriel avec des instructions pour créer un nouveau mot de passe.",
            logoutConfirmHeader: "Êtes-vous sûr de vouloir vous déconnecter ?",
            logoutConfirmTitle: "Déconnexion",
            logoutOtherSessions: "Se déconnecter des autres appareils",
            invalidPasswordMaxLengthMessage:
                "Mot de passe invalide : longueur maximale de {0}.",
            invalidPasswordNotEmailMessage:
                "Mot de passe invalide : ne doit pas être identique à l'adresse de courriel.",
            "error-empty": "Veuillez renseigner une valeur.",
            "error-invalid-blank": "Veuillez renseigner une valeur.",
            "error-invalid-date": "Date invalide.",
            "error-invalid-email": "Adresse de courriel invalide.",
            "error-invalid-length": "La longueur doit être comprise entre {1} et {2}.",
            "error-invalid-length-too-long": "La longueur maximale est de {2}.",
            "error-invalid-length-too-short": "La longueur minimale est de {1}.",
            "error-invalid-multivalued-size":
                "L'attribut {0} doit avoir au moins {1} et au plus {2} valeur(s).",
            "error-invalid-number": "Nombre invalide.",
            "error-invalid-uri": "URL invalide.",
            "error-invalid-uri-fragment": "Fragment d'URL invalide.",
            "error-invalid-uri-scheme": "Schéma d'URL invalide.",
            "error-invalid-value": "Valeur invalide.",
            "error-number-out-of-range": "Le nombre doit être compris entre {1} et {2}.",
            "error-number-out-of-range-too-big":
                "Le nombre doit avoir une valeur maximale de {2}.",
            "error-number-out-of-range-too-small":
                "Le nombre doit avoir une valeur minimale de {1}.",
            "error-pattern-no-match": "Valeur invalide.",
            "error-person-name-invalid-character":
                "La valeur contient un caractère invalide.",
            "error-user-attribute-read-only": "Ce champ est en lecture seule.",
            "error-user-attribute-required": "Veuillez renseigner ce champ.",
            "error-username-invalid-character":
                "La valeur contient un caractère invalide."
        },
        nl: {
            showPassword: "Wachtwoord tonen",
            hidePassword: "Wachtwoord verbergen",
            requiredFields: "Verplichte velden",
            restartLoginTooltip: "Inlogproces opnieuw starten",
            acceptTerms: "Ik ga akkoord met de algemene voorwaarden",
            doLogout: "Uitloggen",
            emailInstructionUsername:
                "Voer uw gebruikersnaam in en wij sturen u een e-mailbericht met instructies voor het aanmaken van een nieuw wachtwoord.",
            logoutConfirmHeader: "Wilt u uitloggen?",
            logoutConfirmTitle: "Uitloggen",
            logoutOtherSessions: "Uitloggen op andere apparaten",
            invalidPasswordMaxLengthMessage:
                "Ongeldig wachtwoord, de maximumlengte is {0} tekens.",
            invalidPasswordNotEmailMessage:
                "Ongeldig wachtwoord, deze mag niet overeen komen met het e-mailadres.",
            "error-empty": "Voer een waarde in.", // upstream nl reads "Vooer"
            "error-invalid-blank": "Voer een waarde in.",
            "error-invalid-date": "Ongeldige datum.",
            "error-invalid-email": "Ongeldig e-mailaddress.",
            "error-invalid-length": "Lengte moet tussen {1} en {2} zijn.",
            "error-invalid-length-too-long": "Maximale lengte is {2}.",
            "error-invalid-length-too-short": "Minimale lengte is {1}.",
            "error-invalid-multivalued-size":
                "Kenmerk {0} moet minimaal {1} en maximaal {2} waarde(n) hebben.",
            "error-invalid-number": "Ongeldig getal.",
            "error-invalid-uri": "Ongeldige URL.",
            "error-invalid-uri-fragment": "Ongeldig URL fragment.",
            "error-invalid-uri-scheme": "Ongeldig URL scheme.",
            "error-invalid-value": "Ongeldige waarde.",
            "error-number-out-of-range": "Getal moet tussen {1} en {2} liggen.",
            "error-number-out-of-range-too-big": "Getal moet maximaal {2} zijn.",
            "error-number-out-of-range-too-small": "Getal moet een minimaal {1} zijn.",
            "error-pattern-no-match": "Ongeldige waarde.",
            "error-person-name-invalid-character": "Waarde bevat ongeldig teken.",
            "error-user-attribute-read-only": "Dit veld is read-only.",
            "error-user-attribute-required": "Dit veld is verplicht.",
            "error-username-invalid-character": "Waarde bevat ongeldig teken."
        },
        de: {
            showPassword: "Passwort einblenden",
            hidePassword: "Passwort ausblenden",
            requiredFields: "Benötigte Felder",
            restartLoginTooltip: "Login neu starten",
            acceptTerms: "Ich stimme den Bedingungen und Konditionen zu",
            doLogout: "Abmelden",
            emailInstructionUsername:
                "Geben Sie Ihren Benutzernamen ein und klicken Sie auf Absenden. Danach werden wir Ihnen eine E-Mail mit weiteren Instruktionen zusenden.",
            logoutConfirmHeader: "Wollen Sie sich abmelden?",
            logoutConfirmTitle: "Abmelden",
            logoutOtherSessions: "Von anderen Geräten abmelden",
            invalidPasswordMaxLengthMessage:
                "Ungültiges Passwort: Es darf höchstens {0} Zeichen lang sein.",
            invalidPasswordNotEmailMessage:
                "Ungültiges Passwort: darf nicht identisch mit der E-Mail-Adresse sein.",
            "error-empty": "Bitte geben Sie einen Wert an.",
            "error-invalid-blank": "Bitte geben Sie einen Wert an.",
            "error-invalid-date": "Ungültiges Datum.",
            "error-invalid-email": "Ungültige E-Mail-Adresse.",
            "error-invalid-length": "Länge muss zwischen {1} und {2} Zeichen liegen.",
            "error-invalid-length-too-long": "Maximale Länge ist {2}.",
            "error-invalid-length-too-short": "Minimale Länge ist {1}.",
            "error-invalid-multivalued-size":
                "Attribut {0} muss mindestens {1} und darf höchstens {2} Wert(e) haben.",
            "error-invalid-number": "Ungültige Nummer.",
            "error-invalid-uri": "Ungültige URL.",
            "error-invalid-uri-fragment": "Ungültiger URL-Bestandteil.",
            "error-invalid-uri-scheme": "Ungültiges URL-Schema.",
            "error-invalid-value": "Ungültiger Wert.",
            "error-number-out-of-range": "Nummer muss zwischen {1} und {2} liegen.",
            "error-number-out-of-range-too-big":
                "Nummer muss einen maximalen Wert von {2} haben.",
            "error-number-out-of-range-too-small":
                "Nummer muss einen minimalen Wert von {1} haben.",
            "error-pattern-no-match": "Ungültiger Wert.",
            "error-person-name-invalid-character": "Wert enthält ungültiges Zeichen.",
            "error-user-attribute-read-only": "Dieses Feld darf nicht editiert werden.",
            "error-user-attribute-required": "Bitte füllen Sie dieses Feld aus.",
            "error-username-invalid-character": "Wert enthält ungültiges Zeichen."
        }
    })
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
