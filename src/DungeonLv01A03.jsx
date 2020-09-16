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
      <DungeonRoom.topPane roomId={areaId('r01')} minimap={minimap} />

      <ActionsPane>
        <ActionsPane.defaultActions
          left={() => game.run('dungeon.lv01.a02.r06')}
          right={() => game.run(areaId('r02'))}
          lookAround={() => game.run(areaId('r01.lookAround'))}
          gatherables={() => game.progressVar(areaId('r01.gatherables'))}
          gather={k => game.run(areaId(`r01.gather.${k}`))}
        />
      </ActionsPane>

      <LookAround label={areaId('r01.lookAround')}>
        {Chain.if(() => !game.progressVar(areaId('r01.gathered.moss')), (
          <div>
            {() => game.progressVar(areaId('r01.gatherables.moss'), true)}
            {LookAround.defaultMsgs.moss}{w}<br />
          </div>
        ))}

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
      <DungeonRoom.topPane roomId={areaId('r02')} minimap={minimap} />

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
        <ActionsPane.defaultActions
          left={() => game.run(areaId('r02'))}
          right={() => game.run(areaId('r03.rightDoor'))}
          lookAround={() => game.run(areaId('r03.lookAround'))}
          useItem={() => game.run(areaId('r03.itemMenu'))}
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
        {label(areaId('r03.itemMenu'))}
        {() => game.setPane('bottom', null)}
        {clear}
        {sdl(30)}

        {() => game.setPane('bottom', (
          <ItemMenu
            otherTargets={{
              rightDoor:
                !game.progressVar(areaId('r03.rightDoorUnlocked')) &&
                'Door (right)',
            }}
            onBack={() => game.run(areaId('r03.afterBattle'))}
            onSelectOther={(kItem, kTarget) => {
              game.progressVar(areaId('r03.useItem'), { kItem, kTarget });
              game.run(areaId('r03.useItem'));
            }}
          />
        ))}
      </Chain.shield>

      <Chain.shield>
        {label(areaId('r03.useItem'))}
        {() => game.setPane('bottom', null)}
        {clear}
        {sdl(30)}
        {() => game.progress.actors.h01.name} uses{' '}
        {() => items[game.progressVar(areaId('r03.useItem.kItem'))].name}.
        {w}<br />

        {Chain.if(
          () => game.progressVar(areaId('r03.useItem.kItem')) === 'dgKey01', (
            <div>
              {() => {
                game.progressVar(areaId('r03.rightDoorUnlocked'), true);
                game.inventoryItem('dgKey01', -1);
                game.chain.saveGame();
              }}

              You unlock the door and discard the key.{w}
            </div>
          ), (
            <div>It's of no use here.{w}</div>
          ),
        )}

        {goTo(areaId('r03.afterBattle'))}
      </Chain.shield>
    </DungeonRoom>
  </DungeonArea>
);

export default DungeonLv01A03;
