export function resolveSiteConfig(env = process.env) {
  const repo = env.GITHUB_REPOSITORY?.split('/')[1];
  const owner = env.GITHUB_REPOSITORY_OWNER;
  const sourceRepository = env.GITHUB_REPOSITORY ?? 'QingZoneX/qingzonex.github.io';
  const configuredSite = env.SITE_URL?.trim();
  const customSite = configuredSite ? configuredSite.replace(/\/$/, '') : undefined;
  const isActions = env.GITHUB_ACTIONS === 'true' && Boolean(repo && owner);
  const ownerSiteName = owner ? `${owner.toLowerCase()}.github.io` : '';
  const isOwnerSite = Boolean(isActions && repo?.toLowerCase() === ownerSiteName);

  const site = customSite ?? (isActions ? `https://${owner.toLowerCase()}.github.io` : 'https://qingzonex.github.io');
  const base = customSite ? '/' : (isActions && !isOwnerSite ? `/${repo}` : '/');

  return {
    repo,
    owner,
    sourceRepository,
    customSite,
    isActions,
    isOwnerSite,
    site,
    base,
  };
}
