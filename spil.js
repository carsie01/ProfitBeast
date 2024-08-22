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
    const modal = document.getElementById('modal');
    const modalFeedback = document.getElementById('modal-feedback');
    const closeModal = document.getElementById('close-modal');

    let points = 0;
    let currentScenario = 0;

    const characterCard = "karakter";  // Placeholder: Assign based on user selection or random draw
    const startupCard = "Virksomhed";  // Placeholder: Assign based on user selection or random draw

    const scenarios = [
        {
            title: "Produktudvikling",
            description: "Din prototype har brug for yderligere udvikling for at kunne skalere.",
            choices: [
                { 
                    image: "s1-p1.png", 
                    points: 15, 
                    feedback: "Dette er en stærk tilgang, da interne eksperter har dyb forståelse for produktet og kan sikre, at forbedringerne er tilpasset virksomhedens overordnede vision og mål. +15 point" 
                },
                { 
                    image: "s1-p2.png", 
                    points: -5, 
                    feedback: "Outsourcing kan være risikabelt i den tidlige fase, da det kan føre til manglende kontrol over kvaliteten og retningen af udviklingen. -5 point" 
                },
                { 
                    image: "s1-p3.png", 
                    points: 12, 
                    feedback: "Dette er en klog beslutning, da det sikrer, at produktet opfylder kundernes behov, hvilket kan føre til bedre markedsaccept. +12 point" 
                },
                { 
                    image: "s1-p4.png", 
                    points: 10, 
                    feedback: "Mentorens erfaring kan være uvurderlig til at prioritere ressourcer korrekt og undgå faldgruber, hvilket kan spare tid og penge. +10 point" 
                },
                { 
                    image: "s1-p5.png", 
                    points: 8, 
                    feedback: "Nye værktøjer kan forbedre effektiviteten og kvaliteten af udviklingsprocessen, men det er vigtigt at sikre, at investeringen er nødvendig og giver værdi. +8 point" 
                }
            ]
        },
        {
            title: "Marketingstrategi",
            description: "Du skal beslutte, hvordan du bedst markedsfører din prototype.",
            choices: [
                { 
                    image: "s2-p1.png", 
                    points: 15, 
                    feedback: "At udnytte interne ressourcer er omkostningseffektivt og sikrer, at marketingstrategien er tæt på virksomhedens kernebudskaber. +15 point" 
                },
                { 
                    image: "s2-p2.png", 
                    points: -10, 
                    feedback: "Et eksternt bureau kan være dyrt og muligvis ikke have samme forståelse for produktet og markedet som interne ressourcer. -10 point" 
                },
                { 
                    image: "s2-p3.png", 
                    points: 12, 
                    feedback: "Partnerskaber kan udvide rækkevidden af markedsføringen og introducere produktet til nye kundesegmenter, hvilket er en omkostningseffektiv strategi. +12 point" 
                },
                { 
                    image: "s2-p4.png", 
                    points: 10, 
                    feedback: "Sociale medier kan være en effektiv kanal til at nå en bred målgruppe med lave omkostninger, hvilket er ideelt i en tidlig fase. +10 point" 
                },
                { 
                    image: "s2-p5.png", 
                    points: 5, 
                    feedback: "Dette kan være effektivt, men det er en dyrere løsning, og det kan være risikabelt, hvis afkastet ikke er tilstrækkeligt. +5 point" 
                }
            ]
        },
        {
            title: "Forretningsudvikling",
            description: "Du overvejer, hvordan du bedst kan udvide din forretning.",
            choices: [
                { 
                    image: "s3-p1.png", 
                    points: 15, 
                    feedback: "Netværk kan åbne døre til strategiske samarbejder, der kan accelerere væksten uden store kapitaludlæg. +15 point" 
                },
                { 
                    image: "s3-p2.png", 
                    points: 10, 
                    feedback: "Organisk vækst er sund og bæredygtig, men det kan være langsommere sammenlignet med at udnytte strategiske samarbejder. +10 point" 
                },
                { 
                    image: "s3-p3.png", 
                    points: 8, 
                    feedback: "At udvide teamet kan øge kapaciteten og bringe nye kompetencer ind, men det er også en kapitalintensiv tilgang. +8 point" 
                },
                { 
                    image: "s3-p4.png", 
                    points: 5, 
                    feedback: "Opkøb kan være en hurtig måde at udvide markedsandele på, men det er risikabelt og kan være dyrt. +5 point" 
                },
                { 
                    image: "s3-p5.png", 
                    points: 12, 
                    feedback: "Mentorens erfaring kan hjælpe med at navigere komplekse ekspansionsbeslutninger og undgå almindelige faldgruber. +12 point" 
                }
            ]
        },
        {
            title: "Kundefeedback",
            description: "Du har modtaget blandet feedback fra dine tidlige brugere.",
            choices: [
                { 
                    image: "s4-p1.png", 
                    points: 12, 
                    feedback: "Indsaml mere feedback gennem dit netværk for at få flere data. " 
                },
                { 
                    image: "s4-p2.png", 
                    points: 12, 
                    feedback: "Brug feedbacken til at foretage hurtige justeringer på prototypen." 
                },
                { 
                    image: "s4-p3.png", 
                    points: -10, 
                    feedback: "Ignorér de mindre negative kommentarer og fortsæt med din plan." 
                },
                { 
                    image: "s4-p4.png", 
                    points: 10, 
                    feedback: "Brug din marketing specialist til at forbedre kundekommunikationen. " 
                },
                { 
                    image: "s4-p5.png", 
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
                    image: "s5-p1.png", 
                    points: 5, 
                    feedback: "Udvikl prototypen yderligere før du indgår i et partnerskab." 
                },
                { 
                    image: "s5-p2.png", 
                    points: 12, 
                    feedback: "Brug din mentor til at etablere kontakt og forhandle en aftale." 
                },
                { 
                    image: "s5-p3.png", 
                    points: 10, 
                    feedback: "Tag kontakt til virksomheden direkte og fremlæg din vision." 
                },
                { 
                    image: "s5-p4.png", 
                    points: 5, 
                    feedback: "Brug kapitalen til at gøre din virksomhed mere attraktiv for partnere. " 
                },
                { 
                    image: "s5-p5.png", 
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
                    image: "s6-p1.png", 
                    points: 9, 
                    feedback: "Brug dit netværk til at få indsigt i konkurrentens strategi." 
                },
                { 
                    image: "s6-p2.png", 
                    points: 15, 
                    feedback: "Differentier dit produkt ved at fokusere på unikke funktioner." 
                },
                { 
                    image: "s6-p3.png", 
                    points: 5, 
                    feedback: "Sænk prisen for at konkurrere direkte." 
                },
                { 
                    image: "s6-p4.png", 
                    points: 10, 
                    feedback: "Brug marketing specialisten til at skabe en kampagne, der fremhæver dine styrker." 
                },
                { 
                    image: "s6-p5.png", 
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
                    image: "s7-p1.png", 
                    points: 10, 
                    feedback: "Brug kapitalen til at opskalere produktionen." 
                },
                { 
                    image: "s7-p2.png", 
                    points: 15, 
                    feedback: "Udnyt netværket til at finde distributører eller produktionspartnere." 
                },
                { 
                    image: "s7-p3.png", 
                    points: 12, 
                    feedback: "Fokuser på at øge kundebasen før du skalerer." 
                },
                { 
                    image: "s7-p4.png", 
                    points: 8, 
                    feedback: "Konsulter din mentor for at sikre, at du er klar til skalering." 
                },
                { 
                    image: "s7-p5.png", 
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
                    image: "s8-p1.png", 
                    points: 15, 
                    feedback: "Brug marketing specialisten til at udvikle en ny brandstrategi." 
                },
                { 
                    image: "s8-p2.png", 
                    points: -10, 
                    feedback: "Hyr et eksternt branding bureau til at hjælpe med rebrandingen." 
                },
                { 
                    image: "s8-p3.png", 
                    points: 12, 
                    feedback: "Brug dit netværk til at få feedback på den nye branding." 
                },
                { 
                    image: "s8-p4.png", 
                    points: 8, 
                    feedback: "Foretag mindre justeringer baseret på den oprindelige feedback." 
                },
                { 
                    image: "s8-p5.png", 
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
                    image: "s9-p1.png", 
                    points: 15, 
                    feedback: "Brug de tekniske eksperter til at vurdere og implementere teknologien." 
                },
                { 
                    image: "s9-p2.png", 
                    points: -5, 
                    feedback: "Ansæt eksterne udviklere til at håndtere teknologiintegrationen." 
                },
                { 
                    image: "s9-p3.png", 
                    points: 10, 
                    feedback: "Brug kapitalen til at investere i den nye teknologi." 
                },
                { 
                    image: "s9-p4.png", 
                    points: 12, 
                    feedback: "Test teknologien i et lille pilotprojekt før fuld implementering." 
                },
                { 
                    image: "s9-p5.png", 
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
                    image: "s10-p1.png", 
                    points: 15, 
                    feedback: "Brug dit netværk til at finde de bedste certificeringsorganer." 
                },
                { 
                    image: "s10-p2.png", 
                    points: 10, 
                    feedback: "Invester kapital i at få produktet certificeret." 
                },
                { 
                    image: "s10-p3.png", 
                    points: 12, 
                    feedback: "Brug marketing specialisten til at fremhæve bæredygtighedsaspektet i markedsføringen." 
                },
                { 
                    image: "s10-p4.png", 
                    points: 5, 
                    feedback: "Fokusér på produktudvikling før certificering." 
                },
                { 
                    image: "s10-p5.png", 
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
        // Set background images for the character and startup cards
        characterCardDisplay.style.backgroundImage = "url('images/karakter.png')";
        startupCardDisplay.style.backgroundImage = "url('images/virksomhed.png')";
        
        characterCardDisplay.textContent = "";  // Clear text if you want only the image
        startupCardDisplay.textContent = "";    // Clear text if you want only the image
        
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
                showFeedback(choice.feedback); // Replace alert with this function
            });
            choicesContainer.appendChild(cardElement);
        });
    }

    function showFeedback(feedback) {
        modalFeedback.textContent = feedback;
        modal.style.display = "block";
    }

    closeModal.addEventListener('click', function () {
        modal.style.display = "none";
        nextScenario(); // Automatically load the next scenario after closing the modal
    });

    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            nextScenario(); // Automatically load the next scenario after closing the modal
        }
    });


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
