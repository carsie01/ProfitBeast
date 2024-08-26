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
    const nextRoundButton = document.getElementById('next-round-button');
    const clickSound = new Audio('sounds/click.mp3');
    const backgroundMusic = new Audio('sounds/Stardew Valley OST - Stardew Valley Overture.mp3'); // 
    backgroundMusic.loop = true; // Ensure the music loops
    backgroundMusic.volume = 0.5; // Set the volume (0.0 to 1.0)
    const roundCounterDisplay = document.getElementById('round-counter');



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
                    image: "../images/s1-p1.png", 
                    points: 15, 
                    feedback: "Dette er en stærk tilgang, da interne eksperter har dyb forståelse for produktet og kan sikre, at forbedringerne er tilpasset virksomhedens overordnede vision og mål. +15 point" 
                },
                { 
                    image: "../images/s1-p2.png", 
                    points: -5, 
                    feedback: "Outsourcing kan være risikabelt i den tidlige fase, da det kan føre til manglende kontrol over kvaliteten og retningen af udviklingen. -5 point" 
                },
                { 
                    image: "../images/s1-p3.png", 
                    points: 12, 
                    feedback: "Dette er en klog beslutning, da det sikrer, at produktet opfylder kundernes behov, hvilket kan føre til bedre markedsaccept. +12 point" 
                },
                
            ]
        },
        {
            title: "Marketingstrategi",
            description: "Du skal beslutte, hvordan du bedst markedsfører din prototype.",
            choices: [
                { 
                    image: "../images/s2-p1.png", 
                    points: 15, 
                    feedback: "At udnytte interne ressourcer er omkostningseffektivt og sikrer, at marketingstrategien er tæt på virksomhedens kernebudskaber. +15 point" 
                },
                { 
                    image: "../images/s2-p2.png", 
                    points: -10, 
                    feedback: "Et eksternt bureau kan være dyrt og muligvis ikke have samme forståelse for produktet og markedet som interne ressourcer. -10 point" 
                },
                { 
                    image: "../images/s2-p3.png", 
                    points: 12, 
                    feedback: "Partnerskaber kan udvide rækkevidden af markedsføringen og introducere produktet til nye kundesegmenter, hvilket er en omkostningseffektiv strategi. +12 point" 
                },
                
            ]
        },
        {
            title: "Forretningsudvikling",
            description: "Du overvejer, hvordan du bedst kan udvide din forretning.",
            choices: [
                { 
                    image: "../images/s3-p1.png", 
                    points: 15, 
                    feedback: "Netværk kan åbne døre til strategiske samarbejder, der kan accelerere væksten uden store kapitaludlæg. +15 point" 
                },
                { 
                    image: "../images/s3-p2.png", 
                    points: 10, 
                    feedback: "Organisk vækst er sund og bæredygtig, men det kan være langsommere sammenlignet med at udnytte strategiske samarbejder. +10 point" 
                },
                { 
                    image: "../images/s3-p3.png", 
                    points: 8, 
                    feedback: "At udvide teamet kan øge kapaciteten og bringe nye kompetencer ind, men det er også en kapitalintensiv tilgang. +8 point" 
                },
            ]
        },
        {
            title: "Kundefeedback",
            description: "Du har modtaget blandet feedback fra dine tidlige brugere.",
            choices: [
                { 
                    image: "../images/s4-p1.png", 
                    points: 12, 
                    feedback: "Mere data giver bedre indsigt i, hvordan produktet kan forbedres, hvilket kan føre til større kundetilfredshed. +12 point" 
                },
                { 
                    image: "../images/s4-p2.png", 
                    points: 15, 
                    feedback: "Hurtige tilpasninger baseret på feedback kan forbedre produktets markedsaccept og differentiere det fra konkurrenterne. +15 point" 
                },
                { 
                    image: "../images/s4-p3.png", 
                    points: -10, 
                    feedback: "At ignorere feedback kan føre til, at man overser kritiske forbedringsmuligheder, hvilket kan skade produktets succes. -10 point" 
                },
                
            ]
        },
        {
            title: "Partnerskaber",
            description: "Du overvejer at indgå et partnerskab med en større virksomhed.",
            choices: [
                { 
                    image: "../images/s5-p1.png", 
                    points: 5, 
                    feedback: "En stærkere prototype kan gøre virksomheden mere attraktiv for partnere, men det kan forsinke muligheden for partnerskaber. +5 point" 
                },
                { 
                    image: "../images/s5-p2.png", 
                    points: 12, 
                    feedback: "Mentoren kan åbne døre og sikre bedre forhandlingsvilkår, hvilket øger sandsynligheden for en succesfuld aftale. +12 point" 
                },
                { 
                    image: "../images/s5-p3.png", 
                    points: 10, 
                    feedback: "Direkte kontakt kan skabe stærke partnerskaber, men det kræver en overbevisende præsentation for at lykkes. +10 point" 
                },
              
            ]
        },
        {
            title: "Konkurrence",
            description: "En ny konkurrent er dukket op på markedet.",
            choices: [
                { 
                    image: "../images/s6-p1.png", 
                    points: 9, 
                    feedback: "At kende konkurrenternes strategi kan hjælpe med at tilpasse og styrke din egen position på markedet. +12 point" 
                },
                { 
                    image: "../images/s6-p2.png", 
                    points: 15, 
                    feedback: "Differentiering er afgørende for at skabe en unik markedsposition og undgå priskrig. +15 point" 
                },
                { 
                    image: "../images/s6-p3.png", 
                    points: -5, 
                    feedback: "Priskrig kan skade virksomhedens marginer og værdi på lang sigt; det er en risikabel strategi. -5 point" 
                },
                
            ]
        },
        {
            title: "Skalering",
            description: "Din prototype er klar til at skalere op.",
            choices: [
                { 
                    image: "../images/s7-p1.png", 
                    points: 10, 
                    feedback: "Kapitalinvestering i produktion kan accelerere væksten, men det er afgørende at sikre, at efterspørgslen er tilstrækkelig. +10 point" 
                },
                { 
                    image: "../images/s7-p2.png", 
                    points: 15, 
                    feedback: "Partnerskaber kan muliggøre hurtigere og mere omkostningseffektiv skalering, hvilket kan være mere bæredygtigt end at udvide internt. +15 point" 
                },
                { 
                    image: "s7-p3.png", 
                    points: 12, 
                    feedback: "At sikre en større kundebase før skalering minimerer risikoen og sikrer en mere stabil indtægtsstrøm. +12 point" 
                },
              
            ]
        },
        {
            title: "Rebranding",
            description: "Feedback tyder på, at din brandidentitet ikke er klar nok.",
            choices: [
                { 
                    image: "../images/s8-p1.png", 
                    points: 15, 
                    feedback: "At bruge interne ressourcer sikrer, at brandstrategien er tæt på virksomhedens vision og mål, hvilket kan styrke markedspositionen. +15 point" 
                },
                { 
                    image: "../images/s8-p2.png", 
                    points: -10, 
                    feedback: "Eksterne bureauer kan være dyre og muligvis ikke forstå virksomhedens kerneidentitet så godt som interne ressourcer. -10 point" 
                },
                { 
                    image: "../images/s8-p3.png", 
                    points: 12, 
                    feedback: "Feedback fra netværket kan give uvurderlige perspektiver og hjælpe med at forme en brandidentitet, der resonerer på markedet. +12 point" 
                },
               
            ]
        },
        {
            title: "Teknologiudvikling",
            description: "Ny teknologi kan forbedre dit produkt, men det kræver investering.",
            choices: [
                { 
                    image: "../images/s9-p1.png", 
                    points: 15, 
                    feedback: "At bruge interne eksperter sikrer, at teknologiintegrationen er godt tilpasset virksomhedens behov og mål. +15 point" 
                },
                { 
                    image: "../images/s9-p2.png", 
                    points: -5, 
                    feedback: "Eksterne udviklere kan være dyrere og mindre engagerede i virksomhedens langsigtede succes, hvilket kan føre til suboptimale løsninger. -5 point" 
                },
                { 
                    image: "../images/s9-p3.png", 
                    points: 10, 
                    feedback: "BInvestering i teknologi kan give en konkurrencefordel, men det er vigtigt at sikre, at teknologien er den rette for virksomheden. +10 point" 
                },
               
            ]
        },
        {
            title: "Bæredygtighedscertificering",
            description: "Du overvejer at få dit produkt certificeret som bæredygtigt.",
            choices: [
                { 
                    image: "../images/s10-p1.png", 
                    points: 15, 
                    feedback: "Netværk kan hjælpe med at identificere de mest troværdige og relevante certificeringsorganer, hvilket kan forbedre produktets markedsaccept. +15 point" 
                },
                { 
                    image: "../images/s10-p2.png", 
                    points: 10, 
                    feedback: "Certificering kan differentiere produktet og øge dets tiltrækningskraft, men det er vigtigt at sikre, at investeringen giver tilstrækkelig værdi. +10 point" 
                },
                { 
                    image: "../images/s10-p3.png", 
                    points: 12, 
                    feedback: "Markedsføring af bæredygtighed kan tiltrække en bredere kundebase og styrke brandet, hvilket kan føre til øget salg. +12 point" 
                },
                
            ]
        }
    ];

    startButton.addEventListener('click', function () {
        startScreen.style.display = 'none';
        gameScreen.style.display = 'block';
        startGame();
    });

    function startGame() {
        currentScenario = 0; // Initialize the scenario counter
        updateRoundCounter(); // Update round counter for the first round
        backgroundMusic.play(); // Start the background music

        // Set background images for the character and startup cards
        characterCardDisplay.style.backgroundImage = "url('images/karakter.png')";
        startupCardDisplay.style.backgroundImage = "url('images/virksomhed.png')";
        
        characterCardDisplay.textContent = "";  // Clear text if you want only the image
        startupCardDisplay.textContent = "";    // Clear text if you want only the image
        
        loadScenario(); // Load the first scenario
    }

    
    
    function loadScenario() {
        const scenario = scenarios[currentScenario];
        scenarioTitle.textContent = scenario.title;
        scenarioDescription.textContent = scenario.description;
        choicesContainer.innerHTML = ''; // Clear previous choices

        scenario.choices.forEach((choice) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.style.backgroundImage = `url('images/${choice.image}')`;

            // Adjust points based on character and startup
            let adjustedPoints = choice.points;

            cardElement.addEventListener('click', function () {
                points += adjustedPoints;
                pointsDisplay.textContent = points;

                // Play click sound
                clickSound.play();

                // Show feedback in modal
                showFeedback(choice.feedback);
            });

            choicesContainer.appendChild(cardElement);
        });
    }

    function showFeedback(feedback) {
        modalFeedback.textContent = feedback;
        modal.style.display = "block";

        nextRoundButton.addEventListener('click', function() {
            modal.style.display = "none";
            
        });
        // Ensure that the game proceeds to the next scenario after the feedback is closed
        modalFeedback.textContent = feedback;
        modal.style.display = "block";

        // Ensure the event listener is not added multiple times
        nextRoundButton.removeEventListener('click', nextScenario);
        nextRoundButton.addEventListener('click', nextScenario);

        const closeHandler = function () {
            modal.style.display = "none";
            closeModal.removeEventListener('click', closeHandler); // Remove listener to avoid stacking
            window.removeEventListener('click', outsideClickHandler); // Remove listener to avoid stacking
           
        };

        const outsideClickHandler = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
                closeModal.removeEventListener('click', closeHandler); // Remove listener to avoid stacking
                window.removeEventListener('click', outsideClickHandler); // Remove listener to avoid stacking
                
            }
        };

        closeModal.addEventListener('click', closeHandler);
        window.addEventListener('click', outsideClickHandler);
    }

    function nextScenario() {
        console.log("Before increment:", currentScenario);
        currentScenario++; // Increment the scenario counter
        console.log("After increment:", currentScenario);
    
        if (currentScenario < scenarios.length) {
            updateRoundCounter(); // Update the round counter when moving to the next round
            loadScenario(); // Load the next scenario
        } else {
            endGame(); // End the game if no more scenarios
        }
    }

     function updateRoundCounter() {
        roundCounterDisplay.textContent = currentScenario + 1; // Display the current round number
    }

    function endGame() {
        gameScreen.innerHTML = `<h2>Spillet er slut</h2><p>Du fik${points} point.</p>`;
        if (points >= 100) {
            gameScreen.innerHTML += "<p>Tillykke! Du har med succes opbygget GreenTech Solutions!!</p>";
        } else {
            gameScreen.innerHTML += "<p>Desværre, du opnåede ikke nok point til at få succes. Prøv igen!</p>";
        }
    }
});
