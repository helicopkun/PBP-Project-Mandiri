const btnOpen = document.getElementById('btnOpen');
const panelWrap = document.getElementById('panelWrap');
const sound = new Audio('/audio.ogg');

const hour = document.getElementById('hours')
const day = document.getElementById('days')
const month = document.getElementById('months')
const year = document.getElementById('years')

sound.preload = 'auto';
sound.loop = true;

btnOpen.addEventListener('click', () => {
    panelWrap.classList.add('opened');
    sound.play();
})


const target = new Date('2029-09-09T00:00:00');
const pad = n => String(n).padStart(2, '0');

function updateTimer() {
    const now = new Date();
    let years = target.getFullYear() - now.getFullYear();
    let months = target.getMonth() - now.getMonth();
    let days = target.getDate() - now.getDate();
    let hours = target.getHours() - now.getHours(); 

    if (hours < 0) {
        hours += 24;
        days--;
    }

    if (days < 0) {
        months--;
        days += new Date(target.getFullYear(), target.getMonth(), 0).getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }
    
    hour.textContent = pad(hours);
    day.textContent = pad(days);
    month.textContent = pad(months);
    year.textContent = pad(years);
}

updateTimer();
const timer = setInterval(updateTimer, 3600000);



const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else if (entry.boundingClientRect.top > 0) {
        entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.2 });   // 20% of the element must be visible

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));