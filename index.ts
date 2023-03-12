#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';
import { Command } from 'commander';
import { parse } from 'csv-parse/sync';
import express from 'express';

const PORT = 8080;

const program = new Command();
program.argument('<file>', 'file to preview');
program.option('-p, --port', 'port for binding client', PORT.toString());

program.parse();
const [ file ] = program.args;
const { port } = program.opts();

const supportedFileFromats = ['csv'] as const;
const isSupported = supportedFileFromats.some(format => file.endsWith(`.${format}`));

if(!isSupported){
    console.error(`Please use one of the following formats: ${supportedFileFromats.join(', ')}`);
    process.exit(1);
}

try { 
    const contents = await readFile(file);
    const records = parse(contents, {
        columns: true
    });
    console.log(`File contains ${records.length} records`);

    const app = express();

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    app.use(express.static(join(__dirname, 'public')));

    app.get('/data', (req, res) => {
        res.json(records);
    });

    app.listen(port, () => {
        console.log(`Client listening at http://localhost:${port}`);
    });
} catch (err){
    console.error(err?.message);
}
