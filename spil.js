// Initial game state
const gameState = {
    player: {
        funds: 10000,
        marketShare: 100,
        cards: []
    },
    computer: {
        funds: 10000,
        marketShare: 100,
        cards: []
    },
    deck: [],
    discardPile: []
};

// Function to initialize the game
function initializeGame() {
    console.log('Initializing game...');
    // Setup initial deck and shuffle
    setupDeck();
    shuffleDeck();
    
    // Draw initial cards for player and computer
    drawInitialCards();
    
    // Render initial game state
    updateUI();
}

// Function to setup deck
function setupDeck() {
    gameState.deck.push({ type: 'resource', effect: 'Venture Capital', value: 500000 });
    gameState.deck.push({ type: 'resource', effect: 'Supply Chain Issues', value: 2 });
    gameState.deck.push({ type: 'action', effect: 'BOOST' });
    gameState.deck.push({ type: 'action', effect: 'BLOCK' });
    gameState.deck.push({ type: 'action', effect: 'STEAL' });
    gameState.deck.push({ type: 'opportunity', effect: 'INFLUENCER PARTNERSHIP', value: { marketShare: 10, funds: 10000 } });
    gameState.deck.push({ type: 'opportunity', effect: 'NEW MARKET ENTRY', value: { marketShare: 10, draw: 1 } });
    gameState.deck.push({ type: 'challenge', effect: 'Market Crash', value: -10 });
    gameState.deck.push({ type: 'special', effect: 'Jesper Buch', value: { marketShare: 50, funds: 500000 } });
    // Add more cards as needed...
}

// Function to shuffle the deck
function shuffleDeck() {
    // Implement Fisher-Yates shuffle algorithm
    for (let i = gameState.deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [gameState.deck[i], gameState.deck[j]] = [gameState.deck[j], gameState.deck[i]];
    }
}

// Function to draw initial cards for both players
function drawInitialCards() {
    for (let i = 0; i < 5; i++) {
        gameState.player.cards.push(gameState.deck.pop());
        gameState.computer.cards.push(gameState.deck.pop());
    }
}

// Function to apply the effect of a card
function applyCardEffect(card, player) {
    switch (card.type) {
        case 'resource':
            player.funds += card.value;
            break;
        case 'opportunity':
            player.marketShare += card.value.marketShare;
            player.funds += card.value.funds || 0;
            if (card.value.draw) {
                drawCard(player);
            }
            break;
        case 'challenge':
            player.marketShare += card.value;
            break;
        case 'action':
            handleActionCard(card, player);
            break;
        case 'special':
            player.marketShare += card.value.marketShare;
            player.funds += card.value.funds;
            break;
    }
    updateUI();
}

// Function to handle action cards
function handleActionCard(card, player) {
    switch (card.effect) {
        case 'BOOST':
            player.boosted = true;
            break;
        case 'BLOCK':
            blockOpponentLastMove();
            break;
        case 'STEAL':
            stealCardFromOpponent(player);
            break;
    }
}

// Function to block the opponent's last move
function blockOpponentLastMove() {
    console.log("Opponent's last move blocked!");
}

// Function to steal a card from the opponent
function stealCardFromOpponent(player) {
    const opponent = (player === gameState.player) ? gameState.computer : gameState.player;
    if (opponent.cards.length > 0) {
        const stolenCard = opponent.cards.pop();
        player.cards.push(stolenCard);
        console.log("Stole a card from the opponent!");
    }
}

// Function to render cards with interaction only for the player
function renderCards(elementId, cards, player) {
    const cardRow = document.getElementById(elementId);
    cardRow.innerHTML = ''; // Clear current cards
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card-back');
        cardElement.innerText = card.effect; // Display the effect or name of the card

        // Apply different background colors based on card type
        switch (card.type) {
            case 'resource':
                cardElement.style.backgroundColor = '#FFDDC1'; // Light orange for resource cards
                break;
            case 'opportunity':
                cardElement.style.backgroundColor = '#C1FFD7'; // Light green for opportunity cards
                break;
            case 'action':
                cardElement.style.backgroundColor = '#C1D4FF'; // Light blue for action cards
                break;
            case 'challenge':
                cardElement.style.backgroundColor = '#FFD1C1'; // Light red for challenge cards
                break;
            case 'special':
                cardElement.style.backgroundColor = '#F3FFC1'; // Light yellow for special cards
                break;
        }

        // Only allow the player to click on their own cards
        if (player === gameState.player) {
            cardElement.onclick = () => playCard(index, player);
        }

        cardRow.appendChild(cardElement);
    });
}

// Function to play a card
function playCard(cardIndex, player) {
    if (player !== gameState.player) return; // Prevent AI from playing cards through clicks

    const card = player.cards.splice(cardIndex, 1)[0]; // Remove the card from player's hand
    applyCardEffect(card, player); // Apply its effect
    drawCard(player); // Draw a new card to replace it
    endTurn(); // End the turn and pass control to the AI
}

// Function to draw a card
function drawCard(player) {
    if (gameState.deck.length > 0) {
        const newCard = gameState.deck.pop();
        player.cards.push(newCard);
    }
}

// Function to update the UI based on the game state
function updateUI() {
    document.getElementById('player-funds').innerText = gameState.player.funds;
    document.getElementById('player-points').innerText = gameState.player.marketShare;
    document.getElementById('computer-funds').innerText = gameState.computer.funds;
    document.getElementById('computer-points').innerText = gameState.computer.marketShare;

    renderCards('player-cards', gameState.player.cards, gameState.player);
    renderCards('computer-cards', gameState.computer.cards, gameState.computer);
}

// Function to handle the end of a turn and initiate AI's turn
function endTurn() {
    checkForWinner(); // Check if the game has been won before AI's turn

    // AI's turn
    setTimeout(() => {
        const aiCardIndex = Math.floor(Math.random() * gameState.computer.cards.length);
        const aiCard = gameState.computer.cards.splice(aiCardIndex, 1)[0];
        applyCardEffect(aiCard, gameState.computer); // AI plays its card
        drawCard(gameState.computer); // AI draws a new card
        updateUI(); // Update UI after AI's turn

        checkForWinner(); // Check if the game has been won after AI's turn
    }, 1000); // Delay for AI to play, simulating thinking time
}

// Function to check for a winner
function checkForWinner() {
    if (gameState.player.marketShare >= 100 || gameState.player.funds >= 1800000) {
        alert('Player 1 wins!');
        resetGame();
    } else if (gameState.computer.marketShare >= 100 || gameState.computer.funds >= 1800000) {
        alert('Computer wins!');
        resetGame();
    }
}

// Function to reset the game
function resetGame() {
    gameState.player.funds = 10000;
    gameState.player.marketShare = 100;
    gameState.computer.funds = 10000;
    gameState.computer.marketShare = 100;
    setupDeck();
    shuffleDeck();
    drawInitialCards();
    updateUI();
}

// Initialize the game when the page loads
window.onload = initializeGame;
