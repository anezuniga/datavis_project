window.addEventListener('DOMContentLoaded', (event) => {
    const sections = document.querySelectorAll('.content div[id]');
    const navLinks = document.querySelectorAll('.navbar a');

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
