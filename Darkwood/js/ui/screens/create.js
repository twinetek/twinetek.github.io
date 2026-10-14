// Character creation: roll 3d6 for each stat, reroll as often as you like.

import { rollStats, createCharacter, maxHp, armorClass } from '../../rules/character.js';
import { newGameState } from '../../engine/state.js';
import { STATS, strBonus, dexAc, conHp } from '../../rules/tables.js';
import { button, esc, signed } from '../format.js';

function bonusText(key, v) {
  if (key === 'str') {
    const b = strBonus(v);
    return b.hit || b.dmg ? `${signed(b.hit)} to hit, ${signed(b.dmg)} damage` : '';
  }
  if (key === 'dex') return dexAc(v) ? `${signed(dexAc(v))} armor class` : '';
  if (key === 'con') return conHp(v) ? `${signed(conHp(v))} hit points per level` : '';
  return '';
}

export function render(ctx, params) {
  if (!params.stats) {
    params.stats = rollStats();
    params.rolls = 1;
  }
  const s = params.stats;
  const preview = createCharacter('x', s);
  const rows = STATS.map(([key, label]) => `
    <tr>
      <th scope="row">${label}</th>
      <td class="num stat">${s[key]}</td>
      <td class="muted">${bonusText(key, s[key])}</td>
    </tr>`).join('');
  return `
    <section class="panel narrow">
      <h2>Create your gladiator</h2>
      <label class="field">Name
        <input id="hero-name" type="text" maxlength="24" autocomplete="off" value="${esc(params.name ?? 'Derek')}">
      </label>
      <table class="stats">
        <tbody>${rows}</tbody>
      </table>
      <p class="muted small">Only Strength, Dexterity, and Constitution affect the game, and their bonuses start at 15.
        With these stats you start with ${maxHp(preview)} hit points and armor class ${armorClass(preview)}.</p>
      <div class="row">
        ${button('🎲 Reroll', 'reroll', {}, { title: 'Shortcut: R' })}
        <span class="muted small">Rolls: ${params.rolls}</span>
      </div>
      <div class="row">
        ${button('Begin', 'begin', {}, { cls: 'primary' })}
        ${button('Cancel', 'go', { to: 'title' }, { cls: 'ghost' })}
      </div>
    </section>`;
}

const nameValue = () => document.getElementById('hero-name')?.value ?? '';

export const actions = {
  reroll(ctx) {
    ctx.setParams({ stats: rollStats(), rolls: ctx.params.rolls + 1, name: nameValue() });
  },
  begin(ctx) {
    const c = createCharacter(nameValue(), ctx.params.stats);
    ctx.start(newGameState(c));
    ctx.flash(`Welcome to Darkwood, ${c.name}. You have ${c.gold} gold to your name. Buy a weapon and some armor before you fight.`);
    ctx.render();
  },
};

export const keys = {
  r: ctx => actions.reroll(ctx),
};

export function mount(ctx, root) {
  root.querySelector('#hero-name')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') actions.begin(ctx);
  });
}
