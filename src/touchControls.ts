type Control = 'left' | 'right' | 'pause' | 'scan' | 'jump';

const panel = document.querySelector<HTMLDivElement>('#touch-controls')!;
const pauseButton = panel.querySelector<HTMLButtonElement>('[data-control="pause"]')!;
const touchPointer = matchMedia('(any-pointer: coarse)');
const enableTouchLayout = () => document.documentElement.classList.add('touch-layout');
if (navigator.maxTouchPoints > 0 || touchPointer.matches) enableTouchLayout();
touchPointer.addEventListener('change', event => {
  if (event.matches) enableTouchLayout();
});
window.addEventListener('pointerdown', event => {
  if (event.pointerType === 'touch') enableTouchLayout();
}, { capture: true });

const held = new Map<number, Control>();
const pressed = new Set<Control>();
let pause: (() => void) | undefined;

function clear() {
  held.clear();
  pressed.clear();
  panel.querySelectorAll('button').forEach(button => delete button.dataset.held);
}

for (const button of panel.querySelectorAll<HTMLButtonElement>('button')) {
  const control = button.dataset.control as Control;
  button.addEventListener('pointerdown', event => {
    event.preventDefault();
    if (control === 'pause') {
      pause?.();
      return;
    }
    held.set(event.pointerId, control);
    if (control === 'jump' || control === 'scan') pressed.add(control);
    button.dataset.held = 'true';
    button.setPointerCapture(event.pointerId);
  });

  function release(event: PointerEvent) {
    held.delete(event.pointerId);
    if (!touchControls.isHeld(control)) delete button.dataset.held;
  }

  button.addEventListener('pointerup', release);
  button.addEventListener('pointercancel', release);
  button.addEventListener('lostpointercapture', release);
}

window.addEventListener('blur', clear);
window.addEventListener('resize', clear);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) clear();
});

export const touchControls = {
  attach(togglePause: () => void) {
    pause = togglePause;
    this.show(true);
  },
  detach() {
    pause = undefined;
    this.show(false);
  },
  show(visible: boolean, paused = false) {
    clear();
    panel.hidden = !visible;
    panel.classList.toggle('paused', paused);
    pauseButton.textContent = paused ? 'Resume' : 'Pause';
  },
  isHeld(control: Control) {
    return [...held.values()].includes(control);
  },
  consume(control: Control) {
    return pressed.delete(control);
  },
};
