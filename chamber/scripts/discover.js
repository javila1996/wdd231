document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector("#cards-grid");
    const message = document.querySelector("#visit-message");
  
    const lastVisit = localStorage.getItem("discoverLastVisit");
    const now = Date.now();
  
    if (!lastVisit) {
      message.textContent = "Welcome! Let us know if you have any questions.";
    } else {
      const daysSince = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
      if (daysSince < 1) {
        message.textContent = "Back so soon! Awesome!";
      } else if (daysSince === 1) {
        message.textContent = "You last visited 1 day ago.";
      } else {
        message.textContent = `You last visited ${daysSince} days ago.`;
      }
    }
    localStorage.setItem("discoverLastVisit", now);
  
    fetch("./data/discover.json")
      .then((response) => response.json())
      .then((places) => {
        places.forEach((place, index) => {
          const card = document.createElement("article");
          card.classList.add("card", `area-a${index + 1}`);
          card.innerHTML = `
            <figure>
              <img src="${place.image}" alt="${place.name}" loading="lazy" width="300" height="200">
            </figure>
            <div class="card-body">
              <h2>${place.name}</h2>
              <address>${place.address}</address>
              <p>${place.description}</p>
              <button class="learn-btn">Learn More</button>
            </div>
          `;
          grid.appendChild(card);
        });
      })
      .catch((error) => {
        console.error("Error loading JSON:", error);
        grid.innerHTML = "<p>Unable to load attractions at this time.</p>";
      });
  });


document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;