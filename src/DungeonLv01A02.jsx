import ActionsPane from './ActionsPane';
import Battle from './Battle';
import Chain, { clear, d, goTo, sdl, w } from '@tanosysoft/chain';
import DungeonArea from './DungeonArea';
import DungeonRoom from './DungeonRoom';
import LookAround from './LookAround';
import checkpoint from './checkpoint';
import label from './label';
import makeTroop from './makeTroop';
import sample from 'lodash/sample';

let areaId = id => `dungeon.lv01.a02${id ? `.${id}` : ''}`;

let minimap = [[
    '-[r01]-[r02]-[r03]       ',
    '                         ',
    '       [r04] [r05]-[r06]-',
  ].join('\n'),

  ['r02.r04', '|', 9, 1],
  ['r04.r05', '-', 12, 2],
];

let troops = {
  t01: () => sample([
    makeTroop('orc'),
    makeTroop('orc'),
    makeTroop([2, 'slime']),
    makeTroop([2, 'slime']),
    makeTroop('slime'),
  ]),
};

let DungeonLv01A02 = () => (
  <DungeonArea checkpoint={areaId()}>
    {goTo(areaId('r01'))}

    <DungeonRoom checkpoint={areaId('r01')} minimap={minimap}>
      <Battle
        checkpoint={areaId('r01.battle')}
        chance={0.5}
        troop={troops.t01}
      />

      {checkpoint(areaId('r01.afterBattle'))}
      <DungeonRoom.topPane roomId={areaId('r01')} minimap={minimap} />

      <ActionsPane>
        <ActionsPane.defaultActions
          left={() => game.run('dungeon.lv01.a01.r08')}
          right={() => game.run(areaId('r02'))}
          lookAround={() => game.run(areaId('r01.lookAround'))}
        />
      </ActionsPane>

      <LookAround label={areaId('r01.lookAround')}>
        {LookAround.defaultMsgs.leftDoor}{w}<br />
        {LookAround.defaultMsgs.rightCorridor}{w}<br />
        {goTo(areaId('r01.afterBattle'))}
      </LookAround>
    </DungeonRoom>

    <DungeonRoom checkpoint={areaId('r02')} minimap={minimap}>
      <Battle
        checkpoint={areaId('r02.battle')}
        chance={0.5}
        troop={troops.t01}
      />

      {checkpoint(areaId('r02.afterBattle'))}
      <DungeonRoom.topPane roomId={areaId('r02')} minimap={minimap} />

      <ActionsPane>
        <ActionsPane.defaultActions
          left={() => game.run(areaId('r01'))}
          right={() => game.run(areaId('r03'))}
          down={() => game.run(areaId('r04'))}
          lookAround={() => game.run(areaId('r02.lookAround'))}
          hidden={() => [!game.progressVar(areaId('r02.r04')) && 'down']}
        />
      </ActionsPane>

      <LookAround label={areaId('r02.lookAround')}>
        {LookAround.defaultMsgs.leftCorridor}{w}<br />
        {LookAround.defaultMsgs.rightCorridor}{w}<br />
        {() => game.progressVar(areaId('r02.r04'), true)}
        {LookAround.defaultMsgs.downCorridor}{w}<br />
        {goTo(areaId('r02.afterBattle'))}
      </LookAround>
    </DungeonRoom>

    <DungeonRoom checkpoint={areaId('r03')} minimap={minimap}>
      <Battle
        checkpoint={areaId('r03.battle')}
        chance={0.5}
        troop={troops.t01}
      />

      {checkpoint(areaId('r03.afterBattle'))}
      <DungeonRoom.topPane roomId={areaId('r03')} minimap={minimap} />

      <ActionsPane>
        {d.if(() => game.progressVar(areaId('r03.chest')), (
          <button
            class="ActionsPane-btn"
            onClick={() => game.run(areaId('r03.openChest'))}
          >
            Open chest
          </button>
        ))}

        <ActionsPane.defaultActions
          left={() => game.run(areaId('r02'))}
          lookAround={() => game.run(areaId('r03.lookAround'))}
        />
      </ActionsPane>

      <LookAround label={areaId('r03.lookAround')}>
        {() => game.progressVar(areaId('r03.chest'), true)}
        You see a chest box in the middle of the room.{w}<br />
        {LookAround.defaultMsgs.leftCorridor}{w}<br />
        {goTo(areaId('r03.afterBattle'))}
      </LookAround>

      <Chain.shield>
        {label(areaId('r03.openChest'))}
        {() => game.setPane('bottom', null)}
        {clear}
        {sdl(30)}
        You open the chest box...{w}<br />
        {() => game.progressVar('dungeon.key02', true)}
        You find a key inside!{w}<br />
        {goTo(areaId('r03.afterBattle'))}
      </Chain.shield>
    </DungeonRoom>

    <DungeonRoom checkpoint={areaId('r04')} minimap={minimap}>
      <Battle
        checkpoint={areaId('r04.battle')}
        chance={0.5}
        troop={troops.t01}
      />

      {checkpoint(areaId('r04.afterBattle'))}
      <DungeonRoom.topPane roomId={areaId('r04')} minimap={minimap} />

      <ActionsPane>
        <ActionsPane.defaultActions
          up={() => game.run(areaId('r02'))}
          right={() => game.run(areaId('r05'))}
          lookAround={() => game.run(areaId('r04.lookAround'))}
          hidden={() => [!game.progressVar(areaId('r04.r05')) && 'right']}
        />
      </ActionsPane>

      <LookAround label={areaId('r04.lookAround')}>
        {LookAround.defaultMsgs.upCorridor}{w}<br />
        {() => game.progressVar(areaId('r04.r05'), true)}
        {LookAround.defaultMsgs.rightCorridor}{w}<br />
        {goTo(areaId('r04.afterBattle'))}
      </LookAround>
    </DungeonRoom>

    <DungeonRoom checkpoint={areaId('r05')} minimap={minimap}>
      <Battle
        checkpoint={areaId('r05.battle')}
        chance={0.5}
        troop={troops.t01}
      />

      {checkpoint(areaId('r05.afterBattle'))}
      <DungeonRoom.topPane roomId={areaId('r05')} minimap={minimap} />

      <ActionsPane>
        <ActionsPane.defaultActions
          left={() => game.run(areaId('r04'))}
          right={() => game.run(areaId('r06'))}
          lookAround={() => game.run(areaId('r05.lookAround'))}
        />
      </ActionsPane>

      <LookAround label={areaId('r05.lookAround')}>
        {LookAround.defaultMsgs.leftCorridor}{w}<br />
        {LookAround.defaultMsgs.rightCorridor}{w}<br />
        {goTo(areaId('r05.afterBattle'))}
      </LookAround>
    </DungeonRoom>

    <DungeonRoom checkpoint={areaId('r06')} minimap={minimap}>
      <Battle
        checkpoint={areaId('r06.battle')}
        chance={0.5}
        troop={troops.t01}
      />

      {checkpoint(areaId('r06.afterBattle'))}
      <DungeonRoom.topPane roomId={areaId('r06')} minimap={minimap} />

      <ActionsPane>
        <ActionsPane.defaultActions
          left={() => game.run(areaId('r05'))}
          right={() => game.run('dungeon.lv01.a03')}
          lookAround={() => game.run(areaId('r06.lookAround'))}
        />
      </ActionsPane>

      <LookAround label={areaId('r06.lookAround')}>
        {LookAround.defaultMsgs.leftCorridor}{w}<br />
        {LookAround.defaultMsgs.rightCorridor}{w}<br />
        {goTo(areaId('r06.afterBattle'))}
      </LookAround>
    </DungeonRoom>
  </DungeonArea>
);

export default DungeonLv01A02;