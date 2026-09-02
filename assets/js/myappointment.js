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
  handleScroll();

  // 2. High-End Intersection Observer Reveal Logic
  const revealOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  function bindRevealElements() {
    const revealElements = document.querySelectorAll(".reveal-up:not(.active)");
    revealElements.forEach((el) => revealObserver.observe(el));
  }

  // Bind initial elements (like the hero)
  bindRevealElements();

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

  // 4. Logout Logic (Preserved functionality)
  const logoutBtn = document.getElementById("appointmentLogout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      let confirmLogout = confirm("Are you sure you want to log out?");
      if (confirmLogout) {
        window.location.href = "assets/api/logout.php";
      }
    });
  }

  // 5. Fetch and Render Appointments (Preserved Backend Logic + Premium UI)
  loadAppointments();

  function loadAppointments() {
    fetch("assets/api/myappointments.php")
      .then((res) => res.json())
      .then((res) => {
        const container = document.getElementById("appointmentsContainer");

        if (!res.success) {
          container.innerHTML = `
                  <div class="luxury-alert text-center text-danger p-4 border border-danger rounded bg-white">
                      ${res.message}
                  </div>
              `;
          return;
        }

        // Empty State - Premium Render
        if (res.appointments.length === 0) {
          container.innerHTML = `
                  <div class="empty-appointments-display reveal-up active">
                      <span class="d-block text-gold fs-2 mb-3">✧</span>
                      <h3 class="cinzel-heading text-dark-900 mb-2">No Appointments Found.</h3>
                      <p class="font-montserrat text-muted mb-4">You have not scheduled any spatial or astrological alignment sessions yet.</p>
                      <a href="booking.php" class="btn-luxury-solid">Reserve a Session</a>
                  </div>
              `;
          return;
        }

        // Render Appointment Cards
        let html = "";
        res.appointments.forEach((app, index) => {
          let badgeClass = "";
          // Map statuses to the new premium CSS classes
          switch (app.status.toLowerCase()) {
            case "pending":
              badgeClass = "badge-gold";
              break;
            case "approved":
              badgeClass = "badge-purple";
              break;
            case "completed":
              badgeClass = "badge-success";
              break;
            case "cancelled":
              badgeClass = "badge-danger";
              break;
            case "rejected":
              badgeClass = "badge-dark";
              break;
            default:
              badgeClass = "badge-dark";
          }

          // Added dynamic delay for staggered entry animation
          const delayStyle = `transition-delay: ${index * 0.1}s;`;

          html += `
              <div class="luxury-appointment-card bg-white p-4 p-md-5 reveal-up" style="${delayStyle}">
                  <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-3 border-bottom border-light">
                      <div>
                          <span class="text-gold tracking-wide text-uppercase small font-montserrat fw-bold mb-1 d-block">Consultation Request</span>
                          <h4 class="cinzel-heading text-dark-900 mb-0 fs-3">No. VA-${String(app.id).padStart(6, "0")}</h4>
                      </div>
                      <div class="mt-3 mt-md-0 text-md-end">
                          <span class="luxury-badge ${badgeClass}">${app.status}</span>
                      </div>
                  </div>
                  
                  <div class="row g-4 font-montserrat text-muted">
                      <div class="col-12 col-md-4">
                          <small class="text-uppercase tracking-wide d-block mb-1" style="font-size: 0.7rem;">Service Type</small>
                          <strong class="text-dark-900 fw-medium d-block" style="font-size: 0.95rem;">${app.consultation_type}</strong>
                      </div>
                      <div class="col-6 col-md-3">
                          <small class="text-uppercase tracking-wide d-block mb-1" style="font-size: 0.7rem;">Preferred Date</small>
                          <strong class="text-dark-900 fw-medium d-block" style="font-size: 0.95rem;">${app.preferred_date}</strong>
                      </div>
                      <div class="col-6 col-md-2">
                          <small class="text-uppercase tracking-wide d-block mb-1" style="font-size: 0.7rem;">Preferred Time</small>
                          <strong class="text-dark-900 fw-medium d-block" style="font-size: 0.95rem;">${app.preferred_time}</strong>
                      </div>
                      <div class="col-12 col-md-3 text-md-end d-flex align-items-center justify-content-md-end mt-4 mt-md-0 pt-2 pt-md-0">
                          <a href="appointment-status.php?id=${app.id}" class="btn-luxury-outline text-dark-900 w-100 w-md-auto" style="padding: 10px 20px;">View Itinerary</a>
                      </div>
                  </div>
              </div>
              `;
        });

        container.innerHTML = html;

        // Re-bind the intersection observer to the newly injected elements
        bindRevealElements();
      })
      .catch((err) => {
        console.error("Error Loading Appointments:", err);
      });
  }
});
