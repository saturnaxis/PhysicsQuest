const shell = document.querySelector<HTMLElement>('#game-shell')!;
const button = document.querySelector<HTMLButtonElement>('#fullscreen')!;

export async function toggleFullscreen() {
  try {
    if (document.fullscreenElement === shell) {
      await document.exitFullscreen();
    } else if (document.fullscreenEnabled) {
      await shell.requestFullscreen();
    }
  } catch (error) {
    console.warn('Full screen is unavailable in this browser', error);
  }
}

function updateButton() {
  button.hidden = !document.fullscreenEnabled || matchMedia('(display-mode: standalone), (display-mode: fullscreen)').matches && !document.fullscreenElement;
  button.textContent = document.fullscreenElement === shell ? 'Exit full screen' : 'Full screen';
}

button.addEventListener('click', () => void toggleFullscreen());
document.addEventListener('fullscreenchange', updateButton);
updateButton();
