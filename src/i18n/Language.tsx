export enum Language {
    EN = 'en',
    FR = 'fr',
    CA = 'ca',
}

export const Languages = [Language.FR, Language.EN, Language.CA];

export const CodeToLanguage = {
    en: 'English',
    fr: 'Français',
    ca: 'Catalan',
};

export const strToLanguage = (strLang: string): Language => {
    const tmp = strLang as Language;
    if (Object.values(Language).includes(tmp)) {
        return tmp;
    }
    return Language.FR;
};
