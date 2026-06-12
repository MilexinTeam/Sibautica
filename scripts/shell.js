import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import { CONFIG, readLanguage, getWelcomeMessage, getGoodbyeMessage, readOpenedMode } from './lib/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.clear();
console.log(getWelcomeMessage());
console.log();

// Dodaj tools do PATH
const toolsPath = CONFIG.toolsDir;
const currentPath = process.env.PATH || '';
process.env.PATH = `${toolsPath};${currentPath}`;

// Uruchom CMD interaktywnie
const cmd = spawn('cmd.exe', [], {
  stdio: 'inherit',
  shell: true,
  cwd: CONFIG.projectRoot,
});

cmd.on('exit', (code) => {
  console.log();
  console.log(getGoodbyeMessage());
  process.exit(code);
});

cmd.on('error', (error) => {
  console.error('Error launching shell:', error.message);
  process.exit(1);
});