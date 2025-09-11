// Responsive nav toggle
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("show");
});

// Footer year and last modified
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

// Courses array
const courses = [
  { code: "WDD130", name: "Web Fundamentals", credits: 3, category: "WDD", completed: true },
  { code: "WDD131", name: "Web Development I", credits: 3, category: "WDD", completed: false },
  { code: "WDD231", name: "Web Frontend Development", credits: 3, category: "WDD", completed: false },
  { code: "CSE110", name: "Programming Basics", credits: 2, category: "CSE", completed: true },
  { code: "CSE210", name: "Programming with Classes", credits: 2, category: "CSE", completed: false }
];

const courseContainer = document.querySelector(".courses");
const creditOutput = document.createElement("p");
courseContainer.appendChild(creditOutput);

function displayCourses(filter = "ALL") {
  // filter
  let filtered = courses.filter(c => filter === "ALL" || c.category === filter);

  // remove old courses
  document.querySelectorAll(".course-list").forEach(el => el.remove());

  // render courses
  filtered.forEach(course => {
    const div = document.createElement("div");
    div.classList.add("course-list");
    div.textContent = `${course.code} - ${course.name} (${course.credits} credits)`;
    if (course.completed) {
      div.style.background = "#c8e6c9"; // green for completed
    } else {
      div.style.background = "#ffcdd2"; // red for incomplete
    }
    courseContainer.appendChild(div);
  });

  // calculate total credits dynamically with reduce
  const totalCredits = filtered.reduce((sum, course) => sum + course.credits, 0);
  creditOutput.textContent = `Total Credits: ${totalCredits}`;
}

// Event listeners
document.getElementById("all").addEventListener("click", () => displayCourses("ALL"));
document.getElementById("cse").addEventListener("click", () => displayCourses("CSE"));
document.getElementById("wdd").addEventListener("click", () => displayCourses("WDD"));

// Initial load
displayCourses("ALL");

  