let agents = [
    {
        name: "Codebreaker",
        quantity: 6,
        one: 0,
        two: 0,
        three: "Win"
    },
    {
        name: "Daredevil",
        quantity: 6,
        one: 2,
        two: 3,
        three: "Lose" 
    },
    {
        name: "Double Agent",
        quantity: 6,
        one: -1,
        two: 6,
        three: -1
    },
    {
        name: "Enforcer",
        quantity: 6,
        one: 1,
        two: 2,
        three: 3
    },
    {
        name: "Mole",
        quantity: 1,
        one: -3,
    },
    {
        name: "Saboteur",
        quantity: 6,
        one: -1,
        two: -1,
        three: -2
    },
    {
        name: "Sentinel",
        quantity: 6,
        one: 0,
        two: 2,
        three: 6
    },
    {
        name: "Sidekick",
        quantity: 1,
        one: 4,

    }
];
let human = {
    name: "Human",
    hand: [],
    tableau: [],
    space: 1
};
let computer = {
    name: "Computer",
    hand: [],
    tableau: [],
    space: 8
}
let deck = [];
let dealStartingHandsBtn = document.querySelector(".js_deal-starting-hands");
let faceUpSelect = document.querySelector(".js_face-up");
let faceDownSelect = document.querySelector(".js_face-down");
let submitBtn = document.querySelector(".js_submit");
let humanSpace = 1;
let computerSpace = 8;

makeDeck();
function makeDeck() {
    agents.forEach(function(agent, index) {
        for (let i = 0; i < agent.quantity; i++) {
            deck.push(agent.name);
        }
    });

    document.querySelector(".js_cards-left").textContent = deck.length;
}

function dealCards(player, numberOfCards) {
    let hand = player.hand;

    for (let i = 0; i < numberOfCards; i++) {
        let randomNumber = Math.floor(Math.random() * deck.length);
        hand.push(deck[randomNumber]);
        deck.splice(randomNumber, 1);
    }

    document.querySelector(".js_cards-left").textContent = deck.length;

    console.log(player.name + " drew " + numberOfCards + " cards. " + player.name + "'s hand is now:");
    console.log(player.hand);
}

function displayHand(player) {
    let handElem = document.querySelector(".js_player-hand");
    let hand = player.hand;

    handElem.innerHTML = "";
    faceUpSelect.innerHTML = "";
    faceDownSelect.innerHTML = "";

    for (let i = 0; i < hand.length; i++) {
        let agentName = hand[i];
        agentName = agentName.toLowerCase();
        agentName = agentName.replaceAll(" ", "-");

        let img = document.createElement('img');
        img.setAttribute('src', `./img/agent_${agentName}.png`);
        img.setAttribute('data-name', `${hand[i]}`);
        img.classList.add("card");
        handElem.appendChild(img);

        let option = document.createElement('option');
        option.setAttribute('value', hand[i]);
        option.innerText = hand[i];
        faceUpSelect.append(option);
        faceDownSelect.append(option);
    }
}

function moveSpaces(player, number) {
    let currentSpace = player.space;
    let currentSpaceElem = document.querySelector(`[data-space="${currentSpace}"]`);
    let newSpace = currentSpace + number;

    if (newSpace > 14) {
        newSpace = newSpace - 14;
    }

    currentSpaceElem.textContent = "";
    let newSpaceElem = document.querySelector(`[data-space="${newSpace}"]`);
    newSpaceElem.textContent = "Human";

    player.space = newSpace;
}

dealStartingHandsBtn.addEventListener('click', () => {
    dealCards(human, 4);
    dealCards(computer, 4);

    displayHand(human);
});

submitBtn.addEventListener('click', () => {
    
});