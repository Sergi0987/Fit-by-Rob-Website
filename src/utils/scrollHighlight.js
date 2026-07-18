// Real :hover doesn't fire reliably on touch devices, so on touch we
// highlight whichever card is nearest the vertical center of the viewport
// as the user scrolls instead. Desktop pointer devices keep normal :hover
// and never run this observer.
export function initScrollHighlight(selector) {
  if (typeof window === "undefined" || !window.matchMedia("(hover: none)").matches) {
    return () => {};
  }

  const elements = document.querySelectorAll(selector);
  if (elements.length === 0) return () => {};

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        entry.target.classList.toggle("is-active", entry.isIntersecting);
      }
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );

  elements.forEach((element) => observer.observe(element));
  return () => observer.disconnect();
}
