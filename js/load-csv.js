// Partiful CSV loader — called from data.js via loadCSV(filename, storageKey)

function loadCSV(filename, storageKey) {
    fetch(filename)
        .then(r => {
            if (!r.ok) throw new Error(`Could not load ${filename} (${r.status})`);
            return r.text();
        })
        .then(text => {
            const items = parsePartifulCSV(text);
            if (items.length === 0) {
                console.warn('No scavenger items found. Check that the CSV has a "Fun fact" column and "Going" attendees.');
                return;
            }
            initScavenger(items, storageKey);
        })
        .catch(err => console.error('load-csv.js:', err));
}

function parsePartifulCSV(text) {
    const rows = parseCSV(text);
    if (rows.length < 2) return [];

    const headers = rows[0].map(h => h.trim().toLowerCase());

    const nameCol   = headers.findIndex(h => h === 'name');
    const statusCol = headers.findIndex(h => h === 'status');
    const factCol   = headers.findIndex(h => h.includes('fun fact'));

    if (nameCol === -1 || statusCol === -1 || factCol === -1) {
        console.warn('load-csv.js: could not find required columns. Found:', headers);
        return [];
    }

    return rows.slice(1)
        .filter(row => {
            const status = (row[statusCol] || '').trim().toLowerCase();
            const fact   = (row[factCol]   || '').trim();
            return status === 'going' && fact !== '';
        })
        .map(row => ({
            clue:   row[factCol].trim(),
            answer: row[nameCol].trim(),
        }));
}

// RFC 4180 CSV parser — handles quoted fields, commas inside values, CRLF/LF
function parseCSV(text) {
    const rows = [];
    let row = [], field = '', inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const ch = text[i];

        if (inQuotes) {
            if (ch === '"' && text[i + 1] === '"') { field += '"'; i++; }
            else if (ch === '"')                    { inQuotes = false; }
            else                                    { field += ch; }
        } else if (ch === '"') {
            inQuotes = true;
        } else if (ch === ',') {
            row.push(field); field = '';
        } else if (ch === '\r' && text[i + 1] === '\n') {
            row.push(field); field = ''; rows.push(row); row = []; i++;
        } else if (ch === '\n') {
            row.push(field); field = ''; rows.push(row); row = [];
        } else {
            field += ch;
        }
    }

    if (field || row.length) { row.push(field); rows.push(row); }
    if (rows.length && rows[rows.length - 1].every(f => f === '')) rows.pop();

    return rows;
}
