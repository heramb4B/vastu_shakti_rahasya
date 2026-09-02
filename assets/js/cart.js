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
  bindRevealElements(); // Bind initial elements

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

  // 4. Cart Load Logic (Preserved Backend Functionality with New UI)
  loadCart();
});

// Made globally available so removeCart() can trigger it
function loadCart() {
  fetch("assets/api/cart.php")
    .then((res) => res.json())
    .then((res) => {
      if (!res.success) return;

      // Cart is empty - Premium UI state
      if (res.data.length === 0) {
        document.getElementById("cartItems").innerHTML = `
          <div class="empty-cart-display reveal-up active">
              <span class="d-block text-gold fs-2 mb-3">✧</span>
              <h3 class="cinzel-heading text-dark-900 mb-2">Your selection is empty.</h3>
              <p class="font-montserrat text-muted mb-4">You have not yet added any sacred artifacts to your cart.</p>
              <a href="store.php" class="btn-luxury-solid">Explore The Atelier</a>
          </div>
        `;

        document.getElementById("subtotalValue").innerHTML = "₹0";
        document.getElementById("totalValue").innerHTML = "₹0";
        return;
      }

      // Cart has items - Premium UI Render
      let html = "";
      let subtotal = 0;

      res.data.forEach((item) => {
        subtotal += item.price * item.quantity;

        // Provide a premium fallback image if item.image is missing/broken
        const defaultImg =
          "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&q=80";

        html += `
          <div class="luxury-cart-row d-flex flex-column flex-md-row align-items-md-center gap-3 gap-md-4 mb-4 reveal-up active">
              
              <!-- Item Image -->
              <div class="cart-item-img-wrapper">
                  <img src="uploads/products/${item.image}" alt="${item.name}" onerror="this.src='${defaultImg}'">
              </div>
              
              <!-- Item Details -->
              <div class="cart-item-details flex-grow-1">
                  <h3 class="cinzel-heading fs-5 mb-1 text-dark-900">${item.name}</h3>
                  <p class="font-montserrat text-muted small mb-2">Quantity: <strong>${item.quantity}</strong></p>
                  <button class="btn-remove-item font-montserrat" onclick="removeCart(${item.cart_id})">Remove Element</button>
              </div>

              <!-- Item Pricing -->
              <div class="cart-item-pricing text-md-end mt-2 mt-md-0 border-top border-md-0 pt-3 pt-md-0" style="border-color: var(--clr-border) !important;">
                  <span class="d-block font-montserrat text-muted small text-uppercase tracking-wide mb-1 d-none d-md-block">Value</span>
                  <span class="d-block font-montserrat text-dark-900">₹${item.price} <span class="text-muted small">ea.</span></span>
                  <span class="d-block font-montserrat fw-bold text-gold mt-1 mt-md-2" style="font-size: 1.1rem;">Total: ₹${item.price * item.quantity}</span>
              </div>
          </div>
        `;
      });

      document.getElementById("cartItems").innerHTML = html;

      // Update Summary Values
      document.getElementById("subtotalValue").innerHTML = "₹" + subtotal;
      document.getElementById("totalValue").innerHTML = "₹" + (subtotal + 150); // Adding flat shipping
    });
}

// 5. Remove Cart Logic (Preserved functionality and modal calls)
function removeCart(cartId) {
  // Using the global function defined in common-modal.js
  if (typeof showConfirmModal === "function") {
    showConfirmModal(
      "Remove Artifact",
      "Are you sure you wish to remove this element from your selection?",
      function () {
        executeRemove(cartId);
      },
    );
  } else {
    // Fallback if common-modal.js is delayed
    if (
      confirm(
        "Are you sure you wish to remove this element from your selection?",
      )
    ) {
      executeRemove(cartId);
    }
  }
}

function executeRemove(cartId) {
  fetch("assets/api/remove-cart.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "cart_id=" + cartId,
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        loadCart();
        // Hide common modal safely
        const commonModalEl = document.getElementById("commonModal");
        if (commonModalEl) {
          const modal = bootstrap.Modal.getInstance(commonModalEl);
          if (modal) modal.hide();
        }
      } else {
        alert(res.message);
      }
    })
    .catch((err) => console.error("Error removing item:", err));
}

// 6. Checkout Button Logic (Preserved Logic)
document.getElementById("checkoutBtn").addEventListener("click", function (e) {
  e.preventDefault(); // Always prevent default to check API first

  fetch("assets/api/cart.php")
    .then((res) => res.json())
    .then((res) => {
      if (!res.success) return;

      // Cart is empty - Show Premium Modal
      if (res.data.length === 0) {
        const emptyModalEl = document.getElementById("emptyCartModal");
        if (emptyModalEl) {
          const modal = new bootstrap.Modal(emptyModalEl);
          modal.show();
        } else {
          alert("Your cart is empty. Please add an item first.");
        }
      } else {
        // Cart has products - Redirect to checkout
        window.location.href = "checkout.php";
      }
    })
    .catch((err) => console.error("Error verifying cart:", err));
});
