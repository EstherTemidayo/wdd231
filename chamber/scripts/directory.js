const membersUrl = 'data/members.json';
const container = document.getElementById('members-container');
let allMembers = [];

async function getMembers() {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        allMembers = data.members;
        displayMembers(allMembers);
    } catch (error) {
        console.error('Failed to load members:', error);
        container.innerHTML = '<p class="error-msg">Unable to load directory listings at this time.</p>';
    }
}

function getMembershipLabel(level) {
    if (level === 3) return { text: 'Gold Member', className: 'badge-gold' };
    if (level === 2) return { text: 'Silver Member', className: 'badge-silver' };
    return { text: 'Member', className: 'badge-member' };
}

function displayMembers(members) {
    container.innerHTML = '';

    members.forEach((member) => {
        const card = document.createElement('section');
        card.className = 'member-card';

        const badge = getMembershipLabel(member.membership);

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="200" height="140">
            <div class="member-info">
                <span class="member-badge ${badge.className}">${badge.text}</span>
                <h2>${member.name}</h2>
                <p class="member-sector">${member.sector}</p>
                <p class="member-spec">${member.specialization}</p>
                <p class="member-address">${member.address}</p>
                <p class="member-phone">${member.phone}</p>
                <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
            </div>
        `;

        container.appendChild(card);
    });
}

// Grid vs List View Toggle
const gridBtn = document.getElementById('grid-btn');
const listBtn = document.getElementById('list-btn');

gridBtn.addEventListener('click', () => {
    container.classList.add('grid-view');
    container.classList.remove('list-view');
    gridBtn.classList.add('active');
    gridBtn.setAttribute('aria-pressed', 'true');
    listBtn.classList.remove('active');
    listBtn.setAttribute('aria-pressed', 'false');
});

listBtn.addEventListener('click', () => {
    container.classList.add('list-view');
    container.classList.remove('grid-view');
    listBtn.classList.add('active');
    listBtn.setAttribute('aria-pressed', 'true');
    gridBtn.classList.remove('active');
    gridBtn.setAttribute('aria-pressed', 'false');
});

// Sector Filter Buttons
const sectorButtons = document.querySelectorAll('.sector-btn');
sectorButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        sectorButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const selectedSector = btn.dataset.sector;
        if (selectedSector === 'All') {
            displayMembers(allMembers);
        } else {
            const filtered = allMembers.filter((m) => m.sector === selectedSector);
            displayMembers(filtered);
        }
    });
});

// Mobile Navigation Toggle
const menuBtn = document.getElementById('menu-btn');
const primaryNav = document.getElementById('primary-nav');

menuBtn.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
    menuBtn.textContent = primaryNav.classList.contains('open') ? '✕' : '☰';
});

// Dynamic Footer Dates
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

getMembers();
