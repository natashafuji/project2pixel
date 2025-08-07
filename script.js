document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("show");
  });
});

<nav>
  <div class="hamburger">
    <span></span>
    <span></span>
    <span></span>
  </div>
  <ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="services.html">Services</a></li>
    <li><a href="contact.html" class="active">Contact</a></li>
  </ul>
</nav>


window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
  }
});



