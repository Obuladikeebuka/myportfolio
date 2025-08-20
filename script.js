function toggleMenu() {
  document.getElementById("nav").classList.toggle("active");
}
function openModal(title, img, desc, features) {
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalImg").src = img;
  document.getElementById("modalDesc").innerText = desc;
  document.getElementById("modalFeatures").innerText = features;
  document.getElementById("modalLink").href = "javascript:void(0)";
  document.getElementById("projectModal").style.display = "flex";
}
function closeModal() {
  document.getElementById("projectModal").style.display = "none";
}

function scrollLeft() {
  document
    .querySelector(".carousel-track")
    .scrollBy({ left: -250, behavior: "smooth" });
}
function scrollRight() {
  document
    .querySelector(".carousel-track")
    .scrollBy({ left: 250, behavior: "smooth" });
}

window.addEventListener("scroll", () => {
  // sticky header
  const header = document.querySelector("header");
  header.classList.toggle("scrolled", window.scrollY > 50);

  // parallax hero
  const hero = document.querySelector(".hero");
  hero.style.backgroundPositionY = -(window.scrollY * 0.3) + "px";

  // reveal sections
  document.querySelectorAll(".section").forEach((sec) => {
    const top = sec.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) sec.classList.add("visible");
  });

  // Body-level background that only shows when About section is in view
  const aboutSection = document.querySelector("#about");
  const bodyAboutBg = document.querySelector(".body-about-bg");

  if (aboutSection) {
    const top = aboutSection.getBoundingClientRect().top;
    const bottom = aboutSection.getBoundingClientRect().bottom;

    if (top < window.innerHeight && bottom > 0) {
      bodyAboutBg.style.opacity = "1";
    } else {
      bodyAboutBg.style.opacity = "0";
    }
  }

  // Sticky background for Projects section (right side)
  const projectsSec = document.querySelector(".projects-section");

  if (projectsSec) {
    const pTop = projectsSec.getBoundingClientRect().top;
    const pBottom = projectsSec.getBoundingClientRect().bottom;

    if (pTop < window.innerHeight && pBottom > 0) {
      projectsSec.classList.add("show-bg");
    } else {
      projectsSec.classList.remove("show-bg");
    }
  }

  // highlight nav link
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");
    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });
      document.querySelector("nav a[href*=" + id + "]").classList.add("active");
    }
  });
});


const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");
sections.forEach((sec) => {
  let top = window.scrollY;
  let offset = sec.offsetTop - 150;
  let height = sec.offsetHeight;
  let id = sec.getAttribute("id");
  if (top >= offset && top < offset + height) {
    navLinks.forEach((link) => {
      link.classList.remove("active");
      document.querySelector("nav a[href*=" + id + "]").classList.add("active");
    });
  }
});




