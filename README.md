# 📡 Signal Stack

**Offline SDR Tuning Reference & Field Communications Guide**

A portable, browser-based field reference system for Software Defined Radio operators, communications learners, and field kit builders. Runs fully offline — no cloud, no login, no server required.

Optimized for Raspberry Pi Zero 2W. Works on any modern browser.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
# → http://localhost:5173
```

---

## Deploy to Raspberry Pi (or any device)

```bash
# Build optimized production output (~65 kB gzipped)
npm run build

# Serve from the dist/ folder using Python (no extras needed)
cd dist && python3 -m http.server 8080

# Access from any device on the same network
# → http://<device-ip>:8080
```

Or use `npx serve dist` for a quick static server with proper MIME types.

---

## Modules

| Page | Description |
|---|---|
| **Home** | App overview, usage guide, operator notes, equipment reference, NFC training info |
| **SDR Tuning Guide** | 50+ presets with search, category filter, full per-app SDR settings |
| **Tag Scanner** | NFC tag simulation — enter a tag ID to load the matching preset |
| **Favorites** | Starred presets persist across sessions via localStorage |
| **Custom Presets** | Add, edit, and delete your own frequency entries |

---

## Preset Library

50+ built-in presets across 12 categories:

| Category | Examples |
|---|---|
| ✈️ Aviation | Airband VHF, Guard 121.5, ATIS, Military UHF, VOR, ACARS |
| 🌤️ Weather | NOAA WX Ch1–7 (all), APT satellite imagery |
| ⚓ Marine | Ch16 distress, Ch22A USCG, AIS A & B, full VHF band |
| 📻 FM Broadcast | Full band WFM, EAS monitoring |
| 📡 AM Broadcast | MW band, upconverter required |
| 🚛 CB Radio | Ch9 emergency, Ch19 truckers, full 40-channel band |
| 🚂 Railroad | AAR Ch1, full AAR VHF band |
| 📟 FRS/GMRS | All 22 channels, GMRS repeater outputs |
| 🔭 Ham Radio | 2m/70cm simplex, SSB weak signal, 10m/20m/40m/80m HF |
| 🌐 HF/Shortwave | 49m/31m/25m/19m broadcast, WWV time signals, SHARES |
| 🚢 AIS | Vessel tracking Ch A & B |
| 🔧 Utility | ADS-B 1090MHz, ISS, APRS, POCSAG, hydrogen line, AFSK |

---

## Per-Preset SDR App Settings

Every preset includes tuning parameters for:

- **SDR++** — mode, bandwidth, step, plugin notes
- **SDR#** — mode, filter width
- **GQRX** — mode, filter width
- **DragonOS** — command-line notes and tool recommendations

---

## NFC Integration

Signal Stack is structurally NFC-ready. Physical NFC scanning is not implemented (no hardware API calls made).

To simulate tag scanning:
1. Go to **Tag Scanner** page
2. Enter a tag ID — format `SS-[CATEGORY]-[NUMBER]`
3. The matching preset loads instantly

**Presets with tag IDs:** `SS-AVI-001`, `SS-AVI-002`, `SS-WX-001`, `SS-MAR-001`, `SS-HAM-001`, `SS-AIS-001`, `SS-UTIL-006`

For physical tags, program NTAG213 stickers with the tag ID string using any Android NFC writer app.

---

## Data & Persistence

All user data is stored in `localStorage` — works fully offline:

| Key | Contents |
|---|---|
| `rain-favorites` | Set of favorited preset IDs |
| `rain-custom-presets` | Array of user-created custom presets |

No data leaves the device.

---

## Tech Stack

- **React 18** + TypeScript
- **Vite 5** — fast builds, minimal output
- **Tailwind CSS 3** — dark tactical theme
- **localStorage** — offline persistence
- **Zero external runtime dependencies**

---

## Raspberry Pi Zero 2W Notes

- Build on a faster machine, copy `dist/` to the Pi via SCP or USB
- Serve with `python3 -m http.server 8080`
- Open on a phone or tablet connected to the same network
- Production bundle is ~65 kB gzipped — loads in under 1 second on Pi
- Full offline capability once the page has loaded once

---

## Extending

To add presets, edit `src/data/presets.ts` — follow the existing `Preset` interface pattern. Custom presets added via the UI are stored in localStorage and persist across sessions.

---

*Signal Stack — Portable. Offline. Field-ready.*
