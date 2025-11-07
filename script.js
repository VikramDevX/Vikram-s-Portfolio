// Active navigation state management
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('.section');

function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}
window.addEventListener('scroll', updateActiveNav);

// Mobile menu toggle functionality
const menuToggle = document.getElementById('menuToggle');
const navLinksContainer = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinksContainer.contains(e.target)) {
        navLinksContainer.classList.remove('active');
    }
});

// ===== Typewriter Preloader =====
const textElement = document.getElementById("typewriter-text");
const textToType = " Vikram's Portfolio....";
let index = 0;

function typeWriter() {
    if (index < textToType.length) {
        textElement.textContent += textToType.charAt(index);
        index++;
        setTimeout(typeWriter, 70);
    } else {
        setTimeout(() => {
            document.getElementById("preloader").classList.add("hidden");
        }, 800);
    }
}

// ✅ Show preloader only on first visit
window.addEventListener("load", () => {
    if (sessionStorage.getItem("visited") === "true") {
        document.getElementById("preloader").style.display = "none"; // Skip preloader
    } else {
        sessionStorage.setItem("visited", "true");
        typeWriter(); // Run preloader animation
    }
});

/* ==== About Stats Counter Animation ==== */
function animateAboutCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 20);

    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.dataset.suffix || "");
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(start) + (element.dataset.suffix || "");
        }
    }, 20);
}

function handleAboutCounters() {
    const aboutStats = document.querySelectorAll(".about-stat h3");
    aboutStats.forEach(stat => {
        const value = stat.textContent.replace(/[^0-9]/g, "");
        const suffix = stat.textContent.replace(/[0-9]/g, "");
        stat.dataset.suffix = suffix;
        stat.textContent = "0" + suffix;

        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                animateAboutCounter(stat, parseInt(value), 1000);
                observer.unobserve(stat);
            }
        }, { threshold: 0.6 });

        observer.observe(stat);
    });
}
handleAboutCounters();

/* ==== Portfolio Scroll Animation ==== */
const portfolioCards = document.querySelectorAll('.portfolio-card');

const portfolioObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            portfolioObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

portfolioCards.forEach(card => {
    portfolioObserver.observe(card);
});

// ✅ Mark as visited when a portfolio card is clicked
document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('click', () => {
        sessionStorage.setItem("visited", "true");
    });
});

// === PROJECT DETAILS PAGE SCRIPTS START ===
const modal = document.getElementById("galleryModal");
const modalImg = document.getElementById("modalImage");
const closeModal = document.getElementById("closeModal");

document.querySelectorAll(".gallery-item").forEach(item => {
    item.addEventListener("click", () => {
        modal.style.display = "block";
        modalImg.src = item.src;
    });
});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", e => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
// === PROJECT DETAILS PAGE SCRIPTS END ===


