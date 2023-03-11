#!/usr/bin/env node

import { readFile } from 'fs/promises';
import { Command } from 'commander';

const program = new Command();
program.argument('<file>', 'file to preview');

program.parse();

const args = program.args;
const [file] = args;

try {
    (async function () {
        await readFile(file);
    })();
} catch (err){
    console.error(err?.message);
}
