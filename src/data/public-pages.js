import { projects } from './projects.js';

// Pages listed in the sitemap and given a Japanese copy under /ja/.
// Proposal, trade and RSVP pages are left out on purpose.
// Trailing slashes match the URLs GitHub Pages actually serves.
export const publicPages = [
  '/',
  '/services/',
  '/about/',
  '/projects/',
  '/journal/',
  '/contact/',
  ...projects.filter((p) => !p.hidden).map((p) => `/projects/${p.slug}/`),
];

export const jaPath = (path) => `/ja${path}`;
