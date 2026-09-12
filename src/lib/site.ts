export const GITHUB_ORG_URL = 'https://github.com/QingZoneX';
export const ORG_AVATAR_URL = 'https://avatars.githubusercontent.com/u/280868418?v=4';
export const QTABLE_SERVER_GITHUB_URL = 'https://github.com/QingZoneX/qtable-server';
export const QTABLE_WEB_GITHUB_URL = 'https://github.com/QingZoneX/qtable-web';

// Compatibility aliases for the existing portal components. New code should use
// the explicit server/web names above so repository boundaries remain clear.
export const QTABLE_GITHUB_URL = QTABLE_SERVER_GITHUB_URL;
export const QTABLE_UI_GITHUB_URL = QTABLE_WEB_GITHUB_URL;

export function withBase(path = ''): string {
  const base = import.meta.env.BASE_URL || '/';
  if (!path || path === '/') return base;
  return `${base}${path.replace(/^\/+/, '')}`.replace(/([^:]\/)\/+/, '$1');
}
