// import functions and grab DOM elements
import { renderCharacterOptions, renderOpponentCard } from './render-utils.js';

const userHealthEl = document.querySelector('#userHealth');
const cpuHealthEl = document.querySelector('#cpuHealth');
const cpuNameEl = document.querySelector('#cpuName');
const cpuImageEl = document.querySelector('#cpuImage');
const opponentSectionEl = document.querySelector('#opponentSection');
const characterSelectEl = document.querySelector('#characterSelect');
const defeatedCountEl = document.querySelector('#defeatedCount');
const defeatedCardsEl = document.querySelector('#defeatedCards');
const youAudio = document.querySelector('#youAudio');
const loseAudio = document.querySelector('#loseAudio');
const healthContainers = document.querySelectorAll('.health');
const gameplayContainers = document.querySelectorAll('.gameplay');
const gameOverImage = document.querySelector('.game-over');

// let state
let userHealth = 10;
let cpuHealth = 3;

let characterList = [
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

function displayCharacterList() {
    characterSelectEl.innerHTML = '';
    for (let character of characterList) {
        const characterOptionEl = renderCharacterOptions(character);
        characterSelectEl.append(characterOptionEl);
    }
}

function displayOpponentList() {
    opponentSectionEl.innerHTML = '';
    for (let opponent of opponentList) {
        console.log(opponent);
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
}



cpuImageEl.addEventListener('click', () => {
    if (Math.random() < .75) {
        cpuHealth--;
        alert('you hit ' + cpuNameEl.textContent);
    } else {
        alert('you tried to hit ' + cpuNameEl.textContent + ' but missed');
    }
    //  - possibly decrement player HP
    if (Math.random() < .33) {
        userHealth--;
        alert(cpuNameEl.textContent + ' hit you!');
    } else {
        alert(cpuNameEl.textContent + ' tried to hit you but missed!');
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

function hideGameplay() {
    gameplayContainers.forEach(container => container.classList.add('hidden'));
    healthContainers.forEach(container => container.classList.add('hidden'));
}

function unhideGameOver() {
    gameOverImage.classList.remove('hidden');
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