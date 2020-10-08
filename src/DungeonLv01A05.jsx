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

let areaId = id => `dungeon.lv01.a05${id ? `.${id}` : ''}`;

let minimap = ['-[r01]-[r02]-[r03]-[r04]-'];

let troops = {
  t01: () => sample([
    makeTroop('minotaur'),
    makeTroop('orc'),
    makeTroop([2, 'slime']),
  ]),

  t02: () => sample([
    makeTroop('vampire'),
    makeTroop('vampire'),
    makeTroop('minotaur'),
    makeTroop('orc', [2, 'slime']),
    makeTroop('orc', 'slime'),
  ]),
};

let DungeonLv01A05 = () => (
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

      <LookAround room={areaId('r01')}>
        <LookAround.gatherables room={areaId('r01')} />
        <LookAround.defaultMsgs leftCorridor rightCorridor />
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
        troop={troops.t02}
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
          left={() => game.run(areaId('r03'))}
          right={() => game.run('dungeon.lv02')}
        />
      </ActionsPane>

      <LookAround room={areaId('r04')}>
        <LookAround.gatherables room={areaId('r04')} />
        <LookAround.defaultMsgs leftCorridor rightCorridor />
      </LookAround>
    </DungeonRoom>
  </DungeonArea>
);

export default DungeonLv01A05;
