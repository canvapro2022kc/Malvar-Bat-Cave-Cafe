<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if (session_status() === PHP_SESSION_NONE){
  session_start();
}

include 'db_connect.php';

$error = "";
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bat Mat Cave Cafe</title>
    <link rel="stylesheet" href="style.css" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Josefin+Sans:wght@300;400;700&family=Poppins:wght@300;400;700&display=swap"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"
    />
  </head>
  
  <body>
    
  <div id="popup" class="popup" style="display:none;">
    <div class="popup-content">
      <span id="closebutton" class="close">&times;</span>
      <img src="images/popup.png" alt="Popup Image">
    </div>
  </div>

    <!-- Container -->
    <div class="container">
      <!-- Navigation -->
      <nav class="navbar">
        <div class="logo">
          <div class="logo-text">
            <img src="images/bcclogo.png" alt="Coffee Icon" class="logo-icon" />
            <img src="images/bcctextbasedlogo.png" alt="Malvar Bat Cave Cafe Logo" class="logo-img" />
          </div>
        </div>

        <div class="nav-right">
          <div class="navigation" id="navMenu">
            <a href="index.php">Home</a>
            <a href="menu.php">Menu</a>
            <a href="reserve.php ">Book</a>
          </div>
        </div>
      </nav>
      <!-- End of Navigation -->

      <!-- Landing -->
      <section class="landing">
        <div class="banner">
          <h3 class="main-heading"><em>Welcome!</em></h3>
          <h1>The MALVAR BAT CAVE CAFE</h1>
          <p>
            Enjoy our cozy atmosphere and delicious coffee selections. 
            Whether you're here for relaxation or a quick bite, we've got you covered.
          </p>
          <a href="reserve.php"><button type="button" class="menu-btn reserve-btn">Reserve Now</button></a>
          <a href="menu.php"><button type="button" class="banner-btn banner-btn-2">
            VIEW MENU
          </button></a>
        </div>
        <div class="swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide"><img decoding="async" src="images/1.png" /></div>
            <div class="swiper-slide"><img decoding="async" src="images/2.png" /></div>
            <div class="swiper-slide"><img decoding="async" src="images/3.png" /></div>
            <div class="swiper-slide"><img decoding="async" src="images/4.png" /></div>
            <div class="swiper-slide"><img decoding="async" src="images/5.png" /></div>
          </div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
        <div class="landing-contact">
          <div class="details">
            <i class="fa-solid fa-phone"></i>
            <div>
              <p style="font-size: medium; color:#c49b63;">(+63)9214750148 </p> 
              <p style="font-size: 14px; color: rgb(145,145,145)">Nina Sy</p>
            </div>
          </div>
          <div class="details">
            <i class="fa-solid fa-location-dot"></i>
            <div class="location">
              <p style="font-size: medium; color: #c49b63;"> Malvar</p>
              <p style="font-size: 14px; color: rgb(145, 145, 145)">Batangas State University Area</p>
            </div>
          </div>
          <div class="details">
            <i class="fa-solid fa-clock"></i>
            <div>
              <p style="font-size: medium; color: #c49b63;">Open Monday-Friday</p>
              <p style="font-size: 14px; color: rgb(145, 145, 145)">1:00pm - 1:00am</p>
            </div>
          </div>
        </div>
      </section>
      <!-- End of Landing -->

      <!-- About -->
      <section class="about">
        <div>
          <i class="fa-solid fa-handshake"></i>
          <h1>VALUES</h1>
          <p>
            QUALITY<br>CUSTOMER SATISFACTION<br>COMMUNITY<br>SUSTAINABILITY<br>INNOVATION
          </p>
        </div>
        <div>
          <i class="fa-solid fa-bullseye"></i>
          <h1>MISSION</h1>
          <p>
            The Malvar Bat Cave Cafe is dedicated to providing a consistently comfortable, 
            secure, and inspiring environment where students can focus and socialize. 
            We commit to serving high-quality coffee and nourishment, and offering a seamless, professional experience 
            through functional services like our dedicated reservation system, ensuring every
            visit lights up the path to their next achievement.
          </p>
        </div>
        <div>
          <i class="fa-solid fa-eye"></i>
          <h1>VISION</h1>
          <p>
            To be the undisputed sanctuary and second home for the BSU community, 
            recognized as the best late-night establishment that fuels academic success, 
            fosters genuine connection, and elevates the local coffee culture in Malvar.
          </p>
        </div>
      </section>
      <!-- End of About -->

      <!-- Menu -->
      <section class="menu">
        <div class="menu-left">
          <h3 class="main-heading"><em>Discover</em></h3>
          <h1>Our Menu</h1>
          <p>
            Welcome to the Malvar Bat Cave Cafe, where every cup of coffee and pastry is crafted with care. 
            Explore our wide selection of beverages, snacks, and pastries made to delight 
            your taste buds. Discover our full menu and find your new favorite treat today.
          </p>
          <a href="menu.php"><button type="button" class="menu-btn">View Full Menu</button></a>
        </div>
        <div class="menu-right">
          <div class="menu-right-images">
            <div class="menu-img-wrapper">
              <img decoding="async" src="images/dom1.png" />
            </div>
            <div class="menu-img-wrapper">
              <img decoding="async" src="images/dom2.png" />
            </div>
            <div class="menu-img-wrapper">
              <img decoding="async" src="images/dom3.png" />
            </div>
            <div class="menu-img-wrapper">
              <img decoding="async" src="images/dom4.png" />
            </div>
          </div>
        </div>
      </section>
      <!-- End of Menu -->

      <!-- Footer -->
      <footer>
        <p class="copyright">
          &copy; 2025 Malvar Cave Café. All Rights Reserved.
        </p>
      </footer>
      <!-- End of Footer -->
    </div>
    <!-- End of Container -->
    

    <script src="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js"></script>
    <script src="script.js"></script>
    <script src="admin-key.js"></script>
    <script src="light.js"></script>
    <script src="theme.js"></script>
  </body>
</html>