const languageNameMap = {
  en: 'English',
  es: 'Español',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  pt: 'Português',
  nl: 'Nederlands',
  de: 'Deutsch',
  ko: 'Korean'
};

const getLanguageName = language => languageNameMap[language] || language;

export default getLanguageName;
