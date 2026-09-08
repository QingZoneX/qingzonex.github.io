import assert from 'node:assert/strict';
import { resolveSiteConfig } from '../site-config.mjs';

const local = resolveSiteConfig({});
assert.equal(local.site, 'https://qingzonex.github.io');
assert.equal(local.base, '/');
assert.equal(local.sourceRepository, 'QingZoneX/qingzonex.github.io');

const privatePersonal = resolveSiteConfig({
  GITHUB_ACTIONS: 'true',
  GITHUB_REPOSITORY: 'boychina/qingzonex.github.io',
  GITHUB_REPOSITORY_OWNER: 'boychina',
});
assert.equal(privatePersonal.site, 'https://boychina.github.io');
assert.equal(privatePersonal.base, '/qingzonex.github.io');
assert.equal(privatePersonal.sourceRepository, 'boychina/qingzonex.github.io');
assert.equal(privatePersonal.isOwnerSite, false);

const organization = resolveSiteConfig({
  GITHUB_ACTIONS: 'true',
  GITHUB_REPOSITORY: 'QingZoneX/qingzonex.github.io',
  GITHUB_REPOSITORY_OWNER: 'QingZoneX',
});
assert.equal(organization.site, 'https://qingzonex.github.io');
assert.equal(organization.base, '/');
assert.equal(organization.isOwnerSite, true);

const customDomain = resolveSiteConfig({
  GITHUB_ACTIONS: 'true',
  GITHUB_REPOSITORY: 'QingZoneX/qingzonex.github.io',
  GITHUB_REPOSITORY_OWNER: 'QingZoneX',
  SITE_URL: '  https://www.qingzonex.example/  ',
});
assert.equal(customDomain.site, 'https://www.qingzonex.example');
assert.equal(customDomain.base, '/');

const emptyVariable = resolveSiteConfig({
  GITHUB_ACTIONS: 'true',
  GITHUB_REPOSITORY: 'QingZoneX/qingzonex.github.io',
  GITHUB_REPOSITORY_OWNER: 'QingZoneX',
  SITE_URL: '',
});
assert.equal(emptyVariable.site, 'https://qingzonex.github.io');
assert.equal(emptyVariable.base, '/');

console.log('Site configuration verified for local, personal Pages, organization Pages, custom domain, and empty variable cases.');
