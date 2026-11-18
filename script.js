
/* ==============================
   MOBILE NAVIGATION
================================ */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.innerHTML = isOpen
        ? '<i class="fas fa-xmark"></i>'
        : '<i class="fas fa-bars"></i>';

    menuToggle.setAttribute("aria-expanded", isOpen);
});

navItems.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");

        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        menuToggle.setAttribute("aria-expanded", "false");
    });
});


/* ==============================
   ACTIVE NAVIGATION
================================ */

const sections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const currentId = entry.target.id;

            navItems.forEach(link => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${currentId}`
                );
            });
        }
    });
}, {
    rootMargin: "-30% 0px -60% 0px"
});

sections.forEach(section => {
    sectionObserver.observe(section);
});


/* ==============================
   TYPING ANIMATION
================================ */

const typingText = document.getElementById("typingText");

const roles = [
    "Frontend Developer",
    "UI/UX Designer",
    "Creative Developer",
    "Problem Solver"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentRole = roles[roleIndex];

    if (!deleting) {
        typingText.textContent =
            currentRole.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentRole.length) {
            deleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }

    } else {
        typingText.textContent =
            currentRole.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(typeEffect, deleting ? 45 : 90);
}

typeEffect();


/* ==============================
   SCROLL REVEAL ANIMATION
================================ */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            revealObserver.unobserve(entry.target);
        }

    });

}, {
    threshold: 0.12
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* ==============================
   PROJECT FILTERING
================================ */

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        projectCards.forEach(card => {

            const category = card.dataset.category;

            const shouldShow =
                filter === "all" || category === filter;

            card.classList.toggle("hide", !shouldShow);

        });

    });

});


/* ==============================
   DARK / LIGHT THEME
================================ */

const themeToggle = document.getElementById("themeToggle");

function updateThemeIcon() {

    const isLight = document.body.classList.contains("light-theme");

    themeToggle.innerHTML = isLight
        ? '<i class="fas fa-moon"></i>'
        : '<i class="fas fa-sun"></i>';
}

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
}

updateThemeIcon();

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-theme");

    const currentTheme = document.body.classList.contains("light-theme")
        ? "light"
        : "dark";

    localStorage.setItem("portfolio-theme", currentTheme);

    updateThemeIcon();

});


/* ==============================
   BACK TO TOP
================================ */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* ==============================
   CONTACT FORM
================================ */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

// Replace with your actual email address.
const recipientEmail = "alex@example.com";

contactForm.addEventListener("submit", event => {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !subject || !message) {
        formMessage.textContent = "Please fill in all fields.";
        return;
    }

    if (!emailPattern.test(email)) {
        formMessage.textContent = "Please enter a valid email address.";
        return;
    }

    const mailSubject = encodeURIComponent(subject);

    const mailBody = encodeURIComponent(
        `Name: ${name}\n` +
        `Email: ${email}\n\n` +
        `Message:\n${message}`
    );

    const mailtoLink =
        `mailto:${recipientEmail}?subject=${mailSubject}&body=${mailBody}`;

    formMessage.textContent = "Opening your email application...";

    window.location.href = mailtoLink;

});


/* ==============================
   DYNAMIC COPYRIGHT YEAR
================================ */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* ==============================
   CLOSE MOBILE MENU ON OUTSIDE CLICK
================================ */

document.addEventListener("click", event => {

    const clickedInsideMenu =
        navLinks.contains(event.target) ||
        menuToggle.contains(event.target);

    if (!clickedInsideMenu) {

        navLinks.classList.remove("open");

        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        menuToggle.setAttribute("aria-expanded", "false");

    }

});


/* ==============================
   SMOOTH ANCHOR SCROLLING
================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", event => {

        const targetId = anchor.getAttribute("href");

        if (targetId.length > 1) {

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        }

    });

});
