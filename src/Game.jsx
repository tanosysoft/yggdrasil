import './Game.css';
import './animate.css';
import Chain, { d, goTo } from '@tanosysoft/chain';
import Fyrya from './Fyrya';
import Gather from './Gather';
import TitleScreen from './TitleScreen';
import UseItem from './UseItem';
import UseSkill from './UseSkill';
import label from './label';
import { nanoid } from 'nanoid';

class Game extends d.Component {
  panes = {};

  constructor(props) {
    super(props);

    window.game = this;

    this.playerId = localStorage.getItem('playerId') || nanoid();

    if (location.hash.length > 1 && !this.playerId.endsWith(location.hash)) {
      this.playerId = `${this.playerId.split('#')[0]}${location.hash}`;
    }

    localStorage.setItem('playerId', this.playerId);
  }

  render = () => (
    <div class="Game">
      {this.panes.top = <div class="Game-topPane"></div>}

      {this.panes.main = (
        <Chain class="Game-mainPane" autoSave>
          {goTo('title')}

          <TitleScreen />
          <Fyrya />
          <Gather />
          <UseItem />
          <UseSkill />
        </Chain>
      )}

      {this.panes.bottom = <div class="Game-bottomPane"></div>}
    </div>
  );

  setPane(k, ...contents) {
    this.panes[k].innerHTML = '';

    contents = contents.flat(10).filter(Boolean);

    if (contents.length) {
      this.panes[k].append(...contents);
    }
  }

  setPanes(panes) {
    for (let [k, v] of Object.entries(panes)) {
      this.setPane(k, v);
    }
  }

  get chain() {
    return this.panes.main.model;
  }

  run = id => this.chain.run(id);

  get progress() {
    return this.chain.progress;
  }

  progressVar = (keyPath, val) => {
    let cursor = this.progress;
    let parent = null;
    let parentKey = null;

    for (let k of keyPath.split('.')) {
      if ([null, undefined].includes(cursor[k])) {
        if (val === undefined) {
          return;
        }

        parent = cursor;
        parentKey = k;
        cursor[k] = {};
        cursor = cursor[k];

        continue;
      }

      parent = cursor;
      parentKey = k;
      cursor = cursor[k];
    }

    if (val === undefined) {
      return cursor;
    }

    parent[parentKey] = val;
    d.update();

    return val;
  };

  get inventory() {
    return this.progress.inventory ??= {};
  }

  inventoryItem(k, count) {
    let { inventory } = this;

    if (count === undefined) {
      return inventory[k];
    }

    let val = inventory[k] ?? 0;
    let newVal = val + count;

    if (newVal < 0) {
      console.warn(`Subtracting ${-count} from ${val} ${k}.`);
      newVal = 0;
    }

    inventory[k] = newVal;
    d.update();

    return newVal;
  }

  useItem(key, req = {}) {
    this.progress.latestUseItemRequest = { key, ...req };
    this.run('useItem');
  }

  get knownSkills() {
    return game.progress.knownSkills ??= [];
  }

  set knownSkills(x) {
    return game.progress.knownSkills = x;
  }
}

export default Game;
