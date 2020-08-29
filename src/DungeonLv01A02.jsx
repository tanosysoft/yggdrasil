import ActionsPane from './ActionsPane';
import Battle from './Battle';
import Chain, { clear, d, goTo, sdl, w } from '@tanosysoft/chain';
import DungeonArea from './DungeonArea';
import DungeonRoom from './DungeonRoom';
import LookAround from './LookAround';
import checkpoint from './checkpoint';
import label from './label';

let areaId = id => `dungeon.lv01.a02${id ? `.${id}` : ''}`;

let minimap = [[
    '-[r01]-[r02]-[r03]       ',
    '                         ',
    '       [r04] [r05]-[r06]-',
  ].join('\n'),

  ['r02.r04', '|', 9, 1],
  ['r04.r05', '-', 12, 2],
];

let DungeonLv01A02 = () => (
  <DungeonArea checkpoint={areaId()}>
    {goTo(areaId('r01'))}

    <DungeonRoom checkpoint={areaId('r01')} minimap={minimap}>
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
        {goTo(areaId('r01'))}
      </LookAround>
    </DungeonRoom>

    <DungeonRoom checkpoint={areaId('r02')} minimap={minimap}>
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
        {goTo(areaId('r02'))}
      </LookAround>
    </DungeonRoom>

    <DungeonRoom checkpoint={areaId('r03')} minimap={minimap}>
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
        {goTo(areaId('r03'))}
      </LookAround>

      <Chain.shield>
        {label(areaId('r03.openChest'))}
        {() => game.setPane('bottom', null)}
        {clear}
        {sdl(30)}
        You open the chest box...{w}<br />
        {() => game.progressVar('dungeon.key02', true)}
        You find a key inside!{w}<br />
        {goTo(areaId('r03'))}
      </Chain.shield>
    </DungeonRoom>

    <DungeonRoom checkpoint={areaId('r04')} minimap={minimap}>
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
        {goTo(areaId('r04'))}
      </LookAround>
    </DungeonRoom>

    <DungeonRoom checkpoint={areaId('r05')} minimap={minimap}>
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
        {goTo(areaId('r05'))}
      </LookAround>
    </DungeonRoom>

    <DungeonRoom checkpoint={areaId('r06')} minimap={minimap}>
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
        {goTo(areaId('r06'))}
      </LookAround>
    </DungeonRoom>
  </DungeonArea>
);

export default DungeonLv01A02;
