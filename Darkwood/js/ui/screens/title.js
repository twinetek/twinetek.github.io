import { readSlot, storageAvailable } from '../../engine/save.js';
import { button, esc } from '../format.js';

export function render() {
  const auto = readSlot('auto');
  const storageNote = storageAvailable()
    ? ''
    : '<p class="flash err">This browser is blocking local storage, so autosave and save slots won\'t work. You can still export your game to a file from Save / Load.</p>';
  return `
    <section class="title-screen">
      <p class="kicker">A gladiator's tale</p>
      <h1 class="game-title">Darkwood</h1>
      <p class="lede">Your father fell defending Darkwood from an orc invasion. Now you have nothing but a few coins and a promise:
        best the mightiest creature the arena can host and earn a place as Captain of the Guard.</p>
      ${storageNote}
      <div class="menu">
        ${auto ? button('Continue', 'continue', {}, { cls: 'primary' }) : ''}
        ${auto ? `<p class="muted small">${esc(auto.summary)}</p>` : ''}
        ${button('New game', 'go', { to: 'create' }, { cls: auto ? '' : 'primary' })}
        ${button('Load game', 'go', { to: 'saves' })}
      </div>
      <p class="muted small credit">A fan remake of <em>Darkwood</em> (1992), the Macintosh shareware game by Robert Chancellor.</p>
    </section>`;
}

export const actions = {
  continue(ctx) {
    const auto = readSlot('auto');
    if (auto) ctx.start(auto.state);
  },
};
