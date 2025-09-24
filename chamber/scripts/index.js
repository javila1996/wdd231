
const apiKey = "50bdb84657b1fbf62ad49621701a4a43";
const city = "Leicester,GB";

async function getWeather() {
    try {
        // Current weather
        const currentResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        const currentData = await currentResponse.json();

        // 3-day forecast (24 entries = 3 days in 3-hour intervals)
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=24&appid=${apiKey}`);
        const forecastData = await forecastResponse.json();

        displayWeather(currentData, forecastData);
    } catch (error) {
        console.error("Error fetching weather:", error);
        document.querySelector(".weather-widget").textContent = "Unable to load weather data.";
    }
}

function displayWeather(current, forecast) {
    const container = document.querySelector(".weather-widget");
    container.innerHTML = "";

    // Current weather card
    const currentCard = document.createElement("div");
    currentCard.classList.add("spotlight");
    currentCard.innerHTML = `
        <h3>Current Weather</h3>
        <p>Temperature: ${Math.round(current.main.temp)}°C</p>
        <p>${current.weather[0].description}</p>
    `;
    container.appendChild(currentCard);

    // 3-day forecast card
    const forecastCard = document.createElement("div");
    forecastCard.classList.add("spotlight");
    forecastCard.innerHTML = `<h3>3-Day Forecast</h3>`;
    const ul = document.createElement("ul");

    let daysAdded = 0;
    let lastDate = "";

    forecast.list.forEach(item => {
        const date = item.dt_txt.split(" ")[0];
        if(date !== lastDate && daysAdded < 3) {
            const li = document.createElement("li");
            li.textContent = `${date}: ${Math.round(item.main.temp)}°C - ${item.weather[0].description}`;
            ul.appendChild(li);
            lastDate = date;
            daysAdded++;
        }
    });

    forecastCard.appendChild(ul);
    container.appendChild(forecastCard);
}

async function loadSpotlights() {
    try {
        const response = await fetch("./data/index.json");
        const members = await response.json();

        // Filter gold and silver members
        const filtered = members.filter(member => 
            member.membership.toLowerCase() === "gold" || 
            member.membership.toLowerCase() === "silver"
        );

        // Randomly select 2–3 members
        const shuffled = filtered.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, Math.min(3, shuffled.length));

        const grid = document.querySelector(".spotlight-grid");
        grid.innerHTML = "";

        selected.forEach(member => {
            const card = document.createElement("article");
            card.classList.add("spotlight");
            card.innerHTML = `
                <img src="${member.logo}" alt="${member.company} logo">
                <h3>${member.company}</h3>
                <p>Phone: ${member.phone}</p>
                <p>Address: ${member.address}</p>
                <p>Website: <a href="${member.website}" target="_blank">${member.website}</a></p>
                <p>Membership Level: ${member.membership}</p>
            `;
            grid.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading spotlights:", error);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    getWeather();
    loadSpotlights();

    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;
});
