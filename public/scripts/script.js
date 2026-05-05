const applyAboutFooterTheme = () => {
  if (!window.matchMedia("(width < 1024px)").matches) {
    document.body.style.removeProperty("--footer-bg");
    return;
  }

  document.body.style.setProperty("--footer-bg", "var(--color-charcoal)");
};

const triggerMoveIn = () => {
  const moveIns = document.querySelectorAll(".move-in");

  if (!moveIns.length) return;

  moveIns.forEach((moveIn) => moveIn.classList.remove("move-in"));

  requestAnimationFrame(() => {
    moveIns.forEach((moveIn) => moveIn.classList.add("move-in"));
  });
};

const triggerFadeIn = () => {
  const fadeIns = document.querySelectorAll(".fade-in");

  if (!fadeIns.length) return;

  fadeIns.forEach((fadeIn) => fadeIn.classList.remove("fade-in"));

  requestAnimationFrame(() => {
    fadeIns.forEach((fadeIn) => fadeIn.classList.add("fade-in"));
  });
};

const runPageAnimations = () => {
  triggerMoveIn();
  triggerFadeIn();
  applyAboutFooterTheme();
};

document.addEventListener("astro:page-load", runPageAnimations);
document.addEventListener("astro:after-swap", runPageAnimations);
runPageAnimations();
