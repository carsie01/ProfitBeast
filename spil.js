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
                    feedback: "Mere data giver bedre indsigt i, hvordan produktet kan forbedres, hvilket kan føre til større kundetilfredshed. +12 point" 
                },
                { 
                    image: "s4-p2.png", 
                    points: 15, 
                    feedback: "Hurtige tilpasninger baseret på feedback kan forbedre produktets markedsaccept og differentiere det fra konkurrenterne. +15 point" 
                },
                { 
                    image: "s4-p3.png", 
                    points: -10, 
                    feedback: "At ignorere feedback kan føre til, at man overser kritiske forbedringsmuligheder, hvilket kan skade produktets succes. -10 point" 
                },
                { 
                    image: "s4-p4.png", 
                    points: 10, 
                    feedback: "Bedre kommunikation kan hjælpe med at klarlægge produktets værdi og forbedre kundernes oplevelse.Bedre kommunikation kan hjælpe med at klarlægge produktets værdi og forbedre kundernes oplevelse. +10 point" 
                },
                { 
                    image: "s4-p5.png", 
                    points: 8, 
                    feedback: "Mentorens vejledning kan hjælpe med at fokusere på de vigtigste ændringer, hvilket kan optimere ressourcerne. +8 point" 
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
                    feedback: "En stærkere prototype kan gøre virksomheden mere attraktiv for partnere, men det kan forsinke muligheden for partnerskaber. +5 point" 
                },
                { 
                    image: "s5-p2.png", 
                    points: 12, 
                    feedback: "Mentoren kan åbne døre og sikre bedre forhandlingsvilkår, hvilket øger sandsynligheden for en succesfuld aftale. +12 point" 
                },
                { 
                    image: "s5-p3.png", 
                    points: 10, 
                    feedback: "Direkte kontakt kan skabe stærke partnerskaber, men det kræver en overbevisende præsentation for at lykkes. +10 point" 
                },
                { 
                    image: "s5-p4.png", 
                    points: 5, 
                    feedback: "Kapitalinvesteringer kan øge virksomhedens værdi, men uden de rigtige partnere kan dette være ineffektivt. +5 point" 
                },
                { 
                    image: "s5-p5.png", 
                    points: 15, 
                    feedback: "Netværk kan afsløre partnerskaber, der er strategisk vigtige og gensidigt fordelagtige, hvilket kan accelerere virksomhedens vækst. +15 point" 
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
                    feedback: "At kende konkurrenternes strategi kan hjælpe med at tilpasse og styrke din egen position på markedet. +12 point" 
                },
                { 
                    image: "s6-p2.png", 
                    points: 15, 
                    feedback: "Differentiering er afgørende for at skabe en unik markedsposition og undgå priskrig. +15 point" 
                },
                { 
                    image: "s6-p3.png", 
                    points: -5, 
                    feedback: "Priskrig kan skade virksomhedens marginer og værdi på lang sigt; det er en risikabel strategi. -5 point" 
                },
                { 
                    image: "s6-p4.png", 
                    points: 10, 
                    feedback: "En målrettet kampagne kan hjælpe med at kommunikere produktets unikke værdier og tiltrække kunder. +10 point" 
                },
                { 
                    image: "s6-p5.png", 
                    points: 8, 
                    feedback: "Mentorens indsigt kan hjælpe med at tilpasse strategien effektivt, men det kan være langsommere end andre tiltag. +8 point" 
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
                    feedback: "Kapitalinvestering i produktion kan accelerere væksten, men det er afgørende at sikre, at efterspørgslen er tilstrækkelig. +10 point" 
                },
                { 
                    image: "s7-p2.png", 
                    points: 15, 
                    feedback: "Partnerskaber kan muliggøre hurtigere og mere omkostningseffektiv skalering, hvilket kan være mere bæredygtigt end at udvide internt. +15 point" 
                },
                { 
                    image: "s7-p3.png", 
                    points: 12, 
                    feedback: "At sikre en større kundebase før skalering minimerer risikoen og sikrer en mere stabil indtægtsstrøm. +12 point" 
                },
                { 
                    image: "s7-p4.png", 
                    points: 8, 
                    feedback: "Mentoren kan give værdifuld vejledning, men det er vigtigt at handle hurtigt og beslutsomt. +8 point" 
                },
                { 
                    image: "s7-p5.png", 
                    points: 5, 
                    feedback: "Flere medarbejdere kan hjælpe med at håndtere vækst, men det øger også omkostningerne og risiciene. +5 point" 
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
                    feedback: "At bruge interne ressourcer sikrer, at brandstrategien er tæt på virksomhedens vision og mål, hvilket kan styrke markedspositionen. +15 point" 
                },
                { 
                    image: "s8-p2.png", 
                    points: -10, 
                    feedback: "Eksterne bureauer kan være dyre og muligvis ikke forstå virksomhedens kerneidentitet så godt som interne ressourcer. -10 point" 
                },
                { 
                    image: "s8-p3.png", 
                    points: 12, 
                    feedback: "Feedback fra netværket kan give uvurderlige perspektiver og hjælpe med at forme en brandidentitet, der resonerer på markedet. +12 point" 
                },
                { 
                    image: "s8-p4.png", 
                    points: 8, 
                    feedback: "Mindre justeringer kan være omkostningseffektive, men de kan også være utilstrækkelige, hvis brandproblemerne er fundamentale. +8 point" 
                },
                { 
                    image: "s8-p5.png", 
                    points: 10, 
                    feedback: "Mentoren kan sikre, at rebrandingen er strategisk fornuftig, men det er vigtigt at sikre, at handlingen er rettidig. +10" 
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
                    feedback: "At bruge interne eksperter sikrer, at teknologiintegrationen er godt tilpasset virksomhedens behov og mål. +15 point" 
                },
                { 
                    image: "s9-p2.png", 
                    points: -5, 
                    feedback: "Eksterne udviklere kan være dyrere og mindre engagerede i virksomhedens langsigtede succes, hvilket kan føre til suboptimale løsninger. -5 point" 
                },
                { 
                    image: "s9-p3.png", 
                    points: 10, 
                    feedback: "BInvestering i teknologi kan give en konkurrencefordel, men det er vigtigt at sikre, at teknologien er den rette for virksomheden. +10 point" 
                },
                { 
                    image: "s9-p4.png", 
                    points: 12, 
                    feedback: "Et pilotprojekt reducerer risikoen ved at sikre, at teknologien fungerer som forventet, før der investeres yderligere. +12 point" 
                },
                { 
                    image: "s9-p5.png", 
                    points: 8, 
                    feedback: "Mentorens erfaring kan hjælpe med at vurdere, om investeringen i teknologien vil give langsigtede fordele, men det kan forsinke beslutningstagningen. +8 point" 
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
                    feedback: "Netværk kan hjælpe med at identificere de mest troværdige og relevante certificeringsorganer, hvilket kan forbedre produktets markedsaccept. +15 point" 
                },
                { 
                    image: "s10-p2.png", 
                    points: 10, 
                    feedback: "Certificering kan differentiere produktet og øge dets tiltrækningskraft, men det er vigtigt at sikre, at investeringen giver tilstrækkelig værdi. +10 point" 
                },
                { 
                    image: "s10-p3.png", 
                    points: 12, 
                    feedback: "Markedsføring af bæredygtighed kan tiltrække en bredere kundebase og styrke brandet, hvilket kan føre til øget salg. +12 point" 
                },
                { 
                    image: "s10-p4.png", 
                    points: 5, 
                    feedback: "Produktudvikling er vigtig, men uden certificering kan virksomheden miste en vigtig differentieringsfaktor på markedet. +5 point" 
                },
                { 
                    image: "s10-p5.png", 
                    points: 8, 
                    feedback: "Mentorens indsigt kan hjælpe med at forstå certificeringens langsigtede fordele, men det er vigtigt at handle i tide for at udnytte markedsmulighederne. +8 point" 
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
        gameScreen.innerHTML = `<h2>Spillet er slut</h2><p> Du fik ${points} points.</p>`;
        if (points >= 100) {
            gameScreen.innerHTML += "<p>Tillykke! Du har med succes opbygget GreenTech Solutions! </p>";
        } else {
            gameScreen.innerHTML += "<p>Desværre, du opnåede ikke nok point til at få succes. Prøv igen!</p>";
        }
    }
});
