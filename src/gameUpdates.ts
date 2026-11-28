import { version } from '../package.json';

const panel = document.querySelector<HTMLElement>('#game-updates')!;
const button = document.querySelector<HTMLButtonElement>('#check-update')!;
const status = document.querySelector<HTMLElement>('#update-status')!;
const [major, milestone, minor] = version.split('.');
const displayVersion = `${major}.${milestone}.${minor.padStart(2, '0')}`;
const workers = import.meta.env.PROD ? navigator.serviceWorker : undefined;
const registration = workers?.register('./sw.js').catch(error => {
  console.warn('Offline setup failed', error);
  return undefined;
});
let applying: ServiceWorker | undefined;
let reloadPending = false;

function report(message = '') {
  status.textContent = `Version ${displayVersion}${message ? ` · ${message}` : ''}`;
}

report();

workers?.addEventListener('controllerchange', () => {
  if (!applying || workers.controller !== applying) return;
  reloadPending = true;
  if (!panel.hidden) window.location.reload();
});

button.addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === ' ') event.stopPropagation();
});

async function waitForInstall(worker: ServiceWorker) {
  await new Promise<void>(resolve => {
    const onStateChange = () => {
      if (worker.state === 'installing') return;
      worker.removeEventListener('statechange', onStateChange);
      resolve();
    };
    worker.addEventListener('statechange', onStateChange);
    onStateChange();
  });
}

button.addEventListener('click', async () => {
  button.disabled = true;
  report('Checking…');
  try {
    const app = await registration;
    if (!app) {
      report('Updates unavailable');
      return;
    }

    if (button.textContent === 'Update now' && app.waiting && workers?.controller) {
      applying = app.waiting;
      report('Applying update…');
      applying.postMessage('PHYSICS_QUEST_ACTIVATE_UPDATE');
      window.setTimeout(() => {
        if (reloadPending) return;
        applying = undefined;
        report('Still waiting. Check again or reopen online.');
        button.textContent = 'Check for updates';
        button.disabled = false;
      }, 8000);
      return;
    }

    if (!app.waiting) {
      await app.update();
      const installing = app.installing;
      if (installing) {
        await waitForInstall(installing);
        if (installing.state === 'redundant' && !app.waiting) throw new Error('Installation failed');
      }
    }

    const updateReady = Boolean(app.waiting && workers?.controller);
    button.textContent = updateReady ? 'Update now' : 'Check for updates';
    report(updateReady ? 'Update available' : 'Up to date');
  } catch {
    applying = undefined;
    report(navigator.onLine ? 'Could not check. Try again.' : 'Offline. Connect and try again.');
  } finally {
    if (!applying) button.disabled = false;
  }
});

export function showGameUpdates(visible: boolean) {
  panel.hidden = !visible;
  if (visible && reloadPending) window.location.reload();
}
