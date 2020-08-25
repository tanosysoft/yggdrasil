import ActionsPane from './ActionsPane';
import Battle from './Battle';
import Chain, { clear, d, goTo, sdl, sec, w } from '@tanosysoft/chain';
import LookAround from './LookAround';
import checkpoint from './checkpoint';

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

// -(1)-(1)-(2)
//       |
//      (1)-(1)-(1)-
class DungeonLv01A02 extends d.Component {
  id = id => `dungeon.lv01.a02${id ? `.${id}` : ''}`;

  render = () => (
    <Chain.shield>
      {checkpoint(this.id())}
      {() => game.setPane('bottom', null)}
      {clear}
      {goTo(this.id('r01'))}

      <Chain.shield>
        {checkpoint(this.id('r01'))}
        {() => game.setPane('bottom', null)}
        {clear}
        {sec(0.75)}

        <ActionsPane>
          <ActionsPane.defaultActions
            left={() => game.run('dungeon.lv01.a01.r08')}
            right={() => game.run(this.id('r02'))}
            lookAround={() => game.run(this.id('r01.lookAround'))}
          />
        </ActionsPane>

        <LookAround label={this.id('r01.lookAround')}>
          {LookAround.defaultMsgs.leftDoor}{w}<br />
          {LookAround.defaultMsgs.rightCorridor}{w}<br />
          {goTo(this.id('r01'))}
        </LookAround>
      </Chain.shield>
    </Chain.shield>
  );
}

export default DungeonLv01A02;
