const card = document.querySelector<HTMLElement>('#game-card')!;
const title = document.querySelector<HTMLElement>('#card-title')!;
const body = document.querySelector<HTMLElement>('#card-body')!;
const note = document.querySelector<HTMLElement>('#card-note')!;
const buttons = document.querySelector<HTMLElement>('#card-buttons')!;

export function showCard(heading: string, content: string, detail: string, actions: Array<{ label: string; run: () => void }>) {
  title.textContent = heading;
  body.textContent = content;
  note.textContent = detail;
  buttons.replaceChildren();
  for (const action of actions) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = action.label;
    button.addEventListener('click', action.run);
    const keepActivationOnButton = (event: KeyboardEvent) => {
      if (event.key === ' ' || event.key === 'Enter') event.stopPropagation();
    };
    button.addEventListener('keydown', keepActivationOnButton);
    button.addEventListener('keyup', keepActivationOnButton);
    buttons.append(button);
  }
  card.hidden = false;
  card.querySelector('.card-content')!.scrollTop = 0;
  // Focus the heading so Enter cannot activate a new card's first choice by default.
  title.focus({ preventScroll: true });
  return [...buttons.querySelectorAll('button')];
}

export function hideCard() {
  card.hidden = true;
  buttons.replaceChildren();
}
