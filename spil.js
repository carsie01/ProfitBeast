document.addEventListener('DOMContentLoaded', function () {
    // Handle the start screen
    const startButton = document.getElementById('start-button');
    const startScreen = document.getElementById('start-screen');
    const gameContainer = document.getElementById('game-container');
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const closeModalButton = document.getElementById('close-modal');

    startButton.addEventListener('click', function() {
        startScreen.style.display = 'none';
        gameContainer.style.display = 'block';
        initializeGame(); // Initialize the game after the start button is clicked
    });

    closeModalButton.addEventListener('click', function() {
        modal.style.display = 'none'; // Close the modal when the close button is clicked
    });

    // Close the modal if the user clicks anywhere outside of the modal content
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Game logic variables
    let playerFunds = 500000; // Reduced initial funding
    let playerPoints = 0;
    const targetFunding = 3000000; // Increased target funding
    const targetPoints = 150;       // Increased target market share points
    const maxHandSize = 5;
    let currentTurn = 0; // Track the number of turns

    let specialOfferTriggered = false;
    let challengeCount = 0;
    let characterBonusUsed = false; // To limit the usage of character bonuses

    // Assume these are the selected character and startup cards
    const playerCharacter = "Visionary";  // Example: "Visionary", "Innovator", "Networker", "Bootstrapper"
    const playerStartup = "EcoGenix";     // Example: "EcoGenix", "MedTech Solutions", "QuickBite", "Learnify"

    // Deck with limited powerful cards to encourage strategic play
    const deck = [
        "Venture Capital", "Supply Chain Issues", "Top Talent", "Office Space",
        "Influencer Partnership", "New Market Entry", "Strategic Partnership",
        "Marketing Campaign",
        // Repeat some cards to ensure there's enough for the game, but limited powerful cards
        "Venture Capital", "Top Talent", "Strategic Partnership", "Marketing Campaign",
        "Office Space", "New Market Entry"
    ];

    // Define the actions and their effects for each card
    const actions = {
        "Venture Capital": { cost: 0, funding: 300000, points: 0, message: "You secured Venture Capital funding!" }, // Reduced funding
        "Supply Chain Issues": { cost: 0, funding: 0, points: 1, message: "You resolved Supply Chain Issues!" }, // Reduced points
        "Top Talent": { cost: 0, funding: 0, points: 3, message: "You hired Top Talent!" }, // Reduced points
        "Office Space": { cost: 250000, funding: 0, points: 3, message: "You upgraded your Office Space!" }, // Increased cost, reduced points
        "Influencer Partnership": { cost: 150000, funding: 50000, points: 5, message: "You formed an Influencer Partnership!" }, // Reduced funding and points
        "New Market Entry": { cost: 0, funding: 3000, points: 7, message: "You entered a New Market!" }, // Reduced points and funding
        "Strategic Partnership": { cost: 0, funding: 10000, points: 15, message: "You secured a Strategic Partnership!" }, // Reduced points
        "Marketing Campaign": { cost: 25000, funding: 0, points: 6, message: "You launched a Marketing Campaign!" } // Increased cost, reduced points
    };

    // Special Offer actions
    const specialOffers = {
        "Jesper Buch": { cost: 0, funding: 400000, points: 40, message: "Jesper Buch joined! Massive growth!" }, // Slightly reduced benefits
        "Birgit Aaby": { cost: 0, funding: 800000, points: 0, message: "Birgit Aaby joined! Financial boost!" } // Slightly reduced benefits
    };

    // Challenge actions (chance of challenges slightly increased)
    const challenges = {
        "Market Crash": { cost: 0, funding: -200000, points: -15, message: "Market Crash! You lost funding and market share!" },
        "Supply Chain Issues (Challenge)": { cost: 0, funding: 0, points: -2, message: "Supply Chain Issues! You lost resources." },
        "Competitor Launch": { cost: 0, funding: 0, points: -8, message: "A Competitor Launched, reducing your market share!" },
        "Unexpected Expense": { cost: 20000, funding: -20000, points: 0, message: "Unexpected Expense! You lost some funding." }
    };

    let playerHand = [];

    // Function to initialize the game
    function initializeGame() {
        // Initialize with 5 cards from the deck
        for (let i = 0; i < maxHandSize; i++) {
            drawCard(false); // Don't count these initial draws as turns
        }
        currentTurn = 1; // Start counting turns after the initial hand is dealt
        updateStats();
    }

    // Function to draw a card from the deck
    function drawCard(countAsTurn) {
        if (countAsTurn) currentTurn++; // Increment the turn counter if this draw counts as a turn
        if (deck.length > 0) {
            const card = deck.pop();
            playerHand.push(card);
            renderHand();
            if (countAsTurn) maybeTriggerSpecialEvent(); // Only trigger events if this draw counts as a turn
        } else {
            if (!checkWinCondition()) {
                displayMessage("You have run out of cards and failed to meet your goals. Game over.");
                // Optionally, reset the game or show a restart option
            }
        }
    }

    function renderHand() {
        const playerHandContainer = document.getElementById('player-hand');
        playerHandContainer.innerHTML = ''; // Clear the current hand
        playerHand.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            updateCardBackground(cardElement, card); // Set the background image based on the card type
            cardElement.addEventListener('click', function () {
                performAction(card);
            });
            playerHandContainer.appendChild(cardElement);
        });
    }
    
    function updateCardBackground(cardElement, cardType) {
        // Set the background image based on the card type
        switch (cardType) {
            case "Venture Capital":
                cardElement.style.backgroundImage = "url('Images/Group-64.png')";
                break;
            case "Supply Chain Issues":
                cardElement.style.backgroundImage = "url('images/supply_chain_issues.jpg')";
                break;
            case "Top Talent":
                cardElement.style.backgroundImage = "url('images/top_talent.jpg')";
                break;
            case "Office Space":
                cardElement.style.backgroundImage = "url('images/office_space.jpg')";
                break;
            case "Influencer Partnership":
                cardElement.style.backgroundImage = "url('images/influencer_partnership.jpg')";
                break;
            case "New Market Entry":
                cardElement.style.backgroundImage = "url('images/new_market_entry.jpg')";
                break;
            case "Strategic Partnership":
                cardElement.style.backgroundImage = "url('images/strategic_partnership.jpg')";
                break;
            case "Marketing Campaign":
                cardElement.style.backgroundImage = "url('images/marketing_campaign.jpg')";
                break;
            default:
                cardElement.style.backgroundImage = "none"; // No image for unknown card types
                cardElement.style.backgroundColor = "#fff"; // Default color for unknown cards
        }
    }
    
    // Function to perform the action of a card
    function performAction(action) {
        if (actions[action] && playerFunds >= actions[action].cost) {
            let fundingBonus = 0;
            let pointsBonus = 0;

            // Apply character-specific bonuses (limited usage)
            if (!characterBonusUsed) {
                switch (playerCharacter) {
                    case "Visionary":
                        if (action === "Marketing Campaign") pointsBonus = 1;
                        break;
                    case "Innovator":
                        if (action === "Supply Chain Issues") pointsBonus = 2;
                        break;
                    case "Networker":
                        if (action === "Strategic Partnership") pointsBonus = 3;
                        break;
                    case "Bootstrapper":
                        if (action === "Top Talent") pointsBonus = 2;
                        break;
                }
                characterBonusUsed = true; // Only allow the bonus to be used once per game
            }

            // Apply startup-specific bonuses (always active)
            switch (playerStartup) {
                case "EcoGenix":
                    if (action === "Marketing Campaign") fundingBonus = 100000;
                    break;
                case "MedTech Solutions":
                    if (action === "New Market Entry") {
                        pointsBonus = 3;
                        fundingBonus = 5000;
                    }
                    break;
                case "QuickBite":
                    if (action === "Influencer Partnership") pointsBonus = 5;
                    break;
                case "Learnify":
                    if (action === "Strategic Partnership") {
                        pointsBonus = 2;
                        fundingBonus = 20000;
                    }
                    break;
            }

            // Update player stats with bonuses
            playerFunds += actions[action].funding + fundingBonus - actions[action].cost;
            playerPoints += actions[action].points + pointsBonus;

            removeCardFromHand(action);
            updateStats();
            displayMessage(actions[action].message);
            checkWinCondition();
        } else if (actions[action]) {
            displayMessage("Not enough funds to perform this action!");
        }
    }

    // Function to remove a card from the player's hand
    function removeCardFromHand(action) {
        const index = playerHand.indexOf(action);
        if (index > -1) {
            playerHand.splice(index, 1);
            drawCard(true); // Draw a new card after playing one and count it as a turn
            renderHand(); // Update hand display
        }
    }

    // Function to update the player's stats
    function updateStats() {
        document.getElementById('player-funds').textContent = playerFunds;
        document.getElementById('player-points').textContent = playerPoints;
    }

    // Function to display a message to the player
    function displayMessage(message) {
        document.getElementById('game-messages').textContent = message;
    }

    // Function to check if the player has won the game or lost the game
    function checkWinCondition() {
        if (playerFunds >= targetFunding && playerPoints >= targetPoints) {
            displayMessage("Congratulations! You have achieved your startup goals!");
            return true; // Win condition met
        }
        if (deck.length === 0 && playerHand.length === 0 && (playerFunds < targetFunding || playerPoints < targetPoints)) {
            displayMessage("You have run out of cards and failed to meet your goals. Game over.");
            return true; // Lose condition met
        }
        return false; // Neither win nor lose condition met
    }

    // Function to randomly trigger special offers or challenges
    function maybeTriggerSpecialEvent() {
        if (currentTurn <= 3) return; // Prevent special events in the first 3 full turns

        const randomEvent = Math.random();
        
        if (!specialOfferTriggered && randomEvent < 0.1) { // 10% chance to trigger a special offer
            triggerSpecialOffer();
            specialOfferTriggered = true;
        } else if (challengeCount < 2 && randomEvent < 0.35) { // Increased chance to trigger a challenge
            triggerChallenge();
            challengeCount++;
        }
    }

    // Function to trigger a special offer
    function triggerSpecialOffer() {
        const specialOfferKeys = Object.keys(specialOffers);
        const offer = specialOfferKeys[Math.floor(Math.random() * specialOfferKeys.length)];
        const offerDetails = specialOffers[offer];
        
        showModal(offerDetails.message); // Show the special offer as a modal
        playerFunds += offerDetails.funding;
        playerPoints += offerDetails.points;
        updateStats();
    }

    // Function to trigger a challenge
    function triggerChallenge() {
        const challengeKeys = Object.keys(challenges);
        const challenge = challengeKeys[Math.floor(Math.random() * challengeKeys.length)];
        const challengeDetails = challenges[challenge];
        
        showModal(challengeDetails.message); // Show the challenge as a modal
        playerFunds += challengeDetails.funding;
        playerPoints += challengeDetails.points;
        updateStats();
    }

    // Function to show content in the modal
    function showModal(content) {
        modalBody.innerHTML = `<p>${content}</p>`; // Insert the content into the modal body
        modal.style.display = 'block'; // Display the modal
    }
});

