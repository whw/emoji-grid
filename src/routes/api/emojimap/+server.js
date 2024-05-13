import { POSTGRES_URL } from '$env/static/private';
import { json } from '@sveltejs/kit';
import { createPool } from '@vercel/postgres';

export async function GET() {
	const db = createPool({ connectionString: POSTGRES_URL });
	try {
		const { rows } = await db.query(`
      SELECT id, concept, emoji_grid FROM language
    `);

		const emojiMap = rows.reduce((map, row) => {
			map[row.concept] = row.emoji_grid.split(',');
			return map;
		}, {});

		return json(emojiMap);
	} catch (error) {
		console.error('Error fetching emoji map:', error);
		return json({ error: 'Failed to fetch emoji map' }, { status: 500 });
	}
}
