#!/usr/bin/env node

import { readFile } from 'fs/promises';
import { Command } from 'commander';

const program = new Command();
program.argument('<file>', 'file to preview');

program.parse();

const args = program.args;
const [file] = args;

const supportedFileFromats = ['csv'] as const;
const isSupported = supportedFileFromats.some(format => file.endsWith(`.${format}`));

if(!isSupported){
    console.error(`Please use one of the following formats: ${supportedFileFromats.join(', ')}`);
    process.exit(1);
}

try {
    (async function () {
        await readFile(file);
    })();
} catch (err){
    console.error(err?.message);
}
