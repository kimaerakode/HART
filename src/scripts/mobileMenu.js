const MOBILE_VIEWPORT_QUERY = "(max-width: 1023px)";

export const isMobileViewport = () =>
  typeof window !== "undefined" &&
  window.matchMedia(MOBILE_VIEWPORT_QUERY).matches;

export const getMobileMenu = () =>
  document.querySelector(".mobile-menu--overlay");

export const setMobileMenuView = (menu, view) => {
  if (!menu) return;
  const views = menu.querySelector(".mobile-menu-views");
  if (views) {
    views.dataset.menuView = view;
  }
  menu.dataset.mobileMenuView = view;
};

export const openContactMenu = () => {
  const menu = getMobileMenu();
  if (!menu) return;

  setMobileMenuView(menu, "contact");
  menu.classList.add("active");
};
