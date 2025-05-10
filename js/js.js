// Get that hamburger menu cookin' //

document.addEventListener("DOMContentLoaded", function() {
  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );
  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(function($el) {
      $el.addEventListener("click", function() {
        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);
        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});

// Smooth Anchor Scrolling
$(document).on("click", 'a[href^="#"]', function(event) {
  event.preventDefault();
  $("html, body").animate(
    {
      scrollTop: $($.attr(this, "href")).offset().top
    },
    500
  );
});

// When the user scrolls down 20px from the top of the document, show the scroll up button
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("toTop").style.display = "block";
  } else {
    document.getElementById("toTop").style.display = "none";
  }
}

// Preloader
$(document).ready(function($) {
  $(".preloader-wrapper").fadeOut();
  $("body").removeClass("preloader-site");
});
$(window).on("load", function() {
  var Body = $("body");
  Body.addClass("preloader-site");
});

//lightbox
document.addEventListener("DOMContentLoaded", function () {
  let currentIndex = 0;
  const images = Array.from(document.querySelectorAll(".work-item")).map(item =>
    item.style.backgroundImage.replace('url("', '').replace('")', '')
  );

  function openLightbox(index) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const navbar = document.getElementById("navbar");

    currentIndex = index;

    if (lightbox && lightboxImg && navbar) {
      lightboxImg.src = images[currentIndex];
      lightbox.style.display = "flex";

      // Hide navbar
      navbar.dataset.originalDisplay = navbar.style.display;
      navbar.style.display = "none";

      // Disable scrolling
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }
  }

  function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    const navbar = document.getElementById("navbar");

    if (lightbox && navbar) {
      lightbox.style.display = "none";

      // Restore navbar
      navbar.style.display = navbar.dataset.originalDisplay || "";

      // Enable scrolling
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    document.getElementById("lightbox-img").src = images[currentIndex];
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    document.getElementById("lightbox-img").src = images[currentIndex];
  }

  document.querySelectorAll(".work-item").forEach((item, index) => {
    item.addEventListener("click", function () {
      openLightbox(index);
    });
  });

  document.getElementById("lightbox").addEventListener("click", function (event) {
    if (
      event.target !== document.getElementById("lightbox-img") &&
      event.target !== document.getElementById("next-btn") &&
      event.target !== document.getElementById("prev-btn") &&
      event.target !== document.querySelector("#next-btn img") &&
      event.target !== document.querySelector("#prev-btn img")
    ) {
      closeLightbox();
    }
  });

  document.getElementById("next-btn").addEventListener("click", nextImage);
  document.getElementById("prev-btn").addEventListener("click", prevImage);
});


// Lightbox functionality
let currentImageIndex = 0;
const images = [
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
];

function openLightbox(imageSrc) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  currentImageIndex = images.indexOf(imageSrc);
  lightboxImg.src = imageSrc;
  lightbox.style.display = 'flex';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'none';
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  document.getElementById('lightbox-img').src = images[currentImageIndex];
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  document.getElementById('lightbox-img').src = images[currentImageIndex];
}

// Touch handling for swipe gestures
let xDown = null;
let yDown = null;

function handleTouchStart(evt) {
  const firstTouch = evt.touches[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }
  evt.preventDefault();
}

function handleTouchEnd(evt) {
  if (!xDown || !yDown) {
    return;
  }
  const xUp = evt.changedTouches[0].clientX;
  const yUp = evt.changedTouches[0].clientY;

  const xDiff = xDown - xUp;
  const yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 30) {
      // Left swipe
      nextImage();
    } else if (xDiff < -30) {
      // Right swipe
      prevImage();
    }
  }
  xDown = null;
  yDown = null;
}