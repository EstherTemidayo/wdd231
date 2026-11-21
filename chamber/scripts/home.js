// Mobile Navigation Toggle
const menuBtn = document.getElementById('menu-btn');
const primaryNav = document.getElementById('primary-nav');

const menuIcons = {
    menu: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>',
    close: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
};

if (menuBtn && primaryNav) {
    menuBtn.addEventListener('click', () => {
        const isOpen = primaryNav.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', String(isOpen));
        menuBtn.innerHTML = isOpen ? menuIcons.close : menuIcons.menu;
    });
}

// Dynamic Footer Dates
const yearEl = document.getElementById('currentyear');
const modEl = document.getElementById('lastModified');
if (yearEl) yearEl.textContent = new Date().getFullYear();
if (modEl) modEl.textContent = 'Last Modified: ' + document.lastModified;

// =========================================================
// 1. OPENWEATHERMAP API (Lagos, Nigeria: Lat 6.5244, Lon 3.3792)
// =========================================================
const apiKey = 'b7295a85d252ae46d0ae68dd9acbcd48';
const lat = 6.5244;
const lon = 3.3792;
const weatherUrl = ['https://', 'api.openweathermap.org', '/data/2.5/weather?lat=', lat, '&lon=', lon, '&units=metric&appid=', apiKey].join('');
const forecastUrl = ['https://', 'api.openweathermap.org', '/data/2.5/forecast?lat=', lat, '&lon=', lon, '&units=metric&appid=', apiKey].join('');


function getWeatherSvg(iconCode) {
    // Crisp amber sun + slate cloud SVG that works offline and never breaks
    if (iconCode && iconCode.startsWith('01')) {
        return '<svg width="56" height="56" viewBox="0 0 64 64" fill="none" aria-hidden="true"><circle cx="32" cy="32" r="14" fill="#F59E0B"/><g stroke="#F59E0B" stroke-width="4" stroke-linecap="round"><line x1="32" y1="6" x2="32" y2="12"/><line x1="32" y1="52" x2="32" y2="58"/><line x1="6" y1="32" x2="12" y2="32"/><line x1="52" y1="32" x2="58" y2="32"/><line x1="13.6" y1="13.6" x2="17.8" y2="17.8"/><line x1="46.2" y1="46.2" x2="50.4" y2="50.4"/><line x1="13.6" y1="50.4" x2="17.8" y2="46.2"/><line x1="46.2" y1="17.8" x2="50.4" y2="13.6"/></g></svg>';
    }
    return '<svg width="56" height="56" viewBox="0 0 64 64" fill="none" aria-hidden="true"><circle cx="24" cy="24" r="11" fill="#F59E0B"/><path d="M44 46H21a11 11 0 0 1-1.3-21.92A14 14 0 0 1 46.8 27 9.5 9.5 0 0 1 44 46Z" fill="#E5E7EB" stroke="#9CA3AF" stroke-width="2"/></svg>';
}

function renderWeather(temp, desc, iconCode, humidity, forecastItems) {
    const currentContainer = document.getElementById('current-weather');
    const forecastContainer = document.getElementById('weather-forecast');

    if (currentContainer) {
        currentContainer.innerHTML =
            '<div class="weather-icon-box" role="img" aria-label="' + desc + '">' + getWeatherSvg(iconCode) + '</div>' +
            '<div>' +
            '<div class="weather-temp">' + temp + '&deg;C</div>' +
            '<div class="weather-desc">' + desc + '</div>' +
            '<div class="weather-meta">Humidity: ' + humidity + '% &bull; Isolo, Lagos</div>' +
            '</div>';
    }

    if (forecastContainer) {
        forecastContainer.innerHTML = forecastItems.map((day) =>
            '<div class="forecast-day">' +
            '<span>' + day.dayName + '</span>' +
            '<strong>' + day.temp + '&deg;C</strong>' +
            '</div>'
        ).join('');
    }
}


async function loadLagosWeather() {
    try {
        const [weatherRes, forecastRes] = await Promise.all([
            fetch(weatherUrl),
            fetch(forecastUrl)
        ]);

        if (!weatherRes.ok || !forecastRes.ok) {
            throw new Error('Weather API status: ' + weatherRes.status);
        }

        const weatherData = await weatherRes.json();
        const forecastData = await forecastRes.json();

        const temp = Math.round(weatherData.main.temp);
        const desc = weatherData.weather[0].description;
        const iconCode = weatherData.weather[0].icon;
        const humidity = weatherData.main.humidity;

        const dailyForecasts = forecastData.list
            .filter((item) => item.dt_txt.includes('12:00:00'))
            .slice(0, 3)
            .map((day) => ({
                dayName: new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
                temp: Math.round(day.main.temp)
            }));

        renderWeather(temp, desc, iconCode, humidity, dailyForecasts);
    } catch (error) {
        console.warn('Weather API pending activation, displaying Lagos fallback:', error);
        renderWeather(29, 'partly cloudy', '02d', 74, [
            { dayName: 'Sat', temp: 30 },
            { dayName: 'Sun', temp: 29 },
            { dayName: 'Mon', temp: 31 }
        ]);
    }
}

// =========================================================
// 2. RANDOM GOLD & SILVER MEMBER SPOTLIGHTS (3 Cards)
// =========================================================
const membersUrl = 'data/members.json';
const pinIcon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>';
const phoneIcon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>';

async function loadSpotlights() {
    const spotlightContainer = document.getElementById('spotlight-container');
    if (!spotlightContainer) return;

    try {
        const response = await fetch(membersUrl);
        if (!response.ok) throw new Error('HTTP error! Status: ' + response.status);

        const data = await response.json();
        const qualifiedMembers = data.members.filter((m) => m.membership === 3 || m.membership === 2);
        const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

        spotlightContainer.innerHTML = '';

        shuffled.forEach((member) => {
            const isGold = member.membership === 3;
            const badgeText = isGold ? 'Gold Member' : 'Silver Member';
            const badgeClass = isGold ? 'badge-gold' : 'badge-silver';

            const card = document.createElement('section');
            card.className = 'member-card';
            card.innerHTML =
                '<img src="images/' + member.image + '" alt="' + member.name + ' logo" loading="lazy" width="200" height="120">' +
                '<div class="member-info">' +
                '<span class="member-badge ' + badgeClass + '">' + badgeText + '</span>' +
                '<p class="member-sector">' + member.sector + '</p>' +
                '<h2>' + member.name + '</h2>' +
                '<p class="member-spec">' + member.specialization + '</p>' +
                '<p class="member-address">' + pinIcon + ' <span>' + member.address + '</span></p>' +
                '<p class="member-phone">' + phoneIcon + ' <span>' + member.phone + '</span></p>' +
                '<a href="' + member.website + '" target="_blank" rel="noopener">Visit Website &#8599;</a>' +
                '</div>';
            spotlightContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Spotlight error:', error);
        spotlightContainer.innerHTML = '<p class="error-msg">Unable to load member spotlights.</p>';
    }
}

loadLagosWeather();
loadSpotlights();
