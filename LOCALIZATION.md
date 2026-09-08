# QingZoneX portal localization contract

The portal ships three first-class locales:

| Locale | URL prefix | HTML language | Role |
| --- | --- | --- | --- |
| Simplified Chinese | `/` | `zh-CN` | root / no-JS fallback |
| Traditional Chinese | `/zh-tw/` | `zh-TW` | full translated locale |
| English | `/en/` | `en` | full translated locale |

All page routes follow Astro's `trailingSlash: 'always'` contract. Locale home routes must therefore be emitted as `/zh-tw/` and `/en/`, never `/zh-tw` or `/en`. The same rule applies under the temporary project-site base path and after transfer to the QingZoneX organization Pages root.

## Locale resolution

The synchronous head bootstrap resolves locale in this order:

1. explicit user preference stored in `localStorage` under `qingzonex.locale.v1`;
2. `navigator.languages` / `navigator.language`;
3. Simplified Chinese fallback.

Browser mappings:

- `zh-TW`, `zh-HK`, `zh-MO`, `zh-Hant*` → Traditional Chinese;
- `zh-CN`, `zh-SG`, `zh-Hans*`, generic `zh` → Simplified Chinese;
- `en*` → English;
- unsupported languages → Simplified Chinese.

Automatic browser detection is not persisted. A manual selection is persisted and therefore overrides browser detection on later visits. A `storage` event listener synchronizes manual language changes across open tabs.

## Static Pages behavior

GitHub Pages has no request-time `Accept-Language` routing. Locale detection therefore runs as an inline synchronous `<head>` script before page content is painted. It preserves the equivalent logical route, query string and hash while switching locale prefixes.

The same bootstrap is injected into both custom Astro portal pages and Starlight documentation pages. Portal, Docs and the custom 404 page use the shared `LocaleSwitcher.astro` popover. Starlight's `LanguageSelect` slot is overridden by `StarlightLanguageSwitcher.astro`, so language selection has the same visual, keyboard and persistence behavior across the entire site.

The custom switcher uses normal localized `<a>` targets as a no-JavaScript navigation fallback. With JavaScript enabled, the head bootstrap stores the manual preference before navigation and carries the current query string and hash to the equivalent localized route.

## Content ownership

Custom portal pages share one component implementation and read localized copy from `src/lib/portal-content.ts`.

Documentation is intentionally stored as real translated Markdown instead of runtime string substitution:

- `src/content/docs/docs/` — Simplified Chinese;
- `src/content/docs/zh-tw/docs/` — Traditional Chinese;
- `src/content/docs/en/docs/` — English.

When adding, removing or renaming a documentation page, all three locale trees must change together.

## Quality gates

`npm run verify:i18n` checks locale normalization, browser precedence, project-site/root base paths, trailing-slash-safe localized home routes, portal-route parity, documentation-file parity, shared switcher accessibility markers and bootstrap persistence behavior.

`npm run verify:links` validates relative documentation links across all three locale trees.

`npm run verify:dist` validates all locale routes, generated `lang` metadata, locale bootstraps, internal assets/links, and rejects localized home links that omit the required trailing slash.

`npm run verify:transfer` performs a second production build while simulating `QingZoneX/qingzonex.github.io`, so locale prefixes and switcher links are verified both under the temporary personal project-site base path and the final organization root Pages path.
