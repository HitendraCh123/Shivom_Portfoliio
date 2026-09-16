// ============================================
// SHIVOM SINGH — REAL CONTENT PORTFOLIO JS
// ============================================

const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];


// ============================================
// PAGE LOADER
// ============================================

window.addEventListener("load", () => {
  const loader = $(".loader");

  if (!loader) return;

  setTimeout(() => {
    loader.classList.add("done");
  }, 700);
});


// ============================================
// CUSTOM CURSOR
// ============================================

const cursorDot = $(".cursor-dot");
const cursorRing = $(".cursor-ring");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let ringX = mouseX;
let ringY = mouseY;


window.addEventListener("mousemove", (event) => {

  mouseX = event.clientX;
  mouseY = event.clientY;

  if (cursorDot) {
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  }

});


function cursorLoop() {

  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;

  if (cursorRing) {
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
  }

  requestAnimationFrame(cursorLoop);
}

cursorLoop();


// Cursor hover effect

$$(
  "a, button, .real-project, .service, .main-video, [data-tilt]"
).forEach((element) => {

  element.addEventListener(
    "mouseenter",
    () => {
      document.body.classList.add("hovering");
    }
  );

  element.addEventListener(
    "mouseleave",
    () => {
      document.body.classList.remove("hovering");
    }
  );

});


// ============================================
// MAGNETIC CONTROLS
// ============================================

$$(".magnetic").forEach((element) => {

  element.addEventListener(
    "mousemove",
    (event) => {

      const rect =
        element.getBoundingClientRect();

      const x =
        (
          event.clientX -
          rect.left -
          rect.width / 2
        ) * 0.11;

      const y =
        (
          event.clientY -
          rect.top -
          rect.height / 2
        ) * 0.11;

      element.style.transform =
        `translate(${x}px, ${y}px)`;

    }
  );


  element.addEventListener(
    "mouseleave",
    () => {

      element.style.transform = "";

    }
  );

});


// ============================================
// SCROLL REVEAL
// ============================================

const revealObserver =
  new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add(
          "in-view"
        );

        revealObserver.unobserve(
          entry.target
        );

      });

    },

    {
      threshold: 0.12
    }

  );


$$(".reveal").forEach((element) => {

  revealObserver.observe(element);

});


// ============================================
// HERO 3D TILT
// ============================================

const tiltCard =
  $("[data-tilt]");


if (
  tiltCard &&
  window.matchMedia(
    "(pointer:fine)"
  ).matches
) {

  tiltCard.addEventListener(
    "mousemove",
    (event) => {

      const rect =
        tiltCard.getBoundingClientRect();

      const px =
        (
          event.clientX -
          rect.left
        ) / rect.width;

      const py =
        (
          event.clientY -
          rect.top
        ) / rect.height;

      const rotateY =
        (px - 0.5) * 7;

      const rotateX =
        (0.5 - py) * 7;


      tiltCard.style.transform =
        `perspective(900px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         rotateZ(0deg)`;

    }
  );


  tiltCard.addEventListener(
    "mouseleave",
    () => {

      tiltCard.style.transform = "";

    }
  );

}


// ============================================
// MOBILE MENU
// ============================================

const menu =
  $(".menu-toggle");

const nav =
  $(".nav");


menu?.addEventListener(
  "click",
  () => {

    const open =
      document.body.classList.toggle(
        "menu-open"
      );


    menu.setAttribute(
      "aria-expanded",
      String(open)
    );


    if (open) {

      nav.style.display =
        "flex";

      nav.style.position =
        "fixed";

      nav.style.left =
        "0";

      nav.style.right =
        "0";

      nav.style.top =
        "76px";

      nav.style.padding =
        "28px 20px";

      nav.style.background =
        "rgba(245,243,238,.98)";

      nav.style.backdropFilter =
        "blur(20px)";

      nav.style.borderBottom =
        "1px solid rgba(23,23,23,.11)";

      nav.style.flexDirection =
        "column";

      nav.style.alignItems =
        "flex-start";

      nav.style.gap =
        "22px";

    }

    else {

      nav.removeAttribute(
        "style"
      );

    }

  }
);


// Close menu after clicking nav link

nav?.querySelectorAll("a")
  .forEach((link) => {

    link.addEventListener(
      "click",
      () => {

        document.body.classList.remove(
          "menu-open"
        );

        menu?.setAttribute(
          "aria-expanded",
          "false"
        );


        if (
          window.innerWidth <= 720
        ) {

          nav.removeAttribute(
            "style"
          );

        }

      }
    );

  });


// ============================================
// HEADER SHADOW
// ============================================

window.addEventListener(
  "scroll",
  () => {

    const header =
      $(".site-header");


    if (!header) return;


    if (
      window.scrollY > 30
    ) {

      header.style.boxShadow =
        "0 12px 45px rgba(23,23,23,.06)";

    }

    else {

      header.style.boxShadow =
        "none";

    }

  },

  {
    passive: true
  }

);


// ============================================
// REAL REEL MODAL
// ============================================

const modal =
  $("#reelModal");

const openReel =
  $("#openReel");

const closeReel =
  $("#closeReel");

const modalBackdrop =
  $(".modal-backdrop");

const modalVideo =
  $("#modalVideo");


// Open modal

function openModal() {

  if (!modal) return;


  modal.classList.add(
    "open"
  );


  modal.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";


  // Start real video

  if (modalVideo) {

    modalVideo.currentTime = 0;

    modalVideo
      .play()
      .catch(() => {});

  }

}


// Close modal

function closeModal() {

  if (!modal) return;


  modal.classList.remove(
    "open"
  );


  modal.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow =
    "";


  if (modalVideo) {

    modalVideo.pause();

  }

}


// Open showreel

openReel?.addEventListener(
  "click",
  openModal
);


// Keyboard support

openReel?.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Enter" ||
      event.key === " "
    ) {

      event.preventDefault();

      openModal();

    }

  }
);


// Close button

closeReel?.addEventListener(
  "click",
  closeModal
);


// Click outside modal

modalBackdrop?.addEventListener(
  "click",
  closeModal
);


// Escape key

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape"
    ) {

      closeModal();

    }

  }
);


// ============================================
// REAL HERO VIDEO
// ============================================

const heroVideo =
  $(".portrait-frame video");


if (heroVideo) {

  heroVideo
    .play()
    .catch(() => {});

}


// Pause video when tab is hidden

document.addEventListener(
  "visibilitychange",
  () => {

    if (!heroVideo) return;


    if (document.hidden) {

      heroVideo.pause();

    }

    else {

      heroVideo
        .play()
        .catch(() => {});

    }

  }
);


// ============================================
// FEATURED VIDEO
// ============================================

const featuredVideo =
  $("#featuredVideo");


if (featuredVideo) {

  featuredVideo.addEventListener(
    "play",
    () => {

      featuredVideo
        .closest(".real-video-wrap")
        ?.classList.add("video-playing");

    }
  );


  featuredVideo.addEventListener(
    "pause",
    () => {

      featuredVideo
        .closest(".real-video-wrap")
        ?.classList.remove("video-playing");

    }
  );

}


// ============================================
// ACTIVE NAVIGATION
// ============================================

const sections =
  $$("section[id]");

const navLinks =
  $$(".nav a");


const sectionObserver =
  new IntersectionObserver(

    (entries) => {

      entries.forEach(
        (entry) => {

          if (
            !entry.isIntersecting
          ) {

            return;

          }


          const id =
            entry.target.id;


          navLinks.forEach(
            (link) => {

              link.classList.toggle(

                "active",

                link.getAttribute(
                  "href"
                ) ===
                `#${id}`

              );

            }
          );

        }
      );

    },

    {
      threshold: 0.45
    }

  );


sections.forEach(
  (section) => {

    sectionObserver.observe(
      section
    );

  }
);


// ============================================
// SCROLL PARALLAX
// ============================================

let ticking = false;


window.addEventListener(
  "scroll",
  () => {

    if (ticking) return;


    window.requestAnimationFrame(
      () => {

        const amount =
          window.scrollY * 0.08;


        document.documentElement
          .style
          .setProperty(
            "--scroll-y",
            `${amount}px`
          );


        ticking = false;

      }
    );


    ticking = true;

  },

  {
    passive: true
  }

);


// ============================================
// PREVENT EMPTY HASH
// ============================================

$$(
  "a[href='#']"
).forEach(
  (link) => {

    link.addEventListener(
      "click",
      (event) => {

        event.preventDefault();

      }
    );

  }
);


// ============================================
// CONSOLE BRANDING
// ============================================

console.log(
  "%c SHIVOM SINGH ",
  "background:#171717;color:#e9f27d;font-size:15px;font-weight:bold;padding:8px 13px;"
);

console.log(
  "%c REAL CONTENT PORTFOLIO ",
  "color:#879d37;font-size:12px;"
);