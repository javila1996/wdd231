document.addEventListener("DOMContentLoaded", () => {

    // -----------------------------
    // Responsive Menu
    // -----------------------------
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.querySelector(".nav-links");
  
    if (menuToggle && navLinks) {
      menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
      });
    }
  
    // -----------------------------
    // Footer
    // -----------------------------
    const footer = document.querySelector("footer");
    if (footer) {
      footer.innerHTML = `
        <address>
          BrightPath Child Care<br>
          123 Main St, Utah<br>
          Phone: (555) 555-5555
        </address>
        <p>&copy; 2025 BrightPath Child Care | Created by Josue Avila</p>
        <p id="lastModified">Last Modified: ${document.lastModified}</p>
      `;
    }
  
    // -----------------------------
    // Programs Page
    // -----------------------------
    if (document.body.classList.contains("programs-page")) {
      loadPrograms();
    }
  
    // -----------------------------
    // Thank You Page - Form Data Display
    // -----------------------------
    if (window.location.pathname.includes("thankyou.html")) {
      const params = new URLSearchParams(window.location.search);
      const detailsContainer = document.getElementById("submission-details");
  
      if (params && detailsContainer) {
        const name = params.get("name");
        const email = params.get("email");
        const phone = params.get("phone");
        const location = params.get("location");
        const message = params.get("message");
  
        detailsContainer.innerHTML = `
          <h3>Your Submitted Details:</h3>
          <p><strong>Name:</strong> ${name || "Not provided"}</p>
          <p><strong>Email:</strong> ${email || "Not provided"}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Location:</strong> ${location || "Not provided"}</p>
          <p><strong>Message:</strong> ${message || "Not provided"}</p>
        `;
      }
    }
  
  });
  
  // -----------------------------
  // Function: Load Programs
  // -----------------------------
  async function loadPrograms() {
    try {
      const res = await fetch("data/programs.json");
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();
  
      const container = document.getElementById("programs-container");
      if (!container) return;
  
      // Create modal once
      const modal = document.createElement("div");
      modal.id = "program-modal";
      modal.style.display = "none";
      modal.innerHTML = `
        <div class="modal-content">
          <span id="close-modal" style="cursor:pointer;">&times;</span>
          <h3 id="modal-title"></h3>
          <p id="modal-schedule"></p>
        </div>
      `;
      document.body.appendChild(modal);
  
      const modalTitle = document.getElementById("modal-title");
      const modalSchedule = document.getElementById("modal-schedule");
      const closeModal = document.getElementById("close-modal");
  
      // Modal close events
      closeModal.addEventListener("click", () => modal.style.display = "none");
      window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
      });
  
      // Generate program cards
      data.programs.forEach((program) => {
        const card = document.createElement("article");
        card.classList.add("program-card");
        card.innerHTML = `
          <img src="${program.image}" alt="${program.name}" loading="lazy">
          <h3>${program.name}</h3>
          <p>${program.description}</p>
          <p><strong>Age Group:</strong> ${program.ageGroup}</p>
          <button class="btn modal-btn">Learn More</button>
        `;
  
        // Attach click listener to open modal
        card.querySelector(".modal-btn").addEventListener("click", () => {
          modalTitle.textContent = program.name;
          modalSchedule.textContent = `Schedule: ${program.schedule}`;
          modal.style.display = "block";
  
          // Store last viewed program
          localStorage.setItem("lastViewedProgram", program.name);
        });
  
        container.appendChild(card);
      });
  
    } catch (err) {
      console.error("Error loading programs:", err);
      const container = document.getElementById("programs-container");
      if (container) container.innerHTML = "<p>Sorry, programs are unavailable. Please try again later.</p>";
    }
  }
  
  