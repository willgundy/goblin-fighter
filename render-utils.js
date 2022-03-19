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

export function renderSelectCharacter(character) {
    const characterCard = document.createElement('div');
    characterCard.classList.add('playerCard', 'flex-column');
    characterCard.id = character.id;

    const characterName = document.createElement('h4');
    characterName.textContent = character.name;

    const characterImage = document.createElement('img');
    characterImage.src = `assets/${character.shortname}-small.png`;
    characterImage.classList.add('selectionImage');

    characterCard.append(characterImage, characterName);

    characterCard.addEventListener('mouseover', function(){characterCard.classList.add('button-hover');});
    characterCard.addEventListener('mouseout', function(){characterCard.classList.remove('button-hover');});

    return characterCard;
}