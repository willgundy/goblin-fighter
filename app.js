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
let userHealth = 10;
let cpuHealth = 3;

let audio = new Audio('assets/playerSelect.mp3');

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
        const opponentOptionEl = renderOpponentCard(opponent);
        if (opponent.health > 0) {
            opponentOptionEl.addEventListener('click', () => {
                audio.pause();
                const activeCard = document.querySelector('.activeOpponent');
                if (activeCard !== null) {
                    activeCard.classList.remove('activeOpponent');
                }
                opponentOptionEl.classList.add('activeOpponent');
                cpuNameEl.textContent = opponent.name;
                cpuImageEl.src = `assets/${opponent.shortname}-large.png`;
                cpuImageEl.id = opponent.id;
                cpuHealthEl.textContent = `Health: ${opponent.health}❤️`;
                cpuHealth = opponent.health;
                audio.play();
            });

            opponentSectionEl.append(opponentOptionEl);
        } else if (opponent.health <= 0) {
            const activeCard = document.querySelector('.activeOpponent');
            if (activeCard !== null) {
                activeCard.classList.remove('activeOpponent');
            }
            cpuNameEl.textContent = '';
            cpuImageEl.src = '';
            cpuImageEl.id = '';
            cpuHealthEl.textContent = '';
            const index = opponentList.findIndex(opponentList => {
                return opponentList.id === Number(opponent.id);
            });
            const defeatedOpponent = opponentList.splice(index, 1);
            defeatedOpponents.push(defeatedOpponent);
            defeatedOpponentCount++;
            defeatedSectionEl.append(opponentOptionEl);
            displayOpponentList();
        }

    }
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
    userHealthEl.innerHTML = `Health: ${userHealth}❤️`;
    cpuHealthEl.innerHTML = `Health: ${cpuHealth}❤️`;
    const index = opponentList.findIndex(opponentList => {
        return opponentList.id === Number(cpuImageEl.id);
    });
    opponentList[index].health = cpuHealth;
    displayOpponentList();

});

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

});

function createOpponentObject(opponentName, opponentShortName) {
    return { id: opponentList.length,
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