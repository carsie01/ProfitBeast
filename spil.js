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

    let points = 0;
    let currentScenario = 0;

    const characterCard = "karakter.png";  // Image file for character card
    const startupCard = "virksomhed.png";  // Image file for startup card

    const scenarios = [ 
        {
            title: "Produktudvikling",
            description: "Din prototype har brug for yderligere udvikling for at kunne skalere.",
            choices: [
                { 
                    image: "s1-p1.png", 
                    points: 15, 
                    feedback: "Brug de tekniske eksperter i teamet til at forbedre prototypen." 
                },
                { 
                    image: "s1-p2.png", 
                    points: -5, 
                    feedback: "Outsource udviklingen til en ekstern udvikler." 
                },
                { 
                    image: "s1-p3.png", 
                    points: 12, 
                    feedback: "Test prototypen med tidlige kunder og tilpas efter deres feedback." 
                },
                { 
                    image: "s1-p4.png", 
                    points: 10, 
                    feedback: "Brug mentorens erfaring til at identificere de vigtigste udviklingsområder." 
                },
                { 
                    image: "s1-p5.png", 
                    points: 8, 
                    feedback: "Invester en del af din kapital i nye værktøjer til udvikling." 
                }
            ]
        },
        // Flere scenarier kan tilføjes her...
    ];

    startButton.addEventListener('click', function () {
        startScreen.style.display = 'none';
        gameScreen.style.display = 'block';
        startGame();
    });

    function startGame() {
        // Indsæt billederne for karakterkort og virksomheds kort
        characterCardDisplay.innerHTML = `<img src="images/${characterCard}" alt="Character Card" style="width: 100%; height: auto;">`;
        startupCardDisplay.innerHTML = `<img src="images/${startupCard}" alt="Startup Card" style="width: 100%; height: auto;">`;
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
            cardElement.style.backgroundImage = `url('images/${choice.image}')`;

            cardElement.addEventListener('click', function () {
                points += choice.points;
                pointsDisplay.textContent = points;
                alert(choice.feedback); // Show feedback after selection
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
