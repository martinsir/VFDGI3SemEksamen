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
///////////////////////////////////////////Quiz Questions END//////////////////////////////////////


/////////////////////////////////////////////////Logic//////////////////////////////////////
document.addEventListener("DOMContentLoaded", function() {
    const timerCanvas = document.getElementById('timerCanvas');
    const ctx = timerCanvas.getContext('2d');
    let currentQuestionIndex = 0;
    let correctAnswersCount = 0;
    let countdown; // Variable for at holde styr på nedtællingen
    let timeLeft = 30; // Global variable for at holde styr på resterende tid
    const totalTime = 30; // Total tid for nedtælling

    function startQuiz() {
        // Skjul startsiden og vis quiz-sektionen
        document.getElementById('home-container').classList.remove('active');
        document.getElementById('home-container').style.display = 'none';

        document.getElementById('quiz-container').classList.add('active');
        document.getElementById('quiz-container').style.display = 'block';

        // Vis progress-baren og timeren
        document.getElementById('progress-container').style.display = 'block';
        timerCanvas.style.display = 'block';

        // Skjul "Gå tilbage til forsiden"-knappen
        document.getElementById('back-btn').style.display = 'none';

        // Nulstil tiden til 30 sekunder, når quizzen starter
        timeLeft = 30;

        // Start timeren og animationen
        startTimer();

        // Start quizzen ved at vise første spørgsmål
        showQuestion();
    }

    function startTimer() {
        if (countdown) {
            clearInterval(countdown);
        }

        countdown = setInterval(() => {
            timeLeft--;
            drawTimer();
            if (timeLeft <= 0) {
                clearInterval(countdown);
                timeIsUp();
            }
        }, 1000);

        drawTimer(); // Start med at tegne timeren
    }

    function drawTimer() {
        const radius = 70;
        const lineWidth = 10;

        ctx.clearRect(0, 0, timerCanvas.width, timerCanvas.height);
        ctx.beginPath();
        ctx.arc(timerCanvas.width / 2, timerCanvas.height / 2, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = '#f4f4f4';
        ctx.lineWidth = lineWidth;
        ctx.stroke();

        const startAngle = -0.5 * Math.PI;
        const endAngle = startAngle + (2 * Math.PI) * (timeLeft / totalTime);
        ctx.beginPath();
        ctx.arc(timerCanvas.width / 2, timerCanvas.height / 2, radius, startAngle, endAngle);
        ctx.strokeStyle = '#4caf50';
        ctx.lineWidth = lineWidth;
        ctx.stroke();

        ctx.fillStyle = '#000';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${timeLeft}s`, timerCanvas.width / 2, timerCanvas.height / 2);
    }

    function checkAnswer(selectedIndex, button) {
        const currentQuestion = questions[currentQuestionIndex];
        const buttons = document.getElementById('options-container').children;
        const feedbackElement = document.getElementById('feedback');

        if (selectedIndex === currentQuestion.correct) {
            button.classList.add('correct');
            feedbackElement.innerText = "Korrekt! " + currentQuestion.feedback;
            correctAnswersCount++;
            timeLeft = Math.min(timeLeft + 2, totalTime); // Tilføj tid, men ikke over totalen
            drawTimer();
        } else {
            button.classList.add('incorrect');
            buttons[currentQuestion.correct].classList.add('correct');
            feedbackElement.innerText = "Forkert! " + currentQuestion.feedback;
        }

        Array.from(buttons).forEach(btn => btn.disabled = true);
        document.getElementById('next-btn').style.display = 'block';
        clearInterval(countdown); // Stop nedtællingen
    }

    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            document.getElementById('next-btn').style.display = 'none';
            startTimer();
            showQuestion();
        } else {
            showCompletion(); // Vis resultattavlen, når quizzen er færdig
        }
    }


    function goBackToHome() {
        document.getElementById('quiz-container').classList.remove('active');
        document.getElementById('quiz-container').style.display = 'none';
        document.getElementById('home-container').classList.add('active');
        document.getElementById('home-container').style.display = 'block';
        document.getElementById('progress-container').style.display = 'none';
        timerCanvas.style.display = 'none';
        currentQuestionIndex = 0;
        correctAnswersCount = 0;
        document.getElementById('back-btn').style.display = 'none';
        ctx.clearRect(0, 0, timerCanvas.width, timerCanvas.height);
    }

    function showQuestion() {
        const questionElement = document.getElementById('question');
        const optionsContainer = document.getElementById('options-container');
        const feedbackElement = document.getElementById('feedback');
        const progressBar = document.getElementById('progress-bar');

        const currentQuestion = questions[currentQuestionIndex];
        questionElement.innerText = currentQuestion.question;
        feedbackElement.innerText = '';
        progressBar.style.width = ((currentQuestionIndex + 1) / questions.length) * 100 + '%';
        optionsContainer.innerHTML = '';

        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.innerText = option;
            button.onclick = () => checkAnswer(index, button);
            optionsContainer.appendChild(button);
        });
    }

    function timeIsUp() {
        document.getElementById('question').innerText = "Tiden er løbet ud!";
        document.getElementById('options-container').innerHTML = '';
        document.getElementById('feedback').innerText = `Du havde ${correctAnswersCount} ud af ${questions.length} spørgsmål rigtige. Prøv igen!`;
        document.getElementById('next-btn').style.display = 'none';
        document.getElementById('back-btn').style.display = 'block';
        timerCanvas.style.display = 'none'; // Skjul timeren
    }

    function showCompletion() {
        document.getElementById('question').innerText = "Quiz afsluttet! Tak for din deltagelse.";
        document.getElementById('options-container').innerHTML = '';
        document.getElementById('feedback').innerText = `Du havde ${correctAnswersCount} ud af ${questions.length} spørgsmål rigtige.`;
        document.getElementById('next-btn').style.display = 'none';
        document.getElementById('back-btn').style.display = 'block';
        timerCanvas.style.display = 'none'; // Skjul timeren
    }


    // Gør "startQuiz" funktionen global, så den kan tilgås fra HTML
    window.startQuiz = startQuiz;
    window.nextQuestion = nextQuestion;
    window.goBackToHome = goBackToHome;
});

