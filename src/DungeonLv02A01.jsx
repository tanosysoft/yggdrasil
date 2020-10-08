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
import skills from './skills';

let areaId = id => `dungeon.lv02.a01${id ? `.${id}` : ''}`;

let minimap = [[
    '       [r06] [r07] [r08]       ',
    '                               ',
    '-[r01]-[r02]-[r03]-[r04]-[r05]-',
    '                               ',
    '       [r09] [r10] [r11]       ',
  ].join('\n'),

  ['r03.r07', '|', 15, 1],
  ['r06.r07', '-', 12, 0],
  ['r07.r08', '-', 18, 0],

  ['r03.r10', '|', 15, 3],
  ['r09.r10', '-', 12, 4],
  ['r10.r11', '-', 18, 4],
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
          left={() => game.run('dungeon.lv01.a05.r04')}
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
        troop={troops.t01}
      />

      {checkpoint(areaId('r03.afterBattle'))}
      <DungeonRoom.topPane minimap={minimap} room={areaId('r03')} />

      <ActionsPane>
        <ActionsPane.defaultActions
          room={areaId('r03')}
          up={() => game.run(areaId('r07'))}
          left={() => game.run(areaId('r02'))}
          right={() => game.run(areaId('r04'))}
          down={() => game.run(areaId('r10'))}
          hidden={() => [
            !game.progressVar(areaId('r03.r07')) && 'up',
            !game.progressVar(areaId('r03.r10')) && 'down',
          ]}
        />
      </ActionsPane>

      <LookAround room={areaId('r03')}>
        <LookAround.gatherables room={areaId('r03')} />
        {() => game.progressVar(areaId('r03.r07'), true)}
        <LookAround.defaultMsgs upCorridor />
        <LookAround.defaultMsgs leftCorridor rightCorridor />
        {() => game.progressVar(areaId('r03.r10'), true)}
        <LookAround.defaultMsgs downCorridor />
      </LookAround>
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
          left={() => game.run(areaId('r03'))}
          right={() => game.run(areaId('r05'))}
        />
      </ActionsPane>

      <LookAround room={areaId('r04')}>
        <LookAround.gatherables room={areaId('r04')} />
        <LookAround.defaultMsgs leftCorridor rightCorridor />
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
          right={() => game.run(areaId('r05.rightDoor'))}
        />
      </ActionsPane>

      <LookAround room={areaId('r05')}>
        <LookAround.gatherables room={areaId('r05')} />
        <LookAround.defaultMsgs leftCorridor rightDoor />
      </LookAround>

      <Chain.shield>
        {label(areaId('r05.rightDoor'))}
        {() => game.setPanes({ bottom: null })}
        {clear}
        {sdl(30)}

        {Chain.if(() => (
          !game.progressVar(areaId('r06.candle.lit')) ||
          !game.progressVar(areaId('r08.candle.lit')) ||
          !game.progressVar(areaId('r09.candle.lit')) ||
          !game.progressVar(areaId('r11.candle.lit'))
        ), (
          <div>
            You try to open the door but it's locked!{w}
            {goTo(areaId('r05.afterBattle'))}
          </div>
        ), (
          goTo('dungeon.lv02.a02')
        ))}
      </Chain.shield>
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
          right={() => game.run(areaId('r07'))}
          otherTargets={() => ({
            candle: game.progressVar(areaId('r06.candle.seen')) && 'Candle',
          })}
        />
      </ActionsPane>

      <LookAround room={areaId('r06')}>
        {() => game.progressVar(areaId('r06.candle.seen'), true)}
        You see a candle in the corner of the room.{w}<br />

        {Chain.if(() => game.progressVar(areaId('r06.candle.lit')), (
          <div>It's lit.{w}</div>
        ))}

        <LookAround.gatherables room={areaId('r06')} />
        <LookAround.defaultMsgs rightCorridor />
      </LookAround>

      <Chain.shield>
        {label(areaId('r06.useSkill.fire.on.candle'))}
        {() => game.setPanes({ bottom: null })}
        {clear}
        {sdl(30)}
        {() => game.progress.actors.h01.name} uses {() => skills.fire.name}.
        {w}<br />

        {Chain.if(() => !game.progressVar(areaId('r06.candle.lit')), (
          <div>
            {() => {
              game.progressVar(areaId('r06.candle.lit'), true);
              game.chain.saveGame();
            }}

            The candle lights up.{w}<br />
          </div>
        ), (
          <div>The candle is lit.{w}</div>
        ))}

        {goTo(areaId('r06.afterBattle'))}
      </Chain.shield>
    </DungeonRoom>

    <DungeonRoom checkpoint={areaId('r07')} minimap={minimap}>
      <Battle
        checkpoint={areaId('r07.battle')}
        chance={0.5}
        troop={troops.t01}
      />

      {checkpoint(areaId('r07.afterBattle'))}
      <DungeonRoom.topPane minimap={minimap} room={areaId('r07')} />

      <ActionsPane>
        <ActionsPane.defaultActions
          room={areaId('r07')}
          left={() => game.run(areaId('r06'))}
          right={() => game.run(areaId('r08'))}
          down={() => game.run(areaId('r03'))}
          hidden={() => [
            !game.progressVar(areaId('r06.r07')) && 'left',
            !game.progressVar(areaId('r07.r08')) && 'right',
          ]}
        />
      </ActionsPane>

      <LookAround room={areaId('r07')}>
        <LookAround.gatherables room={areaId('r07')} />
        {() => game.progressVar(areaId('r06.r07'), true)}
        <LookAround.defaultMsgs leftCorridor />
        {() => game.progressVar(areaId('r07.r08'), true)}
        <LookAround.defaultMsgs rightCorridor downCorridor />
      </LookAround>
    </DungeonRoom>

    <DungeonRoom checkpoint={areaId('r08')} minimap={minimap}>
      <Battle
        checkpoint={areaId('r08.battle')}
        chance={0.5}
        troop={troops.t01}
      />

      {checkpoint(areaId('r08.afterBattle'))}
      <DungeonRoom.topPane minimap={minimap} room={areaId('r08')} />

      <ActionsPane>
        <ActionsPane.defaultActions
          room={areaId('r08')}
          left={() => game.run(areaId('r07'))}
          otherTargets={() => ({
            candle: game.progressVar(areaId('r08.candle.seen')) && 'Candle',
          })}
        />
      </ActionsPane>

      <LookAround room={areaId('r08')}>
        {() => game.progressVar(areaId('r08.candle.seen'), true)}
        You see a candle in the corner of the room.{w}<br />

        {Chain.if(() => game.progressVar(areaId('r08.candle.lit')), (
          <div>It's lit.{w}</div>
        ))}

        <LookAround.gatherables room={areaId('r08')} />
        <LookAround.defaultMsgs leftCorridor />
      </LookAround>

      <Chain.shield>
        {label(areaId('r08.useSkill.fire.on.candle'))}
        {() => game.setPanes({ bottom: null })}
        {clear}
        {sdl(30)}
        {() => game.progress.actors.h01.name} uses {() => skills.fire.name}.
        {w}<br />

        {Chain.if(() => !game.progressVar(areaId('r08.candle.lit')), (
          <div>
            {() => {
              game.progressVar(areaId('r08.candle.lit'), true);
              game.chain.saveGame();
            }}

            The candle lights up.{w}<br />
          </div>
        ), (
          <div>The candle is lit.{w}</div>
        ))}

        {goTo(areaId('r08.afterBattle'))}
      </Chain.shield>
    </DungeonRoom>

    <DungeonRoom checkpoint={areaId('r09')} minimap={minimap}>
      <Battle
        checkpoint={areaId('r09.battle')}
        chance={0.5}
        troop={troops.t01}
      />

      {checkpoint(areaId('r09.afterBattle'))}
      <DungeonRoom.topPane minimap={minimap} room={areaId('r09')} />

      <ActionsPane>
        <ActionsPane.defaultActions
          room={areaId('r09')}
          right={() => game.run(areaId('r10'))}
          otherTargets={() => ({
            candle: game.progressVar(areaId('r09.candle.seen')) && 'Candle',
          })}
        />
      </ActionsPane>

      <LookAround room={areaId('r09')}>
        {() => game.progressVar(areaId('r09.candle.seen'), true)}
        You see a candle in the corner of the room.{w}<br />

        {Chain.if(() => game.progressVar(areaId('r09.candle.lit')), (
          <div>It's lit.{w}</div>
        ))}

        <LookAround.gatherables room={areaId('r09')} />
        <LookAround.defaultMsgs rightCorridor />
      </LookAround>

      <Chain.shield>
        {label(areaId('r09.useSkill.fire.on.candle'))}
        {() => game.setPanes({ bottom: null })}
        {clear}
        {sdl(30)}
        {() => game.progress.actors.h01.name} uses {() => skills.fire.name}.
        {w}<br />

        {Chain.if(() => !game.progressVar(areaId('r09.candle.lit')), (
          <div>
            {() => {
              game.progressVar(areaId('r09.candle.lit'), true);
              game.chain.saveGame();
            }}

            The candle lights up.{w}<br />
          </div>
        ), (
          <div>The candle is lit.{w}</div>
        ))}

        {goTo(areaId('r09.afterBattle'))}
      </Chain.shield>
    </DungeonRoom>

    <DungeonRoom checkpoint={areaId('r10')} minimap={minimap}>
      <Battle
        checkpoint={areaId('r10.battle')}
        chance={0.5}
        troop={troops.t01}
      />

      {checkpoint(areaId('r10.afterBattle'))}
      <DungeonRoom.topPane minimap={minimap} room={areaId('r10')} />

      <ActionsPane>
        <ActionsPane.defaultActions
          room={areaId('r10')}
          up={() => game.run(areaId('r03'))}
          left={() => game.run(areaId('r09'))}
          right={() => game.run(areaId('r11'))}
          hidden={() => [
            !game.progressVar(areaId('r09.r10')) && 'left',
            !game.progressVar(areaId('r10.r11')) && 'right',
          ]}
        />
      </ActionsPane>

      <LookAround room={areaId('r10')}>
        <LookAround.gatherables room={areaId('r10')} />
        <LookAround.defaultMsgs upCorridor />
        {() => game.progressVar(areaId('r09.r10'), true)}
        <LookAround.defaultMsgs leftCorridor />
        {() => game.progressVar(areaId('r10.r11'), true)}
        <LookAround.defaultMsgs rightCorridor />
      </LookAround>
    </DungeonRoom>

    <DungeonRoom checkpoint={areaId('r11')} minimap={minimap}>
      <Battle
        checkpoint={areaId('r11.battle')}
        chance={0.5}
        troop={troops.t01}
      />

      {checkpoint(areaId('r11.afterBattle'))}
      <DungeonRoom.topPane minimap={minimap} room={areaId('r11')} />

      <ActionsPane>
        <ActionsPane.defaultActions
          room={areaId('r11')}
          left={() => game.run(areaId('r10'))}
          otherTargets={() => ({
            candle: game.progressVar(areaId('r11.candle.seen')) && 'Candle',
          })}
        />
      </ActionsPane>

      <LookAround room={areaId('r11')}>
        {() => game.progressVar(areaId('r11.candle.seen'), true)}
        You see a candle in the corner of the room.{w}<br />

        {Chain.if(() => game.progressVar(areaId('r11.candle.lit')), (
          <div>It's lit.{w}</div>
        ))}
        <LookAround.gatherables room={areaId('r11')} />
        <LookAround.defaultMsgs leftCorridor />
      </LookAround>

      <Chain.shield>
        {label(areaId('r11.useSkill.fire.on.candle'))}
        {() => game.setPanes({ bottom: null })}
        {clear}
        {sdl(30)}
        {() => game.progress.actors.h01.name} uses {() => skills.fire.name}.
        {w}<br />

        {Chain.if(() => !game.progressVar(areaId('r11.candle.lit')), (
          <div>
            {() => {
              game.progressVar(areaId('r11.candle.lit'), true);
              game.chain.saveGame();
            }}

            The candle lights up.{w}<br />
          </div>
        ), (
          <div>The candle is lit.{w}</div>
        ))}

        {goTo(areaId('r11.afterBattle'))}
      </Chain.shield>
    </DungeonRoom>
  </DungeonArea>
);

export default DungeonLv01A01;
