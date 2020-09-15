import Chain, { clear, d, goTo, sdl, sec, w } from '@tanosysoft/chain';
import label from './label';

class TitleScreen extends d.Component {
  loadGame = false;

  render = () => (
    <Chain.shield>
      {label('title')}
      {() => game.setPanes({ top: null, bottom: null })}
      {clear}
      {sec(2)}
      {sdl(80)}
      <h1>Yggdrasil Dungeon{sec(2)}</h1>

      {() => game.setPane('bottom', (
        <div class="ActionsPane">
          <div class="ActionsPane-row">
            <button
              class="ActionsPane-btn"
              onClick={() => {
                this.loadGame = false;
                game.run('title.newGame');
              }}
            >
              New Game
            </button>

            <button
              class="ActionsPane-btn"
              onClick={() => {
                this.loadGame = true;
                game.run('title.gameStart');
              }}
            >
              Load Game
            </button>
          </div>
        </div>
      ))}

      <Chain.shield>
        {label('title.newGame')}
        {() => game.setPane('bottom', null)}

        {Chain.if(() => !localStorage.getItem('chain.savedProgress'), (
          <div>{goTo('title.gameStart')}</div>
        ))}

        {sdl(30)}
        <p>Are you sure you want to restart the game?{sec(0.2)}</p>
        <p>Doing so will destroy the currently saved adventure.{sec(0.2)}</p>

        {() => game.setPane('bottom', (
          <div class="ActionsPane">
            <div class="ActionsPane-row">
              <button
                class="ActionsPane-btn"
                onClick={() => game.run('title.gameStart')}
              >
                Yes
              </button>

              <button
                class="ActionsPane-btn"
                onClick={() => game.run('title')}
              >
                No
              </button>
            </div>
          </div>
        ))}
      </Chain.shield>

      <Chain.shield>
        {label('title.gameStart')}
        {sdl(10)}
        {() => game.setPane('bottom', null)}
        <p>Game {() => !this.loadGame ? 'start' : 'loaded'}!{w}</p>
        {clear}

        {() => {
          if (!this.loadGame) {
            game.progress.actors = {
              h01: {
                name: 'Elmina',
                hp: 200, maxHp: 200,
                mp: 9, maxMp: 9,
                atk: 4, def: 3,
                active: true,
              },
            };

            return goTo('fyrya');
          }

          game.chain.loadGame();
        }}
      </Chain.shield>
    </Chain.shield>
  );
}

export default TitleScreen;
