$(document).ready(function() {
  // Sticky Header
  $(window).scroll(function() {
    if ($(this).scrollTop() > 1) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }

    // Update the active section in the header
      updateActiveSection();
    });

  // Smooth Scroll and Active Link Highlighting
  $(".header ul li a").click(function(e) {
    e.preventDefault();

    var target = $(this).attr("href");

    if ($(target).hasClass("active-section")) {
      return;
    }

    if (target === "#home") {
      $("html, body").animate({ scrollTop: 0 }, 500);
    } else {
      var offset = $(target).offset().top - 40;

      $("html, body").animate({ scrollTop: offset }, 500);
    }

    $(".header ul li a").removeClass("active");
    $(this).addClass("active");
  });

  // ScrollReveal Initialization
  ScrollReveal({
    distance: "100px",
    duration: 2000,
    delay: 200
  });

  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", { origin: "left" });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", { origin: "right" });
  ScrollReveal().reveal(".project-title, .contact-title", { origin: "top" });
  ScrollReveal().reveal(".projects, .contact", { origin: "bottom" });

  // Contact Form Submission to Google Sheets
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec';
  const form = document.forms['submitToGoogleSheet'];
  const msg = document.getElementById("msg");

  form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => {
        msg.innerHTML = "Message sent successfully";
        msg.style.color = "#00ff9c";
        setTimeout(() => msg.innerHTML = "", 5000);
        form.reset();
      })
      .catch(error => {
        console.error('Error!', error.message);
        msg.innerHTML = "Error sending the message. Please try again.";
        msg.style.color = "#ff0000";
      });
  });

  // Theme Toggle
  const toggle = document.getElementById("theme-switch");
  if (toggle) {
    const icon = toggle.nextElementSibling.querySelector("i");

    // Apply saved mode from localStorage
    if (localStorage.getItem("theme") === "light") {
      document.body.classList.add("light-mode");
      toggle.checked = true;
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    }

    toggle.addEventListener("change", () => {
      if (toggle.checked) {
        document.body.classList.add("light-mode");
        localStorage.setItem("theme", "light");
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
      } else {
        document.body.classList.remove("light-mode");
        localStorage.setItem("theme", "dark");
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
      }
    });
  }

  // Mobile Menu Toggle
  $(".menu_icon").click(function() {
    $(".navbar").slideToggle();
  });
});

// Update Active Section in Header
function updateActiveSection() {
  var scrollPosition = $(window).scrollTop();

  if (scrollPosition === 0) {
    $(".header ul li a").removeClass("active");
    $(".header ul li a[href='#home']").addClass("active");
    return;
  }

  $("section").each(function() {
    var target = $(this).attr("id");
    var offset = $(this).offset().top;
    var height = $(this).outerHeight();

    if (scrollPosition >= offset - 40 && scrollPosition < offset + height - 40) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#" + target + "']").addClass("active");
    }
  });
}

// ===== Reveal on Scroll for all types =====
function revealElements() {
  const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom');

  elements.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const visibleThreshold = 120;

    if (elementTop < windowHeight - visibleThreshold) {
      el.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealElements);
window.addEventListener('load', revealElements);

// Unique zoom animation for About section
ScrollReveal().reveal('.about', {
  scale: 0.85,
  duration: 1000,
  easing: 'ease-in-out',
  delay: 200,
  reset: false
});

// Standard fade-in from bottom for all other sections
ScrollReveal().reveal('.education-column, .education-sidecard, .experience-content, .cert-grid, #career-goals, #volunteering, .contact-content', {
  origin: 'bottom',
  distance: '40px',
  duration: 1000,
  delay: 200,
  easing: 'ease-in-out',
  reset: false
});

// Sidebar Toggle for Mobile
const sidebar = document.getElementById("mobileSidebar");
const overlay = document.getElementById("sidebarOverlay");
const menuIcon = document.querySelector(".menu_icon");

menuIcon.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
});
