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
      <DungeonRoom.topPane minimap={minimap} room={areaId('r01')} />

      <ActionsPane>
        <ActionsPane.defaultActions
          room={areaId('r01')}
          left={() => game.run('dungeon.lv01.a01.r08')}
          right={() => game.run(areaId('r02'))}
        />
      </ActionsPane>

      <LookAround room={areaId('r01')}>
        <LookAround.gatherables room={areaId('r01')} />
        <LookAround.defaultMsgs leftDoor rightCorridor />
      </LookAround>
    </DungeonRoom>

    <DungeonRoom checkpoint={areaId('r02')} minimap={minimap}>
      <Battle
        checkpoint={areaId('r02.battle')}
        chance={0.5}
        troop={troops.t01}
      />

      {checkpoint(areaId('r02.afterBattle'))}
      <DungeonRoom.topPane minimap={minimap} room={areaId('r02')} />

      <ActionsPane>
        <ActionsPane.defaultActions
          room={areaId('r02')}
          left={() => game.run(areaId('r01'))}
          right={() => game.run(areaId('r03'))}
          down={() => game.run(areaId('r04'))}
          hidden={() => [!game.progressVar(areaId('r02.r04')) && 'down']}
        />
      </ActionsPane>

      <LookAround room={areaId('r02')}>
        <LookAround.gatherables room={areaId('r02')} />
        <LookAround.defaultMsgs leftCorridor rightCorridor />
        {() => game.progressVar(areaId('r02.r04'), true)}
        <LookAround.defaultMsgs downCorridor />
      </LookAround>
    </DungeonRoom>

    <DungeonRoom checkpoint={areaId('r03')} minimap={minimap}>
      <Battle
        checkpoint={areaId('r03.battle')}
        chance={0.5}
        troop={troops.t01}
      />

      {checkpoint(areaId('r03.afterBattle'))}
      <DungeonRoom.topPane minimap={minimap} room={areaId('r03')} />

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
          room={areaId('r03')}
          left={() => game.run(areaId('r02'))}
        />
      </ActionsPane>

      <LookAround room={areaId('r03')}>
        <LookAround.gatherables room={areaId('r03')} />
        {() => game.progressVar(areaId('r03.chest'), true)}
        You see a chest box in the middle of the room.{w}<br />
        <LookAround.defaultMsgs leftCorridor />
      </LookAround>

      <Chain.shield>
        {label(areaId('r03.openChest'))}
        {() => game.setPane('bottom', null)}
        {clear}
        {sdl(30)}

        {Chain.if(() => !game.progressVar(areaId('r03.openChest')), (
          <div>
            You open the chest box...{w}<br />

            {() => {
              game.inventoryItem('dgKey01', 1);
              game.progressVar(areaId('r03.openChest'), true);
              game.chain.saveGame();
            }}

            You find a key inside!{w}<br />
          </div>
        ), (
          <div>It's empty.{w}</div>
        ))}

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
      <DungeonRoom.topPane minimap={minimap} room={areaId('r04')} />

      <ActionsPane>
        <ActionsPane.defaultActions
          room={areaId('r04')}
          up={() => game.run(areaId('r02'))}
          right={() => game.run(areaId('r05'))}
          hidden={() => [!game.progressVar(areaId('r04.r05')) && 'right']}
        />
      </ActionsPane>

      <LookAround room={areaId('r04')}>
        <LookAround.gatherables room={areaId('r04')} />
        <LookAround.defaultMsgs upCorridor />
        {() => game.progressVar(areaId('r04.r05'), true)}
        <LookAround.defaultMsgs rightCorridor />
      </LookAround>
    </DungeonRoom>

    <DungeonRoom checkpoint={areaId('r05')} minimap={minimap}>
      <Battle
        checkpoint={areaId('r05.battle')}
        chance={0.5}
        troop={troops.t01}
      />

      {checkpoint(areaId('r05.afterBattle'))}
      <DungeonRoom.topPane minimap={minimap} room={areaId('r05')} />

      <ActionsPane>
        <ActionsPane.defaultActions
          room={areaId('r05')}
          left={() => game.run(areaId('r04'))}
          right={() => game.run(areaId('r06'))}
        />
      </ActionsPane>

      <LookAround room={areaId('r05')}>
        <LookAround.gatherables room={areaId('r05')} />
        <LookAround.defaultMsgs leftCorridor rightCorridor />
      </LookAround>
    </DungeonRoom>

    <DungeonRoom checkpoint={areaId('r06')} minimap={minimap}>
      <Battle
        checkpoint={areaId('r06.battle')}
        chance={0.5}
        troop={troops.t01}
      />

      {checkpoint(areaId('r06.afterBattle'))}
      <DungeonRoom.topPane minimap={minimap} room={areaId('r06')} />

      <ActionsPane>
        <ActionsPane.defaultActions
          room={areaId('r06')}
          left={() => game.run(areaId('r05'))}
          right={() => game.run('dungeon.lv01.a03')}
        />
      </ActionsPane>

      <LookAround room={areaId('r06')}>
        <LookAround.gatherables room={areaId('r06')} />
        <LookAround.defaultMsgs leftCorridor rightCorridor />
      </LookAround>
    </DungeonRoom>
  </DungeonArea>
);

export default DungeonLv01A02;
