document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    if (menuToggle && navLinks) {
      menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
      });
    }

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
  
    if (document.body.classList.contains("programs-page")) {
      loadPrograms();
    }
  });
  
  async function loadPrograms() {
    try {
      const res = await fetch("data/programs.json");
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();
  
      const container = document.getElementById("programs-container");
      if (!container) return;
  
      data.programs.forEach((program, index) => {
        const card = document.createElement("article");
        card.classList.add("program-card");
        card.innerHTML = `
          <img src="${program.image}" alt="${program.name}" loading="lazy">
          <h3>${program.name}</h3>
          <p>${program.description}</p>
          <p><strong>Age Group:</strong> ${program.ageGroup}</p>
          <button class="btn modal-btn" data-index="${index}">Learn More</button>
        `;
        container.appendChild(card);
      });
  
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
  
      document.querySelectorAll(".modal-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const idx = e.target.dataset.index;
          modalTitle.textContent = data.programs[idx].name;
          modalSchedule.textContent = `Schedule: ${data.programs[idx].schedule}`;
          modal.style.display = "block";

          localStorage.setItem("lastViewedProgram", data.programs[idx].name);
        });
      });
  
      closeModal.addEventListener("click", () => modal.style.display = "none");
      window.addEventListener("click", (e) => {
        if (e.target == modal) modal.style.display = "none";
      });
  
    } catch (err) {
      console.error("Error loading programs:", err);
      const container = document.getElementById("programs-container");
      if (container) container.innerHTML = "<p>Sorry, programs are unavailable. Please try again later.</p>";
    }
  }
  
  
  