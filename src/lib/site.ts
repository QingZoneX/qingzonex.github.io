export const GITHUB_ORG_URL = 'https://github.com/QingZoneX';
export const ORG_AVATAR_URL = 'https://avatars.githubusercontent.com/u/280868418?v=4';
export const QTABLE_GITHUB_URL = 'https://github.com/QingZoneX/QTable';
export const QTABLE_UI_GITHUB_URL = 'https://github.com/QingZoneX/QTableUI';

export function withBase(path = ''): string {
  const base = import.meta.env.BASE_URL || '/';
  if (!path || path === '/') return base;
  return `${base}${path.replace(/^\/+/, '')}`.replace(/([^:]\/)\/+/, '$1');
}
