// Portfolio JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Navigation elements
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');

    // Project elements
    const projectItems = document.querySelectorAll('.project-item');
    const projectDetails = document.querySelectorAll('.project-detail');

    // Language progress bars
    const progressFills = document.querySelectorAll('.progress-fill');

    // Footer links
    const footerLinks = document.querySelectorAll('.footer-links a');

    // Navigation scroll effects
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Back to top button visibility
    function handleBackToTopVisibility() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    // Handle scroll events
    window.addEventListener('scroll', function() {
        handleNavbarScroll();
        handleBackToTopVisibility();
    });

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Smooth scrolling function
    function smoothScrollTo(targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // Navigation links smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            // Scroll to section
            smoothScrollTo(targetId);
        });
    });

    // Footer links smooth scrolling
    footerLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                smoothScrollTo(href);
            });
        }
    });

    // Back to top functionality
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Project selection functionality - Fixed
    function showProject(projectIndex) {
        // Hide all project details
        projectDetails.forEach(detail => {
            detail.classList.remove('active');
        });

        // Remove active class from all project items
        projectItems.forEach(item => {
            item.classList.remove('active');
        });

        // Show selected project detail or placeholder
        let selectedDetail;
        if (projectIndex === 'placeholder') {
            selectedDetail = document.getElementById('project-placeholder');
        } else {
            selectedDetail = document.getElementById(`project-${projectIndex}`);
        }
        
        if (selectedDetail) {
            selectedDetail.classList.add('active');
        }

        // Add active class to selected project item
        const selectedItem = document.querySelector(`[data-project="${projectIndex}"]`);
        if (selectedItem) {
            selectedItem.classList.add('active');
        }
    }

    // Add click event listeners to project items - Fixed
    projectItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const projectIndex = this.getAttribute('data-project');
            showProject(projectIndex);
        });
    });

    // Initialize first project as active
    showProject('0');

    // Animate progress bars when languages section comes into view
    function animateProgressBars() {
        const languagesSection = document.getElementById('languages');
        if (!languagesSection) return;
        
        const sectionTop = languagesSection.offsetTop;
        const sectionHeight = languagesSection.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;

        // Check if languages section is in viewport
        if (scrollTop + windowHeight > sectionTop && scrollTop < sectionTop + sectionHeight) {
            progressFills.forEach(fill => {
                const targetWidth = fill.getAttribute('data-width');
                if (targetWidth) {
                    fill.style.width = targetWidth + '%';
                }
            });
        }
    }

    // Add scroll listener for progress bar animation
    window.addEventListener('scroll', animateProgressBars);

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Fix CTA buttons in hero section
    const emailButton = document.querySelector('a[href^="mailto:"]');
    const linkedinButton = document.querySelector('a[href*="linkedin"]');

    if (emailButton) {
        emailButton.addEventListener('click', function(e) {
            // Allow default email behavior
            console.log('Opening email client');
        });
    }

    if (linkedinButton) {
        linkedinButton.addEventListener('click', function(e) {
            // Ensure it opens in new tab
            if (!this.getAttribute('target')) {
                this.setAttribute('target', '_blank');
            }
        });
    }

    // Add click handlers for contact items that aren't already links
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        const existingLink = item.querySelector('a');
        if (!existingLink) {
            const text = item.textContent.trim();
            if (text.includes('@')) {
                item.style.cursor = 'pointer';
                item.addEventListener('click', function() {
                    const email = text.split(' ').find(part => part.includes('@'));
                    if (email) {
                        window.open(`mailto:${email}`, '_blank');
                    }
                });
            } else if (text.includes('+91')) {
                item.style.cursor = 'pointer';
                item.addEventListener('click', function() {
                    const phone = text.split(' ').find(part => part.includes('+91'));
                    if (phone) {
                        window.open(`tel:${phone}`, '_blank');
                    }
                });
            }
        }
    });

    // Certification link handlers
    const certLinks = document.querySelectorAll('.cert-link');
    certLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real implementation, these would link to actual credentials
            alert('This would open the actual certification credential page.');
        });
    });

    // Active nav link highlighting based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100; // Offset for fixed header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('nav-active'));
                // Add active class to current section's nav link
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('nav-active');
                }
            }
        });
    }

    // Add scroll listener for active nav link
    window.addEventListener('scroll', updateActiveNavLink);

    // Initialize on page load
    handleNavbarScroll();
    handleBackToTopVisibility();
    updateActiveNavLink();
    
    // Trigger progress bar animation if languages section is already visible
    setTimeout(animateProgressBars, 500);

    // Add hover effects for cards
    const cards = document.querySelectorAll('.experience-card, .certification-card, .education-card, .achievement-card, .skill-category');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add loading animation for stats
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const finalValue = stat.textContent;
            const numericValue = parseInt(finalValue.replace(/\D/g, ''));
            
            if (!isNaN(numericValue)) {
                let currentValue = 0;
                const increment = numericValue / 30; // 30 frames for animation
                const suffix = finalValue.replace(/\d/g, '');
                
                function updateStat() {
                    if (currentValue < numericValue) {
                        currentValue += increment;
                        stat.textContent = Math.floor(currentValue) + suffix;
                        requestAnimationFrame(updateStat);
                    } else {
                        stat.textContent = finalValue;
                    }
                }
                
                updateStat();
            }
        });
    }

    // Trigger stats animation when experience section comes into view
    const experienceSection = document.getElementById('experience');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (experienceSection) {
        statsObserver.observe(experienceSection);
    }

    // Handle window resize for responsive behavior
    window.addEventListener('resize', function() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key to close mobile menu
        if (e.key === 'Escape') {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
        
        // Arrow keys for project navigation
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            const activeProject = document.querySelector('.project-item.active');
            if (activeProject) {
                const allProjects = Array.from(projectItems);
                const currentIndex = allProjects.indexOf(activeProject);
                
                let nextIndex;
                if (e.key === 'ArrowDown') {
                    nextIndex = (currentIndex + 1) % allProjects.length;
                } else {
                    nextIndex = (currentIndex - 1 + allProjects.length) % allProjects.length;
                }
                
                allProjects[nextIndex].click();
                e.preventDefault();
            }
        }
    });

    // Ensure all external links open in new tabs
    const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="https"]');
    externalLinks.forEach(link => {
        if (!link.getAttribute('target')) {
            link.setAttribute('target', '_blank');
        }
    });

    console.log('Portfolio JavaScript loaded successfully');
});