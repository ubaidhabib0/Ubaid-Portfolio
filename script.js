/* =========================
   SCROLL REVEAL + NAV ACTIVE
========================= */

const sections = document.querySelectorAll(".section");
const links = document.querySelectorAll(".nav-links a");

/* scroll animation */
window.addEventListener("scroll", () => {
    let scrollPos = window.scrollY + 150;

    sections.forEach(sec => {
        if (scrollPos > sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
            sec.classList.add("visible");

            links.forEach(l => l.classList.remove("active"));
            document.querySelector(`.nav-links a[href="#${sec.id}"]`)
                ?.classList.add("active");
        }
    });
});

/* smooth scroll */
links.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector(link.getAttribute("href"))
            .scrollIntoView({ behavior: "smooth" });
    });
});

/* initial animation */
window.addEventListener("load", () => {
    sections.forEach((sec, i) => {
        setTimeout(() => sec.classList.add("visible"), i * 150);
    });
});

const toggleBtn = document.getElementById("theme-toggle");

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    // change icon
    const icon = toggleBtn.querySelector(".icon");
    if (document.body.classList.contains("dark")) {
        icon.textContent = "☀️";
    } else {
        icon.textContent = "🌙";
    }
});