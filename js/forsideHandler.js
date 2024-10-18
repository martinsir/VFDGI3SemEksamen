document.addEventListener("DOMContentLoaded", function() {
    let stylesheetsLoaded = false;
    const stylesheets = document.styleSheets;

    // Tjek om stylesheets er fuldt indlæst
    try {
        for (let i = 0; i < stylesheets.length; i++) {
            if (stylesheets[i].cssRules) {
                stylesheetsLoaded = true;
            }
        }
    } catch (e) {
        console.warn("Stylesheets are not yet fully loaded.");
    }

    if (stylesheetsLoaded) {
        console.log("Stylesheets loaded, proceeding with DOM manipulation.");
        initForsideHandler(); // Kalder DOM-manipulationen her
    } else {
        window.addEventListener("load", function() {
            console.log("Page fully loaded, executing DOM manipulation.");
            initForsideHandler(); // DOM-manipulation efter fuld indlæsning
        });
    }
});

// Funktion der indeholder al forside-handler logik
function initForsideHandler() {
    console.log("DOMContentLoaded forsideHandler event fired");

    // Indlæs billeder sekventielt
    const images = document.querySelectorAll('.button-item img');
    if (images.length > 0) {
        console.log("Billeder fundet:", images.length);
    } else {
        console.warn("Ingen billeder fundet i forsideHandler");
    }

    function loadImageSequentially(index) {
        if (index >= images.length) return;

        const img = images[index];
        img.addEventListener('load', () => {
            img.classList.add('loaded');
            loadImageSequentially(index + 1);
        });
        img.addEventListener('error', () => {
            console.error("Fejl ved indlæsning af billede:", img.src);
            loadImageSequentially(index + 1);
        });
        if (img.complete) {
            img.classList.add('loaded');
            loadImageSequentially(index + 1);
        }
    }
    loadImageSequentially(0);

    // Event listener for quiz-knappen
    const quizButton = document.getElementById("start-quiz");
    if (quizButton) {
        console.log("Quiz button fundet.");
        quizButton.addEventListener("click", function () {
            console.log("Quiz button clicked.");

            document.getElementById("loading-screen").style.display = "flex";

            loadScript("js/quiz.js", function () {
                setTimeout(function () {
                    document.getElementById("loading-screen").style.display = "none";
                    startQuiz(); // Start the quiz
                }, 1000);
            });
        });
    } else {
        console.warn('Quiz button with ID "start-quiz" not found. Ignoring quiz logic.');
    }

    // Funktion til at loade quiz.js scriptet asynkront
    function loadScript(url, callback) {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.async = true; // Load asynchronously
        script.onload = function () {
            console.log(`Script ${url} loaded successfully`);
            callback();
        };
        script.onerror = function () {
            alert('Kunne ikke loade quiz. Tjek quiz.js filens sti.');
            document.getElementById("loading-screen").style.display = "none";
        };
        document.head.appendChild(script);
    }

   

    console.log("ForsideHandler.js fuldført."); // Log for at vise, at hele scriptet kørte
}
