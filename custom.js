const btnOpen = document.getElementById('btnOpen');
const panelWrap = document.getElementById('panelWrap');
const sound = new Audio('/audio.ogg');

const hour = document.getElementById('hours')
const day = document.getElementById('days')
const month = document.getElementById('months')
const year = document.getElementById('years')


sound.volume = 0.6;
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



const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
    } else if (entry.boundingClientRect.top > 0) {
        entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('.btnNav').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('href');
    const section = document.querySelector(id);
    if (!section) return;

    const r = section.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) return;

    const all = document.querySelectorAll('.reveal');
    const skipped = [];
    const replay = [];

    all.forEach(el => {
      if (section.contains(el)) {
        replay.push(el);
      } else if (section.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_PRECEDING) {
        skipped.push(el);
      }
    });
    skipped.forEach(el => el.style.transition = 'none');
    replay.forEach(el => el.style.transition = 'none');

    skipped.forEach(el => el.classList.add('visible'));
    replay.forEach(el => el.classList.remove('visible'));

    void section.offsetWidth; //magic for immediate execution

    skipped.forEach(el => el.style.transition = '');
    replay.forEach(el => el.style.transition = '');
  });
});

