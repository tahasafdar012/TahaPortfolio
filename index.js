tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#1e3a8a",
        secondary: "#f8fafc",
        accent: "#f59e0b",
        dark: {
          900: "#0f172a",
          800: "#1e293b",
          700: "#334155",
        },
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.8s ease-out forwards",
        "slide-left": "slideLeft 0.8s ease-out forwards",
        "slide-right": "slideRight 0.8s ease-out forwards",
        typewriter:
          "typewriter 4s steps(44) 1s forwards, blink 750ms steps(44) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        slideLeft: {
          "0%": { transform: "translateX(30px)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        slideRight: {
          "0%": { transform: "translateX(-30px)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        typewriter: {
          "0%": { width: "0" },
          "100%": { width: "24ch" },
        },
        blink: {
          "0%": { "border-right-color": "transparent" },
          "50%": { "border-right-color": "currentColor" },
          "100%": { "border-right-color": "transparent" },
        },
      },
    },
  },
};

// DOM Elements
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const themeToggle = document.getElementById("theme-toggle");
const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
const themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");
const backToTopButton = document.querySelector(".back-to-top");
const animatedElements = document.querySelectorAll(
  ".animate-fade-in, .animate-slide-up, .animate-slide-left, .animate-slide-right"
);

// Mobile Menu Toggle
mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  mobileMenuButton.innerHTML = mobileMenu.classList.contains("hidden")
    ? '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>'
    : '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';
});

// Close mobile menu when clicking a link
document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    mobileMenuButton.innerHTML =
      '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>';
  });
});

// Dark Mode Toggle
if (
  localStorage.getItem("color-theme") === "dark" ||
  (!("color-theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
  themeToggleLightIcon.classList.remove("hidden");
} else {
  document.documentElement.classList.remove("dark");
  themeToggleDarkIcon.classList.remove("hidden");
}

themeToggle.addEventListener("click", () => {
  themeToggleDarkIcon.classList.toggle("hidden");
  themeToggleLightIcon.classList.toggle("hidden");

  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("color-theme", "light");
  } else {
    document.documentElement.classList.add("dark");
    localStorage.setItem("color-theme", "dark");
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Form submission
(function () {
  const contactForm = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);

      try {
        const response = await fetch("https://formspree.io/f/mjkoevyb", {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          formMessage.textContent =
            "✅ Message sent successfully! I will get back to you soon.";
          formMessage.classList.remove("hidden", "bg-red-100", "text-red-700");
          formMessage.classList.add("bg-green-100", "text-green-700");
          contactForm.reset();
        } else {
          formMessage.textContent =
            "❌ Oops! Something went wrong. Please try again.";
          formMessage.classList.remove(
            "hidden",
            "bg-green-100",
            "text-green-700"
          );
          formMessage.classList.add("bg-red-100", "text-red-700");
        }
      } catch (error) {
        formMessage.textContent =
          "❌ Network error. Please check your connection and try again.";
        formMessage.classList.remove(
          "hidden",
          "bg-green-100",
          "text-green-700"
        );
        formMessage.classList.add("bg-red-100", "text-red-700");
      }

      setTimeout(() => {
        formMessage.classList.add("hidden");
      }, 5000);
    });
  }
})();

// Back to top button
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.remove("hidden");
  } else {
    backToTopButton.classList.add("hidden");
  }
});

backToTopButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Animation on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
      }
    });
  },
  { threshold: 0.1 }
);

animatedElements.forEach((element) => {
  observer.observe(element);
});

// Typewriter effect for hero tagline
const typewriterElement = document.querySelector(".typewriter");
setTimeout(() => {
  typewriterElement.classList.add("typewriter");
  typewriterElement.style.animation =
    "typewriter 4s steps(44) 1s forwards, blink 750ms steps(44) infinite";
}, 1500);

// Initialize animations for elements already in viewport on load
window.addEventListener("load", () => {
  animatedElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      element.style.opacity = "1";
    }
  });
});
