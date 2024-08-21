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

    const characterCard = "Visionary";  // Placeholder: Assign based on user selection or random draw
    const startupCard = "GreenTech Solutions";  // Placeholder: Assign based on user selection or random draw

    const scenarios = [
        {
            title: "Scenarie 1",
            description: "Du overvejer, hvordan du bedst kan validere din prototype på markedet.",
            choices: [
                { 
                    image: "choice1a.jpg", 
                    points: 15, 
                    feedback: "Samarbejd med en eksisterende virksomhed for at teste produktet i deres miljø. En fremragende beslutning, der udnytter din nuværende netværk effektivt." 
                },
                { 
                    image: "choice1b.jpg", 
                    points: 10, 
                    feedback: "Udfør en lille lokal test med et begrænset antal brugere. En sikker og ressourceeffektiv metode." 
                },
                { 
                    image: "choice1c.jpg", 
                    points: 7, 
                    feedback: "Start en online crowdfunding-kampagne. En god måde at samle midler på, men kræver mere end hvad du allerede har." 
                },
                { 
                    image: "choice1d.jpg", 
                    points: 5, 
                    feedback: "Gå direkte til en stor messe og præsenter produktet. Ambitiøst, men kræver betydelige ressourcer." 
                },
                { 
                    image: "choice1e.jpg", 
                    points: 8, 
                    feedback: "Send prototypen til en ekspert for at få feedback. Nyttigt, men du afhænger af eksterne ressourcer." 
                }
            ]
        },
        {
            title: "Scenarie 2",
            description: "Du har mulighed for at deltage i en startup accelerator.",
            choices: [
                { 
                    image: "choice2a.jpg", 
                    points: 20, 
                    feedback: "Deltag og få adgang til deres ressourcer og netværk. Dette giver dig adgang til nye muligheder uden at miste kontrollen over din virksomhed." 
                },
                { 
                    image: "choice2b.jpg", 
                    points: 10, 
                    feedback: "Deltag, men fokuser mest på din egen udvikling. Et fornuftigt valg, der udnytter din eksisterende viden." 
                },
                { 
                    image: "choice2c.jpg", 
                    points: 5, 
                    feedback: "Undgå acceleratoren og fokusér på at få flere kunder. Dette valg kan begrænse din adgang til ressourcer." 
                },
                { 
                    image: "choice2d.jpg", 
                    points: 15, 
                    feedback: "Find en anden accelerator, der er mere fokuseret på din branche. Dette kan give mere relevante ressourcer." 
                },
                { 
                    image: "choice2e.jpg", 
                    points: 8, 
                    feedback: "Forbedre produktet før deltagelse i en accelerator. Gode forberedelser, men kræver tid." 
                }
            ]
        },
        {
            title: "Scenarie 3",
            description: "En stor investor viser interesse, men vil have 40% af virksomheden.",
            choices: [
                { 
                    image: "choice3a.jpg", 
                    points: 5, 
                    feedback: "Accepter tilbuddet for at få kapital hurtigt. Du mister dog en stor del af din kontrol over virksomheden." 
                },
                { 
                    image: "choice3b.jpg", 
                    points: 10, 
                    feedback: "Forhandl om en lavere ejerandel. En klog strategi for at bevare mere kontrol." 
                },
                { 
                    image: "choice3c.jpg", 
                    points: 15, 
                    feedback: "Afvis tilbuddet og søg andre investorer. Dette valg holder dig fleksibel, men det kræver tid og energi." 
                },
                { 
                    image: "choice3d.jpg", 
                    points: 8, 
                    feedback: "Indgå et samarbejde uden at give ejerandele. En smart måde at beholde kontrollen, men samarbejdet kan have udfordringer." 
                },
                { 
                    image: "choice3e.jpg", 
                    points: 12, 
                    feedback: "Find en alternativ finansieringskilde, som crowdfunding. Dette valg kan tage længere tid, men det holder dig uafhængig." 
                }
            ]
        },
        {
            title: "Scenarie 4",
            description: "Din prototype har brug for forbedringer efter en første test.",
            choices: [
                { 
                    image: "choice4a.jpg", 
                    points: 15, 
                    feedback: "Udvikl en opdateret version med brugernes feedback. Dette valg bygger på dine eksisterende ressourcer og erfaringer." 
                },
                { 
                    image: "choice4b.jpg", 
                    points: 10, 
                    feedback: "Sæt udviklingen på pause for at rette fejlene. Et fornuftigt valg for at sikre kvalitet, men det kræver tid." 
                },
                { 
                    image: "choice4c.jpg", 
                    points: 5, 
                    feedback: "Lancér med kendte fejl og forbedr senere. Dette kan være risikabelt og skade din virksomheds omdømme." 
                },
                { 
                    image: "choice4d.jpg", 
                    points: 12, 
                    feedback: "Hyr eksterne eksperter til at hjælpe med forbedringer. Dette kan være effektivt, men det er dyrt og kræver eksterne ressourcer." 
                },
                { 
                    image: "choice4e.jpg", 
                    points: 8, 
                    feedback: "Udsæt lanceringen for at perfektionere produktet. En sikker strategi, men du risikerer at miste momentum." 
                }
            ]
        },
        {
            title: "Scenarie 5",
            description: "Et nyt konkurrenceprodukt kommer på markedet.",
            choices: [
                { 
                    image: "choice5a.jpg", 
                    points: 5, 
                    feedback: "Sænk prisen for at konkurrere. Dette kan hurtigt udtømme dine ressourcer." 
                },
                { 
                    image: "choice5b.jpg", 
                    points: 15, 
                    feedback: "Differentier dit produkt med unikke funktioner. En god strategi, der bygger på dine styrker." 
                },
                { 
                    image: "choice5c.jpg", 
                    points: 10, 
                    feedback: "Ignorér konkurrenten og fokusér på din niche. En sikker tilgang, men det begrænser vækstmulighederne." 
                },
                { 
                    image: "choice5d.jpg", 
                    points: 12, 
                    feedback: "Lav en markedsføringskampagne, der fremhæver dine styrker. Et effektivt valg, der udnytter dine nuværende ressourcer." 
                },
                { 
                    image: "choice5e.jpg", 
                    points: 8, 
                    feedback: "Indgå et partnerskab med konkurrenten. En risikabel, men potentielt givende strategi." 
                }
            ]
        },
        {
            title: "Scenarie 6",
            description: "Din marketingstrategi virker ikke som forventet.",
            choices: [
                { 
                    image: "choice6a.jpg", 
                    points: 15, 
                    feedback: "Analyser data og tilpas strategien. Dette valg bygger på de ressourcer, du allerede har." 
                },
                { 
                    image: "choice6b.jpg", 
                    points: 10, 
                    feedback: "Fokuser på sociale medier og influencer marketing. En moderne tilgang, der kræver nye ressourcer." 
                },
                { 
                    image: "choice6c.jpg", 
                    points: 12, 
                    feedback: "Skift fokus til B2B-markedet. En god idé, men det kræver en ændring i din eksisterende strategi." 
                },
                { 
                    image: "choice6d.jpg", 
                    points: 8, 
                    feedback: "Hyr et eksternt marketingbureau. Effektivt, men det kræver betydelige midler." 
                },
                { 
                    image: "choice6e.jpg", 
                    points: 5, 
                    feedback: "Lav en rebranding for at tiltrække et nyt segment. Dette kan være kostbart og tidskrævende." 
                }
            ]
        },
        {
            title: "Scenarie 7",
            description: "Du skal beslutte, om du vil outsource produktionen.",
            choices: [
                { 
                    image: "choice7a.jpg", 
                    points: 10, 
                    feedback: "Outsource til en billigere leverandør i udlandet. En omkostningseffektiv løsning, men det kræver tilsyn." 
                },
                { 
                    image: "choice7b.jpg", 
                    points: 12, 
                    feedback: "Hold produktionen in-house for bedre kontrol. Dette valg giver dig fuld kontrol, men det er dyrere." 
                },
                { 
                    image: "choice7c.jpg", 
                    points: 15, 
                    feedback: "Kombiner outsourcing med in-house produktion. En fleksibel løsning, der udnytter dine eksisterende ressourcer." 
                },
                { 
                    image: "choice7d.jpg", 
                    points: 8, 
                    feedback: "Find en lokal partner til produktionen. En sikker tilgang, men det kræver tid til at etablere partnerskabet." 
                },
                { 
                    image: "choice7e.jpg", 
                    points: 5, 
                    feedback: "Udskyd beslutningen og optimer eksisterende processer. Dette kan spare tid og penge på kort sigt, men forsinker fremgang." 
                }
            ]
        },
        {
            title: "Scenarie 8",
            description: "Et af dine teammedlemmer overvejer at forlade virksomheden.",
            choices: [
                { 
                    image: "choice8a.jpg", 
                    points: 5, 
                    feedback: "Tilbyd dem en bonus for at blive. Dette kan give en kortsigtet løsning, men det er ikke bæredygtigt." 
                },
                { 
                    image: "choice8b.jpg", 
                    points: 10, 
                    feedback: "Giv dem en større ejerandel. Dette er en stærk motivator, men det mindsker din kontrol." 
                },
                { 
                    image: "choice8c.jpg", 
                    points: 8, 
                    feedback: "Find en erstatning hurtigt. Dette kan holde virksomheden i gang, men det er ikke altid let at finde den rette person." 
                },
                { 
                    image: "choice8d.jpg", 
                    points: 15, 
                    feedback: "Hold en samtale for at forstå deres bekymringer og forsøge at løse dem. Dette er en langsigtet løsning, der udnytter din relation til teamet." 
                },
                { 
                    image: "choice8e.jpg", 
                    points: 12, 
                    feedback: "Lad dem gå og reorganisér teamet. En svær beslutning, men det kan give en frisk start." 
                }
            ]
        },
        {
            title: "Scenarie 9",
            description: "Du overvejer at udvide til en ny international markedsplads.",
            choices: [
                { 
                    image: "choice9a.jpg", 
                    points: 15, 
                    feedback: "Start en markedsundersøgelse først. Et klogt valg, der bygger på grundig planlægning." 
                },
                { 
                    image: "choice9b.jpg", 
                    points: 10, 
                    feedback: "Lancér produktet i det nye marked med minimal tilpasning. Dette er hurtigere, men risikabelt." 
                },
                { 
                    image: "choice9c.jpg", 
                    points: 12, 
                    feedback: "Indgå et partnerskab med en lokal distributør. En god strategi, der udnytter lokale ressourcer." 
                },
                { 
                    image: "choice9d.jpg", 
                    points: 8, 
                    feedback: "Undersøg lokale regler og tilpas produktet derefter. Dette valg tager tid, men kan være nødvendigt." 
                },
                { 
                    image: "choice9e.jpg", 
                    points: 5, 
                    feedback: "Udskyd ekspansionen indtil du har flere ressourcer. Dette er sikkert, men du risikerer at gå glip af muligheder." 
                }
            ]
        },
        {
            title: "Scenarie 10",
            description: "Du har en mulighed for at få din virksomhed præsenteret i en stor mediekanal.",
            choices: [
                { 
                    image: "choice10a.jpg", 
                    points: 15, 
                    feedback: "Grib muligheden og forbered en pressemeddelelse. Dette valg udnytter din eksisterende medieplatform effektivt." 
                },
                { 
                    image: "choice10b.jpg", 
                    points: 5, 
                    feedback: "Afvis muligheden for at fokusere på produktudvikling. Et forsigtigt valg, men du mister en stor mulighed." 
                },
                { 
                    image: "choice10c.jpg", 
                    points: 10, 
                    feedback: "Forbered nøje dit budskab og målgruppe først. En god strategi, der sikrer et skarpt og målrettet budskab." 
                },
                { 
                    image: "choice10d.jpg", 
                    points: 12, 
                    feedback: "Brug mediekanalen til at annoncere en stor nyhed. Dette kan maksimere eksponeringen, hvis det gøres korrekt." 
                },
                { 
                    image: "choice10e.jpg", 
                    points: 8, 
                    feedback: "Udskyd eksponeringen til efter en større opdatering. Dette kan være fornuftigt, men du risikerer at miste momentum." 
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
