// Scavenger hunt — called by data.js via initScavenger() or loadCSV()

function initScavenger(items, storageKey) {
    const savedData = JSON.parse(localStorage.getItem(storageKey)) || {};
    const huntContainer = document.getElementById('scavenger-hunt');

    items.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'clue-row';
        const saved = savedData[index] || '';
        row.innerHTML = `
            <input type="text" placeholder="Name" class="name-input" value="${saved}">
            <span class="clue-text">${item.clue}</span>
        `;
        huntContainer.appendChild(row);

        const input = row.querySelector('.name-input');
        if (item.answer && saved.trim().toLowerCase() === item.answer.trim().toLowerCase()) {
            input.style.backgroundColor = '#c8ffdf';
            input.disabled = true;
        }

        input.addEventListener('input', (e) => {
            saveProgress();
            if (item.answer && e.target.value.trim().toLowerCase() === item.answer.trim().toLowerCase()) {
                confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
                e.target.style.backgroundColor = '#c8ffdf';
                e.target.disabled = true;
            }
        });
    });

    function saveProgress() {
        const data = {};
        document.querySelectorAll('.clue-row').forEach((row, i) => {
            data[i] = row.querySelector('.name-input').value;
        });
        localStorage.setItem(storageKey, JSON.stringify(data));
    }
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}
