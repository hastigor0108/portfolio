// Typing Effect
const typingText = document.getElementById("typing-text");

const words = [
  "Programmer",
  "Web Developer",
  "Cybersecurity Enthusiast",
  "Frontend Learner"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {

  const currentWord = words[wordIndex];

  if (isDeleting) {

    typingText.textContent =
      currentWord.substring(0, charIndex--);

  } else {

    typingText.textContent =
      currentWord.substring(0, charIndex++);
  }

  if (!isDeleting &&
      charIndex === currentWord.length + 1) {

    isDeleting = true;

    setTimeout(typeEffect, 1000);

    return;
  }

  if (isDeleting && charIndex === 0) {

    isDeleting = false;

    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(typeEffect, isDeleting ? 60 : 120);
}

typeEffect();


// Theme Toggle
const themeToggle =
  document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {

  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {

    themeToggle.textContent = "☀️";

  } else {

    themeToggle.textContent = "🌙";
  }
});


// Mobile Menu
const menuToggle =
  document.getElementById("menu-toggle");

const navLinks =
  document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

  navLinks.classList.toggle("active");
});


// Close Mobile Menu
document
  .querySelectorAll(".nav-links a")
  .forEach(link => {

    link.addEventListener("click", () => {

      navLinks.classList.remove("active");
    });
  });


// Simple Contact Form
const contactForm =
  document.getElementById("contact-form");

const formMessage =
  document.getElementById("form-message");

contactForm.addEventListener("submit", function (e) {

  e.preventDefault();

  formMessage.textContent =
    "Message sent successfully!";

  formMessage.style.color = "lightgreen";

  contactForm.reset();
});