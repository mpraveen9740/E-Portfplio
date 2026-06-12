/* ==========================================
   E-Portfolio Javascript Logic - Praveen Patil
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
    // Initialize functions
    initTheme();
    initMobileMenu();
    initHeaderScroll();
    initTypewriter();
    initScrollReveal();
    initSkillsObserver();
    initProjectsFilter();
    initModals();
    initContactForm();
});

/* ==========================================
   Theme Switcher (Dark / Light Mode)
   ========================================== */
function initTheme() {
    const themeToggle = document.getElementById("theme-toggle");
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
    } else if (systemPrefersDark) {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        
        // Add button spin effect
        themeToggle.style.transform = "rotate(360deg) scale(1.1)";
        setTimeout(() => {
            themeToggle.style.transform = "";
        }, 500);
    });
}

/* ==========================================
   Mobile Menu Burger Toggle
   ========================================== */
function initMobileMenu() {
    const mobileToggle = document.getElementById("mobile-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    mobileToggle.addEventListener("click", () => {
        mobileToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileToggle.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });
}

/* ==========================================
   Sticky Header & Active Link Tracking
   ========================================== */
function initHeaderScroll() {
    const header = document.getElementById("header");
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    // Sticky Class
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        // Active Navigation Link Tracking
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // offset header height
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });
}

/* ==========================================
   Typewriter Effect (Hero Title)
   ========================================== */
function initTypewriter() {
    const textElement = document.getElementById("typewriter-text");
    const words = ["CSE Student", "AI & ML Enthusiast", "Python Developer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // faster deletion
        } else {
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // natural typing speed
        }

        // Handle states
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 2000; // delay at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // short delay before next word
        }

        setTimeout(type, typingSpeed);
    }

    if (textElement) {
        type();
    }
}

/* ==========================================
   Scroll Reveal Animations
   ========================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .scale-up");

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Stop observing once animated (one-shot entry)
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

/* ==========================================
   Skills Progress Bar Animation
   ========================================== */
function initSkillsObserver() {
    const progressBars = document.querySelectorAll(".progress-bar");
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const percentage = bar.getAttribute("data-progress");
                bar.style.width = percentage;
                skillsObserver.unobserve(bar);
            }
        });
    }, {
        threshold: 0.1
    });

    progressBars.forEach(bar => {
        skillsObserver.observe(bar);
    });
}

/* ==========================================
   Projects Category Filtering
   ========================================== */
function initProjectsFilter() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active class from all
            filterButtons.forEach(b => b.classList.remove("active"));
            // Add active class to clicked
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            projectCards.forEach(card => {
                const categories = card.getAttribute("data-categories").split(" ");
                
                if (filterValue === "all" || categories.includes(filterValue)) {
                    card.style.display = "flex";
                    // Brief delay for visual scaling effect
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "scale(1)";
                    }, 50);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.85)";
                    // Wait for fadeout animation before hiding
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 300);
                }
            });
        });
    });
}

/* ==========================================
   Modal Dialogs (Certificates & Resume)
   ========================================== */
function initModals() {
    // Select elements
    const certModal = document.getElementById("cert-modal");
    const resumeModal = document.getElementById("resume-modal");
    const certModalImg = document.getElementById("modal-cert-img-src");
    const certModalTitle = document.getElementById("modal-cert-title");
    const certModalIssuer = document.getElementById("modal-cert-issuer");
    
    const certCards = document.querySelectorAll(".cert-img-container");
    const viewResumeBtns = document.querySelectorAll(".view-resume-btn");
    const closeBtns = document.querySelectorAll(".modal-close");
    const modalOverlays = document.querySelectorAll(".modal-overlay");

    // Open Certificate Modal
    certCards.forEach(card => {
        card.addEventListener("click", () => {
            const img = card.querySelector("img");
            const parent = card.closest(".cert-card");
            const title = parent.querySelector("h3").innerText;
            const issuer = parent.querySelector(".cert-issuer").innerText;

            certModalImg.src = img.src;
            certModalTitle.innerText = title;
            certModalIssuer.innerText = issuer;
            
            openModal(certModal);
        });
    });

    // Open Resume Modal
    viewResumeBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            openModal(resumeModal);
        });
    });

    // Close Modals
    closeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            closeAllModals();
        });
    });

    // Close on clicking overlay
    modalOverlays.forEach(overlay => {
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                closeAllModals();
            }
        });
    });

    // Close on Escape key
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeAllModals();
        }
    });

    function openModal(modal) {
        modal.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
    }

    function closeAllModals() {
        modalOverlays.forEach(modal => {
            modal.classList.remove("active");
        });
        document.body.style.overflow = ""; // Re-enable scroll
    }
}

/* ==========================================
   Contact Form Validation & Processing
   ========================================== */
function initContactForm() {
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Clear status
            formStatus.className = "form-status";
            formStatus.innerText = "";

            // Inputs
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();
            const submitBtn = contactForm.querySelector("button[type='submit']");

            // Simple validation
            if (!name || !email || !subject || !message) {
                showStatus("Please fill out all fields.", "error");
                return;
            }

            if (!validateEmail(email)) {
                showStatus("Please enter a valid email address.", "error");
                return;
            }

            if (message.length < 10) {
                showStatus("Message must be at least 10 characters.", "error");
                return;
            }

            // Simulate form submission
            const originalBtnHtml = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;

            setTimeout(() => {
                showStatus("Thank you! Your message has been sent successfully. I will get back to you shortly.", "success");
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
                contactForm.reset();
            }, 1500);
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showStatus(msg, type) {
        formStatus.innerText = msg;
        formStatus.classList.add(type);
    }
}
