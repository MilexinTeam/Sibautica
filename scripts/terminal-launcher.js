import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { CONFIG } from './lib/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const wezTermExe = path.join(CONFIG.terminalDir, 'wezterm.exe');
const wezTermConfig = path.join(CONFIG.scriptsDir, '.wezterm.lua');

// Generuj lokalny config dla wezterm
const luaConfig = `return {
  default_prog = {
    "cmd.exe", "/k",
    "${CONFIG.scriptsDir.replace(/\\/g, '/')}/shell.js"
  },
}`;

import fs from 'fs';
fs.writeFileSync(wezTermConfig, luaConfig, 'utf-8');

console.log('[Terminal] Launching wezterm...');
console.log('[Config] Generated:', wezTermConfig);

const wezterm = spawn(wezTermExe, ['--config-file', wezTermConfig], {
  stdio: 'inherit',
  detached: false,
});

wezterm.on('error', (error) => {
  console.error('[ERROR] Failed to launch wezterm:', error.message);
  process.exit(1);
});

wezterm.on('exit', (code) => {
  console.log('[Terminal] Wezterm closed with code:', code);
  process.exit(code);
});