export const LOCALE_STORAGE_KEY = 'qingzonex.locale.v1';
export const DEFAULT_LOCALE = 'zh-cn';
export const SUPPORTED_LOCALES = ['zh-cn', 'zh-tw', 'en'];

export const LOCALE_SETTINGS = {
  'zh-cn': { label: '简体中文', lang: 'zh-CN', prefix: '', ogLocale: 'zh_CN', badge: '简' },
  'zh-tw': { label: '繁體中文', lang: 'zh-TW', prefix: 'zh-tw', ogLocale: 'zh_TW', badge: '繁' },
  en: { label: 'English', lang: 'en', prefix: 'en', ogLocale: 'en_US', badge: 'EN' },
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
  if (value === 'en' || value.startsWith('en-')) return 'en';
  if (SUPPORTED_LOCALES.includes(value)) return value;
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

export function inferLocaleFromPath(pathname, base = '/') {
  const relative = stripBase(pathname, base).toLowerCase();
  if (relative === 'en' || relative.startsWith('en/')) return 'en';
  if (relative === 'zh-tw' || relative.startsWith('zh-tw/')) return 'zh-tw';
  return 'zh-cn';
}

export function logicalPathFromPathname(pathname, base = '/') {
  const relative = stripBase(pathname, base);
  return relative.replace(/^(?:en|zh-tw)(?:\/|$)/i, '');
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

export function localeBootstrapScript(base = '/') {
  const normalizedBase = normalizeBase(base);
  return `(() => {
    const KEY = ${JSON.stringify(LOCALE_STORAGE_KEY)};
    const BASE = ${JSON.stringify(normalizedBase)};
    const DEFAULT = 'zh-cn';
    const SUPPORTED = new Set(['zh-cn', 'zh-tw', 'en']);
    const normalize = (input) => {
      const value = String(input || '').trim().toLowerCase().replaceAll('_', '-');
      if (value === 'zh-tw' || value === 'zh-hk' || value === 'zh-mo' || value === 'zh-hant' || value.startsWith('zh-hant-')) return 'zh-tw';
      if (value === 'zh' || value === 'zh-cn' || value === 'zh-sg' || value === 'zh-hans' || value.startsWith('zh-hans-')) return 'zh-cn';
      if (value === 'en' || value.startsWith('en-')) return 'en';
      return SUPPORTED.has(value) ? value : undefined;
    };
    const ensureSlash = (pathname) => pathname === '/' || pathname.endsWith('/') ? pathname : pathname + '/';
    const stripBase = (pathname) => {
      const path = '/' + String(pathname || '/').replace(/^\\/+/, '');
      if (BASE !== '/' && path.startsWith(BASE)) return path.slice(BASE.length);
      return path.replace(/^\\/+/, '');
    };
    const localeFromPath = (pathname) => {
      const relative = stripBase(pathname).toLowerCase();
      if (relative === 'en' || relative.startsWith('en/')) return 'en';
      if (relative === 'zh-tw' || relative.startsWith('zh-tw/')) return 'zh-tw';
      return 'zh-cn';
    };
    const logicalPath = (pathname) => stripBase(pathname).replace(/^(?:en|zh-tw)(?:\\/|$)/i, '');
    const targetPath = (locale, pathname) => {
      const logical = logicalPath(pathname).replace(/^\\/+|\\/+$/g, '');
      const prefix = locale === 'zh-cn' ? '' : locale;
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
