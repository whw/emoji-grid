#!/usr/bin/env node

/*
 * This script expects a language-definition.csv file in the same directory
 *
 * Rows in the csv file should be emoji_grid,concept
 */

import csv from 'csv-parser';
import fs from 'fs';
import pkg from 'pg';
const { Pool } = pkg;

// Load environment variables from .env.local
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// PostgreSQL connection configuration
const dbConfig = {
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	host: process.env.POSTGRES_HOST,
	port: process.env.POSTGRES_PORT,
	database: process.env.POSTGRES_DATABASE,
	ssl: true
};

// Create a new PostgreSQL client
const pool = new Pool(dbConfig);

// Create the table
const createTable = `
  CREATE TABLE IF NOT EXISTS language (
    id SERIAL PRIMARY KEY,
    concept VARCHAR(1023),
    emoji_grid VARCHAR(1023)
  )
`;

pool.query(createTable, (err, res) => {
	if (err) {
		console.error('Error creating table:', err);
		return;
	}
	console.log('Table created successfully');

	// Read data from the CSV file and insert it into the table
	fs.createReadStream('language-definition.csv')
		.pipe(csv(['emoji_grid', 'concept']))
		.on('data', async (row) => {
			const { emoji_grid, concept } = row;
			const insertQuery = `
        INSERT INTO language (concept, emoji_grid)
        VALUES ($1, $2)
      `;
			try {
				const client = await pool.connect();
				await client.query(insertQuery, [concept, emoji_grid]);
				client.release();
			} catch (err) {
				console.error('Error inserting row:', err);
			}
		})
		.on('end', () => {
			console.log('Data insertion completed');
			pool.end();
		});
});
