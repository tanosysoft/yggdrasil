import './Game.css';
import Chain, { d, sdl } from '@tanosysoft/chain';
import clear from './clear';
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
          {label('title')}
          {clear}
          {sdl(80)}
          <h1>Yggdrasil Dungeon</h1>

          {() => this.setPane('bottom', (
            <center>Bottom Placeholder</center>
          ))}
        </Chain>
      )}

      {this.panes.bottom = <div class="Game-bottomPane"></div>}
    </div>
  );

  get chain() {
    return this.panes.main.model;
  }

  setPane(k, ...contents) {
    this.panes[k].innerHTML = '';

    contents = contents.flat(10).filter(Boolean);

    if (contents.length) {
      this.panes[k].append(...contents);
    }
  }
}

export default Game;
