document.addEventListener("DOMContentLoaded", () => {
  // Contact form stub (console-log only, no backend)
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(contactForm);
      const obj = {};
      data.forEach((value, key) => { obj[key] = value; });
      console.log("Contact form submitted (stub):", obj);
      alert("Thank you for reaching out! We'll get back to you soon. (Demo — no backend connected)");
      contactForm.reset();
    });
  }

  // Pause scroll on hover
  document.querySelectorAll(".scroll-track, .scroll-track-reverse").forEach((el) => {
    el.addEventListener("mouseenter", () => { el.style.animationPlayState = "paused"; });
    el.addEventListener("mouseleave", () => { el.style.animationPlayState = "running"; });
  });
});