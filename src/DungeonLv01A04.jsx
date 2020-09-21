import ActionsPane from './ActionsPane';
import Battle from './Battle';
import Chain, { clear, d, goTo, sdl, w } from '@tanosysoft/chain';
import DungeonArea from './DungeonArea';
import DungeonRoom from './DungeonRoom';
import LookAround from './LookAround';
import SkillMenu from './SkillMenu';
import checkpoint from './checkpoint';
import label from './label';
import makeTroop from './makeTroop';
import sample from 'lodash/sample';
import skills from './skills';

let areaId = id => `dungeon.lv01.a04${id ? `.${id}` : ''}`;

let minimap = [[
    '             [r05]       ',
    '                         ',
    '-[r01]-[r02]-[r03]-[r04]-',
    '                         ',
    '       [r06] [r07]       ',
  ].join('\n'),

  ['r03.r05', '|', 15, 1],
  ['r02.r06', '|', 9, 3],
  ['r06.r07', '-', 13, 4],
];

let troops = {
  t01: () => sample([
    makeTroop('orc'),
    makeTroop('orc'),
    makeTroop([2, 'slime']),
    makeTroop([2, 'slime']),
    makeTroop('slime'),
  ]),

  t02: () => sample([
    makeTroop('minotaur'),
    makeTroop('orc'),
    makeTroop([2, 'slime']),
  ]),
};

let DungeonLv01A04 = () => (
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
          left={() => game.run('dungeon.lv01.a03.r03')}
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
          down={() => game.run(areaId('r06'))}
          hidden={() => [!game.progressVar(areaId('r02.r06')) && 'down']}
        />
      </ActionsPane>

      <LookAround room={areaId('r02')}>
        <LookAround.gatherables room={areaId('r02')} />
        <LookAround.defaultMsgs leftCorridor rightCorridor />

        {Chain.if(() => !game.progressVar(areaId('r02.r06')), (
          <span><LookAround.defaultMsgs downCorridorVegBlocked /></span>
        ), (
          <span><LookAround.defaultMsgs downCorridor /></span>
        ))}
      </LookAround>

      <Chain.shield>
        {label(areaId('r02.skillMenu'))}

        {() => game.setPane('bottom', (
          <SkillMenu
            otherTargets={{
              downCorridorVeg:
                !game.progressVar(areaId('r02.r06')) && 'Vegetation (down)',
            }}
            onBack={() => game.run(areaId('r02.afterBattle'))}
            onSelectOther={(kSkill, kTarget) => {
              game.progressVar(areaId('r02.useSkill'), { kSkill, kTarget });
              game.run(areaId('r02.useSkill'));
            }}
          />
        ))}
      </Chain.shield>

      <Chain.shield>
        {label(areaId('r02.useSkill'))}
        {() => game.setPane('bottom', null)}
        {clear}
        {sdl(30)}
        {() => game.progress.actors.h01.name} uses{' '}
        {() => skills[game.progressVar(areaId('r02.useSkill.kSkill'))].name}.
        {w}<br />

        {Chain.if(
          () => game.progressVar(areaId('r02.useSkill.kSkill')) === 'fire', (
            <div>
              {() => {
                game.progressVar(areaId('r02.r06'), true);
                game.chain.saveGame();
              }}

              The vegetation burns to ashes.{w}<br />
            </div>
          ), (
            <div>It has no effect!{w}<br /></div>
          )
        )}

        {goTo(areaId('r02.afterBattle'))}
      </Chain.shield>
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
          right={() => game.run('dungeon.lv01.a05')}
        />
      </ActionsPane>

      <LookAround room={areaId('r04')}>
        <LookAround.gatherables room={areaId('r04')} />
        <LookAround.defaultMsgs leftCorridor rightCorridor />
      </LookAround>
    </DungeonRoom>
  </DungeonArea>
);

export default DungeonLv01A04;
