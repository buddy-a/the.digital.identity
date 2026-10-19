document.addEventListener("DOMContentLoaded", function () {
  /* ---------- Hero title ---------- */
  const heroName = document.getElementById("hero-name");
  if (heroName) {
    heroName.textContent = "Buddy Mantal | Cybersecurity";
  }

  /* ---------- Smooth scrolling for in-page links ---------- */
  function scrollToTarget(hash) {
    // "#" alone means "top of the page" (the brand link)
    if (!hash || hash === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return true;
    }
    let target = null;
    try {
      target = document.querySelector(hash);
    } catch (err) {
      return false;
    }
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      return true;
    }
    return false;
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      if (scrollToTarget(this.getAttribute("href"))) {
        e.preventDefault();
      }
    });
  });

  /* ---------- Contact form ---------- */
  // Paste your real Formspree endpoint here, e.g. "https://formspree.io/f/abcdwxyz".
  // While it still contains YOUR_FORM_ID the form will say honestly that it is not connected yet.
  const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

  const form = document.getElementById("contact-form");
  if (!form) return;

  const statusBox = document.getElementById("form-status");

  function showStatus(message, type) {
    if (!statusBox) return;
    statusBox.textContent = message;
    statusBox.className = "form-status " + (type || "");
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const submitBtn = form.querySelector("button[type='submit']");

    if (
      nameInput.value.trim() === "" ||
      emailInput.value.trim() === "" ||
      messageInput.value.trim() === ""
    ) {
      showStatus("Tafadhali jaza sehemu zote — please fill in every field.", "error");
      return;
    }

    if (FORM_ENDPOINT.indexOf("YOUR_FORM_ID") !== -1) {
      showStatus(
        "The contact form is not connected to an inbox yet, so nothing was sent. Please check back soon.",
        "error"
      );
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    showStatus("Sending your message...", "");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: nameInput.value,
          email: emailInput.value,
          message: messageInput.value
        })
      });

      if (response.ok) {
        showStatus("Asante " + nameInput.value.trim() + "! Your message has been sent.", "success");
        form.reset();
      } else {
        showStatus("Something went wrong on the server. Please try again later.", "error");
      }
    } catch (error) {
      showStatus("Network error. Please check your internet connection and try again.", "error");
    }

    submitBtn.disabled = false;
    submitBtn.textContent = "Send message";
  });
});
