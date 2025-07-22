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
    console.log("---MAKING DECK---");
    agents.forEach(function(agent, index) {
        for (let i = 0; i < agent.quantity; i++) {
            deck.push(agent.name);
        }
    });

    console.log(deck);

    document.querySelector(".js_cards-left").textContent = deck.length;
}

dealStartingHandsBtn.addEventListener('click', () => {
    dealCards(human, 4);
    dealCards(computer, 4);

    displayHand(human);
});

function dealCards(player, numberOfCards) {
    console.log("---DEALING CARDS---");
    console.log(player.name + " is drawing " + numberOfCards + " cards.");
    let hand = player.hand;

    for (let i = 0; i < numberOfCards; i++) {
        let randomNumber = Math.floor(Math.random() * deck.length);
        hand.push(deck[randomNumber]);
        console.log(player.name + " drew a " + deck[randomNumber]);
        deck.splice(randomNumber, 1);
    }

    document.querySelector(".js_cards-left").textContent = deck.length;

    console.log(player.hand);
    console.log(deck);
}

function displayHand(player) {
    console.log("---UPDATING HANDS---");
    let handElem = document.querySelector(".js_player-hand");
    let hand = player.hand;

    console.log("-Emptying hands-");
    handElem.innerHTML = "";
    faceUpSelect.innerHTML = "";
    faceDownSelect.innerHTML = "";

    console.log("-Appending cards-");
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
        option.setAttribute('data-index', i);
        option.innerText = hand[i];

        let optionCopy = document.createElement('option');
        optionCopy.setAttribute('value', hand[i]);
        optionCopy.setAttribute('data-index', i);
        optionCopy.innerText = hand[i];

        faceUpSelect.append(option);
        faceDownSelect.append(optionCopy);
    }
}

submitBtn.addEventListener('click', () => {
    console.log("---SUBMITTING CARDS---");

    let faceUpElem = faceUpSelect.selectedOptions[0];
    let faceUpCardIndex = parseInt(faceUpElem.getAttribute('data-index'));
    let faceUpCardName = faceUpSelect.value;

    let faceDownElem = faceDownSelect.selectedOptions[0];
    let faceDownCardIndex = parseInt(faceDownElem.getAttribute('data-index'));
    let faceDownCardName = faceDownSelect.value;

    console.log(human.name + "'s hand is:");
    console.log(human.hand);
    console.log("Face-up card is " + faceUpCardName + ".");
    console.log("Face-down card is " + faceDownCardName + ".");

    if (faceUpCardName === faceDownCardName) {
        console.log("Can't choose the same two cards.");
    } else {
        removeCardsFromHand(human, faceUpCardIndex, faceDownCardIndex);
        dealCards(human, 2);
        displayHand(human);
        computerPicksCard(faceUpCardName, faceDownCardName);
    }

});

function removeCardsFromHand(player, faceUpCardIndex, faceDownCardIndex) {
    if (faceUpCardIndex > faceDownCardIndex) {
        player.hand.splice(faceUpCardIndex, 1);
        player.hand.splice(faceDownCardIndex, 1);
    }
    if (faceDownCardIndex > faceUpCardIndex) {
        player.hand.splice(faceDownCardIndex, 1);
        player.hand.splice(faceUpCardIndex, 1);
    }

    // player.hand.forEach(function(agent, index) {
    //     for (let i = 0; i < player.hand.length; i++) {
    //         if (agent === cardOne) {
    //             console.log("Removing " + player.hand[i] + " from hand.");
    //             player.hand.splice(i, 1);
    //             break;
    //         }
    //     }
    // });

    // player.hand.forEach(function(agent, index) {
    //     for (let i = 0; i < player.hand.length; i++) {
    //         if (agent === cardTwo) {
    //             console.log("Removing " + player.hand[i] + " from hand.");
    //             player.hand.splice(i, 1);
    //             break;
    //         }
    //     }
    // });
    
}

function computerPicksCard(faceUpCard, faceDownCard) {
    let randomNumber = Math.floor(Math.random() * (2 - 1 + 1) + 1);
    let pickedCard = randomNumber === 1 ? faceUpCard : faceDownCard;
    let otherCard = "";

    if (pickedCard === faceUpCard) {
        otherCard = faceDownCard;
    }
    if (pickedCard === faceDownCard) {
        otherCard = faceUpCard;
    }

    console.log("Computer takes " + pickedCard + ".");
    console.log("Human gets " + otherCard + ".");

    addToTableau(human, otherCard);
    addToTableau(computer, pickedCard);
}

function addToTableau(player, pickedCard) {
    let count = 0;
    let movement = 0;

    player.tableau.push(pickedCard);
    console.log(player.tableau);

    for (let i = 0; i < player.tableau.length; i++) {
        if (player.tableau[i] === pickedCard) {
            count++;
        }
    }

    let cardObject = {};
    agents.forEach(function(agent, index) {
        if (agent.name === pickedCard) {
            cardObject = agent;
        }
    });

    if (count === 1) {
        movement = cardObject.one;
    }
    if (count === 2) {
        movement = cardObject.two;
    }
    if (count >= 3) {
        movement = cardObject.three;
    }
    
    switch (count) {
        case 1:
            movement = cardObject.one;
            break;
        case 2:
            movement = cardObject.two;
            break;
        case 3:
            if (typeof cardObject.three === "number") {
                movement = cardObject.three;
            } else {
                console.log("Game over! " + cardObject.three + ".");
            }
            break;
        default:
            console.log("Shouldn't be seeing this...");
    }

    moveSpaces(player, movement);
}

function moveSpaces(player, number) {
    let currentSpace = player.space;
    let currentSpaceElem = document.querySelector(`[data-space="${currentSpace}"]`);
    let newSpace = currentSpace + number;

    console.log(number);
    console.log(currentSpace);
    console.log(newSpace);

    if (newSpace > 14) {
        newSpace -= 14;
    }
    if (newSpace < 1) {
        newSpace += 14;
    }

    currentSpaceElem.textContent = "";
    let newSpaceElem = document.querySelector(`[data-space="${newSpace}"]`);
    newSpaceElem.textContent = player.name;

    player.space = newSpace;
}