document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded event fired");

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

    loadImageSequentially(0);

    // Event listener for quiz-knappen
    document.getElementById("start-quiz").addEventListener("click", function () {
        document.getElementById("loading-screen").style.display = "flex";
        loadScript("js/quiz.js", function () {
            startQuiz();
        });
    });

    // Swipe-funktionalitet til navbar
    window.addEventListener("load", function () {
        console.log("Window fully loaded");

        // Swipe-funktionalitet til navbar
        const navbar = document.querySelector('.navbar');
        const leftArrow = document.querySelector('.left-arrow');

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
                updateArrows();
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
                updateArrows();
            });

            // Blink venstre pil ved indlæsning og skjul efter 3 sekunder
            setTimeout(() => {
                leftArrow.style.opacity = '0'; // Skjul venstre pil
            }, 3000);

            function updateArrows() {
                const scrollPosition = navbar.scrollLeft;
                const maxScroll = navbar.scrollWidth - navbar.clientWidth;

                if (scrollPosition > 0) {
                    leftArrow.style.opacity = '0'; // Skjul venstre pil når man har scrollet
                }
            }
        } else {
            console.error("Navbar element could not be found.");
        }
    });

});