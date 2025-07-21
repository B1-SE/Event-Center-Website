document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch and insert HTML
    function includeHTML(url, targetElementId) {
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.text();
            })
            .then(data => {
                const targetElement = document.getElementById(targetElementId);
                if (targetElement) {
                    targetElement.innerHTML = data;

                    // After navbar is inserted, adjust links and setup hamburger
                    if (targetElementId === 'navbar-placeholder') {
                        adjustNavbarLinks();
                        setupHamburgerMenu();
                    }
                }
            })
            .catch(error => console.error('Error fetching ' + url + ':', error));
    }

    // Function to adjust navbar links based on the current page's depth
    function adjustNavbarLinks() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('#navbar-placeholder .nav-links a');
        const logoLink = document.getElementById('logo-link');

        if (logoLink) {
            // Always link logo to homepage
            logoLink.setAttribute('href', currentPath.includes('/pages/') ? '../index.html' : 'index.html');
        }

        navLinks.forEach(link => {
            let href = link.getAttribute('href');
            // Adjust only if we're in /pages and the link doesn't already go up
            if (currentPath.includes('/pages/') && !href.startsWith('../')) {
                // Don't touch absolute URLs (http, https, /)
                if (!/^([a-z]+:)?\/\//i.test(href) && !href.startsWith('/')) {
                    link.setAttribute('href', `../${href}`);
                }
            } else if (!currentPath.includes('/pages/') && href.startsWith('../')) {
                // If we're in root and link goes up a directory, fix it
                link.setAttribute('href', href.replace('../', ''));
            }
        });
    }

    // Function to set up the hamburger menu interaction
    function setupHamburgerMenu() {
        const hamburgerMenu = document.getElementById('hamburger-menu');
        const navLinks = document.getElementById('navbar-links');

        if (hamburgerMenu && navLinks) {
            hamburgerMenu.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                const isExpanded = hamburgerMenu.getAttribute('aria-expanded') === 'true';
                hamburgerMenu.setAttribute('aria-expanded', !isExpanded);
            });
        } else {
            console.warn("Hamburger menu or navigation links not found.");
        }
    }

    // Load the navbar (make sure the path is correct from wherever this script runs)
    includeHTML('/templates/navbar.html', 'navbar-placeholder');
});
