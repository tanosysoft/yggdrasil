import Battle from './Battle';
import Chain, { clear, d, goTo, sdl, sec, w } from '@tanosysoft/chain';
import checkpoint from './checkpoint';
import clearPanes from './clearPanes';

let makeActors = () => ({
  P1: {
    name: 'Elmina',
    active: true,
    hp: 200, maxHp: 200,
    mp: 10, maxMp: 10,
    atk: 4, def: 2,
    lv: 1, nextLvExp: 25,
  },

  E1: {
    name: 'Slime',
    active: true,
    hp: 25, maxHp: 25,
    mp: 0, maxMp: 0,
    atk: 3, def: 1,
    exp: 3, gp: 5,
  },

  E2: {
    name: 'Slime',
    active: true,
    hp: 25, maxHp: 25,
    mp: 0, maxMp: 0,
    atk: 3, def: 1,
    exp: 3, gp: 5,
  },
});

//              (6)-(7)-(8)-
//               |   |
// -(1)-(2)-(3)-(4)-(5)
class Dungeon extends d.Component {
  reveal = id => {
    if (!this.dungeonProgress.revealed.includes(id)) {
      this.dungeonProgress.revealed.push(id);
    }

    d.update();
  };

  get dungeonProgress() {
    return game.chain.progress.dungeon;
  }

  set dungeonProgress(x) {
    game.chain.progress.dungeon = x;
  }

  render = () => (
    <Chain.shield class="Dungeon">
      {checkpoint('dungeon')}
      {[clear, clearPanes]}

      {() => {
        this.dungeonProgress = this.dungeonProgress || {
          revealed: [],
        };

        game.chain.autoSave && game.chain.saveGame();
      }}

      {goTo('dungeon.lv01')}

      <Chain.shield>
        {checkpoint('dungeon.lv01')}
        {[clear, clearPanes]}
        {goTo('dungeon.lv01.r01')}

        <Chain.shield>
          {checkpoint('dungeon.lv01.r01')}
          {[clear, clearPanes]}
          {goTo('dungeon.lv01.r01.t01')}

          <Chain.shield>
            {checkpoint('dungeon.lv01.r01.t01')}
            {[clear, clearPanes]}

            {() => game.setPane('bottom', (
              <div class="ActionsPane">
                <div class="ActionsPane-row">
                  <button
                    class="ActionsPane-btn"
                    onClick={() => game.chain.run('fyrya')}
                  >
                    Go left
                  </button>

                  <button
                    class="ActionsPane-btn"
                    onClick={() => game.chain.run('dungeon.lv01.r01.t02')}
                  >
                    Go right
                  </button>
                </div>

                <button
                  class="ActionsPane-btn"
                  onClick={() => game.chain.run(
                    'dungeon.lv01.r01.t01.lookAround',
                  )}
                >
                  Look around
                </button>
              </div>
            ))}

            <Chain.shield>
              {checkpoint('dungeon.lv01.r01.t01.lookAround')}
              {sdl(30)}
              You can leave the dungeon to the left.{w}<br />
              There's a corridor to the right.{w}<br />
              {goTo('dungeon.lv01.r01.t01')}
            </Chain.shield>
          </Chain.shield>

          <Chain.shield>
            {checkpoint('dungeon.lv01.r01.t02')}
            {[clear, clearPanes]}

            {Chain.if(() => Math.random() >= 0.7, (
              <div>
                <p>You're ambushed!{w}</p>

                <Battle
                  checkpoint="dungeon.lv01.r01.t02.battle"
                  actors={makeActors()}
                />
              </div>
            ))}

            {checkpoint('dungeon.lv01.r01.t02.afterBattle')}

            {() => game.setPane('bottom', (
              <div class="ActionsPane">
                <div class="ActionsPane-row">
                  <button
                    class="ActionsPane-btn"
                    onClick={() => game.chain.run('dungeon.lv01.r01.t01')}
                  >
                    Go left
                  </button>

                  <button
                    class="ActionsPane-btn"
                    onClick={() => game.chain.run('dungeon.lv01.r01.t03')}
                  >
                    Go right
                  </button>
                </div>

                <button
                  class="ActionsPane-btn"
                  onClick={() => game.chain.run(
                    'dungeon.lv01.r01.t02.lookAround',
                  )}
                >
                  Look around
                </button>
              </div>
            ))}

            <Chain.shield>
              {checkpoint('dungeon.lv01.r01.t02.lookAround')}
              {sdl(30)}
              There's a corridor to the left.{w}<br />
              There's a corridor to the right.{w}<br />
              {goTo('dungeon.lv01.r01.t02.afterBattle')}
            </Chain.shield>
          </Chain.shield>

          <Chain.shield>
            {checkpoint('dungeon.lv01.r01.t03')}
            {[clear, clearPanes]}

            {Chain.if(() => Math.random() >= 0.7, (
              <div>
                <p>You're ambushed!{w}</p>

                <Battle
                  checkpoint="dungeon.lv01.r01.t03.battle"
                  actors={makeActors()}
                />
              </div>
            ))}

            {checkpoint('dungeon.lv01.r01.t03.afterBattle')}

            {() => game.setPane('bottom', (
              <div class="ActionsPane">
                <div class="ActionsPane-row">
                  <button
                    class="ActionsPane-btn"
                    onClick={() => game.chain.run('dungeon.lv01.r01.t02')}
                  >
                    Go left
                  </button>

                  <button
                    class="ActionsPane-btn"
                    onClick={() => game.chain.run('dungeon.lv01.r01.t04')}
                  >
                    Go right
                  </button>
                </div>

                <button
                  class="ActionsPane-btn"
                  onClick={() => game.chain.run(
                    'dungeon.lv01.r01.t03.lookAround',
                  )}
                >
                  Look around
                </button>
              </div>
            ))}

            <Chain.shield>
              {checkpoint('dungeon.lv01.r01.t03.lookAround')}
              {sdl(30)}
              There's a corridor to the left.{w}<br />
              There's a corridor to the right.{w}<br />
              {goTo('dungeon.lv01.r01.t03.afterBattle')}
            </Chain.shield>
          </Chain.shield>

          <Chain.shield>
            {checkpoint('dungeon.lv01.r01.t04')}
            {[clear, clearPanes]}

            {Chain.if(() => Math.random() >= 0.7, (
              <div>
                <p>You're ambushed!{w}</p>

                <Battle
                  checkpoint="dungeon.lv01.r01.t04.battle"
                  actors={makeActors()}
                />
              </div>
            ))}

            {checkpoint('dungeon.lv01.r01.t04.afterBattle')}

            {() => game.setPane('bottom', (
              <div class="ActionsPane">
                {d.if(() => this.dungeonProgress.revealed.includes('lv01.r01.t04'), (
                  <button
                    class="ActionsPane-btn"
                    onClick={() => game.chain.run('dungeon.lv01.r01.t06')}
                  >
                    Go up
                  </button>
                ))}

                <div class="ActionsPane-row">
                  <button
                    class="ActionsPane-btn"
                    onClick={() => game.chain.run('dungeon.lv01.r01.t03')}
                  >
                    Go left
                  </button>

                  <button
                    class="ActionsPane-btn"
                    onClick={() => game.chain.run('dungeon.lv01.r01.t05')}
                  >
                    Go right
                  </button>
                </div>

                <button
                  class="ActionsPane-btn"
                  onClick={() => game.chain.run(
                    'dungeon.lv01.r01.t04.lookAround',
                  )}
                >
                  Look around
                </button>
              </div>
            ))}

            <Chain.shield>
              {checkpoint('dungeon.lv01.r01.t04.lookAround')}
              {sdl(30)}
              {() => this.reveal('lv01.r01.t04')}
              There's a corridor up.{w}<br />
              There's a corridor to the left.{w}<br />
              There's a corridor to the right.{w}<br />
              {goTo('dungeon.lv01.r01.t04.afterBattle')}
            </Chain.shield>
          </Chain.shield>
        </Chain.shield>
      </Chain.shield>
    </Chain.shield>
  );
}

export default Dungeon;
