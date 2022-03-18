// import functions and grab DOM elements
import { renderCharacterOptions, renderOpponentCard, renderStadiumOptions, renderSelectCharacter } from './render-utils.js';

const userHealthEl = document.querySelector('#userHealth');
const cpuHealthEl = document.querySelector('#cpuHealth');
const cpuNameEl = document.querySelector('#cpuName');
const cpuImageEl = document.querySelector('#cpuImage');
const opponentSectionEl = document.querySelector('#opponentSection');
const characterSelectEl = document.querySelector('#characterSelect');
const defeatedCountEl = document.querySelector('#defeatedCount');
const defeatedCardsEl = document.querySelector('#defeatedCards');
const defeatedEl = document.querySelector('.defeated');
const youAudio = document.querySelector('#youAudio');
const loseAudio = document.querySelector('#loseAudio');
const winAudio = document.querySelector('#winAudio');
const healthContainers = document.querySelectorAll('.health');
const gameplayContainers = document.querySelectorAll('.gameplay');
const userGameplayNotificationEl = document.querySelector('#userGameplayNotification');
const cpuGameplayNotificationEl = document.querySelector('#cpuGameplayNotification');
const stadiumSelectEl = document.querySelector('#stadiumSelect');
const body = document.querySelector('body');
const characterSelectScreen = document.querySelector('#characterSelectScreen');
const characterCardDiv = document.querySelector('#characterCardDiv');
const gameplayDiv = document.querySelector('#gameConsole');
const userNameEl = document.querySelector('#userName');
const userImageEl = document.querySelector('#userImage');


// let state
let userHealth = 10;
let cpuHealth = 3;

const characterList = [
    { id: 0,
        name: 'E Honda',
        shortname: 'ehonda' },
    { id: 1,
        name: 'Blanka',
        shortname: 'blanka' },
    { id: 2,
        name: 'Chun-Li',
        shortname: 'chunli' },
    { id: 3,
        name: 'Dhalism',
        shortname: 'dhalism' },
    { id: 4,
        name: 'Guile',
        shortname: 'guile' },
    { id: 5,
        name: 'Ken',
        shortname: 'ken' },
    { id: 6,
        name: 'Ryu',
        shortname: 'ryu' },
    { id: 7, 
        name: 'Zangief',
        shortname: 'zangief' },
];

const stadiumList = [
    { id: 0,
        name: 'Temple Hideout',
        path: 'assets/templeHideout.png' },
    { id: 1,
        name: 'Spa',
        path: 'assets/spa.png' },
    { id: 2,
        name: 'Taiping District',
        path: 'assets/taipingDistrict.png' },
    { id: 3,
        name: 'Air Force Base',
        path: 'assets/airForceBase.png' },
    { id: 4,
        name: 'Battle Harbor',
        path: 'assets/battleHarbor.png' },
    { id: 5,
        name: 'Big Factory',
        path: 'assets/bigFactory.png' },
    { id: 6,
        name: 'Amazon River',
        path: 'assets/amazonRiverBasin.png' }
];

let opponentList = [
    { id: 0,
        name: 'E Honda',
        shortname: 'ehonda',
        health: 3
    },
    { id: 1,
        name: 'Guile',
        shortname: 'guile',
        health: 3
    }
];

let defeatedOpponents = [];
let defeatedOpponentCount = 0;

displayCharacterList();
displayOpponentList();
displayStadiumList();
displayCharacterSelectCards();


function displayCharacterSelectCards() {
    for (let character of characterList) {
        const characterCardEl = renderSelectCharacter(character);
        characterCardEl.addEventListener('click', () => {
            //remove character select div
            characterSelectScreen.classList.add('hidden');
            //display gamplay console
            gameplayDiv.classList.remove('hidden');
            //display the selected character
        });
        characterCardEl.addEventListener('click', displayCharacter);
        characterCardDiv.append(characterCardEl);
    }
}

function displayCharacter(e) {
    console.log(e);
    const playerChoice = e.path[1].id;
    console.log(playerChoice);
    const index = characterList.findIndex(characterList => {
        return characterList.id === Number(playerChoice);
    });
    console.log(index);
    const userCharacter = characterList[index];
    console.log(userCharacter);
    userNameEl.textContent = userCharacter.name;
    userImageEl.src = `assets/${userCharacter.shortname}-large.png`;
}

function displayCharacterList() {
    characterSelectEl.innerHTML = '';
    for (let character of characterList) {
        const characterOptionEl = renderCharacterOptions(character);
        characterSelectEl.append(characterOptionEl);
    }
}

function displayStadiumList() {
    stadiumSelectEl.innerHTML = '';
    for (let stadium of stadiumList) {
        const stadiumOptionEl = renderStadiumOptions(stadium);
        stadiumSelectEl.append(stadiumOptionEl);
    }
}

stadiumSelectEl.addEventListener('change', () => {
    body.style.backgroundImage = `url('${stadiumSelectEl.value}')`;
});

function displayOpponentList() {
    opponentSectionEl.innerHTML = '';
    for (let opponent of opponentList) {
        const opponentOptionEl = renderOpponentCard(opponent);

        if (opponent.health > 0) {

            opponentOptionEl.addEventListener('click', () => {
                const activeCard = document.querySelector('.activeOpponent');
                if (activeCard !== null) {
                    activeCard.classList.remove('activeOpponent');
                }
                opponentOptionEl.classList.add('activeOpponent');
                displayActiveOpponent(opponent);
            });

            opponentSectionEl.append(opponentOptionEl);

        } 
    }
}

function displayActiveOpponent(opponent) {
    cpuNameEl.textContent = opponent.name;
    cpuImageEl.src = `assets/${opponent.shortname}-large.png`;
    cpuImageEl.id = opponent.id;
    cpuHealth = opponent.health;
    cpuHealthEl.textContent = getHealthText(cpuHealth);
}

function removeActiveOpponentFromDOM() {
    cpuNameEl.textContent = '';
    cpuImageEl.src = '';
    cpuImageEl.id = '';
    cpuHealthEl.textContent = '';
    cpuGameplayNotificationEl.textContent = '';
}



cpuImageEl.addEventListener('click', () => {
    if (Math.random() < .75) {
        cpuHealth--;
        userGameplayNotificationEl.textContent = 'you hit ' + cpuNameEl.textContent + '!';
    } else {
        userGameplayNotificationEl.textContent = 'you tried to hit ' + cpuNameEl.textContent + ' but missed';
    }
    //  - possibly decrement player HP
    if (Math.random() < .33) {
        userHealth--;
        cpuGameplayNotificationEl.textContent = cpuNameEl.textContent + ' hit you!';
    } else {
        cpuGameplayNotificationEl.textContent = cpuNameEl.textContent + ' tried to hit you but missed!';
    }
    updateUserDOM();
    updateCpuDOM();
    const index = opponentList.findIndex(opponentList => {
        return opponentList.id === Number(cpuImageEl.id);
    });
    if (cpuHealth <= 0) {
        removeActiveOpponentFromDOM();

        const defeatedOpponent = splicedOpponentFromArray(index);

        defeatedOpponents.push(defeatedOpponent[0]);

        defeatedOpponentCount++;
        displayDefeatedOpponentsandCount();

        cpuHealthEl.innerHTML = 'Finished them!';
        playYouWinAudio();

        displayOpponentList();
    }
    if (userHealth <= 0) {
        hideGameplay();
        unhideGameOver();
        playYouLoseAudio();
    }
});

function playYouLoseAudio() {
    youAudio.play();
    youAudio.onended = function() {
        loseAudio.play();
    };
}

function playYouWinAudio() {
    youAudio.play();
    youAudio.onended = function() {
        winAudio.play();
    };
}

function hideGameplay() {
    gameplayContainers.forEach(container => container.classList.add('hidden'));
    healthContainers.forEach(container => container.classList.add('hidden'));
}

function unhideGameOver() {
    body.style.backgroundImage = `url('assets/game-over.png')`;
    defeatedEl.classList.add('defeated-gameover');
}

function displayDefeatedOpponentsandCount() {
    defeatedCardsEl.innerHTML = '';
    for (let opponent of defeatedOpponents) {
        const defeatedOpponentEl = renderOpponentCard(opponent);
        defeatedCardsEl.append(defeatedOpponentEl);
    }

    defeatedCountEl.textContent = `Defeated Street Fighters: ${defeatedOpponentCount}`;
}

function splicedOpponentFromArray(index) {
    return opponentList.splice(index, 1);
}

function updateUserDOM() {
    //update user health
    userHealthEl.innerHTML = getHealthText(userHealth);
}

function updateCpuDOM() {
    //update cpu health
    cpuHealthEl.innerHTML = getHealthText(cpuHealth);
    //update array with new health value
    const index = opponentList.findIndex(opponentList => {
        return opponentList.id === Number(cpuImageEl.id);
    });
    opponentList[index].health = cpuHealth;
    const opponentHealthEl = document.querySelector(`#health${opponentList[index].id}`);
    opponentHealthEl.textContent = getHealthText(cpuHealth);
}

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form);

    const opponentId = data.get('characterSelect');
    const opponentShortName = characterList[opponentId].shortname;
    let opponentName = characterList[opponentId].name;

    const newOpponent = createOpponentObject(opponentName, opponentShortName);

    opponentList.push(newOpponent);

    displayOpponentList();

    removeActiveOpponentFromDOM();

});

function createOpponentObject(opponentName, opponentShortName) {
    return { id: opponentList.length + defeatedOpponents.length,
        name: opponentName,
        shortname: opponentShortName,
        health: 3
    };
}

export function getHealthText(health) {
    if (health >= 3) {
        return `Health: ${health}❤️`;
    } else if (health >= 1) {
        return `Health: ${health}💔`;
    } else {
        return `Health: ${health}🖤`;
    }
}
