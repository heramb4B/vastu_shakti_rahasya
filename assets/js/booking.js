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

  // 4. Booking Form Validation & Modal Trigger (Preserved Logic)
  const form = document.getElementById("bookingForm");
  const openModalBtn = document.getElementById("openConfirmModal");

  if (openModalBtn && form) {
    openModalBtn.addEventListener("click", function () {
      // Trigger HTML5 validation
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Fill confirmation modal based on form data
      document.getElementById("confirmName").innerText =
        document.querySelector('[name="name"]').value;
      document.getElementById("confirmEmail").innerText =
        document.querySelector('[name="email"]').value;
      document.getElementById("confirmMobile").innerText =
        document.querySelector('[name="mobile"]').value;
      document.getElementById("confirmDate").innerText = document.querySelector(
        '[name="preferred_date"]',
      ).value;
      document.getElementById("confirmTime").innerText = document.querySelector(
        '[name="preferred_time"]',
      ).value;
      document.getElementById("confirmType").innerText = document.querySelector(
        '[name="consultation_type"]',
      ).value;
      document.getElementById("confirmAddress").innerText =
        document.querySelector('[name="address"]').value;

      // Show confirmation Modal
      const modal = new bootstrap.Modal(
        document.getElementById("confirmBookingModal"),
      );
      modal.show();
    });
  }

  // 5. Submit Booking via Fetch API (Preserved Logic)
  const confirmSubmitBtn = document.getElementById("confirmSubmit");

  if (confirmSubmitBtn && form) {
    confirmSubmitBtn.addEventListener("click", function () {
      const formData = new FormData(form);

      // Temporarily change button state to show loading
      const originalBtnText = confirmSubmitBtn.innerText;
      confirmSubmitBtn.innerText = "Submitting...";
      confirmSubmitBtn.disabled = true;

      fetch("assets/api/booking.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Revert button state
          confirmSubmitBtn.innerText = originalBtnText;
          confirmSubmitBtn.disabled = false;

          if (data.status) {
            // Close confirmation modal
            bootstrap.Modal.getInstance(
              document.getElementById("confirmBookingModal"),
            ).hide();

            // Show success modal
            const successModal = new bootstrap.Modal(
              document.getElementById("successModal"),
            );
            successModal.show();

            // Reset form
            form.reset();
          } else {
            alert(
              data.message || "There was an error processing your request.",
            );
          }
        })
        .catch((error) => {
          console.error(error);
          // Revert button state
          confirmSubmitBtn.innerText = originalBtnText;
          confirmSubmitBtn.disabled = false;
          alert(
            "Something went wrong during submission. Please try again later.",
          );
        });
    });
  }
});
