// === INTRO ANIMATION ===
const overlay = document.querySelector('.intro-overlay');

setTimeout(() => {
    overlay.classList.add('hidden');
    document.body.classList.remove('is-intro');
    overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
}, 800);


// === YOUTUBE STATS ===
// YT_API_KEY and YT_CHANNEL_ID are loaded from config.js (gitignored)
async function fetchYouTubeStats() {
    if (YT_API_KEY === 'YOUR_API_KEY_HERE' || YT_CHANNEL_ID === 'YOUR_CHANNEL_ID_HERE') return;
    try {
        const res  = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${YT_CHANNEL_ID}&key=${YT_API_KEY}`);
        const data = await res.json();
        const stats = data.items?.[0]?.statistics;
        if (!stats) return;
        const fmt = n => Number(n).toLocaleString();
        document.getElementById('yt-subs').textContent   = fmt(stats.subscriberCount);
        document.getElementById('yt-views').textContent  = fmt(stats.viewCount);
        document.getElementById('yt-videos').textContent = fmt(stats.videoCount);
    } catch (e) {
        console.error('YouTube stats fetch failed:', e);
    }
}

fetchYouTubeStats();


// === GITHUB STARS ===
async function fetchGitHubStars() {
    const cards = document.querySelectorAll('.proj-card[data-gh-repo]');
    await Promise.all([...cards].map(async card => {
        const repo = card.dataset.ghRepo;
        try {
            const res = await fetch(`https://api.github.com/repos/${repo}`);
            const data = await res.json();
            const stars = data.stargazers_count;
            if (typeof stars === 'number') {
                card.querySelector('.proj-stars').textContent = `★ ${stars.toLocaleString()}`;
            }
        } catch (e) {}
    }));
}

fetchGitHubStars();

// === SKILLS ===
const skillGroups = [
    {
        title: 'Programming',
        items: [
            { name: 'Python',      level: 8 },
            { name: 'C++',         level: 6 },
            { name: 'Java',        level: 6 },
            { name: 'SQL',         level: 6 },
            { name: 'HTML / CSS',  level: 4 },
            { name: 'JavaScript',  level: 3 },
            { name: 'Kubernetes', level: 3 },
            { name: 'Docker', level: 3 },
        ]
    },
    {
        title: 'Data Engineering',
        items: [
            { name: 'PySpark',          level: 8 },
            { name: 'ETL',              level: 8 },
            { name: 'Data Warehousing', level: 8 },
            { name: 'Data Pipelines',   level: 7 },
            { name: 'Azure Databricks', level: 7 },
            { name: 'PowerBI',          level: 6 },
        ]
    },
    {
        title: 'Practices',
        items: [
            { name: 'Scrum', level: 8 },
            { name: 'GIT',   level: 7 },
        ]
    },
    {
        title: 'Languages',
        items: [
            { name: 'Czech',   level: 10, tag: 'C2' },
            { name: 'English', level: 9,  tag: 'C1'     },
            { name: 'German',  level: 9,  tag: 'C1'     },
            { name: 'French',  level: 2,  tag: 'B1'     },
        ]
    },
];

const skillsContent = document.getElementById('skills-content');
if (skillsContent) {
    const pips = n => Array.from({ length: 10 }, (_, i) =>
        `<div class="pip${i < n ? ' filled' : ''}"></div>`
    ).join('');

    skillsContent.innerHTML = `<div class="skills-sections">${
        skillGroups.map(g => `
            <div class="skill-group">
                <div class="skill-group-title">${g.title}</div>
                <div class="skill-rows">${
                    g.items.map(s => `
                        <div class="skill-row">
                            <span class="skill-name">${s.name}</span>
                            <div class="skill-pips">${pips(s.level)}</div>
                            ${s.tag
                                ? `<span class="skill-tag">${s.tag}</span>`
                                : `<span class="skill-num">${s.level}</span>`}
                        </div>`
                    ).join('')}
                </div>
            </div>`
        ).join('')}
    </div>`;
}

// === NAV ===
const navBtns = document.querySelectorAll('.nav-btn');
const panels  = document.querySelectorAll('.panel');

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        navBtns.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const target = document.getElementById(btn.dataset.target);
        if (target) target.classList.add('active');
    });
});
