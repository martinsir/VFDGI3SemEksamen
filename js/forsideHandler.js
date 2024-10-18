document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded event fired");

    // Funktion til at loade eksterne scripts dynamisk
    function loadScript(src, callback) {
        console.log("Forsøger at loade script fra: " + src);
        var script = document.createElement('script');
        script.src = src;
        script.onload = function() {
            console.log('Scriptet er indlæst fra: ' + src);
            callback(); // Kald callback når scriptet er loaded
            document.getElementById("loading-screen").style.display = "none"; // Skjul loading screen når scriptet er færdig indlæst
        };
        script.onerror = function() {
            console.error('Fejl: Kunne ikke loade scriptet fra ' + src);
            alert('Kunne ikke loade quiz. Tjek stien til quiz.js.');
            document.getElementById("loading-screen").style.display = "none"; // Skjul loading screen ved fejl
        };
        document.head.appendChild(script);
    }

    // Indlæs billeder sekventielt
    const images = document.querySelectorAll('.button-item img');

    function loadImageSequentially(index) {
        if (index >= images.length) return;

        const img = images[index];
        img.addEventListener('load', () => {
            img.classList.add('loaded');
            loadImageSequentially(index + 1);
        });
        img.addEventListener('error', () => {
            loadImageSequentially(index + 1);
        });
        if (img.complete) {
            img.classList.add('loaded');
            loadImageSequentially(index + 1);
        }
    }

    loadImageSequentially(0); // Start indlæsning af billeder

    // Event listener for quiz-knappen
    const quizButton = document.getElementById("start-quiz");
    if (quizButton) {
        quizButton.addEventListener("click", function () {
            document.getElementById("loading-screen").style.display = "flex"; // Vis loading screen
            loadScript("js/quiz.js", function () {
                startQuiz(); // Start quiz når quiz.js er loaded
                document.getElementById("loading-screen").style.display = "none"; // Skjul loading screen når quiz starter
            });
        });
    } else {
        console.error('Quiz knappen med ID "start-quiz" blev ikke fundet.');
    }
});
