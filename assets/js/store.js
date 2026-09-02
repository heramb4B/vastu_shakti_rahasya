document.addEventListener("DOMContentLoaded", () => {
  // 1. Sleek Navbar & Scroll Progress
  const navbar = document.getElementById("siteNavbar");
  const progressBar = document.getElementById("scrollProgress");

  const handleScroll = () => {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
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

  // 2. Intersection Observer Reveal Logic
  const revealElements = document.querySelectorAll(".reveal-up");
  const revealOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

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

  // 4. Load Products via API (Preserving Backend Functionality)
  loadProducts();

  function loadProducts() {
    fetch("assets/api/productList.php")
      .then((response) => response.json())
      .then((result) => {
        // Update Cart Badge
        const cartCountEl = document.getElementById("cartCount");
        if (cartCountEl) cartCountEl.innerText = result.cartCount || 0;

        let html = "";

        result.data.forEach((product, index) => {
          // Dynamic delay for smooth staggering effect on load
          const delayClass = `stagger-${(index % 3) + 1}`;

          // Generate a premium placeholder image based on category if API doesn't provide one
          let imgUrl =
            "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&q=80"; // Default Stone
          const cat = product.category_name
            ? product.category_name.toLowerCase()
            : "";

          if (cat.includes("bracelet")) {
            imgUrl =
              "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80";
          } else if (cat.includes("yantra")) {
            imgUrl =
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80";
          }

          // Output the exact same HTML structure used in the static premium cards
          html += `
            <div class="col-md-6 col-lg-4 reveal-up active ${delayClass}">
              <div class="luxury-product-card">
                <a href="product-detail.php?id=${product.id}" class="product-image-link">
                  <div class="product-image-wrapper">
                    <div class="product-image" style="background-image: url('${imgUrl}');"></div>
                    <div class="product-overlay">
                      <span class="view-text font-cinzel">View Details</span>
                    </div>
                  </div>
                </a>
                <div class="product-info">
                  <span class="product-category text-gold font-montserrat">${product.category_name || "Curated"}</span>
                  <h3 class="product-title cinzel-heading"><a href="product-detail.php?id=${product.id}">${product.name}</a></h3>
                  <p class="product-desc font-montserrat text-muted small">${product.description || "A premium artifact curated for spatial harmony."}</p>
                  <div class="product-footer d-flex justify-content-between align-items-center">
                    <span class="product-price font-montserrat fw-bold text-dark-900">₹${product.price}</span>
                    <button class="btn-add-cart toast-trigger" aria-label="Add to Cart">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 5v14M5 12h14"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `;
        });

        const grid = document.getElementById("productGrid");
        if (grid) grid.innerHTML = html;

        // Re-bind toast triggers for dynamically loaded buttons
        bindToastTriggers();
      })
      .catch((error) => {
        console.error("ERROR Loading Products:", error);
      });
  }

  // 5. Elegant Toast Notification for "Add to Cart"
  function bindToastTriggers() {
    const toastTriggers = document.querySelectorAll(".toast-trigger");
    const toastBanner = document.getElementById("cartToast");

    toastTriggers.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent navigating if wrapped in an anchor

        // Show the toast
        if (toastBanner) {
          toastBanner.classList.remove("d-none");
          toastBanner.classList.add("show");

          // Increment cart badge dynamically for UX
          const cartCountEl = document.getElementById("cartCount");
          if (cartCountEl)
            cartCountEl.innerText = parseInt(cartCountEl.innerText) + 1;

          // Hide after 3 seconds
          setTimeout(() => {
            toastBanner.classList.remove("show");
          }, 3000);
        }
      });
    });
  }

  // Initial binding for static sample products
  bindToastTriggers();

  // 6. Filter Buttons Interaction (Visual Only)
  const filterBtns = document.querySelectorAll(".btn-filter");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      // Note: Actual filtering logic can be hooked up here to the API or DOM
    });
  });
});
