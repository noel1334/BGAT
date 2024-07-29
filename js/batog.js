window.onload = function() {
  if (!localStorage.getItem("loggedIn")) {
    window.location.href = "../ilogin.html"; // Redirect to login page if not logged in
  }
};

document.getElementById("logoutBtn").addEventListener("click", function() {
  // Reset login state in local storage
  localStorage.removeItem("loggedIn");
  // Redirect to login.html
  window.location.href = "../index.html";
});
document.addEventListener("DOMContentLoaded", function() {
  const headers = document.querySelectorAll(".accordion-header");

  headers.forEach(header => {
    header.addEventListener("click", function() {
      const content = this.nextElementSibling;
      const isActive = content.style.display === "block";

      document.querySelectorAll(".accordion-content").forEach(item => {
        item.style.display = "none";
      });

      if (!isActive) {
        content.style.display = "block";
      }
    });
  });

  const carousels = document.querySelectorAll(".image-carousel");

  carousels.forEach(carousel => {
    const container = carousel.querySelector(".carousel-container");
    const nextButton = carousel.querySelector(".next");
    const prevButton = carousel.querySelector(".prev");
    let currentIndex = 0;

    function updateCarousel() {
      const width = container.clientWidth;
      container.style.transform = `translateX(${-currentIndex * width}px)`;
    }

    nextButton.addEventListener("click", () => {
      if (currentIndex < container.children.length - 1) {
        currentIndex++;
        updateCarousel();
      }
    });

    prevButton.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", function() {
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  // Show the button when the user scrolls down 100px from the top
  window.onscroll = function() {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  };

  // Smooth scroll to top when the button is clicked
  scrollToTopBtn.onclick = function() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
});
