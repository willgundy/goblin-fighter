import { getHealthText } from './app.js';

export function renderOpponentCard(opponent) {
    const opponentCardDiv = document.createElement('div');
    opponentCardDiv.classList.add('opponentCard');

    const opponentInfoDiv = document.createElement('div');
    opponentInfoDiv.classList.add('flex-column', 'flex-start');

    const opponentName = document.createElement('p');
    opponentName.textContent = `Name: ${opponent.name}`;

    const opponentHealth = document.createElement('p');
    opponentHealth.textContent = getHealthText(opponent.health);
    opponentHealth.id = `health${opponent.id}`;

    const opponentImage = document.createElement('img');
    opponentImage.src = `assets/${opponent.shortname}-small.png`;
    opponentImage.classList.add('smallImg');

    opponentInfoDiv.append(opponentName, opponentHealth);
    opponentCardDiv.append(opponentInfoDiv, opponentImage);

    return opponentCardDiv;
}

export function renderCharacterOptions(character) {
    const characterOption = document.createElement('option');
    characterOption.innerText = character.name;
    characterOption.value = character.id;

    return characterOption;
}

export function renderStadiumOptions(stadium) {
    const stadiumOption = document.createElement('option');
    stadiumOption.innerText = stadium.name;
    stadiumOption.value = stadium.path;

    return stadiumOption;
}