// import functions and grab DOM elements
import { renderCharacterOptions, renderOpponentCard } from './render-utils.js';

const userHealthEl = document.querySelector('#userHealth');
const cpuHealthEl = document.querySelector('#cpuHealth');
const userNameEl = document.querySelector('#userName');
const cpuNameEl = document.querySelector('#cpuName');
const userImageEl = document.querySelector('#userImage');
const cpuImageEl = document.querySelector('#cpuImage');
const opponentSectionEl = document.querySelector('#opponentSection');
const defeatedSectionEl = document.querySelector('.defeated');
const characterSelectEl = document.querySelector('#characterSelect');

// let state
let userHealth = 100;
let cpuHealth = 20;
let userName = '';
let cpuName = '';

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
        shortname: 'ruy' },
    { id: 7, 
        name: 'Zangief',
        shortname: 'zangief' },
];

let opponentList = [
    { id: 0,
        name: 'E Honda',
        shortname: 'ehonda',
        health: 20
    },
    { id: 1,
        name: 'Guile',
        shortname: 'guile',
        health: 20
    }
];

let activeOpponent = {};

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
        const opponentOptionEl = renderOpponentCard(opponent);

        opponentOptionEl.addEventListener('click', () => {
            const activeCard = document.querySelector('.activeOpponent');
            if (activeCard !== null) {
                activeCard.classList.remove('activeOpponent');
            }
            opponentOptionEl.classList.add('activeOpponent');
            cpuNameEl.textContent = opponent.name;
            cpuImageEl.src = `assets/${opponent.shortname}-large.png`;
            cpuImageEl.id = opponent.id;
            cpuHealthEl.textContent = `Health: ${opponent.health}❤️`;
        });

        opponentSectionEl.append(opponentOptionEl);
    }
}

cpuImageEl.addEventListener('click', () => {
      console.log('hit');
});

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form);

    const opponentName = data.get('characterName');

    const opponentId = data.get('characterSelect');
    const opponentShortName = characterList[opponentId].shortname;

    const newOpponent = createOpponentObject(opponentName, opponentShortName);

    opponentList.push(newOpponent);

    displayOpponentList();

});

function createOpponentObject(opponentName, opponentShortName) {
    return { id: opponentList.length,
        name: opponentName,
        shortname: opponentShortName,
        health: 20
    };
}

// set event listeners 
  // get user input
  // use user input to update state 
  // update DOM to reflect the new state
