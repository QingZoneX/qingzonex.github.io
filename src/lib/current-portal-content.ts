import { getPortalContent as getBasePortalContent, type PortalLocale } from './portal-content';

const STRING_REPLACEMENTS: ReadonlyArray<readonly [string, string]> = [
  ['QingZoneX/QTableUI', 'QingZoneX/qtable-web'],
  ['QingZoneX/QTable', 'QingZoneX/qtable-server'],
  ['TypeScript 6', 'TypeScript 7'],
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
 * without mutating the historical copy source in-place. This also keeps legacy
 * QTableUI route wording compatible while presenting qtable-web to users.
 */
export function getPortalContent(locale: PortalLocale) {
  return normalizePortalValue(getBasePortalContent(locale));
}

export type { PortalLocale } from './portal-content';
