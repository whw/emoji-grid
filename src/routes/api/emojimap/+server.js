import { json } from '@sveltejs/kit';
import { createPool } from '@vercel/postgres';
// import { POSTGRES_URL } from '$env/static/private';

export async function GET() {
	const db = createPool({
		connectionString:
			'postgres://default:oXUuJsa10zIB@ep-lucky-boat-a6nryhh3-pooler.us-west-2.aws.neon.tech:5432/verceldb?sslmode=require'
	});
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
