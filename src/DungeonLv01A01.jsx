import ActionsPane from './ActionsPane';
import Battle from './Battle';
import Chain, { clear, d, goTo, sdl, sec, w } from '@tanosysoft/chain';
import DungeonArea from './DungeonArea';
import DungeonRoom from './DungeonRoom';
import LookAround from './LookAround';
import checkpoint from './checkpoint';
import label from './label';

let areaId = id => `dungeon.lv01.a01${id ? `.${id}` : ''}`;

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

let minimap = [[
    '                   [r06] [r07] [r08]-',
    '                                     ',
    '-[r01]-[r02]-[r03]-[r04]-[r05]       ',
  ].join('\n'),

  ['r04.r06', '|', 21, 1],
  ['r05.r07', '|', 27, 1],
  ['r06.r07', '-', 24, 0],
  ['r07.r08', '-', 30, 0],
];

let DungeonLv01A01 = () => (
  <DungeonArea checkpoint={areaId()}>
    {goTo(areaId('r01'))}

    <DungeonRoom checkpoint={areaId('r01')} minimap={minimap}>
      <ActionsPane>
        <ActionsPane.defaultActions
          left={() => game.run('fyrya')}
          right={() => game.run(areaId('r02'))}
          lookAround={() => game.run(areaId('r01.lookAround'))}
        />
      </ActionsPane>

      <LookAround label={areaId('r01.lookAround')}>
        You can leave the dungeon to the left.{w}<br />
        {LookAround.defaultMsgs.rightCorridor}{w}<br />
        {goTo(areaId('r01'))}
      </LookAround>
    </DungeonRoom>

    <DungeonRoom checkpoint={areaId('r02')} minimap={minimap}>
      <ActionsPane>
        <ActionsPane.defaultActions
          left={() => game.run(areaId('r01'))}
          right={() => game.run(areaId('r03'))}
          lookAround={() => game.run(areaId('r02.lookAround'))}
        />
      </ActionsPane>

      <LookAround label={areaId('r02.lookAround')}>
        {LookAround.defaultMsgs.leftCorridor}{w}<br />
        {LookAround.defaultMsgs.rightCorridor}{w}<br />
        {goTo(areaId('r02'))}
      </LookAround>
    </DungeonRoom>

    <DungeonRoom checkpoint={areaId('r03')} minimap={minimap}>
      <ActionsPane>
        <ActionsPane.defaultActions
          left={() => game.run(areaId('r02'))}
          right={() => game.run(areaId('r04'))}
          lookAround={() => game.run(areaId('r03.lookAround'))}
        />
      </ActionsPane>

      <LookAround label={areaId('r03.lookAround')}>
        {LookAround.defaultMsgs.leftCorridor}{w}<br />
        {LookAround.defaultMsgs.rightCorridor}{w}<br />
        {goTo(areaId('r03'))}
      </LookAround>
    </DungeonRoom>

    <DungeonRoom checkpoint={areaId('r04')} minimap={minimap}>
      <ActionsPane>
        <ActionsPane.defaultActions
          up={() => game.run(areaId('r06'))}
          left={() => game.run(areaId('r03'))}
          right={() => game.run(areaId('r05'))}
          lookAround={() => game.run(areaId('r04.lookAround'))}
          hidden={() => [!game.progressVar(areaId('r04.r06')) && 'up']}
        />
      </ActionsPane>

      <LookAround label={areaId('r04.lookAround')}>
        {() => game.progressVar(areaId('r04.r06'), true)}
        {LookAround.defaultMsgs.upCorridor}{w}<br />
        {LookAround.defaultMsgs.leftCorridor}{w}<br />
        {LookAround.defaultMsgs.rightCorridor}{w}<br />
        {goTo(areaId('r04'))}
      </LookAround>
    </DungeonRoom>

    <DungeonRoom checkpoint={areaId('r05')} minimap={minimap}>
      <ActionsPane>
        <ActionsPane.defaultActions
          up={() => game.run(areaId('r07'))}
          left={() => game.run(areaId('r04'))}
          lookAround={() => game.run(areaId('r05.lookAround'))}
          hidden={() => [!game.progressVar(areaId('r05.r07')) && 'up']}
        />
      </ActionsPane>

      <LookAround label={areaId('r05.lookAround')}>
        {() => game.progressVar(areaId('r05.r07'), true)}
        {LookAround.defaultMsgs.upCorridor}{w}<br />
        {LookAround.defaultMsgs.leftCorridor}{w}<br />
        {goTo(areaId('r05'))}
      </LookAround>
    </DungeonRoom>

    <DungeonRoom checkpoint={areaId('r06')} minimap={minimap}>
      <ActionsPane>
        {d.if(() => game.progressVar(areaId('r06.chest')), (
          <button
            class="ActionsPane-btn"
            onClick={() => game.run(areaId('r06.openChest'))}
          >
            Open chest
          </button>
        ))}

        <ActionsPane.defaultActions
          right={() => {
            game.progressVar(areaId('r07.r08'), true);
            game.run(areaId('r07'));
          }}

          down={() => game.run(areaId('r04'))}
          lookAround={() => game.run(areaId('r06.lookAround'))}

          hidden={() => [
            !game.progressVar(areaId('r06.r07')) && 'right',
            !game.progressVar(areaId('r04.r06')) && 'down',
          ]}
        />
      </ActionsPane>

      <LookAround label={areaId('r06.lookAround')}>
        {() => game.progressVar(areaId('r06.chest'), true)}
        You see a chest box in the corner of the room.{w}<br />
        {() => game.progressVar(areaId('r06.r07'), true)}
        {LookAround.defaultMsgs.rightCorridor}{w}<br />
        {() => game.progressVar(areaId('r04.r06'), true)}
        {LookAround.defaultMsgs.downCorridor}{w}<br />
        {goTo(areaId('r06'))}
      </LookAround>

      <Chain.shield>
        {checkpoint(areaId('r06.openChest'))}
        {() => game.setPane('bottom', null)}
        {clear}
        {sdl(30)}
        You open the chest box...{w}<br />
        {() => game.progressVar('dungeon.key01', true)}
        You find a key inside!{w}<br />
        {goTo(areaId('r06'))}
      </Chain.shield>
    </DungeonRoom>

    <DungeonRoom checkpoint={areaId('r07')} minimap={minimap}>
      <ActionsPane>
        <ActionsPane.defaultActions
          left={() => game.run(areaId('r06'))}
          right={() => game.run(areaId('r08'))}
          down={() => game.run(areaId('r04'))}
          lookAround={() => game.run(areaId('r07.lookAround'))}

          hidden={() => [
            !game.progressVar(areaId('r06.r07')) && 'left',
            !game.progressVar(areaId('r07.r08')) && 'right',
            !game.progressVar(areaId('r04.r07')) && 'down',
          ]}
        />
      </ActionsPane>

      <LookAround label={areaId('r07.lookAround')}>
        {() => game.progressVar(areaId('r06.r07'), true)}
        {LookAround.defaultMsgs.leftCorridor}{w}<br />
        {() => game.progressVar(areaId('r07.r08'), true)}
        {LookAround.defaultMsgs.rightCorridor}{w}<br />
        {() => game.progressVar(areaId('r04.r07'), true)}
        {LookAround.defaultMsgs.downCorridor}{w}<br />
        {goTo(areaId('r07'))}
      </LookAround>
    </DungeonRoom>

    <DungeonRoom checkpoint={areaId('r08')} minimap={minimap}>
      <ActionsPane>
        <ActionsPane.defaultActions
          left={() => game.run(areaId('r07'))}

          right={() => game.run(
            !game.progressVar('dungeon.key01')
              ? areaId('r08.locked') : 'dungeon.lv01.a02',
          )}

          lookAround={() => game.run(areaId('r08.lookAround'))}
        />
      </ActionsPane>

      <LookAround label={areaId('r08.lookAround')}>
        {LookAround.defaultMsgs.leftCorridor}{w}<br />
        {LookAround.defaultMsgs.rightDoor}{w}<br />
        {goTo(areaId('r08'))}
      </LookAround>

      <Chain.shield>
        {checkpoint(areaId('r08.locked'))}
        {() => game.setPane('bottom', null)}
        {clear}
        {sdl(30)}
        You try to open the door but it's locked!{w}<br />
        {goTo(areaId('r08'))}
      </Chain.shield>
    </DungeonRoom>
  </DungeonArea>
);

export default DungeonLv01A01;
