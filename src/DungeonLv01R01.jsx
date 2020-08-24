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
class DungeonLv01R01 extends d.Component {
  id = id => `dungeon.lv01.r01${id ? `.${id}` : ''}`;

  lookAroundMsgs = {
    leaveToTheLeft: `You can leave the dungeon to the left.`,

    upCorridor: `You see a corridor leading up.`,
    leftCorridor: `You see a corridor leading left.`,
    rightCorridor: `You see a corridor leading right.`,
    downCorridor: `You see a corridor leading down.`,

    upDoor: `You see a door leading up.`,
    leftDoor: `You see a door leading left.`,
    rightDoor: `You see a door leading right.`,
    downDoor: `You see a door leading down.`,
  };

  render = () => (
    <Chain.shield>
      {checkpoint(this.id())}
      {[clear, clearPanes]}
      {goTo(this.id('t01'))}

      <Chain.shield>
        {checkpoint(this.id('t01'))}
        {[clear, clearPanes]}
        {sec(0.75)}

        {() => game.setPane('bottom', (
          <div class="ActionsPane">
            {this.renderDefaultActions({
              left: () => game.run('fyrya'),
              right: () => game.run(this.id('t02')),
              lookAround: () => game.run(this.id('t01.lookAround')),
            })}
          </div>
        ))}

        {this.renderLookAroundScript(this.id('t01'), (
          <>
            {this.lookAroundMsgs.leaveToTheLeft}{w}<br />
            {this.lookAroundMsgs.rightCorridor}{w}<br />
          </>
        ))}
      </Chain.shield>

      <Chain.shield>
        {checkpoint(this.id('t02'))}
        {[clear, clearPanes]}

        {Chain.if(() => Math.random() >= 0.7, (
          <div>
            <p>You're ambushed!{w}</p>

            <Battle
              checkpoint={this.id('t02.battle')}
              actors={makeActors()}
            />
          </div>
        ))}

        {checkpoint(this.id('t02.afterBattle'))}
        {[clear, clearPanes]}
        {sec(0.75)}

        {() => game.setPane('bottom', (
          <div class="ActionsPane">
            {this.renderDefaultActions({
              left: () => game.run(this.id('t01')),
              right: () => game.run(this.id('t03')),

              lookAround: () =>
                game.run(this.id('t02.afterBattle.lookAround')),
            })}
          </div>
        ))}

        {this.renderLookAroundScript(this.id('t02.afterBattle'), (
          <>
            {this.lookAroundMsgs.leftCorridor}{w}<br />
            {this.lookAroundMsgs.rightCorridor}{w}<br />
          </>
        ))}
      </Chain.shield>

      <Chain.shield>
        {checkpoint(this.id('t03'))}
        {[clear, clearPanes]}

        {Chain.if(() => Math.random() >= 0.7, (
          <div>
            <p>You're ambushed!{w}</p>

            <Battle
              checkpoint={this.id('t03.battle')}
              actors={makeActors()}
            />
          </div>
        ))}

        {checkpoint(this.id('t03.afterBattle'))}
        {[clear, clearPanes]}
        {sec(0.75)}

        {() => game.setPane('bottom', (
          <div class="ActionsPane">
            {this.renderDefaultActions({
              left: () => game.run(this.id('t02')),
              right: () => game.run(this.id('t04')),
              lookAround: () => game.run(this.id('t03.afterBattle.lookAround')),
            })}
          </div>
        ))}

        {this.renderLookAroundScript(this.id('t03.afterBattle'), (
          <>
            {this.lookAroundMsgs.leftCorridor}{w}<br />
            {this.lookAroundMsgs.rightCorridor}{w}<br />
          </>
        ))}
      </Chain.shield>

      <Chain.shield>
        {checkpoint(this.id('t04'))}
        {[clear, clearPanes]}

        {Chain.if(() => Math.random() >= 0.7, (
          <div>
            <p>You're ambushed!{w}</p>

            <Battle
              checkpoint={this.id('t04.battle')}
              actors={makeActors()}
            />
          </div>
        ))}

        {checkpoint(this.id('t04.afterBattle'))}
        {[clear, clearPanes]}
        {sec(0.75)}

        {() => game.setPane('bottom', (
          <div class="ActionsPane">
            {this.renderDefaultActions({
              up: game.progressVar(this.id('t04.up')) && (() => {
                game.progressVar(this.id('t06.down'), true);
                game.run(this.id('t06'));
              }),

              left: () => game.run(this.id('t03')),
              right: () => game.run(this.id('t05')),
              lookAround: () => game.run(this.id('t04.afterBattle.lookAround')),
            })}
          </div>
        ))}

        {this.renderLookAroundScript(this.id('t04.afterBattle'), (
          <>
            {() => game.progressVar(this.id('t04.up'), true)}
            {this.lookAroundMsgs.upCorridor}{w}<br />
            {this.lookAroundMsgs.leftCorridor}{w}<br />
            {this.lookAroundMsgs.rightCorridor}{w}<br />
          </>
        ))}
      </Chain.shield>

      <Chain.shield>
        {checkpoint(this.id('t05'))}
        {[clear, clearPanes]}

        {Chain.if(() => Math.random() >= 0.7, (
          <div>
            <p>You're ambushed!{w}</p>

            <Battle
              checkpoint={this.id('t05.battle')}
              actors={makeActors()}
            />
          </div>
        ))}

        {checkpoint(this.id('t05.afterBattle'))}
        {[clear, clearPanes]}
        {sec(0.75)}

        {() => game.setPane('bottom', (
          <div class="ActionsPane">
            {this.renderDefaultActions({
              up: game.progressVar(this.id('t05.up')) &&
                (() => game.run(this.id('t07'))),

              left: () => game.run(this.id('t04')),
              lookAround: () => game.run(this.id('t05.afterBattle.lookAround')),
            })}
          </div>
        ))}

        {this.renderLookAroundScript(this.id('t05.afterBattle'), (
          <>
            {() => game.progressVar(this.id('t05.up'), true)}
            {this.lookAroundMsgs.upCorridor}{w}<br />
            {this.lookAroundMsgs.leftCorridor}{w}<br />
          </>
        ))}
      </Chain.shield>

      <Chain.shield>
        {checkpoint(this.id('t06'))}
        {[clear, clearPanes]}

        {Chain.if(() => Math.random() >= 0.7, (
          <div>
            <p>You're ambushed!{w}</p>

            <Battle
              checkpoint={this.id('t06.battle')}
              actors={makeActors()}
            />
          </div>
        ))}

        {checkpoint(this.id('t06.afterBattle'))}
        {[clear, clearPanes]}
        {sec(0.75)}

        {() => game.setPane('bottom', (
          <div class="ActionsPane">
            {game.progressVar(this.id('t06.chest')) && (
              <button
                class="ActionsPane-btn"
                onClick={() => game.run(this.id('t06.openChest'))}
              >
                Open chest
              </button>
            )}

            {this.renderDefaultActions({
              right: game.progressVar(this.id('t06.right')) &&
                (() => game.run(this.id('t07'))),

              down: game.progressVar(this.id('t06.down')) &&
                (() => game.run(this.id('t04'))),

              lookAround: () => game.run(this.id('t06.afterBattle.lookAround')),
            })}
          </div>
        ))}

        <Chain.shield>
          {checkpoint(this.id('t06.openChest'))}
          {sdl(30)}
          {() => game.progressVar('dungeon.key01', true)}
          You open the chest box...{w}<br />
          You found a key inside!{w}<br />
          {goTo(this.id('t06.afterBattle'))}
        </Chain.shield>

        {this.renderLookAroundScript(this.id('t06.afterBattle'), (
          <>
            {() => game.progressVar(this.id('t06.chest'), true)}
            {() => game.progressVar(this.id('t06.right'), true)}
            {() => game.progressVar(this.id('t06.down'), true)}
            You see a chest box in the corner of the room.{w}<br />
            {this.lookAroundMsgs.rightCorridor}{w}<br />
            {this.lookAroundMsgs.downCorridor}{w}<br />
          </>
        ))}
      </Chain.shield>

      <Chain.shield>
        {checkpoint(this.id('t07'))}
        {[clear, clearPanes]}

        {Chain.if(() => Math.random() >= 0.7, (
          <div>
            <p>You're ambushed!{w}</p>

            <Battle
              checkpoint={this.id('t07.battle')}
              actors={makeActors()}
            />
          </div>
        ))}

        {checkpoint(this.id('t07.afterBattle'))}
        {[clear, clearPanes]}
        {sec(0.75)}

        {() => game.setPane('bottom', (
          <div class="ActionsPane">
            {this.renderDefaultActions({
              left: game.progressVar(this.id('t07.left')) && (() => {
                game.progressVar(this.id('t06.right'), true);
                game.run(this.id('t06'));
              }),

              right: game.progressVar(this.id('t07.right')) &&
                (() => game.run(this.id('t08'))),

              down: game.progressVar(this.id('t07.down')) &&
                (() => game.run(this.id('t04'))),

              lookAround: () => game.run(this.id('t07.afterBattle.lookAround')),
            })}
          </div>
        ))}

        {this.renderLookAroundScript(this.id('t07.afterBattle'), (
          <>
            {() => game.progressVar(this.id('t07.left'), true)}
            {() => game.progressVar(this.id('t07.right'), true)}
            {() => game.progressVar(this.id('t07.down'), true)}
            {this.lookAroundMsgs.leftCorridor}{w}<br />
            {this.lookAroundMsgs.rightCorridor}{w}<br />
            {this.lookAroundMsgs.downCorridor}{w}<br />
          </>
        ))}
      </Chain.shield>

      <Chain.shield>
        {checkpoint(this.id('t08'))}
        {[clear, clearPanes]}

        {Chain.if(() => Math.random() >= 0.7, (
          <div>
            <p>You're ambushed!{w}</p>

            <Battle
              checkpoint={this.id('t08.battle')}
              actors={makeActors()}
            />
          </div>
        ))}

        {checkpoint(this.id('t08.afterBattle'))}
        {[clear, clearPanes]}
        {sec(0.75)}

        {() => game.setPane('bottom', (
          <div class="ActionsPane">
            {this.renderDefaultActions({
              left: () => game.run(this.id('t07')),

              right: () => game.run(
                !game.progressVar('dungeon.key01')
                  ? this.id('t08.locked') : 'dungeon.lv01.r02',
              ),

              lookAround: () =>
                game.run(this.id('t08.afterBattle.lookAround')),
            })}
          </div>
        ))}

        <Chain.shield>
          {checkpoint(this.id('t08.locked'))}
          {[clear, clearPanes]}
          {sdl(30)}
          You try to open the door but it's locked!{w}<br />
          {goTo(this.id('t08.afterBattle'))}
        </Chain.shield>

        {this.renderLookAroundScript(this.id('t08.afterBattle'), (
          <>
            {() => game.progressVar(this.id('t08'), true)}
            {this.lookAroundMsgs.leftCorridor}{w}<br />
            {this.lookAroundMsgs.rightDoor}{w}<br />
          </>
        ))}
      </Chain.shield>
    </Chain.shield>
  );

  renderDefaultActions = conf => (
    <>
      {Boolean(conf.up) && (
        <button class="ActionsPane-btn" onClick={conf.up}>
          Go up
        </button>
      )}

      {Boolean(conf.left || conf.right) && (
        <div class="ActionsPane-row">
          {Boolean(conf.left) && (
            <button class="ActionsPane-btn" onClick={conf.left}>
              Go left
            </button>
          )}

          {Boolean(conf.right) && (
            <button class="ActionsPane-btn" onClick={conf.right}>
              Go right
            </button>
          )}
        </div>
      )}

      {Boolean(conf.down) && (
        <button class="ActionsPane-btn" onClick={conf.down}>
          Go down
        </button>
      )}

      {Boolean(conf.lookAround) && (
        <button class="ActionsPane-btn" onClick={conf.lookAround}>
          Look around
        </button>
      )}
    </>
  );

  renderLookAroundScript = (returnTo, children) => (
    <Chain.shield>
      {checkpoint(`${returnTo}.lookAround`)}
      {() => game.setPane('bottom', null)}
      {sdl(30)}
      {children}
      {goTo(returnTo)}
    </Chain.shield>
  );
}

export default DungeonLv01R01;
