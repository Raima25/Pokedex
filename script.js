let currentPokemonId = 1;
let activePanel = 'info'; // Track active panel

async function fetchPokemonData() {
    try {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${currentPokemonId}`;

        // Fetch data from the API
        const response = await fetch(apiUrl);

        // Check if the network response is OK (status code 200)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the response JSON data
        const data = await response.json();

        const pokemonName = data.name;
        const pokemonImage = data.sprites.front_default;
        const pokemonTypes = data.types.map(type => type.type.name);

        document.getElementById('pokemon-name').textContent = pokemonName;
        document.getElementById('pokemon-image').src = pokemonImage;

        const typesContainer = document.querySelector('.types-list'); // Clear any previous types
        typesContainer.innerHTML = '';

        // mapping of type names to their corresponding class names
        const typeClassMap = {
            'normal': 'Normal',
            'fire': 'Fire',
            'water': 'Water',
            'electric': 'Electric',
            'grass': 'Grass',
            'ice': 'Ice',
            'fighting': 'Fighting',
            'poison': 'Poison',
            'ground': 'Ground',
            'flying': 'Flying',
            'psychic': 'Psychic',
            'bug': 'Bug',
            'rock': 'Rock',
            'ghost': 'Ghost',
            'dragon': 'Dragon',
            'dark': 'Dark',
            'steel': 'Steel',
            'fairy': 'Fairy'
        };
        
        console.log('Pokemon types:', pokemonTypes);

        pokemonTypes.forEach(type => {
            const typeClass = typeClassMap[type];
            
            const typeElement = document.createElement('span');
            typeElement.classList.add('type', typeClass);
            typeElement.textContent = type;

            typesContainer.appendChild(typeElement);
        });

        fetchPokemonStatsAndMoves(currentPokemonId);

    } catch (error) {
        // Handle errors by logging them to the console
        console.error('Error fetching Pokémon data:', error);
    }
}

async function fetchPokemonStatsAndMoves(pokemonId) {
    try {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

        // Fetch data from the API
        const response = await fetch(apiUrl);

        // Check if the network response is OK (status code 200)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the response JSON data
        const data = await response.json();

        const pokemonHeight = data.height / 10; // Convert height to meters
        const pokemonWeight = (data.weight / 10).toFixed(1); // Convert weight to kilograms
        const stats = {
            hp: 0,
            attack: 0,
            defense: 0,
            specialAttack: 0,
            specialDefense: 0,
            speed: 0
        };

        data.stats.forEach(stat => {
            const statName = stat.stat.name;
            switch (statName) {
                case 'hp':
                    stats.hp = stat.base_stat;
                    break;
                case 'attack':
                    stats.attack = stat.base_stat;
                    break;
                case 'defense':
                    stats.defense = stat.base_stat;
                    break;
                case 'special-attack':
                    stats.specialAttack = stat.base_stat;
                    break;
                case 'special-defense':
                    stats.specialDefense = stat.base_stat;
                    break;
                case 'speed':
                    stats.speed = stat.base_stat;
                    break;
                default:
                    break;
            }
        });

        document.getElementById('pokemon-height').textContent = `${pokemonHeight}m`;
        document.getElementById('pokemon-weight').textContent = `${pokemonWeight}kg`;
        document.getElementById('pokemon-hp').textContent = `${stats.hp}`;
        document.getElementById('pokemon-attack').textContent = `${stats.attack}`;
        document.getElementById('pokemon-defense').textContent = `${stats.defense}`;
        document.getElementById('pokemon-special-attack').textContent = `${stats.specialAttack}`;
        document.getElementById('pokemon-special-defense').textContent = `${stats.specialDefense}`;
        document.getElementById('pokemon-speed').textContent = `${stats.speed}`;

        const movesContainer = document.getElementById('pokemon-moves-container');
        movesContainer.innerHTML = ''; // Clear any previous moves

        data.moves.forEach(move => {
            const moveName = move.move.name;
            const moveBox = document.createElement('div');
            moveBox.classList.add('move-box');
            moveBox.textContent = moveName;
            movesContainer.appendChild(moveBox);
        });

    } catch (error) {
        // Handle errors by logging them to the console
        console.error('Error fetching Pokémon stats:', error);
    }
}

// Event listener for arrow buttons
document.getElementById('prev-button').addEventListener('click', () => {
    if (currentPokemonId > 1) {
        currentPokemonId--;
        fetchPokemonData();
    }
});

document.getElementById('next-button').addEventListener('click', () => {
    currentPokemonId++;
    fetchPokemonData();
});

// Event listeners for panel buttons
document.getElementById('info-button').addEventListener('click', () => {
    if (activePanel !== 'info') {

        // Set the active panel to 'info'
        activePanel = 'info';

        document.getElementById('info-button').classList.add('active');
        document.getElementById('moves-button').classList.remove('active');
        document.getElementById('ititle').style.display = 'block';
        document.getElementById('mtitle').style.display = 'none';
        document.getElementById('info-panel').style.display = 'block';
        document.getElementById('moves-panel').style.display = 'none';
    }
});

document.getElementById('moves-button').addEventListener('click', () => {
    if (activePanel !== 'moves') {

        // Set the active panel to 'moves'
        activePanel = 'moves';

        document.getElementById('moves-button').classList.add('active');
        document.getElementById('info-button').classList.remove('active');
        document.getElementById('ititle').style.display = 'none';
        document.getElementById('mtitle').style.display = 'block';
        document.getElementById('moves-panel').style.display = 'block';
        document.getElementById('info-panel').style.display = 'none';
    }
});

fetchPokemonData();
