#!/usr/bin/env node

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
  CREATE TABLE IF NOT EXISTS Guess (
    id SERIAL PRIMARY KEY,
    concept_id INTEGER REFERENCES language(id),
    concept VARCHAR(1023),
    emoji_grid VARCHAR(1023),
    guess VARCHAR(1023)
  )
`;

pool.query(createTable, (err, res) => {
	if (err) {
		console.error('Error creating table:', err);
		return;
	}
	console.log('Table created successfully');
});
