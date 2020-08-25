import ActionsPane from './ActionsPane';
import Battle from './Battle';
import Chain, { clear, d, goTo, w } from '@tanosysoft/chain';
import DungeonArea from './DungeonArea';
import DungeonRoom from './DungeonRoom';
import LookAround from './LookAround';
import checkpoint from './checkpoint';

// -(1)-(2)-(3)
//       |
//      (4)-(5)-(6)-
class DungeonLv01A02 extends d.Component {
  id = id => `dungeon.lv01.a02${id ? `.${id}` : ''}`;

  render = () => (
    <DungeonArea checkpoint={this.id()}>
      {goTo(this.id('r01'))}

      <DungeonRoom checkpoint={this.id('r01')}>
        <ActionsPane>
          <ActionsPane.defaultActions
            left={() => game.run('dungeon.lv01.a01.r08')}
            right={() => game.run(this.id('r02'))}
            lookAround={() => game.run(this.id('r01.lookAround'))}
          />
        </ActionsPane>

        <LookAround label={this.id('r01.lookAround')}>
          {LookAround.defaultMsgs.leftCorridor}{w}<br />
          {LookAround.defaultMsgs.rightCorridor}{w}<br />
          {goTo(this.id('r01'))}
        </LookAround>
      </DungeonRoom>

      <DungeonRoom checkpoint={this.id('r02')}>
        <ActionsPane>
          <ActionsPane.defaultActions
            left={() => game.run(this.id('r01'))}
            right={() => game.run(this.id('r03'))}
            down={() => game.run(this.id('r04'))}
            lookAround={() => game.run(this.id('r02.lookAround'))}
            hidden={() => [!game.progressVar(this.id('r02-r04')) && 'down']}
          />
        </ActionsPane>

        <LookAround label={this.id('r02.lookAround')}>
          {LookAround.defaultMsgs.leftCorridor}{w}<br />
          {LookAround.defaultMsgs.rightCorridor}{w}<br />
          {() => game.progressVar(this.id('r02-r04'), true)}
          {LookAround.defaultMsgs.downCorridor}{w}<br />
          {goTo(this.id('r02'))}
        </LookAround>
      </DungeonRoom>

      <DungeonRoom checkpoint={this.id('r03')}>
        <ActionsPane>
          <ActionsPane.defaultActions
            left={() => game.run(this.id('r02'))}
            lookAround={() => game.run(this.id('r03.lookAround'))}
          />
        </ActionsPane>

        <LookAround label={this.id('r03.lookAround')}>
          {LookAround.defaultMsgs.leftCorridor}{w}<br />
          {goTo(this.id('r03'))}
        </LookAround>
      </DungeonRoom>

      <DungeonRoom checkpoint={this.id('r04')}>
        <ActionsPane>
          <ActionsPane.defaultActions
            up={() => game.run(this.id('r02'))}
            right={() => game.run(this.id('r05'))}
            lookAround={() => game.run(this.id('r04.lookAround'))}
            hidden={() => [!game.progressVar(this.id('r04-r05') && 'right')]}
          />
        </ActionsPane>

        <LookAround label={this.id('r04.lookAround')}>
          {LookAround.defaultMsgs.upCorridor}{w}<br />
          {() => game.progressVar(this.id('r04-r05'), true)}
          {LookAround.defaultMsgs.rightCorridor}{w}<br />
          {goTo(this.id('r04'))}
        </LookAround>
      </DungeonRoom>

      <DungeonRoom checkpoint={this.id('r05')}>
        <ActionsPane>
          <ActionsPane.defaultActions
            left={() => game.run(this.id('r04'))}
            right={() => game.run(this.id('r06'))}
            lookAround={() => game.run(this.id('r05.lookAround'))}
          />
        </ActionsPane>

        <LookAround label={this.id('r05.lookAround')}>
          {LookAround.defaultMsgs.leftCorridor}{w}<br />
          {LookAround.defaultMsgs.rightCorridor}{w}<br />
          {goTo(this.id('r05'))}
        </LookAround>
      </DungeonRoom>

      <DungeonRoom checkpoint={this.id('r06')}>
        <ActionsPane>
          <ActionsPane.defaultActions
            left={() => game.run(this.id('r04'))}
            right={() => game.run('dungeon.lv01.a03')}
            lookAround={() => game.run(this.id('r06.lookAround'))}
          />
        </ActionsPane>

        <LookAround label={this.id('r06.lookAround')}>
          {LookAround.defaultMsgs.leftCorridor}{w}<br />
          {LookAround.defaultMsgs.rightCorridor}{w}<br />
          {goTo(this.id('r06'))}
        </LookAround>
      </DungeonRoom>
    </DungeonArea>
  );
}

export default DungeonLv01A02;
