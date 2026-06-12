import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '../../');

export const CONFIG = {
  projectRoot: PROJECT_ROOT,
  configDir: path.join(PROJECT_ROOT, 'config'),
  scriptsDdir: path.join(PROJECT_ROOT, 'scripts'),
  toolsDir: path.join(PROJECT_ROOT, 'tools'),
  terminalDir: path.join(PROJECT_ROOT, 'terminal'),
  
  langFile: path.join(PROJECT_ROOT, 'config', 'lang.txt'),
  openedFile: path.join(PROJECT_ROOT, 'config', 'opened.txt'),
};

export function readLanguage() {
  try {
    if (fs.existsSync(CONFIG.langFile)) {
      return fs.readFileSync(CONFIG.langFile, 'utf-8').trim();
    }
  } catch (error) {
    console.error('Error reading language:', error.message);
  }
  return 'en-US';
}

export function readOpenedMode() {
  try {
    if (fs.existsSync(CONFIG.openedFile)) {
      return fs.readFileSync(CONFIG.openedFile, 'utf-8').trim();
    }
  } catch (error) {
    console.error('Error reading opened mode:', error.message);
  }
  return 'sibauticash';
}

export function writeOpenedMode(mode) {
  try {
    fs.mkdirSync(CONFIG.configDir, { recursive: true });
    fs.writeFileSync(CONFIG.openedFile, mode, 'utf-8');
  } catch (error) {
    console.error('Error writing opened mode:', error.message);
  }
}

export function getLocale(locKey) {
  const language = readLanguage();
  const locFile = path.join(PROJECT_ROOT, 'other', `loc${locKey}.txt`);
  
  try {
    if (!fs.existsSync(locFile)) return null;
    
    const lines = fs.readFileSync(locFile, 'utf-8').split('\n');
    for (const line of lines) {
      const [lang, ...rest] = line.trim().split(/\s+/);
      if (lang === language) {
        return rest.join(' ');
      }
    }
  } catch (error) {
    console.error(`Error reading locale:`, error.message);
  }
  
  return null;
}

export function getWelcomeMessage() {
  return getLocale('4') || 'Welcome to Sibautica!';
}

export function getGoodbyeMessage() {
  return getLocale('5') || 'Goodbye!';
}

export default CONFIG;