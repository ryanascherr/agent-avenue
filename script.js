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
let deck = [];
let dealStartingHandsBtn = document.querySelector(".js_deal-starting-hands");
let playerHand = [];
let computerHand = [];

makeDeck();
function makeDeck() {
    agents.forEach(function(agent, index) {
        for (let i = 0; i < agent.quantity; i++) {
            deck.push(agent.name);
        }
    });

    document.querySelector(".js_cards-left").textContent = deck.length;
}

dealStartingHandsBtn.addEventListener('click', () => {
    dealCards(playerHand, 4);
    dealCards(computerHand, 4);
});

function dealCards(hand, numberOfCards) {

    for (let i = 0; i < numberOfCards; i++) {
        let randomNumber = Math.floor(Math.random() * deck.length);
        hand.push(deck[randomNumber]);
        deck.splice(randomNumber, 1);
    }

    document.querySelector(".js_cards-left").textContent = deck.length;
}