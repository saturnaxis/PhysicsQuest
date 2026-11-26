# Physics Quest: Research Run

**Physics Quest** is a side-scrolling science platformer designed for East Texas A&M University’s planetarium lobby and Physics Day. Choose an avatar, collect research samples, and explore eight levels in astronomy, condensed matter, and physics education. The game runs in a browser and can be installed as a progressive web app (PWA) for landscape play on a phone or tablet.

Built with Phaser 3, TypeScript, and Vite. Phaser draws the original pixel art at runtime.

## Play

Open the GitHub Pages address shown under **Settings → Pages**. Select a research area and level, then collect **16 regular samples** and reach the research station. A clean run targets about three minutes. Allow four to six minutes for a first successful run.

| Action | Keyboard | Gamepad | Mouse or touch |
| --- | --- | --- | --- |
| Browse research areas and levels | Up/down for areas, left/right for levels | Stick or D-pad | Select a tab or level card |
| Start the selected level | Enter or Space | A | Select a level card |
| Move | A/D or left/right arrows | Left stick | Hold an arrow |
| Jump or double jump | Space, W, or up arrow | A | Tap **Jump**, then tap again in midair |
| Toggle the research scanner | E | X | **Scan** |
| Open the Discovery Journal (main menu) | J | — | **Discovery Journal** |
| Pause or resume | P | | **Pause** or **Resume** on touchscreens |
| Return to the menu | Esc or Q | B | **MAIN MENU** |
| Restart the level | R | | **Play again** on the results card |
| Toggle full screen | F during a level | | **Full screen** on the main menu, where supported |
| Change avatar on the menu | C | X | Select a portrait |
| Adjust or mute music on the menu | `[`, `]`, or M | | **−**, **+**, or **Mute** |

Choose Lion Cub, Lion Scientist, Einstein, or Marie Curie. All four have the same movement and collision size.

### Samples, hazards, and scores

- **Scanner.** Reveals nearby secret ledges and optional samples and identifies nearby hazards. It runs for up to six seconds, and activations are at least nine seconds apart. Once revealed, a secret ledge stays solid for the rest of the run.
- **Secret samples.** Each is worth 750 points. The research station counts regular samples toward the required 16.
- **Hazards.** A stomp from above can neutralize eligible enemies for 200 points. Watch the warning and recovery intervals around radiation-themed hazards and rotating pulsar beams.
- **Checkpoints and scoring.** Checkpoints provide recovery points. Samples, powers, evidence, checkpoints, remaining health, and time under six minutes contribute to the score. The menu shows the five best scores saved in the current browser.
- **Replay.** A successful finish advances the saved layout for that level. Eligible ledges, paired samples, power-ups, hazards, and secret sites can move on the next run. Checkpoints, major routes, research stations, and the transit platforms stay in place.

## Research areas

| Area | Level | What you do |
| --- | --- | --- |
| Astronomy | **EXO-1 · Exoplanet Explorer** | Cross terrestrial, super-Earth, Neptune-like, and gas-giant zones with different environments and hazards. |
| Astronomy | **EXO-2 · Transit Light Curve** | Move between upper full-starlight platforms and lower in-transit platforms. Record three dips to compare depth, period, and duration. Background binaries, stellar noise, and instrumental glitches represent false positives. |
| Astronomy | **NS-1 · Surface & Crust** | Descend through the atmosphere and crust, encountering neutron drip, proposed nuclear pasta shapes, and warned crustquakes. |
| Astronomy | **NS-2 · Core Descent** | Navigate currents and vortices while exploring models of the superfluid outer core and the uncertain inner core. |
| Condensed Matter | **CM-1 · Molecular Materials** | Cross zones where conjugation, ordered packing, and disorder affect the arcade model of carrier mobility. |
| Condensed Matter | **CM-2 · Charge Transport** | Navigate electric fields, carrier hopping, traps, and donor–acceptor interfaces. |
| Physics Education | **PER-1 · Motion Laboratory** | Compare motion regimes using a live position–time graph. |
| Physics Education | **PER-2 · Learning Through Discovery** | Complete three predict–observe–explain stations. Choose an answer by tapping it, pressing 1/2, or selecting with left/right and confirming with Enter or gamepad A. A correct explanation earns 500 points before bonuses. |

Discoveries appear briefly below the upper-left HUD while you play. The Discovery Journal on the main menu saves the full science explanations and arcade simplifications on your device. The alpha, beta, gamma, infrared, and X-ray hazards use stylized colors, distances, and timing. The neutron-star cards distinguish established findings from proposed interior models.

| Area | Power-ups |
| --- | --- |
| Astronomy | Gravity Backpack, Magnetic Shield, Orbital Assist |
| Condensed Matter | Energy Boost, Exciton Shield, Mobility Enhancer |
| Physics Education | Spring Launcher, Evidence Bonus, Motion Booster |

**Evidence Bonus** doubles the next regular sample reward in Motion Laboratory or the next correct explanation reward in Learning Through Discovery.

## Install on a phone or tablet

1. Open the deployed HTTPS site. In **Android Chrome**, use **Install app** or **Add to Home screen**. In **Safari on iPhone or iPad**, use **Share → Add to Home Screen** and enable **Open as Web App** if shown.
2. Launch the game from its home-screen icon and rotate to landscape. Hold a movement arrow with one thumb and tap **Jump** or **Scan** with the other. The Discovery Journal, lab answers, and mission results use touch-friendly buttons.
3. For offline play, launch online first and allow the game and music to finish caching. To check the cache, turn on airplane mode and relaunch.

When updating an installed copy, close open game tabs and app windows, then reopen online.

## Develop locally

With Node.js 24 and npm, install the locked dependencies and start Vite.

```bash
npm ci
npm run dev
```

Open the URL printed by Vite. Test and preview the production build with the following commands.

```bash
npm test
npm run build -- --base=./
npx vite preview
```

The production build writes `dist/` and generates a service worker with the offline asset list. Use the production preview to test installation and offline behavior.

## Deploy to GitHub Pages

| Method | Steps |
| --- | --- |
| **Publish from `docs/`** | Copy the prebuilt export or the contents of `dist/` into `docs/`. Commit to `main`. Under **Settings → Pages**, choose **Deploy from a branch**, then **main** and **/docs**. |
| **Build with GitHub Actions** | Push the source and `.github/workflows/pages.yml` to `main`. Under **Settings → Pages**, choose **GitHub Actions**. Rebuild with relative asset paths, copy the contents of `dist/` into `docs/`, and include the updated `docs/` files in your commit. The workflow publishes `docs/` on pushes to `main` or when run manually. |

Keep `index.html`, `.nojekyll`, `sw.js`, `manifest.webmanifest`, `icons/`, and `assets/` together when publishing prebuilt files. Open the published URL listed under **Settings → Pages** after deployment.

## Kiosk and audio

For the planetarium lobby, launch the deployed page in a Chromium-based browser’s kiosk mode. The playfield retains a 16:9 aspect ratio. Scores, avatar choice, volume, and completed-run counts are saved locally in the browser. The game requires no account.

Music defaults to 10% volume and adjusts in five-percentage-point steps. Browsers may require a click, tap, or keypress before music starts. The nine MP3s stream through HTML audio, with loudness compensation matched to −20.3 LUFS before the master volume. Scene changes fade music in over 750 ms and out over 500 ms. Short sound effects reuse a single audio context.

| Scene | Track | Scene | Track |
| --- | --- | --- | --- |
| Main menu | Mapping the Zenith | EXO-1 | Planet X |
| EXO-2 | Kepler’s Horizon | NS-1 | Beneath the Crust |
| NS-2 | Under the Stellar Current | CM-1 | Conjugated Chains |
| CM-2 | Electron Highway | PER-1 | Laws in Motion |
| PER-2 | Eureka Loop | | |

## Code map

| File | Responsibility |
| --- | --- |
| `src/main.ts` | Runtime art in `BootScene`, level selection in `MenuScene`, shared platforming in `LevelScene`, and specialized research scenes |
| `src/gameData.ts`, `src/researchData.ts` | Level catalog, gameplay constants, discovery text, and lab experiments |
| `src/variety.ts`, `src/radiation.ts` | Avatars, power-ups, seeded layouts, radiation patterns, and secret ledge collision rules |
| `src/card.ts`, `src/touchControls.ts`, `src/fullscreen.ts` | Card actions, multitouch controls, and browser full screen |
| `public/manifest.webmanifest`, `scripts/` | PWA metadata and generation of the versioned offline cache |

### Recent versions

- **v15** introduced scanner cooldowns, secret research areas, hazard stomps, and moving ledges that accelerate deeper into a level.
- **v16** expanded the game to eight levels across three research areas.
- **v17** added selectable avatars, research-area power-ups, and seeded changes to eligible layouts after successful runs.
- **v18** disabled secret ledge collisions until discovery, queued discovery cards, and added radiation-themed hazards to the condensed matter and education levels. The PWA update added landscape touch controls, full-screen support where available, and native buttons for discovery, lab, and results cards.
