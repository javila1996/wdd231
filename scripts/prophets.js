const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();

    displayProphets(data.prophets);
}

const displayProphets = (prophets) => {
    const cards = document.querySelector('#cards');

    prophets.forEach((prophet) => {
        let card = document.createElement('section');
        card.classList.add('prophet-card');

        let fullName = document.createElement('h2');
        let birthdate = document.createElement('p');
        let birthplace = document.createElement('p');
        let portrait = document.createElement('img');

        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        birthdate.textContent = `Date of Birth: ${prophet.birthdate}`;
        birthplace.textContent = `Place of Birth: ${prophet.birthplace}`;

        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        card.appendChild(fullName);
        card.appendChild(birthdate);
        card.appendChild(birthplace);
        card.appendChild(portrait);

        cards.appendChild(card);
    });
};

getProphetData();
