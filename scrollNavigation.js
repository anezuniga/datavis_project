document.addEventListener('DOMContentLoaded', function(event) {
    const sections = document.querySelectorAll('.content div[id]');
    const navLinks = document.querySelectorAll('.navbar a');
    
    // Smooth scroll with offset function
    const scrollWithOffset = (el) => {
        const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
        const yOffset = -150; // Adjust this value based on the height of your fixed header
        window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
    };

    // Modify nav link behavior to include custom scroll offset
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                scrollWithOffset(targetElement);
            }
        });
    });

    const activeLink = (id) => {
        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
                link.classList.add('active');
            }
        });
    };

    let options = {
        rootMargin: '0px',
        threshold: 0.5 // 50% of the element should be visible
    };

    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activeLink(entry.target.id);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

});
