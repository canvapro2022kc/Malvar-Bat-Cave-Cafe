document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.swiper', {
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
});


let menu = document.querySelector(".menu");
let nums = document.querySelectorAll(".num");
let start = false;

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("sticky", window.scrollY > 0);

  if (window.scrollY >= menu.offsetTop) {
    if (!start) {
      nums.forEach((num) => {
        startCount(num);
      });
    }
    start = true;
  }
});

const startCount = (el) => {
  let max = el.dataset.val;
  let count = setInterval(() => {
    el.textContent++;
    if (el.textContent === max) {
      clearInterval(count);
    }
  }, 2000 / nums);
};

// START POP UP
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const closeButton = document.getElementById("closebutton");

  // Show popup
  popup.style.display = "flex";

  // Close popup when clicking the X button
  closeButton.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // Close popup when clicking outside the content
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });
});
// END OF POP UP
