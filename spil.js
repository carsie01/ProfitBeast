document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('start-button');
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const characterCardDisplay = document.getElementById('character-card');
    const startupCardDisplay = document.getElementById('startup-card');
    const scenarioTitle = document.getElementById('scenario-title');
    const scenarioDescription = document.getElementById('scenario-description');
    const choicesContainer = document.getElementById('choices-container');
    const pointsDisplay = document.getElementById('points');
    const nextButton = document.getElementById('next-button');

    let points = 0;
    let currentScenario = 0;

    const characterCard = "Visionary";  // Placeholder: Assign based on user selection or random draw
    const startupCard = "GreenTech Solutions";  // Placeholder: Assign based on user selection or random draw

    const scenarios = [
        {
            title: "Scenarie 1",
            description: "Du overvejer, hvordan du bedst kan validere din prototype på markedet.",
            choices: [
                { image: "Group-64.png", points: 10 },
                { image: "choice1b.jpg", points: 5 },
                { image: "choice1c.jpg", points: 7 },
                { image: "choice1d.jpg", points: 15 },
                { image: "choice1e.jpg", points: 8 }
            ]
        },
        {
            title: "Scenarie 2",
            description: "Du har mulighed for at deltage i en startup accelerator.",
            choices: [
                { image: "choice2a.jpg", points: 20 },
                { image: "choice2b.jpg", points: 10 },
                { image: "choice2c.jpg", points: 5 },
                { image: "choice2d.jpg", points: 15 },
                { image: "choice2e.jpg", points: 8 }
            ]
        },
        // Add the remaining scenarios here...
    ];
    startButton.addEventListener('click', function () {
        startScreen.style.display = 'none';
        gameScreen.style.display = 'block';
        startGame();
    });

    function startGame() {
        characterCardDisplay.textContent = characterCard;
        startupCardDisplay.textContent = startupCard;
        loadScenario();
    }

    function loadScenario() {
        const scenario = scenarios[currentScenario];
        scenarioTitle.textContent = scenario.title;
        scenarioDescription.textContent = scenario.description;
        choicesContainer.innerHTML = ''; // Clear previous choices
    
        scenario.choices.forEach((choice, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
    
            // Set the background image based on the choice
            cardElement.style.backgroundImage = `url('images/${choice.image}')`;
    
            // Adjust points based on character and startup
            let adjustedPoints = choice.points;
            if (characterCard === "Visionary" && scenario.title === "Scenarie 1") {
                adjustedPoints += 2; // Example bonus for Visionary on Scenario 1
            }
            if (startupCard === "GreenTech Solutions" && scenario.title === "Scenarie 2") {
                adjustedPoints += 3; // Example bonus for GreenTech on Scenario 2
            }
    
            cardElement.addEventListener('click', function () {
                points += adjustedPoints;
                pointsDisplay.textContent = points;
                nextScenario(); // Automatically load the next scenario after a choice is made
            });
            choicesContainer.appendChild(cardElement);
        });
    }
    

    function nextScenario() {
        currentScenario++;
        if (currentScenario < scenarios.length) {
            loadScenario();
        } else {
            endGame();
        }
    }

    function endGame() {
        gameScreen.innerHTML = `<h2>Game Over</h2><p>You scored ${points} points.</p>`;
        if (points >= 100) {
            gameScreen.innerHTML += "<p>Congratulations! You successfully built GreenTech Solutions!</p>";
        } else {
            gameScreen.innerHTML += "<p>Unfortunately, you did not accumulate enough points to succeed. Try again!</p>";
        }
    }
});
