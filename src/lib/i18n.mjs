export const LOCALE_STORAGE_KEY = 'qingzonex.locale.v1';
export const DEFAULT_LOCALE = 'zh-cn';
export const SUPPORTED_LOCALES = ['zh-cn', 'zh-tw', 'en', 'ar', 'fr', 'ru', 'ja', 'ko'];

export const LOCALE_SETTINGS = {
  'zh-cn': { label: '简体中文', lang: 'zh-CN', prefix: '', ogLocale: 'zh_CN', badge: '简', direction: 'ltr' },
  'zh-tw': { label: '繁體中文', lang: 'zh-TW', prefix: 'zh-tw', ogLocale: 'zh_TW', badge: '繁', direction: 'ltr' },
  en: { label: 'English', lang: 'en', prefix: 'en', ogLocale: 'en_US', badge: 'EN', direction: 'ltr' },
  ar: { label: 'العربية', lang: 'ar', prefix: 'ar', ogLocale: 'ar_AR', badge: 'ع', direction: 'rtl' },
  fr: { label: 'Français', lang: 'fr', prefix: 'fr', ogLocale: 'fr_FR', badge: 'FR', direction: 'ltr' },
  ru: { label: 'Русский', lang: 'ru', prefix: 'ru', ogLocale: 'ru_RU', badge: 'RU', direction: 'ltr' },
  ja: { label: '日本語', lang: 'ja', prefix: 'ja', ogLocale: 'ja_JP', badge: '日', direction: 'ltr' },
  ko: { label: '한국어', lang: 'ko', prefix: 'ko', ogLocale: 'ko_KR', badge: '한', direction: 'ltr' },
};

/** Path segments used to mirror a locale under `/<prefix>/…`; the default locale stays at the root. */
export const LOCALE_PREFIXES = SUPPORTED_LOCALES
  .map((code) => LOCALE_SETTINGS[code].prefix)
  .filter(Boolean);

/**
 * Base language tags that map onto a shipped locale. `zh` keeps its dedicated
 * handling below because script subtags decide between Simplified and Traditional.
 */
const LANGUAGE_ALIASES = {
  en: 'en',
  ar: 'ar',
  fa: 'ar',
  he: 'ar',
  ur: 'ar',
  fr: 'fr',
  ru: 'ru',
  ja: 'ja',
  ko: 'ko',
};

export function normalizeBase(base = '/') {
  const value = `/${String(base || '/').replace(/^\/+|\/+$/g, '')}/`.replace(/\/+/g, '/');
  return value === '//' ? '/' : value;
}

export function ensureTrailingSlash(pathname = '/') {
  const value = String(pathname || '/');
  if (value === '/') return '/';
  return value.endsWith('/') ? value : `${value}/`;
}

export function normalizeLocaleTag(input) {
  const value = String(input || '').trim().toLowerCase().replaceAll('_', '-');
  if (!value) return undefined;
  if (value === 'zh-tw' || value === 'zh-hk' || value === 'zh-mo' || value === 'zh-hant' || value.startsWith('zh-hant-')) return 'zh-tw';
  if (value === 'zh' || value === 'zh-cn' || value === 'zh-sg' || value === 'zh-hans' || value.startsWith('zh-hans-')) return 'zh-cn';
  const base = value.split('-')[0];
  if (base === 'zh') return 'zh-cn';
  if (LANGUAGE_ALIASES[base]) return LANGUAGE_ALIASES[base];
  if (SUPPORTED_LOCALES.includes(base)) return base;
  return undefined;
}

export function resolvePreferredLocale(storedLocale, browserLanguages = []) {
  const stored = normalizeLocaleTag(storedLocale);
  if (stored) return stored;
  for (const language of browserLanguages || []) {
    const normalized = normalizeLocaleTag(language);
    if (normalized) return normalized;
  }
  return DEFAULT_LOCALE;
}

export function stripBase(pathname, base = '/') {
  const normalizedBase = normalizeBase(base);
  const normalizedPath = `/${String(pathname || '/').replace(/^\/+/, '')}`;
  if (normalizedBase !== '/' && normalizedPath.startsWith(normalizedBase)) return normalizedPath.slice(normalizedBase.length);
  return normalizedPath.replace(/^\/+/, '');
}

function localePrefixPattern() {
  return LOCALE_PREFIXES.map((prefix) => prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
}

export function inferLocaleFromPath(pathname, base = '/') {
  const relative = stripBase(pathname, base).toLowerCase();
  const segment = relative.split('/')[0];
  for (const code of SUPPORTED_LOCALES) {
    const { prefix } = LOCALE_SETTINGS[code];
    if (prefix && segment === prefix) return code;
  }
  return DEFAULT_LOCALE;
}

export function logicalPathFromPathname(pathname, base = '/') {
  const relative = stripBase(pathname, base);
  const prefixes = localePrefixPattern();
  if (!prefixes) return relative;
  return relative.replace(new RegExp(`^(?:${prefixes})(?:/|$)`, 'i'), '');
}

export function localePath(locale, path = '', base = '/') {
  const normalizedLocale = normalizeLocaleTag(locale) || DEFAULT_LOCALE;
  const normalizedBase = normalizeBase(base);
  const cleanPath = String(path || '').replace(/^\/+|\/+$/g, '');
  const prefix = LOCALE_SETTINGS[normalizedLocale].prefix;
  const relative = [prefix, cleanPath].filter(Boolean).join('/');
  const output = relative ? `${normalizedBase}${relative}`.replace(/([^:]\/)\/+/, '$1') : normalizedBase;
  return ensureTrailingSlash(output);
}

export function isRtlLocale(locale) {
  return (LOCALE_SETTINGS[normalizeLocaleTag(locale) || DEFAULT_LOCALE] || LOCALE_SETTINGS[DEFAULT_LOCALE]).direction === 'rtl';
}

export function localeBootstrapScript(base = '/') {
  const normalizedBase = normalizeBase(base);
  return `(() => {
    const KEY = ${JSON.stringify(LOCALE_STORAGE_KEY)};
    const BASE = ${JSON.stringify(normalizedBase)};
    const DEFAULT = ${JSON.stringify(DEFAULT_LOCALE)};
    const SUPPORTED = new Set(${JSON.stringify(SUPPORTED_LOCALES)});
    const PREFIXES = ${JSON.stringify(LOCALE_PREFIXES)};
    const ALIASES = ${JSON.stringify(LANGUAGE_ALIASES)};
    const normalize = (input) => {
      const value = String(input || '').trim().toLowerCase().replaceAll('_', '-');
      if (value === 'zh-tw' || value === 'zh-hk' || value === 'zh-mo' || value === 'zh-hant' || value.startsWith('zh-hant-')) return 'zh-tw';
      if (value === 'zh' || value === 'zh-cn' || value === 'zh-sg' || value === 'zh-hans' || value.startsWith('zh-hans-')) return 'zh-cn';
      const base = value.split('-')[0];
      if (base === 'zh') return 'zh-cn';
      if (ALIASES[base]) return ALIASES[base];
      return SUPPORTED.has(base) ? base : undefined;
    };
    const ensureSlash = (pathname) => pathname === '/' || pathname.endsWith('/') ? pathname : pathname + '/';
    const stripBase = (pathname) => {
      const path = '/' + String(pathname || '/').replace(/^\\/+/, '');
      if (BASE !== '/' && path.startsWith(BASE)) return path.slice(BASE.length);
      return path.replace(/^\\/+/, '');
    };
    const localeFromPath = (pathname) => {
      const relative = stripBase(pathname).toLowerCase();
      const segment = relative.split('/')[0];
      return PREFIXES.includes(segment) ? segment : DEFAULT;
    };
    const logicalPath = (pathname) => {
      const relative = stripBase(pathname);
      for (const prefix of PREFIXES) {
        if (relative.toLowerCase().startsWith(prefix.toLowerCase() + '/')) return relative.slice(prefix.length + 1);
        if (relative.toLowerCase() === prefix.toLowerCase()) return '';
      }
      return relative;
    };
    const targetPath = (locale, pathname) => {
      const logical = logicalPath(pathname).replace(/^\\/+|\\/+$/g, '');
      const prefix = locale === DEFAULT ? '' : locale;
      const relative = [prefix, logical].filter(Boolean).join('/');
      const result = relative ? (BASE + relative).replace(/([^:]\\/)\\/+/g, '$1') : BASE;
      return ensureSlash(result);
    };
    const readStored = () => { try { return normalize(localStorage.getItem(KEY)); } catch { return undefined; } };
    const store = (locale) => { try { if (SUPPORTED.has(locale)) localStorage.setItem(KEY, locale); } catch {} };
    const browserLanguages = Array.isArray(navigator.languages) && navigator.languages.length ? navigator.languages : [navigator.language];
    const desired = readStored() || browserLanguages.map(normalize).find(Boolean) || DEFAULT;
    const current = localeFromPath(location.pathname);
    window.__QINGZONEX_I18N__ = { key: KEY, base: BASE, desired, current, localeFromPath, targetPath };
    if (desired !== current) {
      location.replace(targetPath(desired, location.pathname) + location.search + location.hash);
      return;
    }
    document.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const option = target.closest('[data-locale-option]');
      if (!(option instanceof HTMLAnchorElement)) return;
      const locale = normalize(option.dataset.locale);
      if (!locale) return;
      store(locale);
      event.preventDefault();
      const next = new URL(option.href, location.href);
      next.search = location.search;
      next.hash = location.hash;
      location.assign(next.href);
    }, true);
    document.addEventListener('change', (event) => {
      const select = event.target;
      if (!(select instanceof HTMLSelectElement)) return;
      if (select.matches('[data-locale-select]')) {
        const option = select.selectedOptions[0];
        const locale = normalize(option?.dataset.locale);
        if (!locale) return;
        store(locale);
        location.assign(ensureSlash(select.value) + location.search + location.hash);
        return;
      }
      if (select.closest('starlight-lang-select')) store(localeFromPath(select.value));
    }, true);
    window.addEventListener('storage', (event) => {
      if (event.key !== KEY) return;
      const locale = normalize(event.newValue);
      if (locale && locale !== localeFromPath(location.pathname)) location.replace(targetPath(locale, location.pathname) + location.search + location.hash);
    });
  })();`;
}
