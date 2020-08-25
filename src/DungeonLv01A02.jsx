import ActionsPane from './ActionsPane';
import Battle from './Battle';
import Chain, { clear, d, goTo, w } from '@tanosysoft/chain';
import DungeonArea from './DungeonArea';
import DungeonRoom from './DungeonRoom';
import LookAround from './LookAround';
import checkpoint from './checkpoint';

let areaId = id => `dungeon.lv01.a02${id ? `.${id}` : ''}`;

// -(1)-(2)-(3)
//       |
//      (4)-(5)-(6)-
let DungeonLv01A02 = () => (
  <DungeonArea checkpoint={areaId()}>
    {goTo(areaId('r01'))}

    <DungeonRoom checkpoint={areaId('r01')}>
      <ActionsPane>
        <ActionsPane.defaultActions
          left={() => game.run('dungeon.lv01.a01.r08')}
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

    <DungeonRoom checkpoint={areaId('r02')}>
      <ActionsPane>
        <ActionsPane.defaultActions
          left={() => game.run(areaId('r01'))}
          right={() => game.run(areaId('r03'))}
          down={() => game.run(areaId('r04'))}
          lookAround={() => game.run(areaId('r02.lookAround'))}
          hidden={() => [!game.progressVar(areaId('r02-r04')) && 'down']}
        />
      </ActionsPane>

      <LookAround label={areaId('r02.lookAround')}>
        {LookAround.defaultMsgs.leftCorridor}{w}<br />
        {LookAround.defaultMsgs.rightCorridor}{w}<br />
        {() => game.progressVar(areaId('r02-r04'), true)}
        {LookAround.defaultMsgs.downCorridor}{w}<br />
        {goTo(areaId('r02'))}
      </LookAround>
    </DungeonRoom>

    <DungeonRoom checkpoint={areaId('r03')}>
      <ActionsPane>
        <ActionsPane.defaultActions
          left={() => game.run(areaId('r02'))}
          lookAround={() => game.run(areaId('r03.lookAround'))}
        />
      </ActionsPane>

      <LookAround label={areaId('r03.lookAround')}>
        {LookAround.defaultMsgs.leftCorridor}{w}<br />
        {goTo(areaId('r03'))}
      </LookAround>
    </DungeonRoom>

    <DungeonRoom checkpoint={areaId('r04')}>
      <ActionsPane>
        <ActionsPane.defaultActions
          up={() => game.run(areaId('r02'))}
          right={() => game.run(areaId('r05'))}
          lookAround={() => game.run(areaId('r04.lookAround'))}
          hidden={() => [!game.progressVar(areaId('r04-r05') && 'right')]}
        />
      </ActionsPane>

      <LookAround label={areaId('r04.lookAround')}>
        {LookAround.defaultMsgs.upCorridor}{w}<br />
        {() => game.progressVar(areaId('r04-r05'), true)}
        {LookAround.defaultMsgs.rightCorridor}{w}<br />
        {goTo(areaId('r04'))}
      </LookAround>
    </DungeonRoom>

    <DungeonRoom checkpoint={areaId('r05')}>
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

    <DungeonRoom checkpoint={areaId('r06')}>
      <ActionsPane>
        <ActionsPane.defaultActions
          left={() => game.run(areaId('r04'))}
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
