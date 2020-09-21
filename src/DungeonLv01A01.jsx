import ActionsPane from './ActionsPane';
import Battle from './Battle';
import Chain, { clear, d, goTo, sdl, sec, w } from '@tanosysoft/chain';
import DungeonArea from './DungeonArea';
import DungeonRoom from './DungeonRoom';
import ItemMenu from './ItemMenu';
import LookAround from './LookAround';
import checkpoint from './checkpoint';
import items from './items';
import label from './label';
import makeTroop from './makeTroop';
import sample from 'lodash/sample';

let areaId = id => `dungeon.lv01.a01${id ? `.${id}` : ''}`;

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

let troops = {
  t01: () => sample([
    makeTroop([2, 'bat']),
    makeTroop('bat'),
  ]),

  t02: () => sample([
    makeTroop([2, 'bat']),
    makeTroop([2, 'bat']),
    makeTroop('bat', 'slime'),
    makeTroop('slime'),
  ]),
};

let DungeonLv01A01 = () => (
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
          left={() => game.run('fyrya')}
          right={() => game.run(areaId('r02'))}
        />
      </ActionsPane>

      <LookAround room={areaId('r01')}>
        <LookAround.gatherables room={areaId('r01')} />
        You can leave the dungeon to the left.{w}<br />
        <LookAround.defaultMsgs rightCorridor />
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
        />
      </ActionsPane>

      <LookAround room={areaId('r02')}>
        <LookAround.gatherables room={areaId('r02')} />
        <LookAround.defaultMsgs leftCorridor rightCorridor />
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
        <ActionsPane.defaultActions
          room={areaId('r03')}
          left={() => game.run(areaId('r02'))}
          right={() => game.run(areaId('r04'))}
        />
      </ActionsPane>

      <LookAround room={areaId('r03')}>
        <LookAround.gatherables room={areaId('r03')} />
        <LookAround.defaultMsgs leftCorridor rightCorridor />
      </LookAround>
    </DungeonRoom>

    <DungeonRoom checkpoint={areaId('r04')} minimap={minimap}>
      <Battle
        checkpoint={areaId('r04.battle')}
        chance={0.5}
        troop={troops.t02}
      />

      {checkpoint(areaId('r04.afterBattle'))}
      <DungeonRoom.topPane minimap={minimap} room={areaId('r04')} />

      <ActionsPane>
        <ActionsPane.defaultActions
          room={areaId('r04')}
          up={() => game.run(areaId('r06'))}
          left={() => game.run(areaId('r03'))}
          right={() => game.run(areaId('r05'))}
          hidden={() => [!game.progressVar(areaId('r04.r06')) && 'up']}
        />
      </ActionsPane>

      <LookAround room={areaId('r04')}>
        <LookAround.gatherables room={areaId('r04')} />
        {() => game.progressVar(areaId('r04.r06'), true)}
        <LookAround.defaultMsgs upCorridor leftCorridor rightCorridor />
      </LookAround>
    </DungeonRoom>

    <DungeonRoom checkpoint={areaId('r05')} minimap={minimap}>
      <Battle
        checkpoint={areaId('r05.battle')}
        chance={0.5}
        troop={troops.t02}
      />

      {checkpoint(areaId('r05.afterBattle'))}
      <DungeonRoom.topPane minimap={minimap} room={areaId('r05')} />

      <ActionsPane>
        <ActionsPane.defaultActions
          room={areaId('r05')}
          up={() => game.run(areaId('r07'))}
          left={() => game.run(areaId('r04'))}
          hidden={() => [!game.progressVar(areaId('r05.r07')) && 'up']}
        />
      </ActionsPane>

      <LookAround room={areaId('r05')}>
        <LookAround.gatherables room={areaId('r05')} />
        {() => game.progressVar(areaId('r05.r07'), true)}
        <LookAround.defaultMsgs upCorridor leftCorridor />
      </LookAround>
    </DungeonRoom>

    <DungeonRoom checkpoint={areaId('r06')} minimap={minimap}>
      <Battle
        checkpoint={areaId('r06.battle')}
        chance={0.5}
        troop={troops.t02}
      />

      {checkpoint(areaId('r06.afterBattle'))}
      <DungeonRoom.topPane minimap={minimap} room={areaId('r06')} />

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
          room={areaId('r06')}

          right={() => {
            game.progressVar(areaId('r07.r08'), true);
            game.run(areaId('r07'));
          }}

          down={() => game.run(areaId('r04'))}

          hidden={() => [
            !game.progressVar(areaId('r06.r07')) && 'right',
            !game.progressVar(areaId('r04.r06')) && 'down',
          ]}
        />
      </ActionsPane>

      <LookAround room={areaId('r06')}>
        <LookAround.gatherables room={areaId('r06')} />
        {() => game.progressVar(areaId('r06.chest'), true)}
        You see a chest box in the corner of the room.{w}<br />
        {() => game.progressVar(areaId('r06.r07'), true)}
        <LookAround.defaultMsgs rightCorridor />
        {() => game.progressVar(areaId('r04.r06'), true)}
        <LookAround.defaultMsgs downCorridor />
      </LookAround>

      <Chain.shield>
        {checkpoint(areaId('r06.openChest'))}
        {() => game.setPane('bottom', null)}
        {clear}
        {sdl(30)}

        {Chain.if(() => !game.progressVar(areaId('r06.openChest')), (
          <div>
            You open the chest box...{w}<br />

            {() => {
              game.inventoryItem('dgKey01', 1);
              game.progressVar(areaId('r06.openChest'), true);
              game.chain.saveGame();
            }}

            You find a key inside!{w}
          </div>
        ), (
          <div>It's empty.{w}</div>
        ))}

        {goTo(areaId('r06.afterBattle'))}
      </Chain.shield>
    </DungeonRoom>

    <DungeonRoom checkpoint={areaId('r07')} minimap={minimap}>
      <Battle
        checkpoint={areaId('r07.battle')}
        chance={0.5}
        troop={troops.t02}
      />

      {checkpoint(areaId('r07.afterBattle'))}
      <DungeonRoom.topPane minimap={minimap} room={areaId('r07')} />

      <ActionsPane>
        <ActionsPane.defaultActions
          room={areaId('r07')}
          left={() => game.run(areaId('r06'))}
          right={() => game.run(areaId('r08'))}
          down={() => game.run(areaId('r05'))}

          hidden={() => [
            !game.progressVar(areaId('r06.r07')) && 'left',
            !game.progressVar(areaId('r07.r08')) && 'right',
            !game.progressVar(areaId('r05.r07')) && 'down',
          ]}
        />
      </ActionsPane>

      <LookAround room={areaId('r07')}>
        <LookAround.gatherables room={areaId('r07')} />
        {() => game.progressVar(areaId('r06.r07'), true)}
        <LookAround.defaultMsgs leftCorridor />
        {() => game.progressVar(areaId('r07.r08'), true)}
        <LookAround.defaultMsgs rightCorridor />
        {() => game.progressVar(areaId('r05.r07'), true)}
        <LookAround.defaultMsgs downCorridor />
      </LookAround>
    </DungeonRoom>

    <DungeonRoom checkpoint={areaId('r08')} minimap={minimap}>
      <Battle
        checkpoint={areaId('r08.battle')}
        chance={0.5}
        troop={troops.t02}
      />

      {checkpoint(areaId('r08.afterBattle'))}
      <DungeonRoom.topPane minimap={minimap} room={areaId('r08')} />

      <ActionsPane>
        <ActionsPane.defaultActions
          room={areaId('r08')}
          left={() => game.run(areaId('r07'))}
          right={() => game.run(areaId('r08.rightDoor'))}
          otherTargets={() => ({
            rightDoor:
              !game.progressVar(areaId('r08.rightDoorUnlocked')) &&
              'Locked Door (right)',
          })}
        />
      </ActionsPane>

      <LookAround room={areaId('r08')}>
        <LookAround.gatherables room={areaId('r08')} />
        <LookAround.defaultMsgs leftCorridor rightDoor />
      </LookAround>

      <Chain.shield>
        {label(areaId('r08.rightDoor'))}
        {() => game.setPane('bottom', null)}
        {clear}
        {sdl(30)}

        {Chain.if(() => !game.progressVar(areaId('r08.rightDoorUnlocked')), (
          <div>You try to open the door but it's locked!{w}</div>
        ), (
          <div>{goTo('dungeon.lv01.a02')}</div>
        ))}

        {goTo(areaId('r08.afterBattle'))}
      </Chain.shield>

      <Chain.shield>
        {label(areaId('r08.useItem.dgKey01.on.rightDoor'))}
        {() => game.setPane('bottom', null)}
        {clear}
        {sdl(30)}

        {() => {
          game.progressVar(areaId('r08.rightDoorUnlocked'), true);
          game.inventoryItem('dgKey01', -1);
          game.chain.saveGame();
        }}

        You unlock the door and discard the key.{w}
        {goTo(areaId('r08.afterBattle'))}
      </Chain.shield>
    </DungeonRoom>
  </DungeonArea>
);

export default DungeonLv01A01;
