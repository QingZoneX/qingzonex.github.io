import { getPortalContent as getBasePortalContent, type PortalLocale } from './portal-content';

export const QTABLE_VERSION = 'v0.1.1-alpha';

const STRING_REPLACEMENTS: ReadonlyArray<readonly [string, string]> = [
  ['QingZoneX/QTableUI', 'QingZoneX/qtable-web'],
  ['QingZoneX/QTable', 'QingZoneX/qtable-server'],
  ['TypeScript 6', 'TypeScript 7'],
  ['v0.1.0-alpha', QTABLE_VERSION],
  ['0.1.0-alpha', QTABLE_VERSION.slice(1)],
  ['QTableUI', 'QTable Web'],
];

function normalizePortalValue<T>(value: T): T {
  if (typeof value === 'string') {
    return STRING_REPLACEMENTS.reduce(
      (result, [from, to]) => result.replaceAll(from, to),
      value,
    ) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => normalizePortalValue(item)) as T;
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [
        key,
        normalizePortalValue(item),
      ]),
    ) as T;
  }

  return value;
}

/**
 * Keep the presentation layer aligned with the currently public repository names
 * and release baseline without mutating the historical copy source in-place. This
 * also keeps legacy QTableUI route wording compatible while presenting qtable-web
 * to users.
 */
export function getPortalContent(locale: PortalLocale) {
  return normalizePortalValue(getBasePortalContent(locale));
}

export type { PortalLocale } from './portal-content';
