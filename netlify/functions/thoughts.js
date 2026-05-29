const SHEET_ID = '1m3v5zNMl5Wi-lI881nvuAEoT-kt9rXPEh2DihJcIJRg';
const TSV_URL  = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=tsv&gid=0`;

function parseTSV(text) {
  const result = [];
  let row = [], field = '', inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i], next = text[i + 1];
    if (inQuotes) {
      if (ch === '"' && next === '"') { field += '"'; i++; }
      else if (ch === '"') { inQuotes = false; }
      else { field += ch; }
    } else {
      if (ch === '"')  { inQuotes = true; }
      else if (ch === '\t')  { row.push(field); field = ''; }
      else if (ch === '\r')  { /* skip */ }
      else if (ch === '\n')  { row.push(field); result.push(row); row = []; field = ''; }
      else { field += ch; }
    }
  }
  if (field.length || row.length) { row.push(field); result.push(row); }
  return result;
}

export default async () => {
  try {
    const res = await fetch(TSV_URL);
    if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`);

    const text  = await res.text();
    const rows  = parseTSV(text).slice(1); // skip header row
    const notes = rows
      .filter(cols => cols[0]?.trim())
      .map(cols => ({ title: cols[0].trim(), content: (cols[1] ?? '').trim() }));

    return new Response(JSON.stringify(notes), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
