import ActionsPane from './ActionsPane';
import Battle from './Battle';
import Chain, { clear, d, goTo, sdl, w } from '@tanosysoft/chain';
import DungeonArea from './DungeonArea';
import DungeonRoom from './DungeonRoom';
import ItemMenu from './ItemMenu';
import LookAround from './LookAround';
import checkpoint from './checkpoint';
import items from './items';
import label from './label';
import makeTroop from './makeTroop';
import sample from 'lodash/sample';

let areaId = id => `dungeon.lv01.a03${id ? `.${id}` : ''}`;

let minimap = ['-[r01]-[r02]-[r03]-'];

let troops = {
  t01: () => sample([
    makeTroop('orc'),
    makeTroop('orc'),
    makeTroop([2, 'slime']),
    makeTroop([2, 'slime']),
    makeTroop('slime'),
  ]),
};

let DungeonLv01A03 = () => (
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
          left={() => game.run('dungeon.lv01.a02.r06')}
          right={() => game.run(areaId('r02'))}
        />
      </ActionsPane>

      <LookAround label={areaId('r01.lookAround')}>
        {Chain.if(() =>
          !game.progressVar(areaId('r01.gatherables.gathered'))?.includes('moss'), (
            <div>
              {() => game.progressVar(areaId('r01.gatherables.moss'), true)}
              {LookAround.defaultMsgs.moss}{w}<br />
            </div>
          ),
        )}

        {LookAround.defaultMsgs.leftCorridor}{w}<br />
        {LookAround.defaultMsgs.rightCorridor}{w}<br />
        {goTo(areaId('r01.afterBattle'))}
      </LookAround>

      <Chain.shield>
        {label(areaId('r01.gather.moss'))}

        {() => {
          game.inventoryItem('moss', 1);
          game.progressVar(areaId('r01.gathered.moss'), true);
          game.progressVar(areaId('r01.gatherables.moss'), false);
        }}

        {() => game.setPane('bottom', null)}
        {clear}
        {sdl(30)}
        You scrape one of the walls...{w}<br />
        {sdl(10)}
        1 Moss acquired!{w}<br />
        {goTo(areaId('r01.afterBattle'))}
      </Chain.shield>
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

      <LookAround label={areaId('r02.lookAround')}>
        {LookAround.defaultMsgs.leftCorridor}{w}<br />
        {LookAround.defaultMsgs.rightCorridor}{w}<br />
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
      <DungeonRoom.topPane minimap={minimap} room={areaId('r03')} />

      <ActionsPane>
        <ActionsPane.defaultActions
          room={areaId('r03')}
          left={() => game.run(areaId('r02'))}
          right={() => game.run(areaId('r03.rightDoor'))}
          otherTargets={() => ({
            rightDoor:
              !game.progressVar(areaId('r03.rightDoorUnlocked')) &&
              'Locked Door (right)',
          })}
        />
      </ActionsPane>

      <LookAround label={areaId('r03.lookAround')}>
        {LookAround.defaultMsgs.leftCorridor}{w}<br />
        {LookAround.defaultMsgs.rightDoor}{w}<br />
        {goTo(areaId('r03.afterBattle'))}
      </LookAround>

      <Chain.shield>
        {label(areaId('r03.rightDoor'))}
        {() => game.setPane('bottom', null)}
        {clear}
        {sdl(30)}

        {Chain.if(() => !game.progressVar(areaId('r03.rightDoorUnlocked')), (
          <div>
            You try to open the door but it's locked!{w}
            {goTo(areaId('r03.afterBattle'))}
          </div>
        ), (
          <div>{goTo('dungeon.lv01.a04')}</div>
        ))}
      </Chain.shield>

      <Chain.shield>
        {label(areaId('r03.useItem.dgKey01.on.rightDoor'))}
        {() => game.setPane('bottom', null)}
        {clear}
        {sdl(30)}
        {() => game.progress.actors.h01.name} uses {() => items.dgKey01.name}.
        {w}<br />

        {() => {
          game.progressVar(areaId('r03.rightDoorUnlocked'), true);
          game.inventoryItem('dgKey01', -1);
          game.chain.saveGame();
        }}

        You unlock the door and discard the key.{w}
        {goTo(areaId('r03.afterBattle'))}
      </Chain.shield>
    </DungeonRoom>
  </DungeonArea>
);

export default DungeonLv01A03;
