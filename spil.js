document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('start-button');
    const rulesButton = document.getElementById('rulesButton');
    const cardsButton = document.getElementById('cardsButton');
    const gameButton = document.getElementById('gameButton');
    const nextButton = document.getElementById('next-button');
    
    const startScreen = document.getElementById('start-screen');
    const introScreen = document.getElementById('intro');
    const rulesScreen = document.getElementById('rules');
    const cardsScreen = document.getElementById('cards');
    const gameScreen = document.getElementById('game-screen');
    const scenarioTitle = document.getElementById('scenario-title');
    const scenarioDescription = document.getElementById('scenario-description');
    const choicesContainer = document.getElementById('choices-container');
    const pointsDisplay = document.getElementById('points');
    const modal = document.getElementById('modal');
    const modalFeedback = document.getElementById('modal-feedback');
    const closeModal = document.getElementById('close-modal');
    const nextRoundButton = document.getElementById('next-round-button');
    const roundCounterDisplay = document.getElementById('round-counter');
    
    const clickSound = new Audio('sounds/click.mp3');
    const backgroundMusic = new Audio('sounds/Stardew Valley OST - Stardew Valley Overture.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.5;

    let points = 0;
    let currentScenario = 0;

    
    const scenarios = [
        {
            title: "Produktudvikling",
            description: "Din prototype har brug for yderligere udvikling for at kunne skalere.",
            choices: [
                { 
                    image: "images/s1-p1.png", 
                    points: 300, 
                    feedback: "Dette er en stærk tilgang, da interne eksperter har dyb forståelse for produktet og kan sikre, at forbedringerne er tilpasset virksomhedens overordnede vision og mål. + 300 Guldmønter " 
                },
                { 
                    image: "../images/s1-p2.png", 
                    points: 50, 
                    feedback: "Outsourcing kan være risikabelt i den tidlige fase, da det kan føre til manglende kontrol over kvaliteten og retningen af udviklingen. +50 Guldmønter" 
                },
                { 
                    image: "../images/s1-p3.png", 
                    points: 150, 
                    feedback: "Dette er en klog beslutning, da det sikrer, at produktet opfylder kundernes behov, hvilket kan føre til bedre markedsaccept. +150 Guldmønter" 
                },
                
            ]
        },
        {
            title: "Marketingstrategi",
            description: "Du skal beslutte, hvordan du bedst markedsfører din prototype.",
            choices: [
                { 
                    image: "../images/s2-p1.png", 
                    points: 300, 
                    feedback: "At udnytte interne ressourcer er omkostningseffektivt og sikrer, at marketingstrategien er tæt på virksomhedens kernebudskaber. +300 Guldmønter" 
                },
                { 
                    image: "../images/s2-p2.png", 
                    points: 50, 
                    feedback: "Et eksternt bureau kan være dyrt og muligvis ikke have samme forståelse for produktet og markedet som interne ressourcer. +50 Guldmønter" 
                },
                { 
                    image: "../images/s2-p3.png", 
                    points: 150, 
                    feedback: "Partnerskaber kan udvide rækkevidden af markedsføringen og introducere produktet til nye kundesegmenter, hvilket er en omkostningseffektiv strategi. +150 Guldmønter" 
                },
                
            ]
        },
        {
            title: "Forretningsudvikling",
            description: "Du overvejer, hvordan du bedst kan udvide din forretning.",
            choices: [
                { 
                    image: "../images/s3-p1.png", 
                    points: 300, 
                    feedback: "Netværk kan åbne døre til strategiske samarbejder, der kan accelerere væksten uden store kapitaludlæg. +300 Guldmønter" 
                },
                { 
                    image: "../images/s3-p2.png", 
                    points: 150, 
                    feedback: "Organisk vækst er sund og bæredygtig, men det kan være langsommere sammenlignet med at udnytte strategiske samarbejder. +150 Guldmønter" 
                },
                { 
                    image: "../images/s3-p3.png", 
                    points: 50, 
                    feedback: "At udvide teamet kan øge kapaciteten og bringe nye kompetencer ind, men det er også en kapitalintensiv tilgang. +50 Guldmønter" 
                },
            ]
        },
        {
            title: "Kundefeedback",
            description: "Du har modtaget blandet feedback fra dine tidlige brugere.",
            choices: [
                { 
                    image: "../images/s4-p1.png", 
                    points: 150, 
                    feedback: "Mere data giver bedre indsigt i, hvordan produktet kan forbedres, hvilket kan føre til større kundetilfredshed. +150 Guldmønter" 
                },
                { 
                    image: "../images/s4-p2.png", 
                    points: 300, 
                    feedback: "Hurtige tilpasninger baseret på feedback kan forbedre produktets markedsaccept og differentiere det fra konkurrenterne. +300 Guldmønter" 
                },
                { 
                    image: "../images/s4-p3.png", 
                    points: 50, 
                    feedback: "At ignorere feedback kan føre til, at man overser kritiske forbedringsmuligheder, hvilket kan skade produktets succes. +50 Guldmønter" 
                },
                
            ]
        },
        {
            title: "Partnerskaber",
            description: "Du overvejer at indgå et partnerskab med en større virksomhed.",
            choices: [
                { 
                    image: "../images/s5-p1.png", 
                    points: 50, 
                    feedback: "En stærkere prototype kan gøre virksomheden mere attraktiv for partnere, men det kan forsinke muligheden for partnerskaber. +50 Guldmønter" 
                },
                { 
                    image: "../images/s5-p2.png", 
                    points: 300, 
                    feedback: "Mentoren kan åbne døre og sikre bedre forhandlingsvilkår, hvilket øger sandsynligheden for en succesfuld aftale. +300 Guldmønter" 
                },
                { 
                    image: "../images/s5-p3.png", 
                    points: 150, 
                    feedback: "Direkte kontakt kan skabe stærke partnerskaber, men det kræver en overbevisende præsentation for at lykkes. +150 Guldmønter" 
                },
              
            ]
        },
        {
            title: "Konkurrence",
            description: "En ny konkurrent er dukket op på markedet.",
            choices: [
                { 
                    image: "../images/s6-p1.png", 
                    points: 150, 
                    feedback: "At kende konkurrenternes strategi kan hjælpe med at tilpasse og styrke din egen position på markedet. +150 Guldmønter" 
                },
                { 
                    image: "../images/s6-p2.png", 
                    points: 300, 
                    feedback: "Differentiering er afgørende for at skabe en unik markedsposition og undgå priskrig. +300 Guldmønter" 
                },
                { 
                    image: "../images/s6-p3.png", 
                    points: 50, 
                    feedback: "Priskrig kan skade virksomhedens marginer og værdi på lang sigt; det er en risikabel strategi. +50 Guldmønter" 
                },
                
            ]
        },
        {
            title: "Skalering",
            description: "Din prototype er klar til at skalere op.",
            choices: [
                { 
                    image: "../images/s7-p1.png", 
                    points: 50, 
                    feedback: "Kapitalinvestering i produktion kan accelerere væksten, men det er afgørende at sikre, at efterspørgslen er tilstrækkelig. +50 Guldmønter" 
                },
                { 
                    image: "../images/s7-p2.png", 
                    points: 300, 
                    feedback: "Partnerskaber kan muliggøre hurtigere og mere omkostningseffektiv skalering, hvilket kan være mere bæredygtigt end at udvide internt. +300 Guldmønter" 
                },
                { 
                    image: "../images/s7-p3.png", 
                    points: 150, 
                    feedback: "At sikre en større kundebase før skalering minimerer risikoen og sikrer en mere stabil indtægtsstrøm. +150 Guldmønter" 
                },
              
            ]
        },
        {
            title: "Rebranding",
            description: "Feedback tyder på, at din brandidentitet ikke er klar nok.",
            choices: [
                { 
                    image: "../images/s8-p1.png", 
                    points: 300, 
                    feedback: "At bruge interne ressourcer sikrer, at brandstrategien er tæt på virksomhedens vision og mål, hvilket kan styrke markedspositionen. +300 Guldmønter" 
                },
                { 
                    image: "../images/s8-p2.png", 
                    points: 50, 
                    feedback: "Eksterne bureauer kan være dyre og muligvis ikke forstå virksomhedens kerneidentitet så godt som interne ressourcer. +50 Guldmønter" 
                },
                { 
                    image: "../images/s8-p3.png", 
                    points: 150, 
                    feedback: "Feedback fra netværket kan give uvurderlige perspektiver og hjælpe med at forme en brandidentitet, der resonerer på markedet. +150 Guldmønter" 
                },
               
            ]
        },
        {
            title: "Teknologiudvikling",
            description: "Ny teknologi kan forbedre dit produkt, men det kræver investering.",
            choices: [
                { 
                    image: "../images/s9-p1.png", 
                    points: 300, 
                    feedback: "At bruge interne eksperter sikrer, at teknologiintegrationen er godt tilpasset virksomhedens behov og mål. +300 Guldmønter" 
                },
                { 
                    image: "../images/s9-p2.png", 
                    points: 50, 
                    feedback: "Eksterne udviklere kan være dyrere og mindre engagerede i virksomhedens langsigtede succes, hvilket kan føre til suboptimale løsninger. +50 Guldmønter" 
                },
                { 
                    image: "../images/s9-p3.png", 
                    points: 150, 
                    feedback: "BInvestering i teknologi kan give en konkurrencefordel, men det er vigtigt at sikre, at teknologien er den rette for virksomheden. +150 Guldmønter" 
                },
               
            ]
        },
        {
            title: "Bæredygtighedscertificering",
            description: "Du overvejer at få dit produkt certificeret som bæredygtigt.",
            choices: [
                { 
                    image: "../images/s10-p1.png", 
                    points: 300, 
                    feedback: "Netværk kan hjælpe med at identificere de mest troværdige og relevante certificeringsorganer, hvilket kan forbedre produktets markedsaccept. +300 Guldmønter" 
                },
                { 
                    image: "../images/s10-p2.png", 
                    points: 10, 
                    feedback: "Certificering kan differentiere produktet og øge dets tiltrækningskraft, men det er vigtigt at sikre, at investeringen giver tilstrækkelig værdi. +50 Guldmønter" 
                },
                { 
                    image: "../images/s10-p3.png", 
                    points: 150, 
                    feedback: "Markedsføring af bæredygtighed kan tiltrække en bredere kundebase og styrke brandet, hvilket kan føre til øget salg. +150 Guldmønter" 
                },
                
            ]
        }
    ];

    // Screen transition logic
    startButton.addEventListener('click', function () {
        startScreen.style.display = 'none';
        introScreen.style.display = 'block';
    });

    rulesButton.addEventListener('click', function () {
        introScreen.style.display = 'none';
        rulesScreen.style.display = 'block';
    });

    cardsButton.addEventListener('click', function () {
        rulesScreen.style.display = 'none';
        cardsScreen.style.display = 'block';
    });

    gameButton.addEventListener('click', function () {
        cardsScreen.style.display = 'none';
        gameScreen.style.display = 'block';
        startGame();
    });

    nextButton.addEventListener('click', function () {
        nextScenario();
    });

    // Game logic
    function startGame() {
        points = 0;
        currentScenario = 0;
        updateRoundCounter();
        backgroundMusic.play();
        loadScenario();
    }

    function loadScenario() {
        const scenario = scenarios[currentScenario];
        scenarioTitle.textContent = scenario.title;
        scenarioDescription.textContent = scenario.description;
        choicesContainer.innerHTML = ''; // Clear previous choices

        scenario.choices.forEach(choice => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.style.backgroundImage = `url('${choice.image}')`;

            cardElement.addEventListener('click', function () {
                points += choice.points;
                pointsDisplay.textContent = points;
                clickSound.play();
                showFeedback(choice.feedback);
            });

            choicesContainer.appendChild(cardElement);
        });
    }

    function showFeedback(feedback) {
        modalFeedback.textContent = feedback;
        modal.style.display = "block";

        nextRoundButton.removeEventListener('click', nextScenario);
        nextRoundButton.addEventListener('click', function handler() {
            modal.style.display = "none";
            nextScenario();
            nextRoundButton.removeEventListener('click', handler); // Remove listener after use
        });

        closeModal.addEventListener('click', closeModalHandler);
        window.addEventListener('click', outsideClickHandler);
    }

    function closeModalHandler() {
        modal.style.display = "none";
        closeModal.removeEventListener('click', closeModalHandler);
        window.removeEventListener('click', outsideClickHandler);
    }

    function outsideClickHandler(event) {
        if (event.target === modal) {
            closeModalHandler();
        }
    }

    function nextScenario() {
        currentScenario++; // Increment the scenario counter

        if (currentScenario < scenarios.length) {
            updateRoundCounter();
            loadScenario();
        } else {
            endGame();
        }
    }

    function updateRoundCounter() {
        roundCounterDisplay.textContent = currentScenario + 1;
    }

    function endGame() {
        gameScreen.innerHTML = `
            <div id="end-game-screen">
                <h2>Spillet er slut</h2>
                <p>Du fik ${points} point.</p>`;
            
        if (points >= 3000) {
            gameScreen.innerHTML `<div id="end-game-screen">
            <img src="images/stars-3.png">
            <p>Tillykke! Du har med stor succes opbygget GreenTech Solutions og gjort det til en blomstrende virksomhed!</p>
            <button id="try-again-button">Prøv igen</button>`;
        } else if (points >= 1500) {
            gameScreen.innerHTML += `<div id="end-game-screen">
            <img src="images/stars-2.png">
            <p>Godt gået! Du har gjort GreenTech Solutions til en stabil virksomhed, men der er stadig plads til vækst</p>
            <button id="try-again-button">Prøv igen</button>`;
        } else {
            gameScreen.innerHTML +=`<div id="end-game-screen">
            <img src="images/stars-1.png">
            <p>Desværre, du opnåede ikke nok point til at få succes. Prøv igen!</p>
            <button id="try-again-button">Prøv igen</button>`;
        }

        const tryAgainButton = document.getElementById('try-again-button');
        tryAgainButton.addEventListener('click', function() {
            location.reload(); // Reload the page to start the game again
        });
        

    }

});