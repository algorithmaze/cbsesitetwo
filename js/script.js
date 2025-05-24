// Initialize AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Counter Up Animation
    const counterUpElements = document.querySelectorAll('.count-up');
    const options = {
        threshold: 0.7 // Trigger when element is 70% visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetNumber = parseInt(target.getAttribute('data-count'));
                let currentNumber = parseInt(target.textContent);
                const duration = 2000; // Animation duration in milliseconds
                const steps = 50; // Number of steps in the animation
                const increment = (targetNumber - currentNumber) / steps;
                let currentStep = 0;

                const updateCounter = () => {
                    currentStep++;
                    currentNumber = Math.round(currentNumber + increment);
                    target.textContent = currentNumber;

                    if (currentStep < steps) {
                        setTimeout(updateCounter, duration / steps);
                    } else {
                        target.textContent = targetNumber; // Ensure final number is exact
                    }
                };

                updateCounter();
                observer.unobserve(target); // Stop observing once animation starts
            }
        });
    }, options);

    counterUpElements.forEach(element => {
        observer.observe(element);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});