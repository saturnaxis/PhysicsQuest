# Physics Quest: Research Run — World 1

A complete Phaser 3 + TypeScript + Vite side-scrolling astronomy demo for East Texas A&M University’s planetarium lobby and Physics Day. All pixel art is generated at runtime with Phaser primitives, so the game ships without copied or externally licensed platformer assets.

## Play

- Move: `A/D`, arrow keys, or gamepad left stick
- Jump/double jump: press `Space`, `W`, up arrow, or gamepad A once from the ground and again in midair
- Research scanner: `E` or gamepad X toggles on/off; reveals nearby secret ledges and optional samples (+750 points), identifies nearby hazards; six-second automatic shutoff, nine seconds between activations
- Stomp: land on a hazard from above to neutralize it (+200 points); side contact still hurts
- Pause/resume: `P`
- Return to the main menu at any time: `Escape`, `Q`, gamepad B, or the onscreen `MAIN MENU` button
- Restart: `R`
- Fullscreen: `F`
- Music volume: 5% steps using the bottom bar or keyboard `[` / `]` / `M`
- Avatar: click one of the four portraits, or cycle with `C` / gamepad X on the menu. All have identical collision sizes and movement.

Collect 16 planet tokens, activate checkpoints, use the low-gravity backpack, magnetic shield, and orbital-speed power-ups, avoid the rotating pulsar beams, and reach the research station. Optional discovery cards distinguish the recognizable science idea from the arcade simplification.

The main menu uses “Mapping the Zenith”, EXO-1 “Planet X”, EXO-2 “Kepler’s Horizon”, NS-1 “Beneath the Crust”, NS-2 “Under the Stellar Current”, CM-1 “Conjugated Chains”, CM-2 “Electron Highway”, PER-1 “Laws in Motion”, and PER-2 “Eureka Loop”. Game-ready MP3s have offline crossfades; original masters are unchanged. All nine tracks use measured loudness compensation to match -20.3 LUFS before the shared volume control. The default is 10%, and subsequent choices are remembered. Music fades in over 750 ms and out over 500 ms on scene transitions without delaying gameplay. Browser autoplay rules may require a first click or keypress.

For kiosk performance, music uses the browser’s compressed HTML5-audio streaming path instead of decoding the entire track into a Web Audio buffer. Short gameplay tones reuse one lightweight audio context.

The Astronomy research area now contains four selectable levels: Exoplanet Explorer, Transit Light Curve, Neutron Star Surface & Crust, and Neutron Star Core Descent. Each requires 16 data samples and targets roughly a 3-minute clean run or a 4–6 minute first successful run. Points are awarded for samples, scientific evidence, power-ups, checkpoints, remaining health, and finishing under six minutes. The five best local scores persist in the browser and appear on the level-selection menu.

Exoplanet Explorer is divided into the four broad discovery classes used by NASA: terrestrial, super-Earth, Neptune-like, and gas giant. Each zone introduces a different visual environment, science card, and atmospheric or surface hazard.

The Transit Light Curve level uses two distinct platform heights: an upper out-of-transit brightness level against the open starfield and a lower in-transit level across the host star. Three repeated, similar-depth transits award evidence for consistent depth, period, and duration. Background binaries, stellar noise, and instrumental glitches act as false-positive antagonists, while photon-platform climbs and unobstructed upper checkpoints return the player to the full-starlight level.

The two neutron-star levels progress from the atmosphere through the outer crust, neutron drip, and nuclear pasta, then continue into the superfluid outer core, quantized vortices, and uncertain high-density inner core. Concise discovery cards distinguish established physics, active hypotheses, and arcade simplifications.

Version 15 adds optional secret research areas in all four levels, a scanner cooldown, hazard stomps, and faster moving ledges deeper into each level. EXO-1 has mild gravity, wind and speed-assist zones; EXO-2 has a three-dip evidence HUD that lights up when visiting each lower transit region; NS-1 has warned crustquake events and optional pasta-shaped ledges; NS-2 uses gentle airborne currents. The marked science zones are arcade models, not literal neutron-star or planet environments. Secret samples never count toward the required 16 regular samples.

Version 16 expands the menu to three research areas with eight playable levels. Choose the area with up/down or the D-pad, choose a level with left/right, and launch with Enter or A. CM-1 explores conjugation, ordered packing and disorder with mobility zones. CM-2 explores carrier hopping, traps, electric fields and donor–acceptor interfaces. PER-1 provides a live position-time graph and distinct motion regimes. PER-2 offers three predict–observe–explain stations, with answer selection via 1/2, mouse, left/right plus Enter, or gamepad. Experiments award 500 bonus points for an evidence-based explanation. The new levels retain checkpoints, regular samples, secret samples, and the existing high-score system. Physics zones use subtle particle cues instead of rectangular overlays.

Version 17 adds Lion Cub, Lion Scientist, Einstein and Marie Curie avatars with saved local selection. Astronomy uses Gravity Backpack, Magnetic Shield and Orbital Assist; condensed matter uses Energy Boost, Exciton Shield and Mobility Enhancer; physics education uses Spring Launcher, Evidence Bonus and Motion Booster. Evidence Bonus doubles the next regular research sample reward in PER-1 or correct experiment explanation in PER-2. Zone signs and the HUD state the mechanical effect directly. These are analogies, not literal physical processes.

Each successful completion advances that level's saved run number. A deterministic generator varies eligible low ledges and paired samples, ground hazard and power-up positions, and secret sites; retries and restarts keep the same layout. High stepping chains, gap bridges, research stations, checkpoints, and transit light-curve platforms stay fixed. Transit hazards and power-ups vary around their existing fixed platform regions. Layout checks enforce ground clearance and avoid checkpoint and experiment locations. The original eight level tracks and audio settings remain unchanged.

Version 18 disables collision on secret ledges until a scanner reveals them, then keeps those ledges solid until the expedition ends. Discovery cards open one at a time; Space, Enter, gamepad A or the Continue button dismisses the active card. The condensed matter and education levels now include patrolling, oscillating, emerging, retracting and blinking hazards. Radiation symbols distinguish fictional alpha and beta particles, gamma and infrared waves, and X-ray pulses. Warning and recovery intervals allow players to time their movements. Scanner identification provides concise scientific facts; all emission patterns, colors, lengths and timings are stylized gameplay, not real-world radiation behavior, doses or safety guidance. The existing astronomy pulsar mechanic remains unchanged.

## Local setup

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. For a production check:

```bash
npm test
npm run build -- --base=./
npx vite preview
```

## GitHub Pages

Push the source files, including `.github/workflows/pages.yml`, to the repository's `main` branch. In **Settings → Pages**, choose **GitHub Actions** as the publishing source. Run the deployment workflow from **Actions**, or push another commit to `main`. The workflow installs locked dependencies, runs the tests, and deploys `dist/` with relative asset paths.

For a branch-based deployment, put the contents of the prebuilt Pages export into the repository's `docs/` folder, including `.nojekyll` and the entire `assets/` folder. Choose **Deploy from a branch**, then **main** and **/docs** under Pages settings.

## Architecture

- `BootScene`: creates the original code-drawn pixel textures
- `MenuScene`: kiosk-friendly title and control screen
- `LevelScene`: shared gameplay, HUD, hazards, checkpoints, scoring, and completion
- `TransitScene`, `NeutronScene`, and `CoreScene`: science-specific layouts and encounters
- `gameData.ts`: shared tuning and educational content

Future research worlds can add new scene classes while reusing the menu, controls, HUD conventions, and runtime art approach. Natural next worlds include neutron stars, materials physics, biophysics, and computational physics.

## Kiosk notes

Launch the deployed URL in a Chromium-based browser with kiosk/fullscreen mode. The game scales to the available display while retaining a 16:9 play area. No account, network request, or persistent visitor data is required after the page loads.
