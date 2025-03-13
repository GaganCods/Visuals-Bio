// Sample work data - Replace with your actual work items
const workItemsRow1 = [
    {
        image: 'assets/work/thumbnail1.png',
        title: 'Billionaires Secret'
    },
    {
        image: 'assets/work/thumbnail2.png',
        title: 'Passive Income'
    },
    {
        image: 'assets/work/thumbnail3.png',
        title: 'Counter Strike'
    },
    {
        image: 'assets/work/thumbnail4.png',
        title: '$10,000 Profit'
    },
    {
        image: 'assets/work/thumbnail5.png',
        title: 'Trading Success'
    }
];

const workItemsRow2 = [
    {
        image: 'assets/work/thumbnail6.png',
        title: 'Like This'
    },
    {
        image: 'assets/work/thumbnail7.png',
        title: 'Bhago BC'
    },
    {
        image: 'assets/work/thumbnail8.png',
        title: 'Secret Trick'
    },
    {
        image: 'assets/work/thumbnail9.png',
        title: 'Vlog #59'
    },
    {
        image: 'assets/work/thumbnail10.png',
        title: 'Trends 2024'
    }
];

const workItemsRow3 = [
    {
        image: 'assets/work/thumbnail11.png',
        title: 'IIT Delhi'
    },
    {
        image: 'assets/work/thumbnail12.png',
        title: 'Innovation'
    },
    {
        image: 'assets/work/thumbnail13.png',
        title: 'Startup Star'
    },
    {
        image: 'assets/work/thumbnail14.png',
        title: 'Founders'
    },
    {
        image: 'assets/work/thumbnail15.png',
        title: 'Zepto Success'
    }
];

// Sample testimonials data - Replace with actual testimonials
const testimonials = [
    {
        name: "John Doe",
        text: "Working with Gagan was amazing! The thumbnails he designed increased my CTR by 200%",
        rating: 5,
        image: "assets/testimonial1.jpg"
    },
    {
        name: "Jane Smith",
        text: "Professional, creative, and delivers on time. Couldn't ask for more!",
        rating: 5,
        image: "assets/testimonial2.jpg"
    }
    // Add more testimonials as needed
];

// Initialize Swiper carousels
document.addEventListener('DOMContentLoaded', function() {
    // Function to create slides
    function createSlides(items) {
        return items.map(item => `
            <div class="swiper-slide">
                <img src="${item.image}" alt="${item.title}">
            </div>
        `).join('');
    }

    // Initialize top carousel
    const topWrapper = document.querySelector('.work-carousel-top .swiper-wrapper');
    topWrapper.innerHTML = createSlides(workItemsRow1.concat(workItemsRow1)); // Double the slides for seamless loop
    new Swiper('.work-carousel-top', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        loop: true,
        speed: 3000, // Faster speed (was 15000)
        allowTouchMove: false,
        autoplay: {
            delay: 1,
            disableOnInteraction: false,
        },
        breakpoints: {
            320: {
                slidesPerView: 2,
            },
            480: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 5,
            }
        }
    });

    // Initialize bottom carousel (reverse direction)
    const bottomWrapper = document.querySelector('.work-carousel-bottom .swiper-wrapper');
    bottomWrapper.innerHTML = createSlides(workItemsRow2.concat(workItemsRow2)); // Double the slides for seamless loop
    new Swiper('.work-carousel-bottom', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        loop: true,
        speed: 8000, // Faster speed (was 15000)
        allowTouchMove: false,
        autoplay: {
            delay: 1,
            disableOnInteraction: false,
            reverseDirection: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 2,
            },
            480: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 5,
            }
        }
    });

    // Initialize last carousel
    const lastWrapper = document.querySelector('.work-carousel-last .swiper-wrapper');
    lastWrapper.innerHTML = createSlides(workItemsRow3.concat(workItemsRow3)); // Double the slides for seamless loop
    new Swiper('.work-carousel-last', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        loop: true,
        speed: 8000, // Faster speed (was 15000)
        allowTouchMove: false,
        autoplay: {
            delay: 1,
            disableOnInteraction: false,
        },
        breakpoints: {
            320: {
                slidesPerView: 2,
            },
            480: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 5,
            }
        }
    });
});

// FAQ Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// Initialize testimonials carousel
function initializeTestimonials() {
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    testimonials.forEach(testimonial => {
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card fade-in';
        testimonialCard.innerHTML = `
            <div class="testimonial-content">
                <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-image">
                <p class="testimonial-text">${testimonial.text}</p>
                <div class="testimonial-author">
                    <h4>${testimonial.name}</h4>
                    <div class="rating">
                        ${'★'.repeat(testimonial.rating)}${'☆'.repeat(5-testimonial.rating)}
                    </div>
                </div>
            </div>
        `;
        testimonialCarousel.appendChild(testimonialCard);
    });
}

// Smooth scroll for navigation links
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

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !e.target.closest('.nav-links') && 
        !e.target.closest('.mobile-menu-btn')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
    }
});

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeTestimonials();
});

