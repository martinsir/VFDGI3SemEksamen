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

    // Event listener for quiz-knappen (ensure the element exists before attaching the event)
    const quizButton = document.getElementById("start-quiz");
    if (quizButton) {
        quizButton.addEventListener("click", function () {
            // Show the loading screen only when the quiz button is clicked
            document.getElementById("loading-screen").style.display = "flex";

            // Load the quiz.js script and start the quiz after loading
            loadScript("js/quiz.js", function () {
                setTimeout(function () {
                    // Hide the loading screen once the quiz.js is loaded
                    document.getElementById("loading-screen").style.display = "none";
                    startQuiz(); // Start the quiz
                }, 1000); // Simulate loading delay
            });
        });
    } else {
        console.log('Quiz button with ID "start-quiz" not found. Ignoring quiz logic.');
    }

    // Function to load the quiz script
    function loadScript(url, callback) {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;

        script.onload = function () {
            callback(); // Call the callback once the script is loaded
        };

        script.onerror = function () {
            alert('Could not load the quiz. Check the quiz.js file path.');
            document.getElementById("loading-screen").style.display = "none"; // Hide loading screen in case of an error
        };

        document.head.appendChild(script); // Append the script to the head
    }

    // Swipe functionality for the navbar (ensure elements exist before working with them)
    const navbar = document.querySelector('.navbar');
    const leftArrow = document.querySelector('.left-arrow');

    if (navbar && leftArrow) {
        let startX, scrollLeft, isDown = false;

        // Check if the arrow has already been shown (stored in localStorage)
        const arrowShown = localStorage.getItem('arrowShown');

        if (!arrowShown) {
            // Gradually hide left arrow with CSS transition after 3 seconds
            setTimeout(() => {
                if (leftArrow) {
                    leftArrow.style.opacity = '0'; // Hide left arrow
                    localStorage.setItem('arrowShown', 'true'); // Mark the arrow as shown
                }
            }, 3000);
        } else {
            leftArrow.style.opacity = '0'; // Directly hide the arrow if it has been shown
        }

        // Mouse-based swipe events (for desktop)
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

        // Touch-based swipe events (for mobile)
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

        function updateArrows() {
            const scrollPosition = navbar.scrollLeft;
            if (scrollPosition > 0 && leftArrow) {
                leftArrow.style.opacity = '0'; // Hide left arrow after scrolling
            }
        }
    } else {
        console.log("Navbar or leftArrow element not found. Ignoring navbar logic.");
    }
});
