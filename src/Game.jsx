import './Game.css';
import './animate.css';
import Chain, { d, goTo } from '@tanosysoft/chain';
import Fyrya from './Fyrya';
import TitleScreen from './TitleScreen';
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
        </Chain>
      )}

      {this.panes.bottom = <div class="Game-bottomPane"></div>}
    </div>
  );

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

    return parent[parentKey] = val;
  };

  setPane(k, ...contents) {
    this.panes[k].innerHTML = '';

    contents = contents.flat(10).filter(Boolean);

    if (contents.length) {
      this.panes[k].append(...contents);
    }
  }
}

export default Game;
