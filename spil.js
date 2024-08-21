document.addEventListener('DOMContentLoaded', function () {
    // Handle the start screen
    const startButton = document.getElementById('start-button');
    const startScreen = document.getElementById('start-screen');
    const gameContainer = document.getElementById('game-container');

    startButton.addEventListener('click', function() {
        startScreen.style.display = 'none';
        gameContainer.style.display = 'block';
        initializeGame(); // Initialize the game after the start button is clicked
    });

    // Game logic variables
    let playerFunds = 1000000;
    let playerPoints = 0;
    const targetFunding = 1800000;
    const targetPoints = 90;
    const maxHandSize = 5;
    let currentTurn = 0; // Track the number of turns

    let specialOfferTriggered = false;
    let challengeCount = 0;

    // Deck with only Resource and Opportunity cards
    const deck = [
        "Venture Capital", "Supply Chain Issues", "Top Talent", "Office Space",
        "Influencer Partnership", "New Market Entry", "Strategic Partnership",
        "Marketing Campaign"
    ];

    // Define the actions and their effects for each card
    const actions = {
        "Venture Capital": { cost: 0, funding: 500000, points: 0, message: "You secured Venture Capital funding!" },
        "Supply Chain Issues": { cost: 0, funding: 0, points: 2, message: "You resolved Supply Chain Issues!" },
        "Top Talent": { cost: 0, funding: 0, points: 5, message: "You hired Top Talent!" },
        "Office Space": { cost: 200000, funding: 0, points: 5, message: "You upgraded your Office Space!" },
        "Influencer Partnership": { cost: 100000, funding: 100000, points: 10, message: "You formed an Influencer Partnership!" },
        "New Market Entry": { cost: 0, funding: 5000, points: 10, message: "You entered a New Market!" },
        "Strategic Partnership": { cost: 0, funding: 20000, points: 20, message: "You secured a Strategic Partnership!" },
        "Marketing Campaign": { cost: 15000, funding: 0, points: 8, message: "You launched a Marketing Campaign!" }
    };

    // Special Offer actions
    const specialOffers = {
        "Jesper Buch": { cost: 0, funding: 500000, points: 50, message: "Jesper Buch joined! Massive growth!" },
        "Birgit Aaby": { cost: 0, funding: 1000000, points: 0, message: "Birgit Aaby joined! Financial boost!" }
    };

    // Challenge actions
    const challenges = {
        "Market Crash": { cost: 0, funding: -100000, points: -10, message: "Market Crash! You lost funding and market share!" },
        "Supply Chain Issues (Challenge)": { cost: 0, funding: 0, points: -1, message: "Supply Chain Issues! You lost resources." },
        "Competitor Launch": { cost: 0, funding: 0, points: -5, message: "A Competitor Launched, reducing your market share!" },
        "Unexpected Expense": { cost: 10000, funding: -10000, points: 0, message: "Unexpected Expense! You lost some funding." }
    };

    let playerHand = [];

    function initializeGame() {
        // Initialize with 5 cards from the deck
        for (let i = 0; i < maxHandSize; i++) {
            drawCard();
        }
        updateStats();
    }

    document.querySelectorAll('.action-card').forEach(card => {
        card.addEventListener('click', function () {
            const action = this.textContent.trim();
            performAction(action);
        });
    });

    document.getElementById('deck').addEventListener('click', function () {
        if (playerHand.length < maxHandSize) {
            drawCard();
        } else {
            displayMessage("You can only have 5 cards in your hand!");
        }
    });

    function drawCard() {
        currentTurn++; // Increment the turn counter each time a card is drawn
        if (deck.length > 0) {
            const card = deck.pop();
            playerHand.push(card);
            renderHand();
            maybeTriggerSpecialEvent();
        } else {
            displayMessage("The deck is empty!");
        }
    }

    function renderHand() {
        const playerHandContainer = document.getElementById('player-hand');
        playerHandContainer.innerHTML = '';
        playerHand.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'action-card';
            cardElement.textContent = card;
            cardElement.addEventListener('click', function () {
                performAction(card);
            });
            playerHandContainer.appendChild(cardElement);
        });
    }

    function performAction(action) {
        if (actions[action] && playerFunds >= actions[action].cost) {
            playerFunds += actions[action].funding - actions[action].cost;
            playerPoints += actions[action].points;
            removeCardFromHand(action);
            updateStats();
            displayMessage(actions[action].message);
            checkWinCondition();
        } else if (actions[action]) {
            displayMessage("Not enough funds to perform this action!");
        }
    }

    function removeCardFromHand(action) {
        const index = playerHand.indexOf(action);
        if (index > -1) {
            playerHand.splice(index, 1);
            drawCard(); // Draw a new card after playing one
            renderHand(); // Update hand display
        }
    }

    function updateStats() {
        document.getElementById('player-funds').textContent = playerFunds;
        document.getElementById('player-points').textContent = playerPoints;
    }

    function displayMessage(message) {
        document.getElementById('game-messages').textContent = message;
    }

    function checkWinCondition() {
        if (playerFunds >= targetFunding && playerPoints >= targetPoints) {
            displayMessage("Congratulations! You have achieved your startup goals!");
        }
    }

    // Function to randomly trigger special offers or challenges
    function maybeTriggerSpecialEvent() {
        if (currentTurn <= 3) return; // Prevent special events in the first 3 turns

        const randomEvent = Math.random();
        
        if (!specialOfferTriggered && randomEvent < 0.1) { // 10% chance to trigger a special offer
            triggerSpecialOffer();
            specialOfferTriggered = true;
        } else if (challengeCount < 2 && randomEvent < 0.3) { // 30% chance to trigger a challenge
            triggerChallenge();
            challengeCount++;
        }
    }

    function triggerSpecialOffer() {
        const specialOfferKeys = Object.keys(specialOffers);
        const offer = specialOfferKeys[Math.floor(Math.random() * specialOfferKeys.length)];
        const offerDetails = specialOffers[offer];
        
        playerFunds += offerDetails.funding;
        playerPoints += offerDetails.points;
        updateStats();
        alert(offerDetails.message); // Show the special offer as a pop-up
    }

    function triggerChallenge() {
        const challengeKeys = Object.keys(challenges);
        const challenge = challengeKeys[Math.floor(Math.random() * challengeKeys.length)];
        const challengeDetails = challenges[challenge];
        
        playerFunds += challengeDetails.funding;
        playerPoints += challengeDetails.points;
        updateStats();
        alert(challengeDetails.message); // Show the challenge as a pop-up
    }
});
