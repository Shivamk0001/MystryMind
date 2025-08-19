console.log("MysteryMind landing page loaded ");

document.addEventListener("DOMContentLoaded", () => {
    /* ---------------- Navbar Toggle ---------------- */
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    // This check is the key to preventing the error
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });

        document.querySelectorAll(".nav-links a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
            });
        });
    }

    /* ---------------- Service Cards Hover ---------------- */
    document.querySelectorAll(".service-card").forEach((card) => {
        card.addEventListener("mouseenter", () => {
            card.style.border = "2px solid #2563eb";
            card.style.transition = "border 0.3s ease";
        });
        card.addEventListener("mouseleave", () => {
            card.style.border = "none";
        });
    });

    /* ---------------- Choose Cards Hover ---------------- */
    document.querySelectorAll(".choose-card").forEach((card) => {
        card.addEventListener("mouseenter", () => {
            card.style.borderColor = "#05b0fa";
            card.style.transition = "border-color 0.3s ease";
        });
        card.addEventListener("mouseleave", () => {
            card.style.borderColor = "transparent";
        });
    });

    /* ---------------- Scroll Animations ---------------- */
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll(
                        ".who-card, .mission-card, .vision-card"
                    );

                    if (items.length > 0) {
                        items.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add("show");
                            }, index * 300);
                        });
                    } else {
                        entry.target.classList.add("show");
                    }

                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        }
    );

    // Observe heading + container + mission/vision
    const sections = document.querySelectorAll(
        ".who-heading, .who-cards, .mission-card, .vision-card"
    );

    sections.forEach((sec) => observer.observe(sec));

    console.log("Scroll animations + hover effects initialized 🎉");

    /* ---------------- Fade-in on Scroll (Process Cards) ---------------- */
    const cards = document.querySelectorAll(".process-card");

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.9;
        cards.forEach((card) => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < triggerBottom) {
                card.classList.add("show");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);


    /* ---------------- Contact Form Validation ---------------- */
    const contactForm = document.querySelector(".contact-right form");

    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();

            const name = contactForm.querySelector("input[type='text']").value.trim();
            const email = contactForm.querySelector("input[type='email']").value.trim();
            const phone = contactForm.querySelector("input[type='tel']").value.trim();
            const category = contactForm.querySelector("select").value;
            const message = contactForm.querySelector("textarea").value.trim();

            // Validation
            if (!name || !email || !phone) {
                alert(" Please fill all required fields (Name, Email, Phone).");
                return;
            }

            // Email format check
            const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
            if (!email.match(emailPattern)) {
                alert(" Please enter a valid email address.");
                return;
            }

            // Phone number check (only digits + 10 digits)
            const phonePattern = /^[0-9]{10}$/;
            if (!phone.match(phonePattern)) {
                alert(" Please enter a valid 10-digit phone number.");
                return;
            }

            alert("✅ Thank you! Your inquiry has been submitted successfully.");
            contactForm.reset();
        });
    }

    /* ---------------- Estimate Form Logic ---------------- */
    const estimateForm = document.getElementById("estimate-form");
    if (estimateForm) {
        const textarea = document.getElementById("description");
        const wordCount = document.getElementById("word-count");
        const resultBox = document.getElementById("result");


        textarea.addEventListener("input", () => {
            const words = textarea.value.trim().split(/\s+/).filter(w => w.length > 0);
            wordCount.textContent = `Word count: ${words.length} / 50`;
            wordCount.style.color = words.length >= 50 ? "red" : "#6b7280";
        });


        estimateForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const service = document.getElementById("service").value;
            const words = textarea.value.trim().split(/\s+/).filter(w => w.length > 0).length;

            let estimate = "";
            let status = "";

            if (!service) {
                estimate = " Please select a service.";
                status = "error";
            } else if (words < 10) {
                estimate = " Please add more details (at least 10 words).";
                status = "error";
            } else {
                switch (service) {
                    case "web":
                        estimate = " Estimated timeline: 4 - 6 weeks for Web Development.";
                        break;
                    case "app":
                        estimate = " Estimated timeline: 6 - 10 weeks for App Development.";
                        break;
                    case "design":
                        estimate = " Estimated timeline: 2 - 4 weeks for UI/UX Design.";
                        break;
                    case "seo":
                        estimate = " Estimated timeline: 3 - 5 weeks for SEO Optimization.";
                        break;
                }
                status = "success";
            }

            resultBox.textContent = estimate;
            resultBox.style.display = "block";
            resultBox.className = `result-box ${status}`;
        });
    }

    /* ---------------- Smooth Scroll Navigation ---------------- */
    const navLinksScroll = document.querySelectorAll('header nav ul li a');

    if(navLinksScroll) {
        navLinksScroll.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
    
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
    
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }


    // ================================================================================================

    /* ---------------- New Apply Now Form Logic ---------------- */
    const applyButtons = document.querySelectorAll(".apply-btn");
    const popupOverlay = document.getElementById("application-popup");
    const closeBtn = document.querySelector(".close-btn");
    const jobTitleInput = document.getElementById("job-title-input");
    const body = document.body;

    applyButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const card = btn.closest(".career-card");
            const jobTitle = card.querySelector("h3").textContent;

            jobTitleInput.value = jobTitle;
            popupOverlay.style.display = "flex";
            body.style.overflow = "hidden"; // Stop background from scrolling
        });
    });

    closeBtn.addEventListener("click", () => {
        popupOverlay.style.display = "none";
        body.style.overflow = "auto"; // Re-enable background scrolling
    });

    // Close the popup if the user clicks outside the form
    window.addEventListener("click", (e) => {
        if (e.target === popupOverlay) {
            popupOverlay.style.display = "none";
            body.style.overflow = "auto"; // Re-enable background scrolling
        }
    });

    const form = document.querySelector(".job-application-form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Application submitted! (This is a placeholder, you can add real form submission logic here.)");
            popupOverlay.style.display = "none";
            body.style.overflow = "auto"; 
            form.reset();
        });
    }
});