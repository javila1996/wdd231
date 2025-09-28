
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

const params = new URLSearchParams(window.location.search);
const formDataList = document.getElementById("form-data-list");

// Fields to display
const fields = [
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "email", label: "Email" },
  { key: "mobile", label: "Mobile Phone" },
  { key: "businessName", label: "Business/Organization Name" },
  { key: "organizationalTitle", label: "Organizational Title" },
  { key: "membershipLevel", label: "Membership Level" },
  { key: "description", label: "Business Description" },
  { key: "timestamp", label: "Submitted On" }
];

fields.forEach(field => {
  const value = params.get(field.key) || "(Not provided)";
  const li = document.createElement("li");
  li.textContent = `${field.label}: ${value}`;
  formDataList.appendChild(li);
});
