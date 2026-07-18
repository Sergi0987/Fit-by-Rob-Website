// Resolves a path relative to the public folder (e.g. images uploaded
// through the CMS) against the app's base path, so it works whether the
// site is served from a domain root (Netlify) or a subpath (GitHub Pages
// preview builds via --mode ghpages).
export function publicUrl(path) {
  if (!path) return "";
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}
