<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Coffee Menu</title>
  <link rel="stylesheet" href="style.css" />
  <link rel="stylesheet" href="menu.css" />
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
    <!-- Navigation -->
  <nav class="navbar">
    <div class="logo">
          <a href="home.php" class="logo-link">
          <div class="logo-text">
            <img src="images/bcclogo.png" alt="Coffee Icon" class="logo-icon" />
            <img src="images/bcctextbasedlogo.png" alt="Malvar Bat Cave Cafe Logo" class="logo-img" />
          </div>
          </a>
    </div>
    <div class = "nav-right">
    <div class="navigation">
      <a href="home.php">Home</a>
      <a href="menu.php">Menu</a>
      <a href="reserve.php">Book</a>
    </div>
    <div class="cart-container">
      <button id="cartBtn">🛒<span id="cartCount">0</span></button>
      <div id="cartDropdown" class="cart-dropdown hidden">
        <h3>Your Cart</h3>
        <div id="cartItems">
          <p class="empty">Your cart is empty.</p>
        </div>
        <div id="cartTotal">
          Total: ₱<span id="totalAmount">0</span>
        </div>
      </div>
    </div>
    </div>
  </nav>
  <br>
  <br>
  <br>
  <br>

<h1>SNACKS</h1>
    <table class="menu-table">
    <tr>
      <td>
        <div class="menu-item">
          <img src="images/Bat Cave Nachos.png" 
          alt="Bat Cave Nachos">
          <h3>Bat Cave Nachos</h3>
          <p>Nachos with melted cheese, savory beef, and zesty salsa.</p>
          <div class="price">₱120</div>
          <button class="add-to-cart">🛒</button>
        </div>
      </td>

      <td>
        <div class="menu-item">
          <img src="images/Bat Cave Fries.png" 
          alt="Bat Cave Fries">
          <h3>Bat Cave Fries</h3>
          <p>Golden fries drizzled with creamy cheese sauce.</p>
          <div class="price">₱90</div>
          <button class="add-to-cart">🛒</button>
        </div>
      </td>

      <td>
        <div class="menu-item">
          <img src="images/GotHam & Egg Sandwich.png" 
          alt="Gotham & Egg Sandwich">
          <h3>Gotham & Egg Sandwich</h3>
          <p>Layers of ham, egg, and veggies in toasted bread.</p>
          <div class="price">₱110</div>
          <button class="add-to-cart">🛒</button>
        </div>
      </td>
    </tr>

    <tr>
      <td>
        <div class="menu-item">
          <img src="images/Gottuna & Cheese Sandwich.png"
           alt="Gottuna & Cheese Sandwich">
          <h3>Gottuna & Cheese Sandwich</h3>
          <p>Toasted sandwich filled with tuna and melted cheese.</p>
          <div class="price">₱95</div>
          <button class="add-to-cart">🛒</button>
        </div>
      </td>

      <td>
        <div class="menu-item">
          <img src="images/Cave Chicken Quesadilla.png" 
          alt="Cave Chicken Quesadilla">
          <h3>Cave Chicken Quesadilla</h3>
          <p>Grilled tortilla stuffed with chicken and cheese.</p>
          <div class="price">₱130</div>
          <button class="add-to-cart">🛒</button>
        </div>
      </td>

      <td>
        <div class="menu-item">
          <img src="images/Vampzarella  Sticks.png" 
          alt="Vampzarella  Sticks">
          <h3>Vampzarella  Sticks</h3>
          <p>Crispy sticks with gooey mozzarella inside.</p>
          <div class="price">₱115</div>
          <button class="add-to-cart">🛒</button>
        </div>
      </td>
    </tr>
  </table>

  <h1>SPECIALTY COFFEE</h1>

  <table class="menu-table">
    <tr>
      <td>
        <div class="menu-item">
          <img src="images/The Bat Brew.png" 
          alt="The Bat Brew">
          <h3> The Bat Brew </h3>
          <p>Strong and rich shot of pure coffee, perfect for a quick boost.</p>
          <div class="price">₱120</div>
          <button class="add-to-cart">🛒</button>
        </div>
      </td>

      <td>
        <div class="menu-item">
          <img src="images/Midnight Mocha.png" 
          alt="Midnight Mocha">
          <h3>Midnight Mocha</h3>
          <p>Espresso mixed with steamed milk and topped with creamy foam.</p>
          <div class="price">₱135</div>
          <button class="add-to-cart">🛒</button>
        </div>
      </td>

      <td>
        <div class="menu-item">
          <img src="images/Cave Caramel Latte.png" 
          alt="Cave Caramel Latte">
          <h3>Cave Caramel Latte</h3>
          <p>Smooth blend of espresso, milk, and caramel syrup for a sweet touch.</p>
          <div class="price">₱140</div>
          <button class="add-to-cart">🛒</button>
        </div>
      </td>
    </tr>

    <tr>
      <td>
        <div class="menu-item">
          <img src="images/Cave Mocha.png" 
          alt="Cave Mocha">
          <h3>Cave Mocha</h3>
          <p>A perfect mix of coffee and chocolate topped with whipped cream.</p>
          <div class="price">₱150</div>
          <button class="add-to-cart">🛒</button>
        </div>
      </td>

      <td>
        <div class="menu-item">
          <img src="images/Dark Iced Americano.png" 
          alt="Dark Iced Americano">
          <h3>Dark Iced Americano</h3>
          <p>Refreshing cold espresso with water served over ice.</p>
          <div class="price">₱100</div>
          <button class="add-to-cart">🛒</button>
        </div>
      </td>

      <td>
        <div class="menu-item">
          <img src="images/Shadow Cold Brew.png" 
          alt="Shadow Cold Brew">
          <h3>Shadow Cold Brew</h3>
          <p>Slow-brewed coffee with a smooth, less acidic taste.</p>
          <div class="price">₱130</div>
          <button class="add-to-cart">🛒</button>
        </div>
      </td>
    </tr>
  </table>

    <h1>PASTRIES</h1>
    <table class="menu-table">
    <tr>
      <td>
        <div class="menu-item">
          <img src="images/Bat Velvet Muffin.png" 
          alt="Bat Velvet Muffin">
          <h3>Bat Velvet Muffin</h3>
          <p>A soft red velvet muffin with a hint of cocoa and creamy sweetness.</p>
          <div class="price">₱65</div>
          <button class="add-to-cart">🛒</button>
        </div>
      </td>

      <td>
        <div class="menu-item">
          <img src="images/Caveberry Muffin.png" 
          alt="Caveberry Muffin">
          <h3>Caveberry Muffin</h3>
          <p>Soft, buttery muffin bursting with juicy blueberries.</p>
          <div class="price">₱85</div>
          <button class="add-to-cart">🛒</button>
        </div>
      </td>

      <td>
        <div class="menu-item">
          <img src="images/Cavennamon Roll.png" 
          alt="Cavennamon Roll">
          <h3>Cavennamon Roll</h3>
          <p>Warm, fluffy roll swirled with cinnamon and topped with glaze.</p>
          <div class="price">₱100</div>
          <button class="add-to-cart">🛒</button>
        </div>
      </td>
    </tr>

    <tr>
      <td>
        <div class="menu-item">
          <img src="images/Chocave Croissant.png" 
          alt="Chocave Croissant">
          <h3>Chocave Croissant</h3>
          <p>Flaky pastry filled with rich, smooth chocolate.</p>
          <div class="price">₱95</div>
          <button class="add-to-cart">🛒</button>
        </div>
      </td>

      <td>
        <div class="menu-item">
          <img src="images/Bat Ensaymada.png" 
          alt="Bat Ensaymada">
          <h3>Bat Ensaymada</h3>
          <p>Soft, buttery bread topped with cheese and sugar.</p>
          <div class="price">₱75</div>
          <button class="add-to-cart">🛒</button>
        </div>
      </td>

      <td>
        <div class="menu-item">
          <img src="images/Shadow Banana Loaf.png" 
          alt="Shadow Banana Loaf">
          <h3>Shadow Banana Loaf</h3>
          <p>Moist banana bread with a classic sweet aroma.</p>
          <div class="price">₱80</div>
          <button class="add-to-cart">🛒</button>
        </div>
      </td>
    </tr>
  </table>

  <script>
    const cart = {};
    const cartItemsContainer = document.getElementById("cartItems");
    const totalAmountSpan = document.getElementById("totalAmount");
    const cartBtn = document.getElementById("cartBtn");
    const cartDropdown = document.getElementById("cartDropdown");
    const cartCountSpan = document.getElementById("cartCount");
    
    function updateCart() {
      cartItemsContainer.innerHTML = "";
      let total = 0;
      let totalItems = 0;
      const items = Object.values(cart);
    
      if(items.length === 0){
        cartItemsContainer.innerHTML = '<p class="empty">Your cart is empty.</p>';
      }
    
      items.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
        itemDiv.innerHTML = `
          <p>${item.name} - ₱${item.price}</p>
          <div class="quantity-controls">
            <button class="decrease">-</button>
            <span>${item.quantity}</span>
            <button class="increase">+</button>
            <button class="remove">x</button>
          </div>
        `;
        cartItemsContainer.appendChild(itemDiv);
    
        total += item.price * item.quantity;
        totalItems += item.quantity;
    
        // Event listeners
        itemDiv.querySelector(".increase").addEventListener("click", () => {
          item.quantity++;
          updateCart();
        });
    
        itemDiv.querySelector(".decrease").addEventListener("click", () => {
          if(item.quantity > 1){
            item.quantity--;
          } else {
            delete cart[item.id];
          }
          updateCart();
        });
    
        itemDiv.querySelector(".remove").addEventListener("click", () => {
          delete cart[item.id];
          updateCart();
        });
      });
    
      totalAmountSpan.textContent = total;
      cartCountSpan.textContent = totalItems;
    }
    
    // Toggle cart dropdown
    cartBtn.addEventListener("click", () => {
      cartDropdown.classList.toggle("hidden");
    });
    
    // Add to cart buttons
    document.querySelectorAll(".add-to-cart").forEach((btn, index) => {
      btn.addEventListener("click", () => {
        const menuItem = btn.parentElement;
        const id = index; // simple ID
        const name = menuItem.querySelector("h3").innerText;
        const price = parseInt(menuItem.querySelector(".price").innerText.replace("₱",""));
    
        if(cart[id]){
          cart[id].quantity++;
        } else {
          cart[id] = { id, name, price, quantity: 1 };
        }
    
        updateCart();
      });
    });
    </script>
    

    <script src="light.js"></script>
    <script src="admin-key.js"></script>
    <script src="theme.js"></script>
</body>
</html>
