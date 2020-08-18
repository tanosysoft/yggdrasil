import Chain, { d, goTo, sdl, sec, w } from '@tanosysoft/chain';
import checkpoint from './checkpoint';
import clear from './clear';
import label from './label';

class Battle extends d.Component {
  get btst() {
    return game.chain.progress.battle;
  }

  set btst(x) {
    return game.chain.progress.battle = x;
  }

  actors(prefix) {
    return Object.entries(this.btst.actors)
      .filter(([id]) => !prefix || id.startsWith(prefix))
      .map(([id, x]) => ({ id, ...x }));
  }

  get curActor() {
    let { btst } = this;
    return btst.actors[btst.curActorId] || null;
  }

  get targetActor() {
    let { btst } = this;
    return btst.actors[btst.targetActorId] || null;
  }

  get curLabel() {
    let { btst, curActor } = this;
    return curActor && `${curActor.name}[${btst.curActorId}]`;
  }

  get targetLabel() {
    let { btst, targetActor } = this;
    return targetActor && `${targetActor.name}[${btst.targetActorId}]`;
  }

  render = () => (
    <div class="Battle">
      {checkpoint('battle')}
      {() => this.btst = {
        actors: {
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
        },

        turn: 'player',
      }}

      {clear}
      {sec(2)}
      {sdl(80)}

      {() => game.setPane('top', (
        <div>
          <h2>
            {d.text(() => ({
              player: 'Player turn',
              enemy: 'Enemy turn',
            }[this.btst.turn]))}
          </h2>

          <p>
            {d.map(() => this.actors('E'), x => (
              <div>
                {d.text(() => `${x.name}[${x.id}]`)}:{' '}
                {d.text(() => `${x.hp}/${x.maxHp}`)} HP,{' '}
                {d.text(() => `${x.mp}/${x.maxMp}`)} MP
              </div>
            ))}
          </p>

          <p>
            {d.map(() => this.actors('P'), x => (
              <div>
                {d.text(() => `${x.name}[${x.id}]`)}:{' '}
                {d.text(() => `${x.hp}/${x.maxHp}`)} HP,{' '}
                {d.text(() => `${x.mp}/${x.maxMp}`)} MP
              </div>
            ))}
          </p>
        </div>
      ))}

      {label('battle.mainLoop')}

      {() => {
        let { turn } = this.btst;

        switch (turn) {
          case 'player': return goTo('battle.partyLoop');
          case 'enemy': return goTo('battle.enemyLoop');

          default:
            throw new Error(`Invalid turn: ${turn}`);
        }
      }}

      <Chain.shield>
        {label('battle.partyLoop')}

        {() => {
          let party = this.actors('P');
          let { btst } = this;

          let loop = btst.partyLoop = btst.partyLoop || {};

          while (true) {
            loop.i = (loop.i ?? -1) + 1;
            let actor = party[loop.i];

            if (!actor) {
              delete btst.partyLoop;
              btst.turn = 'enemy';
              d.update();

              return goTo('battle.enemyLoop');
            }

            if (actor.active) {
              btst.curActorId = actor.id;
              break;
            }
          }
        }}

        {sdl(30)}
        <p>{() => this.curLabel}'s turn.{sec(1)}</p>

        {goTo('battle.playerLoop.mainMenu')}
      </Chain.shield>

      <Chain.shield>
        {label('battle.playerLoop.mainMenu')}

        {() => game.setPane('bottom', (
          <div class="ActionsPane">
            <button
              class="ActionsPane-btn"
              onClick={() => game.chain.run('battle.playerLoop.attackMenu')}
            >
              Attack
            </button>
          </div>
        ))}
      </Chain.shield>

      <Chain.shield>
        {label('battle.playerLoop.attackMenu')}

        {() => game.setPane('bottom', (
          <div class="ActionsPane">
            {d.map(() => this.actors('E'), x => (
              <button
                class="ActionsPane-btn"
                onClick={() => {
                  this.btst.targetActorId = x.id;
                  game.chain.run('battle.attack');
                }}
              >
                {x.name}[{x.id}]
              </button>
            ))}

            <button
              class="ActionsPane-btn"
              onClick={() => game.chain.run('battle.playerLoop.mainMenu')}
            >
              Back
            </button>
          </div>
        ))}
      </Chain.shield>

      <Chain.shield>
        {label('battle.enemyLoop')}

        {() => {
          let enemies = this.actors('E');
          let { btst } = this;

          let loop = btst.enemyLoop = btst.enemyLoop || {};

          while (true) {
            loop.i = (loop.i ?? -1) + 1;
            let actor = enemies[loop.i];

            if (!actor) {
              delete btst.enemyLoop;
              btst.turn = 'enemy';
              d.update();

              return goTo('battle.partyLoop');
            }

            if (actor.active) {
              btst.curActorId = actor.id;
              break;
            }
          }
        }}

        {sdl(30)}
        <p>{() => this.curLabel}'s turn.{sec(1)}</p>

        {() => void(this.btst.targetActorId = 'P1')}
        {goTo('battle.attack')}
      </Chain.shield>

      <Chain.shield>
        {label('battle.attack')}
        {() => game.setPane('bottom', null)}
        {sdl(10)}
        <div>{() => this.curLabel} attacks!{w}</div>

        {() => Math.random() >= 0.95 && (
          <div>
            <div>The attack misses {() => this.targetLabel}!{w}</div>
            {goTo('battle.mainLoop')}
          </div>
        )}

        {() => Math.random() >= 0.95 && (
          <div>
            <div>{() => this.targetLabel} evades!{w}</div>
            {goTo('battle.mainLoop')}
          </div>
        )}

        {async () => {
          let { curActor, targetActor } = this;

          let dmg = (curActor.atk * 4) - (targetActor.def * 2);
          let variance = 0.2;

          dmg += ((Math.random() * variance * 2) - variance) * dmg;
          dmg = Math.round(dmg);

          targetActor.hp = Math.max(0, targetActor.hp - dmg);

          if (!targetActor.hp) {
            targetActor.active = false;
          }

          d.update();

          return (
            <div>
              <div>{() => this.targetLabel} loses {dmg} HP.{w}</div>

              {!targetActor.hp && (
                <div>{() => this.targetLabel} is no more.{w}</div>
              )}
            </div>
          );
        }}

        {goTo('battle.mainLoop')}
      </Chain.shield>
    </div>
  );
}

export default Battle;
