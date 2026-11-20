const membersUrl = 'data/members.json';
const container = document.getElementById('members-container');
let allMembers = [];

const icons = {
    pin: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
    phone: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,
    menu: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`,
    close: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
};

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

    members.forEach((member, index) => {
        const card = document.createElement('section');
        card.className = 'member-card';
        card.style.animationDelay = `${index * 40}ms`;

        const badge = getMembershipLabel(member.membership);

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="200" height="140">
            <div class="member-info">
                <span class="member-badge ${badge.className}">${badge.text}</span>
                <h2>${member.name}</h2>
                <p class="member-sector">${member.sector}</p>
                <p class="member-spec">${member.specialization}</p>
                <p class="member-address">${icons.pin} <span>${member.address}</span></p>
                <p class="member-phone">${icons.phone} <span>${member.phone}</span></p>

                <a href="${member.website}" target="_blank" rel="noopener">Visit Website ↗</a>
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
    const isOpen = primaryNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    menuBtn.innerHTML = isOpen ? icons.close : icons.menu;
});

// Dynamic Footer Dates
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

getMembers();
