const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Web Frontend Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        completed: false
    }
];

function displayCourses(filteredCourses) {
    const coursesListContainer = document.querySelector('.courses-list');
    const creditsTotalElement = document.querySelector('.credits-total');

    coursesListContainer.innerHTML = "";

    filteredCourses.forEach(course => {
        const courseLink = document.createElement('a');
        courseLink.href = "#";
        courseLink.className = "course-row";
        courseLink.textContent = `${course.subject} ${course.number}`;

        if (course.completed) {
            courseLink.classList.add('completed');
        } else {
            courseLink.classList.add('incomplete');
        }

        coursesListContainer.appendChild(courseLink);
    });

    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    creditsTotalElement.textContent = `The total credits for course listed above is ${totalCredits}`;
}

document.addEventListener("DOMContentLoaded", () => {
    displayCourses(courses);

    const filterButtons = document.querySelectorAll('.filter-button');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.textContent.trim();

            if (filterValue === 'All') {
                displayCourses(courses);
            } else {
                const filtered = courses.filter(course => course.subject === filterValue);
                displayCourses(filtered);
            }
        });
    });

    const menuButton = document.getElementById('menu-btn');
    const navbar = document.getElementById('navbar');

    if (menuButton && navbar) {
        menuButton.addEventListener('click', () => {
            navbar.classList.toggle('open');
            if (navbar.classList.contains('open')) {
                menuButton.textContent = 'X';
            } else {
                menuButton.textContent = '☰';
            }
        });
    }

    const currentYearSpan = document.getElementById('currentyear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const lastModifiedParagraph = document.getElementById('lastModified');
    if (lastModifiedParagraph) {
        lastModifiedParagraph.textContent = "Last Modification: " + document.lastModified;
    }
});
