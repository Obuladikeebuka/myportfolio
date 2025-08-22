// DOM elements
const track = document.querySelector(".carousel-track");
const cards = document.querySelectorAll(".project-card");
let autoSlideInterval;
let cardWidth = 300; // Default value

// Initialize carousel after DOM is fully loaded
function initCarousel() {
  if (cards.length > 0) {
    // Calculate the actual card width including margin
    const cardStyle = getComputedStyle(cards[0]);
    const cardGap = parseInt(cardStyle.marginRight) || 20;
    cardWidth = cards[0].offsetWidth + cardGap;
  }

  // Start auto-slide
  startAutoSlide();
}

// Toggle mobile menu
function toggleMenu() {
  document.getElementById("nav").classList.toggle("active");
}

// Modal functions
function openModal(title, img, desc, features, link) {
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalImg").src = img;
  document.getElementById("modalDesc").innerText = desc;
  document.getElementById("modalFeatures").innerText = features;
  document.getElementById("modalLink").href = link;
  document.getElementById("projectModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("projectModal").style.display = "none";
}

// Scroll left function
function scrollLeft() {
  if (!track) return;
  track.scrollBy({ left: -cardWidth, behavior: "smooth" });
  resetAutoSlide();
}

// Scroll right function
function scrollRight() {
  if (!track) return;
  track.scrollBy({ left: cardWidth, behavior: "smooth" });
  resetAutoSlide();
}

// Auto-slide function
function autoSlide() {
  if (!track) return;

  const maxScroll = track.scrollWidth - track.clientWidth;

  // Check if we're at the end (with a small tolerance)
  if (track.scrollLeft >= maxScroll - 10) {
    // Scroll back to the beginning
    track.scrollTo({ left: 0, behavior: "smooth" });
  } else {
    // Scroll to the next card
    track.scrollBy({ left: cardWidth, behavior: "smooth" });
  }
}

// Start auto-slide
function startAutoSlide() {
  autoSlideInterval = setInterval(autoSlide, 3000);
}

// Reset auto-slide timer
function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initCarousel();

  // Pause auto-slide when user interacts with carousel
  if (track) {
    track.addEventListener("mouseenter", () =>
      clearInterval(autoSlideInterval)
    );
    track.addEventListener("mouseleave", startAutoSlide);
  }

  // Header scroll effect
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 50);
    }

    // Section visibility
    document.querySelectorAll(".section").forEach((sec) => {
      const top = sec.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) {
        sec.classList.add("visible");
      }
    });

    // About section background
    const aboutSection = document.querySelector("#about");
    const bodyAboutBg = document.querySelector(".body-about-bg");
    if (aboutSection && bodyAboutBg) {
      const top = aboutSection.getBoundingClientRect().top;
      const bottom = aboutSection.getBoundingClientRect().bottom;
      if (top < window.innerHeight && bottom > 0) {
        bodyAboutBg.style.opacity = "1";
      } else {
        bodyAboutBg.style.opacity = "0";
      }
    }

    // Navigation active state
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    sections.forEach((sec) => {
      const top = window.scrollY;
      const offset = sec.offsetTop - 150;
      const height = sec.offsetHeight;
      const id = sec.getAttribute("id");

      if (top >= offset && top < offset + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href").includes(id)) {
            link.classList.add("active");
          }
        });
      }
    });
  });

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    const modal = document.getElementById("projectModal");
    if (e.target === modal) {
      closeModal();
    }
  });
});

document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("nav").classList.remove("active");
  });
});