let words = document.querySelectorAll(".word"); // Use ".word" to select elements with the "word" class
words.forEach((word) => {
  let letters = word.textContent.split("");
  word.textContent = "";
  letters.forEach((letter) => {
    let span = document.createElement("span");
    span.textContent = letter;
    span.className = "letter";
    word.append(span);
  });
});

// Text change animation
let currentWordIndex = 0;
let maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = "1";

let changeText = () => {
  let currentWord = words[currentWordIndex];
  let nextWord =
    currentWordIndex === maxWordIndex
      ? words[0]
      : words[currentWordIndex + 1];

  Array.from(currentWord.children).forEach(
    (letter, i) => {
      setTimeout(() => {
        letter.className = "letter out";
      }, i * 80);
    },
  );
  nextWord.style.opacity = "1";
  Array.from(nextWord.children).forEach(
    (letter, i) => {
      letter.className = "letter behind";
      setTimeout(() => {
        letter.className = "letter in";
      }, 340 + i * 80);
    },
  );
  currentWordIndex =
    currentWordIndex === maxWordIndex
      ? 0
      : currentWordIndex + 1;
};

changeText();
setInterval(changeText, 3000);

// Mobile menu toggle
let menuIcon =
  document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");

menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("bx-x");
  navlist.classList.toggle("active");
});

// Remove mobile menu when clicking on a nav item
document
  .querySelectorAll(".navlist a")
  .forEach((item) => {
    item.addEventListener("click", () => {
      menuIcon.classList.remove("bx-x");
      navlist.classList.remove("active");
    });
  });

// Sticky header
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  header.classList.toggle(
    "sticky",
    window.scrollY > 100,
  );
});

// Scroll reveal (animate elements as they come into view)
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.1,
  },
);

// Observe service boxes, skill bars, portfolio items and certificate cards
document
  .querySelectorAll(
    ".service-box, .skill-bar, .port-box, .certificate-card",
  )
  .forEach((el) => {
    observer.observe(el);
  });

// Smooth scrolling for anchor links
document
  .querySelectorAll('a[href^="#"]')
  .forEach((anchor) => {
    anchor.addEventListener(
      "click",
      function (e) {
        // Skip if the link has target="_blank" attribute
        if (
          this.getAttribute("target") === "_blank"
        )
          return;

        e.preventDefault();

        const targetId =
          this.getAttribute("href");
        if (targetId === "#") return;

        const targetElement =
          document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          });
        }
      },
    );
  });

// Circle skills animation
const circles =
  document.querySelectorAll(".circle");
circles.forEach((elem) => {
  var dots = elem.getAttribute("data-dots");
  var marked = elem.getAttribute("data-percent");
  var percent = Math.floor((dots * marked) / 100);
  var points = "";
  var rotate = 360 / dots;

  for (let i = 0; i < dots; i++) {
    points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
  }

  elem.innerHTML = points;
  const pointsMarked =
    elem.querySelectorAll(".points");
  for (let i = 0; i < percent; i++) {
    pointsMarked[i].classList.add("marked");
  }
});

// Add class to animate skill bars when they come into view
function animateSkillBars() {
  const skillSection =
    document.querySelector(".skills");
  const skillPosition =
    skillSection.getBoundingClientRect().top;
  const screenPosition = window.innerHeight / 1.2;

  if (skillPosition < screenPosition) {
    const skillBars = document.querySelectorAll(
      ".skill-bar .bar span",
    );
    skillBars.forEach((bar) => {
      bar.style.animation = `${bar.className} 2s ease forwards`;
    });
  }
}

window.addEventListener(
  "scroll",
  animateSkillBars,
);

// Certificate hover effects
document
  .querySelectorAll(".certificate-card")
  .forEach((card) => {
    card.addEventListener(
      "mouseenter",
      function () {
        this.querySelector(
          ".certificate-icon i",
        ).style.transform = "scale(1.2)";
      },
    );

    card.addEventListener(
      "mouseleave",
      function () {
        this.querySelector(
          ".certificate-icon i",
        ).style.transform = "scale(1)";
      },
    );
  });

// Ensure external links work correctly
document
  .querySelectorAll('a[target="_blank"]')
  .forEach((link) => {
    link.addEventListener("click", function (e) {
      // Let the default behavior handle the navigation
      return true;
    });
  });

// Initialize form validation
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    // Display success message (in a real app you would send the data to a server)
    alert(
      "Thank you for your message! I will get back to you soon.",
    );
    form.reset();
  });
}
