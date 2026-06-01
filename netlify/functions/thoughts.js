const SHEET_ID = '1m3v5zNMl5Wi-lI881nvuAEoT-kt9rXPEh2DihJcIJRg';
const RANGE    = 'A:C';

export default async () => {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${process.env.GOOGLE_SHEETS_API_KEY}`;
    const res  = await fetch(url);
    if (!res.ok) throw new Error(`Sheets API error: ${res.status}`);

    const { values = [] } = await res.json();
    const notes = values.slice(1) // skip header row
      .filter(row => row[0]?.trim() && row[1]?.toLowerCase() === 'yes')
      .map(row => ({ title: row[0].trim(), content: (row[2] ?? '').trim() }));

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
