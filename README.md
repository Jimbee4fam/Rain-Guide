# 📡 RAIN Guide

**Radio Awareness & Intelligence Network — Field Reference System**

A portable, offline-capable SDR tuning reference and training app. Built for Raspberry Pi Zero 2W or any browser device.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# → http://localhost:5173
```

---

## Build for Production / Raspberry Pi Deployment

```bash
npm run build
```

Output is in `dist/`. Serve with any static file server:

```bash
# Using npx serve (simplest)
npx serve dist

# Using Python (Pi-friendly)
cd dist && python3 -m http.server 8080

# Access from any device on the network
# → http://<pi-ip>:8080
```

---

## Features

| Module | Description |
|---|---|
| **Home** | What is RAIN, basic usage, safety notes, system component guide |
| **Signal Stack** | 50+ SDR presets with search, filter by category, full SDR app settings |
| **Scan Tag** | NFC tag simulation — enter a tag ID to open matching preset |
| **Favorites** | Quick access to starred presets |
| **Custom Presets** | Add, edit, delete your own frequency entries |

---

## Preset Categories

- ✈️ Aviation (airband, emergency, ATIS, military guard, VOR, ACARS)
- 🌤️ Weather (NOAA WX channels, APT satellite)
- ⚓ Marine (VHF Ch16, Ch22A, AIS A/B, full band)
- 📻 FM Broadcast (full band, EAS)
- 📡 AM Broadcast (MW band)
- 🚛 CB Radio (Ch9, Ch19, full band)
- 🚂 Railroad (AAR channels)
- 📟 FRS/GMRS (all 22 channels, GMRS repeaters)
- 🔭 Ham Radio (2m simplex, 70cm, SSB weak signal, 10m/20m/40m/80m HF)
- 🌐 HF/Shortwave (49m/31m/25m/19m broadcast, WWV time, SHARES emergency)
- 🚢 AIS (vessel tracking A & B channels)
- 🔧 Utility (ADS-B 1090MHz, ISS, APRS, POCSAG pagers, hydrogen line, ACARS, AFSK, VOR)

---

## App Settings per Preset

Every preset includes tuning settings for:

- **SDR++** — mode, bandwidth, step
- **SDR#** — mode, filter
- **GQRX** — mode, filter width
- **DragonOS** — notes and command-line guidance

---

## NFC Preparation

NFC hardware scanning is structurally ready but **not implemented** (no hardware API calls). To simulate:

1. Go to **Scan Tag** page
2. Enter a Tag ID (e.g., `RAIN-AVI-001`)
3. The matching preset opens automatically

Tag IDs with presets: `RAIN-AVI-001`, `RAIN-AVI-002`, `RAIN-WX-001`, `RAIN-MAR-001`, `RAIN-HAM-001`, `RAIN-AIS-001`, `RAIN-UTIL-006`

---

## Data Persistence

All user data is stored in `localStorage` — no server or cloud required:

| Key | Contents |
|---|---|
| `rain-favorites` | Record of favorited preset IDs |
| `rain-custom-presets` | Array of user-created presets |

---

## Tech Stack

- **React 18** + TypeScript
- **Vite 5** (fast build, minimal output)
- **Tailwind CSS 3** (dark tactical theme)
- **localStorage** (offline persistence)
- **No external data dependencies**

---

## Raspberry Pi Zero 2W Notes

- Build on a faster machine, copy `dist/` to the Pi
- Serve with `python3 -m http.server 8080`
- Access from phone/tablet on same network
- The app loads fast (~65 kB gzipped JS)
- Works fully offline once loaded

---

## License

Internal / Field Use. Not for redistribution without permission.
