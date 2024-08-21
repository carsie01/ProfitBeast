document.addEventListener('DOMContentLoaded', function () {
    const cardTypes = ["Action", "Resource", "Opportunity", "Challenge", "Special Offer"];
    let currentPlayer = 2; // Start with player 2 (the human player)
    let player1Character, player1Startup, player2Character, player2Startup;
    let player1Cards = [], player2Cards = [];
    let deck = [];
    const discardPile = document.querySelector('.discard-pile');

    const characters = [
        { name: "Visionæren", abilities: ["Markedsprediktion", "Inspirerende lederskab", "Særlig mulighed (ressource)"] },
        { name: "Innovatoren", abilities: ["Hurtig Prototyping", "Patentbeskyttelse", "Særlig mulighed (ressource)"] },
        { name: "Netværkeren", abilities: ["Forbindelsers kraft", "Samarbejdsprojekter", "Særlig mulighed (ressource)"] },
        { name: "Selvstarteren", abilities: ["Frugalitet", "Udholdenhed", "Særlig mulighed (ressource)"] }
    ];

    const startups = [
        { name: "EcoGenix", goal: { marketShare: 90, funding: 1800000 }, specialPower: "Tjen $100.000 ekstra i Finansiering, hver gang du spiller et grønt kort." },
        { name: "MedTech Solutions", goal: { marketShare: 80, funding: 2000000 }, specialPower: "Tjen 10 Markedsandelspoint og $200.000 i Finansiering, når du lykkes i en prøve." },
        { name: "QuickBite", goal: { marketShare: 90, funding: 1000000 }, specialPower: "Få 5 ekstra Markedsandelspoint, når du tilfredsstiller en kunde." },
        { name: "Learnify", goal: { marketShare: 100, funding: 900000 }, specialPower: "Træk et ekstra kort, når du lancerer et nyt kursus." }
    ];

    // Show the game rules
    document.getElementById('game-rules').addEventListener('click', showRules);
    function showRules() {
        alert("Game Rules:\n1. Each player draws a Character and StartUp card...\n(Expand with the full rules as needed)");
    }

    // Function to draw a card from the deck
    function drawCard() {
        if (deck.length > 0) {
            return deck.pop(); // Draw the top card from the deck
        } else {
            alert("The deck is empty!");
            return null;
        }
    }

    // Function to initialize the game
    function initializeGame() {
        // Shuffle the deck
        deck = shuffleDeck([...cardTypes, ...cardTypes, ...cardTypes, ...cardTypes, ...cardTypes, "Special Offer", "Special Offer"]);

        // Draw initial character and startup cards
        player1Character = characters[Math.floor(Math.random() * characters.length)];
        player1Startup = startups[Math.floor(Math.random() * startups.length)];
        player2Character = characters[Math.floor(Math.random() * characters.length)];
        player2Startup = startups[Math.floor(Math.random() * startups.length)];

        // Display initial character and startup cards
        alert(`Player 1 Character: ${player1Character.name}, Startup: ${player1Startup.name}`);
        alert(`Computer Character: ${player2Character.name}, Startup: ${player2Startup.name}`);

        // Draw initial 5 cards for both players
        for (let i = 0; i < 5; i++) {
            player1Cards.push(drawCard());
            player2Cards.push(drawCard());
        }

        renderCards('.player1', player2Cards);
        renderCards('.player2', player1Cards);
    }

    // Discard a card with a slide-in effect towards the discard pile
    function discardCard(cardElement, player) {
        const discardPosition = discardPile.getBoundingClientRect();
        const cardPosition = cardElement.getBoundingClientRect();
        const translateX = discardPosition.left - cardPosition.left;
        const translateY = discardPosition.top - cardPosition.top;

        cardElement.style.transform = `translate(${translateX}px, ${translateY}px)`;
        cardElement.style.opacity = "0";

        setTimeout(() => {
            discardPile.textContent = `DISCARD PILE: ${cardElement.textContent}`;

            if (player === 'player') {
                const cardIndex = player1Cards.indexOf(cardElement.textContent);
                player1Cards.splice(cardIndex, 1); // Remove the card from the player's hand
                const newCard = drawCard();
                if (newCard) {
                    player1Cards.push(newCard); // Draw a new card to replace it
                }
                renderCards('.player2', player1Cards); // Re-render the player's cards
            } else if (player === 'computer') {
                const cardIndex = player2Cards.indexOf(cardElement.textContent);
                player2Cards.splice(cardIndex, 1); // Remove the card from the computer's hand
                const newCard = drawCard();
                if (newCard) {
                    player2Cards.push(newCard); // Draw a new card to replace it
                }
                renderCards('.player1', player2Cards); // Re-render the computer's cards
            }

            cardElement.style.transform = "translate(0, 0)";
            cardElement.style.opacity = "1";
            switchTurn(); // Switch turns after the current player discards a card
        }, 300);
    }

    // Update card color based on type
    function updateCardColor(cardElement, cardType) {
        switch (cardType) {
            case "Action":
                cardElement.style.backgroundColor = "#83E8FF";
                break;
            case "Resource":
                cardElement.style.backgroundColor = "#E394A8";
                break;
            case "Opportunity":
                cardElement.style.backgroundColor = "#BDDD97";
                break;
            case "Challenge":
                cardElement.style.backgroundColor = "#CE94D5";
                break;
            case "Special Offer":
                cardElement.style.backgroundColor = "#E0DA68";
                break;
            default:
                cardElement.style.backgroundColor = "#fff";
        }
    }

    // Function to switch turns
    function switchTurn() {
        currentPlayer = currentPlayer === 1 ? 2 : 1; // Toggle between player 1 and player 2
        if (currentPlayer === 1) {
            // Computer's turn (Player 1)
            setTimeout(computerTurn, 1000); // Give a short delay before computer acts
        }
    }

    // Function for the computer to take its turn (Player 1)
    function computerTurn() {
        const randomCardIndex = Math.floor(Math.random() * player2Cards.length);
        const cardElement = document.querySelectorAll('.player1 .card')[randomCardIndex];
        discardCard(cardElement, 'computer');
    }

    // Add event listeners to player's cards for discarding
    function renderCards(playerClass, cards) {
        const playerRow = document.querySelector(playerClass);
        playerRow.innerHTML = ''; // Clear the current cards
        cards.forEach((cardType, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.textContent = cardType;
            updateCardColor(cardElement, cardType);

            if (currentPlayer === 2 && playerClass === '.player2') {
                cardElement.addEventListener('click', () => {
                    if (currentPlayer === 2) {
                        discardCard(cardElement, 'player');
                    } else {
                        alert("It's not your turn!");
                    }
                });
            }

            playerRow.appendChild(cardElement);
        });
    }

    // Function to shuffle the deck
    function shuffleDeck(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Draw a card when the "PROFIT BEAST" deck is clicked
    const deckElement = document.querySelector('.profit-beast');
    deckElement.addEventListener('click', () => {
        if (currentPlayer === 2) {
            const newCard = drawCard();
            if (newCard) {
                player1Cards.push(newCard);
                renderCards('.player2', player1Cards);
            }
        } else {
            alert('It\'s not your turn!');
        }
    });

    // Initialize the game when the page loads
    initializeGame();
});
