#!/usr/bin/env node

/*
 * This script expects a language-definition.csv file in the same directory
 *
 * Rows in the csv file should be emoji_grid,concept
 */

import pkg from 'pg';
const { Pool } = pkg;

// Load environment variables from .env.local
import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env.local' });

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

// Drop the language table
const dropTable = `
  DROP TABLE IF EXISTS guess;
  DROP TABLE IF EXISTS language;
`;

pool.query(dropTable, (err, res) => {
	if (err) {
		console.error('Error dropping table:', err);
		return;
	}
	console.log('Table dropped successfully');
	pool.end();
});
