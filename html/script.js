// === INTRO ANIMATION ===
const overlay = document.querySelector('.intro-overlay');

setTimeout(() => {
    overlay.classList.add('hidden');
    document.body.classList.remove('is-intro');
    overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
}, 800);


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
