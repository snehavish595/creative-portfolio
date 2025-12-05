document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------------
    // 1. Initial Setup & AOS Initialization
    // ---------------------------------------------------
    // Remove 'js-off' class for JS-enhanced styling
    document.documentElement.classList.remove('js-off');
    
    // Initialize AOS (Animation On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 100
    });

    // ---------------------------------------------------
    // 2. Preloader Logic
    // ---------------------------------------------------
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        // Use a slight delay for a smoother user experience
        setTimeout(() => {
            preloader.classList.add('preloader--hidden');
            // Remove element from DOM after transition completes to ensure no blockage
            preloader.addEventListener('transitionend', () => {
                preloader.remove();
            });
        }, 300); 
    });

    // ---------------------------------------------------
    // 3. Navigation & Hamburger Menu (1)
    // ---------------------------------------------------
    const header = document.querySelector('.header');
    const navToggler = document.querySelector('.nav__toggler');
    const navList = document.querySelector('.nav__list');
    const navLinks = document.querySelectorAll('.nav__link');

    // Toggle Mobile Menu
    navToggler.addEventListener('click', () => {
        navList.classList.toggle('nav__list--open');
        navToggler.setAttribute('aria-expanded', navList.classList.contains('nav__list--open'));
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('nav__list--open')) {
                navList.classList.remove('nav__list--open');
                navToggler.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // ---------------------------------------------------
    // 4. Scroll Effects: Active Links & Back-to-Top
    // ---------------------------------------------------
    const sections = document.querySelectorAll('.section[id]');
    const backToTopBtn = document.getElementById('back-to-top');
    const scrollOffset = 80; // Header height

    const scrollActive = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - scrollOffset;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href*='${sectionId}']`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink?.classList.add('nav__link--active');
            } else {
                navLink?.classList.remove('nav__link--active');
            }
        });

        // Back to Top button visibility
        if (scrollY > 500) {
            backToTopBtn.classList.add('back-to-top--visible');
        } else {
            backToTopBtn.classList.remove('back-to-top--visible');
        }
    }

    window.addEventListener('scroll', scrollActive);
    
    // Back to Top click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // ---------------------------------------------------
    // 5. Portfolio Filtering Logic (5)
    // ---------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('filter-btn--active'));
            // Add active class to clicked button
            button.classList.add('filter-btn--active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const isFiltered = filterValue === 'all' || card.classList.contains(filterValue);
                
                // Use a transition/opacity effect for modern filtering
                if (isFiltered) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 50); // Delay for visual effect
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });


    // ---------------------------------------------------
    // 6. Testimonial Slider (7)
    // ---------------------------------------------------
    const sliderTrack = document.querySelector('.testimonial-slider__track');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    const updateSlider = (index) => {
        const cardWidth = sliderTrack.querySelector('.testimonial-card').offsetWidth;
        const offset = -index * cardWidth;
        sliderTrack.style.transform = `translateX(${offset}px)`;

        dots.forEach((dot, i) => {
            dot.classList.toggle('dot--active', i === index);
        });
        currentSlide = index;
    };
    
    // Handle dot clicks
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideIndex = parseInt(e.target.getAttribute('data-slide'));
            updateSlider(slideIndex);
        });
    });
    
    // Initial call to set up the first slide
    window.addEventListener('resize', () => updateSlider(currentSlide));
    updateSlider(0);


    // ---------------------------------------------------
    // 7. Contact Form Validation & Submission (9)
    // ---------------------------------------------------
   const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const validateForm = (form) => {
        let isValid = true;
        const elements = form.querySelectorAll('input[required], textarea[required]');

        elements.forEach(el => {
            const errorEl = document.getElementById(`${el.name}-error`);
            errorEl.textContent = ''; // Clear previous error

            if (!el.value.trim()) {
                errorEl.textContent = `${el.name.charAt(0).toUpperCase() + el.name.slice(1)} is required.`;
                isValid = false;
            } else if (el.name === 'email' && !validateEmail(el.value)) {
                errorEl.textContent = `Please enter a valid email address.`;
                isValid = false;
            }
        });

        return isValid;
    };

   
    contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    if (!validateForm(this)) {
        formStatus.textContent = 'Please correct the errors.';
        formStatus.style.color = '#FF5555';
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Simulate success (fake delay)
    setTimeout(() => {
        formStatus.textContent = 'Message sent successfully! ';
        formStatus.style.color = '#8B5CF6'; 
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Secure Transmission';
    }, 1000);
});


        
       
     
       
       

})