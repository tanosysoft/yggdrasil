import ActionsPane from './ActionsPane';
import Battle from './Battle';
import Chain, { clear, d, goTo, sdl, w } from '@tanosysoft/chain';
import DungeonArea from './DungeonArea';
import DungeonRoom from './DungeonRoom';
import LookAround from './LookAround';
import checkpoint from './checkpoint';
import label from './label';

let areaId = id => `dungeon.lv01.a03${id ? `.${id}` : ''}`;

let minimap = ['-[r01]-[r02]-[r03]-'];

let DungeonLv01A03 = () => (
  <DungeonArea checkpoint={areaId()}>
    {goTo(areaId('r01'))}

    <DungeonRoom checkpoint={areaId('r01')} minimap={minimap}>
      <ActionsPane>
        <ActionsPane.defaultActions
          left={() => game.run('dungeon.lv01.a02.r06')}
          right={() => game.run(areaId('r02'))}
          lookAround={() => game.run(areaId('r01.lookAround'))}
        />
      </ActionsPane>

      <LookAround label={areaId('r01.lookAround')}>
        {LookAround.defaultMsgs.leftCorridor}{w}<br />
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

          right={() => game.run(
            !game.progressVar('dungeon.key02')
              ? areaId('r03-a04.locked') : 'dungeon.lv01.a04',
          )}

          lookAround={() => game.run(areaId('r03.lookAround'))}
        />
      </ActionsPane>

      <LookAround label={areaId('r03.lookAround')}>
        {LookAround.defaultMsgs.leftCorridor}{w}<br />
        {LookAround.defaultMsgs.rightDoor}{w}<br />
        {goTo(areaId('r03'))}
      </LookAround>

      <Chain.shield>
        {label(areaId('r03-a04.locked'))}
        {() => game.setPane('bottom', null)}
        {clear}
        {sdl(30)}
        You try to open the door but it's locked!{w}<br />
        {goTo('r03')}
      </Chain.shield>
    </DungeonRoom>
  </DungeonArea>
);

export default DungeonLv01A03;
