const SHEET_ID = '1m3v5zNMl5Wi-lI881nvuAEoT-kt9rXPEh2DihJcIJRg';
const TSV_URL  = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=tsv&gid=0`;

function parseTSV(text) {
  const notes = [];
  let current = null;

  for (const line of text.replace(/\r/g, '').split('\n').slice(1)) {
    const tabIdx = line.indexOf('\t');
    if (tabIdx !== -1) {
      if (current?.title) notes.push(current);
      current = { title: line.slice(0, tabIdx).trim(), content: line.slice(tabIdx + 1) };
    } else if (current) {
      current.content += '\n' + line;
    }
  }
  if (current?.title) notes.push(current);
  notes.forEach(n => { n.content = n.content.trim(); });
  return notes;
}

export default async () => {
  try {
    const res = await fetch(TSV_URL);
    if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`);

    const notes = parseTSV(await res.text());
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
