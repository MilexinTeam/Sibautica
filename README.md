# 🐚 Sibautica CLI

Nowoczesny terminal i launcher środowiska programistycznego.

## 📋 API Uruchamieniowe

Wszystkie poniższe metody mają identyczne API i działanie:

### Kliknięcie w Explorer (GUI)
```bash
# Poprzez batch
.\sibauticama.bat

# Poprzez Node.js
node scripts/terminal-launcher.js
```

### Z terminala (Shell)
```bash
# Poprzez batch
.\sibauticash.bat

# Poprzez Node.js
node scripts/shell.js
```

### Uniwersalny entrypoint
```bash
# Auto-detect: terminal = shell, GUI = wezterm
.\sibautica.bat

# Wymuszenie mode'u terminala
.\sibauticaw.bat

# Poprzez Node.js
node scripts/entrypoint.js
```

### NPM Scripts
```bash
npm start              # Universal launcher
npm run shell          # Direct shell mode
npm run terminal       # Wezterm terminal
npm run debug          # Debug mode (--inspect)
```

## 🎯 Struktura Plików

```
scripts/
  ├── lib/
  │   └── config.js          # Shared configuration & utilities
  ├── entrypoint.js          # Main entry point (auto-detect mode)
  ├── shell.js               # Direct shell mode
  ├── terminal-launcher.js   # Wezterm launcher
  ├── node.bat               # Node.js downloader helper
  └── .wezterm.lua           # Generated wezterm config
  
config/
  ├── lang.txt               # Language setting
  └── opened.txt             # Last opened mode tracking

other/
  ├── download.js            # GitHub Actions downloader (DO NOT MODIFY)
  ├── download.json          # Download manifest (DO NOT MODIFY)
  ├── loc*.txt               # Locale files
  └── gen.js                 # Locale generator

nodejs/                       # Local Node.js binary (downloaded)
terminal/                     # Wezterm binary (downloaded)
```

## 🔧 Konfiguracja

### Zmiana języka
Edytuj `config/lang.txt`:
```
en-US  # lub pl, de, fr, etc.
```

### Zmienne Środowiskowe
```bash
SIBAUTICA_DEBUG=1    # Enable verbose logging
SIBAUTICA_CLICKED=1  # Set opened mode to GUI
```

## 🐛 Debugowanie

```bash
# Debug mode z inspectorem
npm run debug

# Wtedy w Chrome/Chromium: chrome://inspect
```

## 📝 Zmiany vs Oryginał

### Naprawa problemów
- ✅ Dodane obsługę ścieżek ze spacjami
- ✅ Poprawiono hardcoded ścieżki
- ✅ Sprawdzanie istnienia plików konfiguracyjnych
- ✅ Czyste, zrozumiałe error messages
- ✅ Obsługa wezterm config path poprawnie

### Czystość Kodu
- ✅ Zamienione batch scripts → Node.js
- ✅ Centralna konfiguracja (lib/config.js)
- ✅ Debugowalny kod bez ukrytych procesów
- ✅ Strukturalne i czytelne

### API Kompatybilność
- ✅ Wszystkie batch'e działają identycznie
- ✅ Taka sama API uruchomieniowa
- ✅ Zachowana integracja z wezterm i Node.js

## 📦 Zależności Pochodzące z GitHub Actions

Te pliki są **generowane automatycznie** przez GitHub Actions w release'ach:
- `nodejs/` - Node.js binary
- `terminal/wezterm.exe` - Wezterm terminal

Nie modyfikuj:
- `other/download.js` - Download handler
- `other/download.json` - Download manifest

## ⚙️ Technologia

- **Node.js** (ES Modules)
- **Wezterm** - Modern terminal emulator
- **Batch** - Thin wrapper dla kompatybilności