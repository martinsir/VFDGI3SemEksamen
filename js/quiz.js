// quiz.js
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

function showQuestion() {
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options-container');
    const progressElement = document.getElementById('progress');
    const feedbackElement = document.getElementById('feedback');

    const currentQuestion = questions[currentQuestionIndex];

    // Opdater spørgsmål og progress
    questionElement.innerText = currentQuestion.question;
    progressElement.innerText = `Spørgsmål ${currentQuestionIndex + 1} af ${questions.length}`;
    feedbackElement.innerText = '';  // Ryd feedback fra tidligere spørgsmål

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

function checkAnswer(selectedIndex, button) {
    const currentQuestion = questions[currentQuestionIndex];
    const buttons = document.getElementById('options-container').children;
    const feedbackElement = document.getElementById('feedback');

    // Kontrollér om svaret er korrekt
    if (selectedIndex === currentQuestion.correct) {
        button.classList.add('correct');
        feedbackElement.innerText = "Korrekt! " + currentQuestion.feedback;
    } else {
        button.classList.add('incorrect');
        buttons[currentQuestion.correct].classList.add('correct');
        feedbackElement.innerText = "Forkert! " + currentQuestion.feedback;
    }

    // Deaktiver knapper for at forhindre flere klik
    Array.from(buttons).forEach(btn => btn.disabled = true);

    // Vis knappen "Næste"
    document.getElementById('next-btn').style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        document.getElementById('next-btn').style.display = 'none';
    } else {
        showCompletion();
    }
}

function showCompletion() {
    document.getElementById('question').innerText = "Quiz afsluttet! Tak for din deltagelse.";
    document.getElementById('options-container').innerHTML = '';
    document.getElementById('progress').innerText = '';
    document.getElementById('feedback').innerText = '';
    document.getElementById('next-btn').style.display = 'none';
}

function startQuiz() {
    document.getElementById('home-container').classList.remove('active');
    document.getElementById('quiz-container').classList.add('active');
    showQuestion();
}
