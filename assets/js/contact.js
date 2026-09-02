document.addEventListener("DOMContentLoaded", () => {
  // 1. Sleek Navbar & Scroll Progress (Matched to Master System)
  const navbar = document.getElementById("siteNavbar");
  const progressBar = document.getElementById("scrollProgress");

  const handleScroll = () => {
    // Navbar Shrink
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }

    // Scroll Progress Bar calculation
    if (progressBar) {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressBar.style.width = scrolled + "%";
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll(); // Init on load

  // 2. High-End Intersection Observer Reveal Logic
  const revealElements = document.querySelectorAll(".reveal-up");
  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach((el) => revealObserver.observe(el));

  // 3. Auto-close mobile navbar on link click
  const navLinks = document.querySelectorAll(
    ".navbar-nav .nav-link:not(.dropdown-toggle)",
  );
  const navbarCollapse = document.getElementById("siteNav");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });

  // 4. Contact Form Submission Logic (Preserved functionality with premium UI update)
  const contactForm = document.getElementById("contactForm");
  const contactAlert = document.getElementById("contactAlert");

  if (contactForm && contactAlert) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      // Select the span inside the alert box to insert text
      const alertMessageSpan = contactAlert.querySelector(".alert-message");
      if (alertMessageSpan) {
        alertMessageSpan.textContent =
          "Your enquiry has been received. Our concierge will reach out within 24 hours.";
      } else {
        // Fallback if structure changes
        contactAlert.textContent =
          "Your enquiry has been received. Our concierge will reach out within 24 hours.";
      }

      // Reveal the alert with animation
      contactAlert.classList.remove("d-none");
      contactAlert.style.opacity = "0";
      setTimeout(() => {
        contactAlert.style.transition = "opacity 0.5s ease";
        contactAlert.style.opacity = "1";
      }, 10);

      contactForm.reset();
    });
  }
});
