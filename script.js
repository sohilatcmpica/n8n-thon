const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    siteNav.classList.toggle("is-open");
    document.body.classList.toggle("nav-open", !expanded);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("is-open");
      document.body.classList.remove("nav-open");
    });
  });
}

const eventDate = new Date("2026-08-01T08:30:00+05:30").getTime();
const countdownElements = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds"),
};

const pad = (value) => String(value).padStart(2, "0");

function updateCountdown() {
  const distance = Math.max(eventDate - Date.now(), 0);
  const seconds = Math.floor(distance / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (countdownElements.days) countdownElements.days.textContent = pad(days);
  if (countdownElements.hours) countdownElements.hours.textContent = pad(hours);
  if (countdownElements.minutes) countdownElements.minutes.textContent = pad(minutes);
  if (countdownElements.seconds) countdownElements.seconds.textContent = pad(remainingSeconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);

document.querySelectorAll(".faq-item").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) {
      return;
    }

    document.querySelectorAll(".faq-item").forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.open = false;
      }
    });
  });
});

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const registerForm = document.querySelector(".register-form");
const formNote = document.querySelector(".form-note");

if (registerForm && formNote) {
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const teamName = new FormData(registerForm).get("team") || "Your team";
    formNote.textContent = `${teamName} is ready for n8n-thon. Connect this form to your live registration system before publishing.`;
    registerForm.reset();
  });
}
