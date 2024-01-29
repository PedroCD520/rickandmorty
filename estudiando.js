let charactersEL = document.getElementById('characters');
let nameFilterEL = document.getElementById('name-filter');
let statusFilterEL = document.getElementById('status-filter');  // Corregido el identificador

async function getCharacters(name, status) {
    let url = 'https://rickandmortyapi.com/api/character/';
    if (name || status) {
        url += '?';
        if (name) {
            url += `name=${name}&`;
        }
        if (status) {
            url += `status=${status}`;
        }
    }
    const response = await fetch(url);
    const data = await response.json();

    return data.results;
}

async function displayCharacters(name, status) {
    const characters = await getCharacters(name, status);
    charactersEL.innerHTML = '';

    for (let character of characters) {
        const card = document.createElement('div');
        card.classList.add('character-card');
        card.innerHTML = `
            <img src="${character.image}" />
            <h2>${character.name}</h2>
            <p>Status: ${character.status}</p>
            <p>Especie: ${character.species}</p>`;
        charactersEL.appendChild(card);
    }
}

displayCharacters();

nameFilterEL.addEventListener('input', () => {
    displayCharacters(nameFilterEL.value, statusFilterEL.value);
});

statusFilterEL.addEventListener('change', () => {
    displayCharacters(nameFilterEL.value, statusFilterEL.value);
});
async function displayCharacters(name, status) {
    const characters = await getCharacters(name, status);
    charactersEL.innerHTML = '';

    if (characters.length === 0) {
        // Si no se encuentran personajes, mostrar un mensaje
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = 'No se encontraron personajes.';
        charactersEL.appendChild(noResultsMessage);
    } else {
        // Si hay personajes, mostrar las tarjetas como antes
        for (let character of characters) {
            const card = document.createElement('div');
            card.classList.add('character-card');
            card.innerHTML = `
                <img src="${character.image}" />
                <h2>${character.name}</h2>
                <p>Status: ${character.status}</p>
                <p>Especie: ${character.species}</p>`;
            charactersEL.appendChild(card);
        }
    }
}
