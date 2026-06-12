#!/usr/bin/env node
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { CONFIG, readOpenedMode, writeOpenedMode } from './lib/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sprawdź czy Command Line został uruchomiony z terminala czy z kliknięcia
const isFromTerminal = process.argv.includes('--from-terminal') || process.env.TERM;
const mode = isFromTerminal ? 'shell' : 'gui';

console.log(`[Entrypoint] Starting Sibautica (${mode} mode)...`);

const scriptMap = {
  shell: 'shell.js',
  gui: 'terminal-launcher.js',
};

const script = path.join(__dirname, scriptMap[mode]);

const child = spawn('node', [script], {
  stdio: 'inherit',
  cwd: CONFIG.projectRoot,
});

child.on('exit', (code) => {
  process.exit(code);
});

child.on('error', (error) => {
  console.error('[ERROR]', error.message);
  process.exit(1);
});