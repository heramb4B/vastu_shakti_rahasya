<?php
session_start();
$current_page = basename($_SERVER['PHP_SELF']);

if (!isset($_SESSION['user_id'])) {
  $_SESSION['error'] = "Please login First to Access Page";
    header("Location: login.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Curated Store | Vastu Shakti Rahasya</title>
  
  <!-- Premium Typography -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Core Framework -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  
  <!-- Bespoke E-Commerce Styles -->
  <link rel="stylesheet" href="assets/css/store.css">
  <link rel="stylesheet" href="assets/css/common-modal.css">
  <?php include 'common-modal.php'; ?>
</head>
<body class="luxury-ecomm bg-muted">

  <!-- Progress Bar for Scroll -->
  <div class="scroll-progress-bar" id="scrollProgress"></div>

  <!-- Redesigned High-End Navbar -->
  <nav class="navbar navbar-expand-lg fixed-top bespoke-navbar" id="siteNavbar">
    <div class="container-fluid px-4 px-xl-5">
      <a class="navbar-brand brand-logo" href="index.php">
        <div class="logo-wrapper">
            <img src="assets/images/logo.jpeg" alt="Vastu Shakti Rahasya" class="logo-img">
            <div class="logo-text d-none d-xl-flex flex-column justify-content-center">
                <span class="logo-title">VASTU SHAKTI</span>
                <span class="logo-subtitle">R A H A S Y A</span>
            </div>
        </div>
      </a>
      
      <button class="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#siteNav" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="siteNav">
        <ul class="navbar-nav mx-auto nav-links-premium">
          <li class="nav-item">
            <a class="nav-link <?= ($current_page == 'index.php') ? 'active' : '' ?>" href="index.php">The Atelier</a>
          </li>
          <li class="nav-item">
            <a class="nav-link <?= ($current_page == 'about.php') ? 'active' : '' ?>" href="about.php">S. Ramesh</a>
          </li>
          
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle <?= ($current_page == 'services.php') ? 'active' : '' ?>" href="services.php" data-bs-toggle="dropdown">Services</a>
            <ul class="dropdown-menu luxury-dropdown">
              <li><a class="dropdown-item" href="services.php#astrology">Vedic Astrology</a></li>
              <li><a class="dropdown-item" href="services.php#numerology">Numerology</a></li>
              <li><a class="dropdown-item" href="services.php#vastu-fire">Vastu Fire</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item text-gold" href="services.php">All Services <span style="font-family: sans-serif;">→</span></a></li>
            </ul>
          </li>

          <li class="nav-item">
            <a class="nav-link <?= ($current_page == 'booking.php') ? 'active' : '' ?>" href="booking.php">Consultations</a>
          </li>
          <!-- Store is Active -->
          <li class="nav-item">
            <a class="nav-link <?= ($current_page == 'store.php') ? 'active' : '' ?> text-gold" href="store.php">Curated Store</a>
          </li>
          
          <li class="nav-item">
            <a class="nav-link <?= ($current_page == 'contact.php') ? 'active' : '' ?>" href="contact.php">Contact</a>
          </li>
        </ul>
        
        <div class="nav-actions d-flex align-items-center gap-3 mt-3 mt-lg-0">
            <a href="cart.php" class="cart-icon-btn position-relative" aria-label="Shopping Cart">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                <span id="cartCount" class="cart-badge">0</span>
            </a>
          <?php if (isset($_SESSION['user_id'])): ?>
            <div class="nav-item dropdown">
              <a class="nav-link dropdown-toggle user-trigger" href="#" data-bs-toggle="dropdown">
                  Namaste, <?= htmlspecialchars($_SESSION['name'] ?? 'Guest') ?>
              </a>
              <ul class="dropdown-menu dropdown-menu-end luxury-dropdown">
                  <li><a class="dropdown-item" href="myorder.php">Order History</a></li>
                  <li><a class="dropdown-item" href="my-appointments.php">My Sessions</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a href="#" class="dropdown-item logout-link logout-btn" data-logout-url="assets/api/logout.php">Sign Out</a></li>
              </ul>
            </div>
          <?php else: ?>
            <a class="btn-auth-premium" href="login.php">Sign In</a>
          <?php endif; ?>
        </div>
      </div>
    </div>
  </nav>

  <main>
    <!-- Store Editorial Hero -->
    <section class="store-editorial-hero position-relative section-padding pb-0">
      <div class="hero-bg-elements">
        <div class="ambient-glow glow-1"></div>
      </div>
      <div class="container mt-5 pt-4 text-center z-index-2 reveal-up">
        <span class="text-gold tracking-wide text-uppercase small font-montserrat fw-bold mb-3 d-block">The Boutique</span>
        <h1 class="cinzel-heading display-2 mb-4 text-dark-900">Sacred Artifacts</h1>
        <div class="ornate-divider mx-auto mb-4"></div>
        <p class="font-montserrat text-muted-large mx-auto mb-5" style="max-width: 700px;">
          Explore our meticulously curated collection of lab-certified gemstones, energized yantras, and architectural remedies—each carefully selected to harmonize your spatial and personal energy.
        </p>
      </div>
    </section>

    <!-- Sample Featured Categories & Filters -->
    <section class="store-filters-section pb-4">
      <div class="container reveal-up stagger-1">
        <div class="store-filter-bar d-flex justify-content-center flex-wrap gap-2 gap-md-4">
          <button class="btn-filter active" data-category="all">The Complete Collection</button>
          <button class="btn-filter" data-category="gemstones">Vedic Gemstones</button>
          <button class="btn-filter" data-category="bracelets">Healing Bracelets</button>
          <button class="btn-filter" data-category="yantras">Sacred Yantras</button>
          <button class="btn-filter" data-category="decor">Vastu Decor</button>
        </div>
      </div>
    </section>

    <!-- Static Sample Section: Featured Arrivals (To fulfill prompt request) -->
    <section class="featured-products section-padding pt-5 bg-white">
      <div class="container">
        <div class="d-flex justify-content-between align-items-end mb-5 reveal-up">
          <div>
            <h2 class="cinzel-heading display-6 mb-0 text-dark-900">Featured Curations</h2>
          </div>
        </div>

        <div class="row g-4 g-lg-5">
          <!-- Sample Product 1 -->
          <div class="col-md-6 col-lg-4 reveal-up stagger-1">
            <div class="luxury-product-card">
              <a href="#" class="product-image-link">
                <div class="product-image-wrapper">
                  <div class="product-image" style="background-image: url('https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&q=80');"></div>
                  <div class="product-overlay">
                    <span class="view-text font-cinzel">View Details</span>
                  </div>
                </div>
              </a>
              <div class="product-info">
                <span class="product-category text-gold font-montserrat">Vedic Gemstones</span>
                <h3 class="product-title cinzel-heading"><a href="#">Ceylon Yellow Sapphire</a></h3>
                <p class="product-desc font-montserrat text-muted small">Lab-certified unheated Pukhraj, ideal for invoking Jupiter's abundance and wisdom.</p>
                <div class="product-footer d-flex justify-content-between align-items-center">
                  <span class="product-price font-montserrat fw-bold text-dark-900">₹45,000</span>
                  <button class="btn-add-cart" aria-label="Add to Cart">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 5v14M5 12h14"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Sample Product 2 -->
          <div class="col-md-6 col-lg-4 reveal-up stagger-2">
            <div class="luxury-product-card">
              <a href="#" class="product-image-link">
                <div class="product-image-wrapper">
                  <div class="product-image" style="background-image: url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80'); filter: sepia(0.4);"></div>
                  <div class="product-overlay">
                    <span class="view-text font-cinzel">View Details</span>
                  </div>
                </div>
              </a>
              <div class="product-info">
                <span class="product-category text-gold font-montserrat">Sacred Yantras</span>
                <h3 class="product-title cinzel-heading"><a href="#">Meru Sri Yantra</a></h3>
                <p class="product-desc font-montserrat text-muted small">A 3D energized copper geometry to balance the North-East axis of your commercial space.</p>
                <div class="product-footer d-flex justify-content-between align-items-center">
                  <span class="product-price font-montserrat fw-bold text-dark-900">₹8,500</span>
                  <button class="btn-add-cart" aria-label="Add to Cart">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 5v14M5 12h14"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Sample Product 3 -->
          <div class="col-md-6 col-lg-4 reveal-up stagger-3">
            <div class="luxury-product-card">
              <a href="#" class="product-image-link">
                <div class="product-image-wrapper">
                  <div class="product-image" style="background-image: url('https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80');"></div>
                  <div class="product-overlay">
                    <span class="view-text font-cinzel">View Details</span>
                  </div>
                </div>
              </a>
              <div class="product-info">
                <span class="product-category text-gold font-montserrat">Healing Bracelets</span>
                <h3 class="product-title cinzel-heading"><a href="#">Amethyst Aura Bracelet</a></h3>
                <p class="product-desc font-montserrat text-muted small">Cleansed crystal beads to clear mental fog, reduce anxiety, and promote deep spiritual focus.</p>
                <div class="product-footer d-flex justify-content-between align-items-center">
                  <span class="product-price font-montserrat fw-bold text-dark-900">₹2,100</span>
                  <button class="btn-add-cart" aria-label="Add to Cart">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 5v14M5 12h14"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Dynamic Products Grid (Managed by store.js) -->
    <section class="dynamic-store section-padding pt-5 bg-muted">
      <div class="container">
        <div class="d-flex justify-content-between align-items-end mb-5 reveal-up">
          <div>
            <h2 class="cinzel-heading display-6 mb-0 text-dark-900">The Complete Collection</h2>
          </div>
        </div>
        
        <!-- JS renders products into this grid using the luxury card layout -->
        <div class="row g-4 g-lg-5" id="productGrid">
           <!-- Dynamic items will appear here -->
        </div>
      </div>
    </section>

    <!-- Elegant Toast Notification -->
    <div id="cartToast" class="luxury-toast d-none">
        <span class="text-gold me-2">✦</span> Item successfully added to your cart.
    </div>

  </main>

  <!-- Premium Dark Luxury Footer -->
  <footer class="bespoke-footer border-top mt-0">
    <div class="container">
      <div class="row g-5 justify-content-between">
        <div class="col-lg-4">
          <a class="brand-logo mb-4 d-inline-block" href="index.php">
            <div class="logo-wrapper">
                <img src="assets/images/logo.jpeg" alt="Vastu Shakti Rahasya" class="logo-img" style="height: 45px; border-radius: 4px;">
                <div class="logo-text">
                    <span class="logo-title text-white">VASTU SHAKTI</span>
                    <span class="logo-subtitle text-gold">R A H A S Y A</span>
                </div>
            </div>
          </a>
          <p class="font-montserrat footer-muted-text small pe-lg-4">
            Curating positive spaces and aligning destinies through authentic traditional sciences, tailored for the modern world.
          </p>
        </div>
        
        <div class="col-6 col-lg-2">
          <h5 class="footer-heading">Shop</h5>
          <ul class="footer-links">
            <li><a href="store.php?category=gemstones">Gemstones</a></li>
            <li><a href="store.php?category=bracelets">Bracelets</a></li>
            <li><a href="store.php?category=yantras">Yantras</a></li>
          </ul>
        </div>
        
        <div class="col-6 col-lg-2">
          <h5 class="footer-heading">Services</h5>
          <ul class="footer-links">
            <li><a href="booking.php">Book Session</a></li>
            <li><a href="services.php#astrology">Astrology</a></li>
            <li><a href="services.php#vastu">Vastu Audits</a></li>
          </ul>
        </div>

        <div class="col-lg-2">
          <h5 class="footer-heading">Support</h5>
          <ul class="footer-links">
            <li><a href="contact.php">Contact Us</a></li>
            <li><a href="faq.php">FAQs</a></li>
            <li><a href="admin-login.php">Admin</a></li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom d-flex flex-column flex-md-row justify-content-between align-items-center mt-5 pt-4">
        <p class="mb-0 small footer-muted-text font-montserrat">© 2026 Vastu Shakti Rahasya. All Rights Reserved.</p>
        <div class="legal-links mt-3 mt-md-0">
            <a href="#" class="small footer-muted-text font-montserrat me-3">Privacy Policy</a>
            <a href="#" class="small footer-muted-text font-montserrat">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <!-- Anime.js preserved for any legacy animations -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.2/anime.min.js"></script>
  <script src="assets/js/store.js"></script>
  <script src="assets/js/common-modal.js"></script>
</body>
</html>