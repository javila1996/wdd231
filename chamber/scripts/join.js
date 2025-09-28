// Footer date info
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Hidden timestamp
document.getElementById("timestamp").value = new Date().toLocaleString();

// Modal logic
const modals = document.querySelectorAll(".modal");
const openLinks = document.querySelectorAll(".open-modal");
const closes = document.querySelectorAll(".close");

openLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const modalId = link.getAttribute("href");
    document.querySelector(modalId).style.display = "block";
  });
});

closes.forEach(close => {
  close.addEventListener("click", () => {
    modals.forEach(m => m.style.display = "none");
  });
});

window.addEventListener("click", (e) => {
  modals.forEach(m => {
    if (e.target === m) {
      m.style.display = "none";
    }
  });
});

window.addEventListener("load", () => {
  document.querySelectorAll(".card").forEach((card, i) => {
    setTimeout(() => {
      card.classList.add("show");
    }, i * 300);
  });
});
