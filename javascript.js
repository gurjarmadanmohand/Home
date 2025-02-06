document.addEventListener("DOMContentLoaded", function () {
  // Create Audio object for theme button clicks
  const themeSound = new Audio('sounds/theme-click.mp3');
  themeSound.volume = 0.5;

  // Create the flashlight element
  let flashlight = document.createElement("div");
  flashlight.id = "flashlight";
  document.body.appendChild(flashlight);

  // Move the flashlight exactly to the cursor
  document.addEventListener("mousemove", (e) => {
    const { clientX: x, clientY: y } = e;
    requestAnimationFrame(() => {
      flashlight.style.left = `${x}px`;
      flashlight.style.top = `${y}px`;
    });
  });

  // Add click events for project elements
  document.getElementById("app1").addEventListener("click", function () {
    window.open("https://gurjarmadanmohand.github.io/Todo-App/", "_blank");
  });
  document.getElementById("app2").addEventListener("click", function () {
    window.open("https://gurjarmadanmohand.github.io/tictactoe/", "_blank");
  });

  // Particle Animation Setup
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let particlesArray = [];

  // Particle Class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 4 + 1; // Size of particles
      this.speedX = Math.random() * 3 - 1.5; // Horizontal speed
      this.speedY = Math.random() * 3 - 1.5; // Vertical speed
      this.color = `rgba(255, 255, 255, ${Math.random()})`; // White with transparency
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      // Reposition if out of bounds
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Initialize Particles (renamed to initParticles)
  function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 50; i++) {
      particlesArray.push(new Particle());
    }
  }

  // Animate Particles
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach((particle) => {
      particle.update();
      particle.draw();
    });
    requestAnimationFrame(animateParticles);
  }

  // Adjust canvas on resize
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  });

  // Start Particle Animation
  initParticles();
  animateParticles();

  // Theme Button Functionality
  const themeButtons = document.querySelectorAll('.theme-btn');

  // Helper function to clear active class on theme buttons
  function clearActiveTheme() {
    themeButtons.forEach(btn => btn.classList.remove('active'));
  }

  // Listen for clicks on each theme button
  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Play sound effect on theme button click
      themeSound.currentTime = 0;
      themeSound.play();

      const theme = btn.getAttribute('data-theme');

      // Set the theme attribute on the body
      document.body.setAttribute('data-theme', theme);

      // Clear active classes and mark the clicked button as active
      clearActiveTheme();
      btn.classList.add('active');

      // For non-blue-hour themes, hide the particles canvas; show them for blue-hour
      if (theme !== 'blue-hour') {
        document.body.classList.add('hide-particles');
      } else {
        document.body.classList.remove('hide-particles');
      }

      // Add specific overlay effects based on the theme
      if (theme === 'sunset') {
        document.body.classList.add('sunset-overlay-active');
        let overlay = document.querySelector('.sunset-overlay');
        if (!overlay) {
          overlay = document.createElement('div');
          overlay.className = 'sunset-overlay';
          document.body.appendChild(overlay);
        }
      } else {
        const overlay = document.querySelector('.sunset-overlay');
        if (overlay) overlay.remove();
        document.body.classList.remove('sunset-overlay-active');
      }

      if (theme === 'autumn-afternoon') {
        document.body.classList.add('autumn-overlay-active');
      } else {
        document.body.classList.remove('autumn-overlay-active');
      }

      // Reinitialize particles so they reflect the new theme’s colors
      initParticles();
    });
  });
});
