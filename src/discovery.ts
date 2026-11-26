import { DISCOVERIES, type Discovery } from './gameData';
import { RESEARCH_LESSONS } from './researchData';

const toast = document.querySelector<HTMLElement>('#discovery-toast')!;
export const journal = document.querySelector<HTMLDialogElement>('#discovery-journal')!;
const entries = document.querySelector<HTMLElement>('#journal-entries')!;
const storageKey = 'physicsQuestDiscoveries';

function savedKeys(): string[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(storageKey) ?? '[]');
    return Array.isArray(saved) ? saved.filter((key): key is string => typeof key === 'string') : [];
  } catch {
    return [];
  }
}

const unlocked = new Set(savedKeys());

export function recordDiscovery(key: string) {
  if (unlocked.has(key)) return;
  unlocked.add(key);
  try {
    localStorage.setItem(storageKey, JSON.stringify([...new Set([...savedKeys(), ...unlocked])]));
  } catch {
    // The journal can still be read during this session when storage is unavailable.
  }
}

export function animateDiscovery(discovery: Discovery) {
  const summary = discovery.body.split(/(?<=[.!?])\s/, 1)[0];
  const duration = summary.length > 110 ? 8000 : 5000;
  const title = document.createElement('strong');
  title.textContent = discovery.title;
  const body = document.createElement('p');
  body.textContent = summary;
  toast.replaceChildren(title, body);
  toast.hidden = false;
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    toast.animate([{ opacity: 1 }, { opacity: 0 }], { delay: duration - 350, duration: 350, fill: 'forwards' });
  }
  return duration;
}

export function hideDiscovery() {
  toast.getAnimations().forEach(animation => animation.cancel());
  toast.hidden = true;
  toast.replaceChildren();
}

export function openJournal() {
  entries.replaceChildren();
  for (const key of new Set([...savedKeys(), ...unlocked])) {
    const discovery = DISCOVERIES[key] ?? RESEARCH_LESSONS[key];
    if (!discovery?.title) continue;
    const section = document.createElement('section');
    const title = document.createElement('h3');
    title.textContent = discovery.title;
    const body = document.createElement('p');
    body.textContent = discovery.body;
    const note = document.createElement('p');
    note.textContent = discovery.arcade;
    section.append(title, body, note);
    entries.append(section);
  }
  if (!entries.childElementCount) entries.textContent = 'Discoveries you find during expeditions will appear here.';
  journal.showModal();
  entries.scrollTop = 0;
}
