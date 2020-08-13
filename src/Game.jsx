import './Game.css';
import Chain, { d, sdl } from '@tanosysoft/chain';
import clear from './clear';
import label from './label';
import { nanoid } from 'nanoid';

class Game extends d.Component {
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
      {this.header = <div class="Game-header"></div>}

      {this.body = (
        <Chain class="Game-body" autoSave>
          {label('title')}
          {clear}
          {sdl(80)}
          <h1>Yggdrasil Dungeon</h1>

          {() => this.setPane('footer', (
            <center>Footer Placeholder</center>
          ))}
        </Chain>
      )}

      {this.footer = <div class="Game-footer"></div>}
    </div>
  );

  get chain() {
    return this.body.model;
  }

  setPane(k, ...contents) {
    this[k].innerHTML = '';

    contents = contents.flat(10).filter(Boolean);

    if (contents.length) {
      this[k].append(...contents);
    }
  }
}

export default Game;
