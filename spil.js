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

    const characterCard = "Karakter kort";  // Placeholder: Assign based on user selection or random draw
    const startupCard = "Virksomhed";  // Placeholder: Assign based on user selection or random draw

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
        {
            title: "Marketingstrategi",
            description: "Du skal beslutte, hvordan du bedst markedsfører din prototype.",
            choices: [
                { 
                    image: "choice2a.jpg", 
                    points: 15, 
                    feedback: "Udnyt marketing specialisten i dit team til at skabe en målrettet kampagne." 
                },
                { 
                    image: "choice2b.jpg", 
                    points: -10, 
                    feedback: "Hyr et eksternt marketingbureau til at hjælpe med strategien." 
                },
                { 
                    image: "choice2c.jpg", 
                    points: 12, 
                    feedback: "Brug dit netværk til at skabe partnerskaber, der kan fremme din markedsføring. " 
                },
                { 
                    image: "choice2d.jpg", 
                    points: 10, 
                    feedback: "Lav en budgetvenlig online kampagne ved hjælp af sociale medier." 
                },
                { 
                    image: "choice2e.jpg", 
                    points: 5, 
                    feedback: "Brug kapitalen til at købe annonceplads i relevante medier." 
                }
            ]
        },
        {
            title: "Forretningsudvikling",
            description: "Du overvejer, hvordan du bedst kan udvide din forretning.",
            choices: [
                { 
                    image: "choice3a.jpg", 
                    points: 15, 
                    feedback: "Brug dit netværk til at finde potentielle samarbejdspartnere." 
                },
                { 
                    image: "choice3b.jpg", 
                    points: 10, 
                    feedback: "Fokusér på at skalere organisk gennem nuværende kunder." 
                },
                { 
                    image: "choice3c.jpg", 
                    points: 8, 
                    feedback: "Invester i at rekruttere flere medlemmer til teamet." 
                },
                { 
                    image: "choice3d.jpg", 
                    points: 5, 
                    feedback: "Brug kapitalen til at købe mindre konkurrenter." 
                },
                { 
                    image: "choice3e.jpg", 
                    points: 12, 
                    feedback: "Konsulter med din mentor for at udvikle en ekspansionsstrategi." 
                }
            ]
        },
        {
            title: "Kundefeedback",
            description: "Du har modtaget blandet feedback fra dine tidlige brugere.",
            choices: [
                { 
                    image: "choice4a.jpg", 
                    points: 12, 
                    feedback: "Indsaml mere feedback gennem dit netværk for at få flere data. " 
                },
                { 
                    image: "choice4b.jpg", 
                    points: 12, 
                    feedback: "Brug feedbacken til at foretage hurtige justeringer på prototypen." 
                },
                { 
                    image: "choice4c.jpg", 
                    points: -10, 
                    feedback: "Ignorér de mindre negative kommentarer og fortsæt med din plan." 
                },
                { 
                    image: "choice4d.jpg", 
                    points: 10, 
                    feedback: "Brug din marketing specialist til at forbedre kundekommunikationen. " 
                },
                { 
                    image: "choice4e.jpg", 
                    points: 8, 
                    feedback: "Konsulter med din mentor for at prioritere ændringer. " 
                }
            ]
        },
        {
            title: "Partnerskaber",
            description: "Du overvejer at indgå et partnerskab med en større virksomhed.",
            choices: [
                { 
                    image: "choice5a.jpg", 
                    points: 5, 
                    feedback: "Udvikl prototypen yderligere før du indgår i et partnerskab." 
                },
                { 
                    image: "choice5b.jpg", 
                    points: 12, 
                    feedback: "Brug din mentor til at etablere kontakt og forhandle en aftale." 
                },
                { 
                    image: "choice5c.jpg", 
                    points: 10, 
                    feedback: "Tag kontakt til virksomheden direkte og fremlæg din vision." 
                },
                { 
                    image: "choice5d.jpg", 
                    points: 5, 
                    feedback: "Brug kapitalen til at gøre din virksomhed mere attraktiv for partnere. " 
                },
                { 
                    image: "choice5e.jpg", 
                    points: 15, 
                    feedback: "Brug dit netværk til at identificere de bedste potentielle partnere. " 
                }
            ]
        },
        {
            title: "Konkurrence",
            description: "En ny konkurrent er dukket op på markedet.",
            choices: [
                { 
                    image: "choice6a.jpg", 
                    points: 9, 
                    feedback: "Brug dit netværk til at få indsigt i konkurrentens strategi." 
                },
                { 
                    image: "choice6b.jpg", 
                    points: 15, 
                    feedback: "Differentier dit produkt ved at fokusere på unikke funktioner." 
                },
                { 
                    image: "choice6c.jpg", 
                    points: 5, 
                    feedback: "Sænk prisen for at konkurrere direkte." 
                },
                { 
                    image: "choice6d.jpg", 
                    points: 10, 
                    feedback: "Brug marketing specialisten til at skabe en kampagne, der fremhæver dine styrker." 
                },
                { 
                    image: "choice6e.jpg", 
                    points: 8, 
                    feedback: "Konsulter din mentor for at justere din strategi i forhold til konkurrencen" 
                }
            ]
        },
        {
            title: "Skalering",
            description: "Din prototype er klar til at skalere op.",
            choices: [
                { 
                    image: "choice7a.jpg", 
                    points: 10, 
                    feedback: "Brug kapitalen til at opskalere produktionen." 
                },
                { 
                    image: "choice7b.jpg", 
                    points: 15, 
                    feedback: "Udnyt netværket til at finde distributører eller produktionspartnere." 
                },
                { 
                    image: "choice7c.jpg", 
                    points: 12, 
                    feedback: "Fokuser på at øge kundebasen før du skalerer." 
                },
                { 
                    image: "choice7d.jpg", 
                    points: 8, 
                    feedback: "Konsulter din mentor for at sikre, at du er klar til skalering." 
                },
                { 
                    image: "choice7e.jpg", 
                    points: 5, 
                    feedback: "Ansæt mere personale for at understøtte skaleringen." 
                }
            ]
        },
        {
            title: "Rebranding",
            description: "Feedback tyder på, at din brandidentitet ikke er klar nok.",
            choices: [
                { 
                    image: "choice8a.jpg", 
                    points: 15, 
                    feedback: "Brug marketing specialisten til at udvikle en ny brandstrategi." 
                },
                { 
                    image: "choice8b.jpg", 
                    points: -10, 
                    feedback: "Hyr et eksternt branding bureau til at hjælpe med rebrandingen." 
                },
                { 
                    image: "choice8c.jpg", 
                    points: 12, 
                    feedback: "Brug dit netværk til at få feedback på den nye branding." 
                },
                { 
                    image: "choice8d.jpg", 
                    points: 8, 
                    feedback: "Foretag mindre justeringer baseret på den oprindelige feedback." 
                },
                { 
                    image: "choice8e.jpg", 
                    points: 10, 
                    feedback: "Konsulter din mentor for at sikre, at rebrandingen stemmer overens med virksomhedens vision." 
                }
            ]
        },
        {
            title: "Teknologiudvikling",
            description: "Ny teknologi kan forbedre dit produkt, men det kræver investering.",
            choices: [
                { 
                    image: "choice9a.jpg", 
                    points: 15, 
                    feedback: "Brug de tekniske eksperter til at vurdere og implementere teknologien." 
                },
                { 
                    image: "choice9b.jpg", 
                    points: -5, 
                    feedback: "Ansæt eksterne udviklere til at håndtere teknologiintegrationen." 
                },
                { 
                    image: "choice9c.jpg", 
                    points: 10, 
                    feedback: "Brug kapitalen til at investere i den nye teknologi." 
                },
                { 
                    image: "choice9d.jpg", 
                    points: 12, 
                    feedback: "Test teknologien i et lille pilotprojekt før fuld implementering." 
                },
                { 
                    image: "choice9e.jpg", 
                    points: 8, 
                    feedback: "Konsulter din mentor for at vurdere teknologiens langsigtede værdi." 
                }
            ]
        },
        {
            title: "Bæredygtighedscertificering",
            description: "Du overvejer at få dit produkt certificeret som bæredygtigt.",
            choices: [
                { 
                    image: "choice10a.jpg", 
                    points: 15, 
                    feedback: "Brug dit netværk til at finde de bedste certificeringsorganer." 
                },
                { 
                    image: "choice10b.jpg", 
                    points: 10, 
                    feedback: "Invester kapital i at få produktet certificeret." 
                },
                { 
                    image: "choice10c.jpg", 
                    points: 12, 
                    feedback: "Brug marketing specialisten til at fremhæve bæredygtighedsaspektet i markedsføringen." 
                },
                { 
                    image: "choice10d.jpg", 
                    points: 5, 
                    feedback: "Fokusér på produktudvikling før certificering." 
                },
                { 
                    image: "choice10e.jpg", 
                    points: 8, 
                    feedback: "Konsulter din mentor om certificeringens strategiske værdi." 
                }
            ]
        }
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
