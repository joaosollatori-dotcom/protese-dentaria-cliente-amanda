document.documentElement.classList.add("js-ready");

document.querySelectorAll(".solution-card-description[data-character-limit]").forEach((panel) => {
  const limit = Number(panel.dataset.characterLimit);
  let characterCount = 0;
  let finished = false;

  panel.querySelectorAll("p").forEach((paragraph) => {
    if (finished) {
      paragraph.remove();
      return;
    }

    const text = paragraph.textContent.replace(/\s+/g, " ").trim();
    const separatorLength = characterCount > 0 ? 1 : 0;
    const available = Math.max(0, limit - characterCount - separatorLength);

    if (text.length <= available) {
      characterCount += separatorLength + text.length;
      return;
    }

    paragraph.textContent = text.slice(0, available).trimEnd();
    characterCount += separatorLength + paragraph.textContent.length;
    finished = true;
  });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
  if (slides.length < 2) return;

  let activeIndex = slides.findIndex((slide) => slide.classList.contains("is-active"));
  if (activeIndex < 0) activeIndex = 0;

  window.setInterval(() => {
    slides[activeIndex].classList.remove("is-active");
    slides[activeIndex].setAttribute("aria-hidden", "true");
    activeIndex = (activeIndex + 1) % slides.length;
    slides[activeIndex].classList.add("is-active");
    slides[activeIndex].setAttribute("aria-hidden", "false");
  }, 3000);
});
