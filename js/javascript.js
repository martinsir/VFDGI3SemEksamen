// Quiz spørgsmål
const questions = [
    {
        question: "Hvad bruges Moodle hovedsageligt til som studerende på Zealand?",
        options: [
            "At se videoindhold fra tidligere forelæsninger",
            "At få adgang til kursusmaterialer, opgaver og meddelelser",
            "At booke kantinepladser",
            "At finde studieboliger"
        ],
        correct: 1,
        feedback: "Moodle er dit primære værktøj til at holde styr på dine kurser, deadlines og kommunikation med undervisere."
    },
    {
        question: "Hvilken opgave kan du løse ved hjælp af Wiseflow?",
        options: [
            "Aflevere opgaver og eksaminer",
            "Bestille bøger fra biblioteket",
            "Se forelæsningsvideoer",
            "Finde din skema"
        ],
        correct: 0,
        feedback: "Wiseflow er platformen, hvor du indleverer dine opgaver og eksaminer. Husk at tjekke deadlines i god tid!"
    },
    {
        question: "Hvordan tjekker du dit skema for undervisning og forelæsninger?",
        options: [
            "Du modtager en mail hver uge med dit opdaterede skema",
            "Du skal logge ind på Zealand's skemasystem",
            "Dit skema hænger altid på skolens opslagstavle",
            "Du skal spørge din underviser efter hver time"
        ],
        correct: 1,
        feedback: "Du kan til enhver tid logge ind på skemasystemet for at se dine lektioner og ændringer i dit skema."
    },
    {
        question: "Hvornår afholdes den officielle fredagsbar på campus?",
        options: [
            "Hver dag efter kl. 16",
            "Den sidste fredag i måneden",
            "Hver fredag efter kl. 15",
            "Den første torsdag i måneden"
        ],
        correct: 2,
        feedback: "Fredagsbaren er det perfekte sted at mødes med dine medstuderende og afslutte ugen på en sjov måde!"
    },
    {
        question: "Hvilken mulighed tilbyder kantinen på Zealand?",
        options: [
            "Kun kolde retter",
            "Både varme og kolde retter samt salater",
            "Kun kaffe og snacks",
            "Ingen kantine på campus"
        ],
        correct: 1,
        feedback: "Kantinen tilbyder et bredt udvalg af mad, så du altid kan finde noget, der passer til din smag."
    },
    {
        question: "Skal du bruge en parkeringstilladelse for at parkere på Zealand's campus?",
        options: [
            "Ja, du skal hente den fra administrationen",
            "Nej, parkering er gratis for alle",
            "Ja, men den er digital og registreres via nummerplade",
            "Du må kun parkere i weekenden"
        ],
        correct: 2,
        feedback: "Husk at registrere din bil via systemet, så du undgår at få en bøde."
    },
    {
        question: "Kan du tage quizzer på Moodle for at teste din viden om kursusmaterialet?",
        options: [
            "Ja, visse undervisere bruger quizzer som en del af undervisningen",
            "Nej, quizzer findes kun i fysiske test",
            "Ja, men kun i eksamensperioden",
            "Nej, Moodle bruges kun til læsematerialer"
        ],
        correct: 0,
        feedback: "Moodle tilbyder quizfunktioner, som dine undervisere kan bruge til at hjælpe dig med at forstå kursusmaterialet."
    },
    {
        question: "Hvordan får du adgang til dit kursusmateriale på Moodle?",
        options: [
            "Du får det tilsendt via mail",
            "Du skal logge ind på Moodle og navigere til dit kursus",
            "Du downloader materialet fra skolens hjemmeside",
            "Materialet bliver lagt i klassens Facebook-gruppe"
        ],
        correct: 1,
        feedback: "Alt dit kursusmateriale bliver lagt op på Moodle, så du har adgang til det døgnet rundt."
    }
];

let currentQuestionIndex = 0;
let timeLeft = 30; // Starttid for nedtælling
let countdown;
let correctAnswersCount = 0; // Tæller for rigtige svar
let timeChange = 0; // Variabel til at holde styr på tidsændringen

// Start quizzen
function startQuiz() {
    document.getElementById('home-container').classList.remove('active');
    document.getElementById('quiz-container').style.display = 'block'; // Vis quiz-container
    document.getElementById('progress-container').style.display = 'block'; // Vis progress bar
    document.getElementById('result').style.display = 'none'; // Skjul resultattavlen
    document.getElementById('home-btn').style.display = 'none'; // Skjul knappen til forsiden
    startTimer(); // Start timeren
    showQuestion(); // Vis det første spørgsmål
    timeChange = 0; // Reset timeChange til 0
}

// Start nedtælling
function startTimer() {
    const timerCircle = document.querySelector('.timer-circle circle');
    const radius = 45; // Radius af cirklen
    const circumference = 2 * Math.PI * radius; // Beregn cirkelens omkreds
    timerCircle.setAttribute('stroke-dasharray', circumference);
    timerCircle.setAttribute('stroke-dashoffset', circumference); // Start med fuld cirkel

   // document.getElementById('time-left').textContent = timeLeft; // Vis tid
    document.getElementById('time-text').textContent = timeLeft; // Vis initial tid i cirklen

    countdown = setInterval(() => {
        timeLeft--;
        //document.getElementById('time-left').textContent = timeLeft; // Opdater tid
        document.getElementById('time-text').textContent = timeLeft; // Opdater teksten i cirklen

        const offset = circumference - (timeLeft / 30) * circumference; // Beregn ny offset baseret på den tilbageværende tid
        timerCircle.setAttribute('stroke-dashoffset', offset); // Opdater cirkelens offset

        if (timeLeft <= 0) {
            clearInterval(countdown);
            showCompletion(); // Gå til completion hvis tiden løber ud
        }
    }, 1000);
}

// Vis spørgsmål
function showQuestion() {
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options-container');
    const feedbackElement = document.getElementById('feedback');
    const progressBar = document.getElementById('progress-bar');

    const currentQuestion = questions[currentQuestionIndex];

    // Opdater spørgsmål og feedback
    questionElement.innerText = currentQuestion.question;
    feedbackElement.innerText = '';

    // Opdater progress bar
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = progressPercentage + '%';

    // Fjern gamle knapper
    optionsContainer.innerHTML = '';

    // Tilføj nye knapper til hvert svar
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.onclick = () => checkAnswer(index, button);
        optionsContainer.appendChild(button);
    });
}


// Tjek svar
function checkAnswer(selectedIndex, button) {
    const currentQuestion = questions[currentQuestionIndex];
    const buttons = document.getElementById('options-container').children;
    const feedbackElement = document.getElementById('feedback');

    let timeChange = 0; // Variabel til at holde styr på den aktuelle ændring

    // Kontrollér om svaret er korrekt
    if (selectedIndex === currentQuestion.correct) {
        button.classList.add('correct');
        feedbackElement.innerText = "Korrekt! " + currentQuestion.feedback;
        correctAnswersCount++; // Incrementer tælleren for rigtige svar
        timeChange += 3; // Tilføj 3 sekunder ved korrekt svar
        timeLeft += 3; // Opdater den samlede tid

        // Opdater visning af tidændring
        const timeChangeText = `+${timeChange} s`;
        document.getElementById('time-text').textContent = timeChangeText; // Vis tidændring
        document.getElementById('time-text').style.fill = '#4caf50'; // Grøn farve
    } else {
        button.classList.add('incorrect');
        buttons[currentQuestion.correct].classList.add('correct');
        feedbackElement.innerText = "Forkert! " + currentQuestion.feedback;
        timeChange -= 5; // Træk 5 sekunder fra ved forkert svar
        timeLeft -= 5; // Opdater den samlede tid

        // Opdater visning af tidændring
        const timeChangeText = `${timeChange} s`;
        document.getElementById('time-text').textContent = timeChangeText; // Vis tidændring
        document.getElementById('time-text').style.fill = '#f44336'; // Rød farve
    }

    // Deaktiver knapper for at forhindre flere klik
    Array.from(buttons).forEach(btn => btn.disabled = true);

    // Stop timeren
    clearInterval(countdown);

    // Vis knappen "Næste"
    document.getElementById('next-btn').style.display = 'block';
}


// Gå til næste spørgsmål
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        document.getElementById('next-btn').style.display = 'none';
        startTimer(); // Timeren fortsætter fra den tid, den var på.
    } else {
        showCompletion();
    }
}

// Vis resultattavle
function showCompletion() {
    clearInterval(countdown); // Stop timeren
    document.getElementById('question').innerText = "Quiz afsluttet! Tak for din deltagelse.";
    document.getElementById('options-container').innerHTML = '';
    document.getElementById('feedback').innerText = '';
    document.getElementById('next-btn').style.display = 'none';

    // Vis resultattavle
    const resultElement = document.getElementById('result');
    resultElement.innerText = `Du havde ${correctAnswersCount} rigtige svar ud af ${questions.length}.`;
    resultElement.style.display = 'block'; // Vis resultattavlen

    // Vis knappen til at gå tilbage til forsiden
    document.getElementById('home-btn').style.display = 'block';
}

// Gå tilbage til forsiden
function goToHome() {
    document.getElementById('quiz-container').style.display = 'none'; // Skjul quiz-container
    document.getElementById('home-container').classList.add('active'); // Vis forsiden
    currentQuestionIndex = 0; // Reset spørgsmål index
    correctAnswersCount = 0; // Reset tæller for rigtige svar
    timeLeft = 30; // Reset timeren
    clearInterval(countdown); // Stop timeren, hvis den kører

    // Skjul knappen "Tilbage til Forside" igen
    document.getElementById('home-btn').style.display = 'none';
}

// Billede-section
document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll('.button-item img');

    function two() {
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.flex = "50%"; // Gør hver button-item til 50% bredde
        }
    }

    // Kald funktionen for at sikre to billeder vises side om side
    two();
});
