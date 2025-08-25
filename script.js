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
    space: 1,
    number: 1
};
let computer = {
    name: "Computer",
    hand: [],
    tableau: [],
    space: 8,
    number: 8
}
let deck = [];
let dealStartingHandsBtn = document.querySelector(".js_deal-starting-hands");
// let faceUpSelect = document.querySelector(".js_face-up");
// let faceDownSelect = document.querySelector(".js_face-down");
// let submitBtn = document.querySelector(".js_submit");
let actions = document.querySelector(".actions");
let instructions = document.querySelector(".actions__instructions");
let humanSpace = 1;
let computerSpace = 8;
let isHumanTurn = true;
let isFaceUpSelected = false;
let isFaceDownSelected = false;

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
    startTurn();
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
    // faceUpSelect.innerHTML = "";
    // faceDownSelect.innerHTML = "";

    console.log("-Appending cards-");
    for (let i = 0; i < hand.length; i++) {
        let agentName = hand[i];
        agentName = agentName.toLowerCase();
        agentName = agentName.replaceAll(" ", "-");

        let div = document.createElement('div');
        div.innerHTML = `
            <div class="hand__item" data-index="${i}">
                <div class="hand__btns">
                    <button class="btn hand__btn js_hand-btn" data-face="up">Face-Up</button>
                    <button class="btn hand__btn js_hand-btn" data-face="down">Face-Down</button>
                </div>
                <img class="card" src="./img/agent_${agentName}.png" data-name="${hand[i]}">
            </div>
        `;

        handElem.appendChild(div);

        // let img = document.createElement('img');
        // img.setAttribute('src', `./img/agent_${agentName}.png`);
        // img.setAttribute('data-name', `${hand[i]}`);
        // img.classList.add("card");
        // handElem.appendChild(img);

        let option = document.createElement('option');
        option.setAttribute('value', hand[i]);
        option.setAttribute('data-index', i);
        option.innerText = hand[i];

        let optionCopy = document.createElement('option');
        optionCopy.setAttribute('value', hand[i]);
        optionCopy.setAttribute('data-index', i);
        optionCopy.innerText = hand[i];

        // faceUpSelect.append(option);
        // faceDownSelect.append(optionCopy);
    }
}

function startTurn() {
    if (isHumanTurn === true) {
        instructions.textContent = "Choose a card to be placed face-up and face-down."
        actions.style.visibility = "visible";

    }
}

// submitBtn.addEventListener('click', () => {
    // console.log("---SUBMITTING CARDS---");

    // let faceUpElem = faceUpSelect.selectedOptions[0];
    // let faceUpCardIndex = parseInt(faceUpElem.getAttribute('data-index'));
    // let faceUpCardName = faceUpSelect.value;

    // let faceDownElem = faceDownSelect.selectedOptions[0];
    // let faceDownCardIndex = parseInt(faceDownElem.getAttribute('data-index'));
    // let faceDownCardName = faceDownSelect.value;

    // console.log(human.name + "'s hand is:");
    // console.log(human.hand);
    // console.log("Face-up card is " + faceUpCardName + ".");
    // console.log("Face-down card is " + faceDownCardName + ".");

    // if (faceUpCardName === faceDownCardName) {
    //     console.log("Can't choose the same two cards.");
    // } else {
    //     removeCardsFromHand(human, faceUpCardIndex, faceDownCardIndex);
    //     dealCards(human, 2);
    //     displayHand(human);
    //     computerPicksCard(faceUpCardName, faceDownCardName);
    // }

// });

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

    checkIfWin();
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

    if (newSpace > 14) {
        newSpace -= 14;
    }
    if (newSpace < 1) {
        newSpace += 14;
    }

    console.log(player.name + " moves " + number + " spaces.");

    currentSpaceElem.textContent = "";
    let newSpaceElem = document.querySelector(`[data-space="${newSpace}"]`);
    
    newSpaceElem.textContent = player.name;

    player.number += number;
    player.space = newSpace;
}

function checkIfWin() {
    let humanNumber = human.number;
    let computerNumber = computer.number;

    let difference = computer.number - human.number;

    console.log(humanNumber, computerNumber, difference);

    if (difference <= 0 || difference >= 14) {
        console.log("Game over!");
    } else {
        console.log("Game continues!");
    }
}

document.addEventListener('click', function(event) {
  if (event.target.matches('.js_hand-btn')) {
    let buttonClicked = event.target;

    if (buttonClicked.classList.contains("hand__btn--selected")) return;

    let parentElem = buttonClicked.closest(".hand__item");

    let allFaceUpButtons = document.querySelectorAll('[data-face="up"]');
    let allFaceDownButtons = document.querySelectorAll('[data-face="down"]');

    let buttonsToChange = [];

    if (buttonClicked.getAttribute("data-face") === "up") {
        buttonsToChange = allFaceUpButtons;
        isFaceUpSelected = true;
    }
    if (buttonClicked.getAttribute("data-face") === "down") {
        buttonsToChange = allFaceDownButtons;
        isFaceDownSelected = true;
    }

    buttonsToChange.forEach((button) => {
        button.classList.remove("hand__btn--selected");
    });

    let familyButtons = parentElem.querySelectorAll('.hand__btn');
    familyButtons.forEach((button) => {
        button.classList.remove("hand__btn--selected");
    });

    buttonClicked.classList.add("hand__btn--selected");

    checkForSubmit();
  }
});

function checkForSubmit() {
    let selectedCards = document.querySelectorAll(".hand__btn--selected");
    let numberOfSelectedCards = selectedCards.length;

    if (isFaceUpSelected && isFaceDownSelected && numberOfSelectedCards == 2) {
        document.querySelector(".js_player-confirm").style.display = "block";
    } else {
        document.querySelector(".js_player-confirm").style.display = "none";
    }
}