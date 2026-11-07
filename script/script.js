// 1. Mobile Menu Toggle Logic
const menuButton = document.getElementById('menu-btn');
const navbar = document.getElementById('navbar');

if (menuButton && navbar) {
    menuButton.addEventListener('click', function () {
        // This adds or removes the "open" class from the CSS media query
        navbar.classList.toggle('open');

        // Changes the button text to an X when open, back to ☰ when closed
        if (navbar.classList.contains('open')) {
            menuButton.textContent = 'X';
        } else {
            menuButton.textContent = '☰';
        }
    });
}

// 2. Dynamic Footer Dates Logic
// Sets the current year automatically inside the <span id="currentyear"></span>
const currentYearSpan = document.getElementById('currentyear');
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

// Sets the document's last modified timestamp inside <p id="lastModified"></p>
const lastModifiedParagraph = document.getElementById('lastModified');
if (lastModifiedParagraph) {
    lastModifiedParagraph.textContent = "Last Modification: " + document.lastModified;
}
