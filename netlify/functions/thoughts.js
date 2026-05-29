const SHEET_ID = '1m3v5zNMl5Wi-lI881nvuAEoT-kt9rXPEh2DihJcIJRg';
const TSV_URL  = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=tsv&gid=0`;

export default async () => {
  try {
    const res = await fetch(TSV_URL);
    if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`);

    const text = await res.text();
    const rows = text.trim().split('\n').slice(1);
    const notes = rows
      .map(row => row.split('\t'))
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
