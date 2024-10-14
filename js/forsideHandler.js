document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll('.button-item img');

    // Funktion til at indlæse billeder et ad gangen uden at blokere andre handlinger
    function loadImageSequentially(index) {
        if (index >= images.length) return; // Stop når alle billeder er indlæst

        const img = images[index];

        // Vent på at billedet indlæses, og tilføj derefter "loaded"-klassen
        img.addEventListener('load', () => {
            img.classList.add('loaded');
            // Indlæs næste billede efter det nuværende
            loadImageSequentially(index + 1);
        });

        // Hvis der sker en fejl ved indlæsning, gå videre til næste billede
        img.addEventListener('error', () => {
            loadImageSequentially(index + 1); // Spring over dette billede
        });

        // Håndter cachede billeder, der allerede er indlæst
        if (img.complete) {
            img.classList.add('loaded');
            loadImageSequentially(index + 1);
        }
    }

    // Start med at indlæse det første billede
    loadImageSequentially(0);
});

// Funktion til at indlæse en ekstern JavaScript-fil
function loadScript(filePath, callback) {
    const script = document.createElement("script");
    script.src = filePath;
    script.onload = function() {
        setTimeout(function() {
            callback();
            document.getElementById("loading-screen").style.display = "none"; // Skjul loadingskærmen efter forsinkelse
        }, 1000); // 1000 millisekunder = 1 sekund
    };

    script.onerror = function() {
        alert('Kunne ikke indlæse quiz-spillet. Tjek stien.');
        document.getElementById("loading-screen").style.display = "none"; // Skjul loadingskærmen ved fejl
    };

    document.body.appendChild(script);
}

// Event listener til at indlæse quiz-spillet, når brugeren klikker på quiz-knappen
document.getElementById("start-quiz").addEventListener("click", function() {
    document.getElementById("loading-screen").style.display = "flex"; // Vis loadingskærmen
    loadScript("js/quiz.js", function() {
        startQuiz(); // Kald quiz-funktionen efter scriptet er indlæst
    });
});






//debug
console.log("Script kører");

document.addEventListener('DOMContentLoaded', function () {
    console.log("DOMContentLoaded event fired");

    const navbar = document.querySelector('.navbar');
    const indicators = document.querySelectorAll('.indicator');

    if (navbar) {
        console.log("Navbar fundet");


// Swipe-funktionalitet til navbar
        document.addEventListener('DOMContentLoaded', function () {
            const navbar = document.querySelector('.navbar');
            const indicators = document.querySelectorAll('.indicator');

            if (navbar) {
                let startX, scrollLeft, isDown = false;

                // Mus-baserede swipe events (til desktop)
                navbar.addEventListener('mousedown', (e) => {
                    isDown = true;
                    startX = e.pageX - navbar.offsetLeft;
                    scrollLeft = navbar.scrollLeft;
                });

                navbar.addEventListener('mouseleave', () => {
                    isDown = false;
                });

                navbar.addEventListener('mouseup', () => {
                    isDown = false;
                });

                navbar.addEventListener('mousemove', (e) => {
                    if (!isDown) return;
                    e.preventDefault();
                    const x = e.pageX - navbar.offsetLeft;
                    const walk = (x - startX) * 2;
                    navbar.scrollLeft = scrollLeft - walk;

                    updateIndicators();
                });

                // Touch-baserede swipe events (til mobil)
                navbar.addEventListener('touchstart', (e) => {
                    isDown = true;
                    startX = e.touches[0].pageX - navbar.offsetLeft;
                    scrollLeft = navbar.scrollLeft;
                });

                navbar.addEventListener('touchend', () => {
                    isDown = false;
                });

                navbar.addEventListener('touchmove', (e) => {
                    if (!isDown) return;
                    e.preventDefault();
                    const x = e.touches[0].pageX - navbar.offsetLeft;
                    const walk = (x - startX) * 2;
                    navbar.scrollLeft = scrollLeft - walk;

                    updateIndicators();
                });

                function updateIndicators() {
                    const scrollPosition = navbar.scrollLeft;
                    const maxScroll = navbar.scrollWidth - navbar.clientWidth;

                    const activeIndex = Math.round((scrollPosition / maxScroll) * (indicators.length - 1));
                    console.log("Scroll Position:", scrollPosition, "Active Index:", activeIndex); // Debugging
                    indicators.forEach((indicator, index) => {
                        indicator.classList.toggle('active', index === activeIndex);
                    });
                }



                updateIndicators();
            }
        });









    } else {
        console.error("Navbar element could not be found.");
    }
});
