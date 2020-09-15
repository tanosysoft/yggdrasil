import Chain, { clear, d, goTo, sdl, sec, w } from '@tanosysoft/chain';
import CityOffice from './CityOffice';
import Dungeon from './Dungeon';
import checkpoint from './checkpoint';
import label from './label';

let areaId = k => `fyrya${k ? `.${k}` : ''}`;

let Fyrya = () => (
  <Chain.shield>
    {checkpoint(areaId())}
    {() => game.setPane('top', null)}
    {() => game.setPane('bottom', null)}
    {clear}
    {sec(2)}
    {sdl(80)}
    <h1>City of Fyrya{sec(2)}</h1>

    {Chain.if(() => !game.progressVar(areaId('visited')), (
      <div>
        {label(areaId('welcome'))}
        <p>{sdl(30)} "Welcome to Fyrya,{sec(0.3)} the most popular
        dungeon city of the Kingdom of Yggdrasil!"{w}</p>

        {label(areaId('freunheira'))}
        <p>{sdl(30)} "The city sits on a common travel and commerce path
        that connects the capital,{sec(0.2)} Freunheira,{sec(0.2)} to
        the Old World outside our Queen's Great Holy Land."{w}</p>

        {label(areaId('richCity'))}
        <p>{sdl(30)} "It's a rich city that thrives on a dangerous but
        profitable dungeon.{sec(0.5)} Lots of adventurers come by
        the city to explore its dungeons,{sec(0.2)} including many
        novices who stay at the upper levels."{w}</p>

        {label(areaId('underequipped'))}
        <p>{sdl(30)} "Oh.{sec(0.5)} You do look severely underequipped!
        {sec(0.5)} Is that precisely what you're here for?"{w}</p>

        {label(areaId('haveToRegister'))}
        <p>{sdl(30)} "You'll have to register at the Adventurer Registration
        Office before you're allowed into the dungeon."{w}</p>

        {label(areaId('timeTravel'))}
        <p>{sdl(30)} "... Don't gimme that look!{sec(0.8)} They'll be offering you
        free automatic post-death time-traveling under the Queen's magical Grace.
        {sec(0.8)} Judging by your rusty sword,{sec(0.2)} you'll be using the
        service a lot!"{w}</p>

        {label(areaId('makeYourselfHome'))}
        <p>{sdl(30)} "Well,{sec(0.3)} feel free to explore the city first,
        {sec(0.3)} traveler!{sec(0.8)} Do make yourself home!"{w}</p>

        {() => {
          game.progressVar(areaId('visited'), true);
          game.chain.saveGame();
        }}
      </div>
    ))}

    {label(areaId('whereTo'))}
    <p>{sdl(30)}Where are you going?{sec(1)}</p>

    {() => game.setPane('bottom', (
      <div class="ActionsPane">
        <div class="ActionsPane-row">
          <button class="ActionsPane-btn" onClick={() => game.run('dungeon')}>
            To the dungeon
          </button>
        </div>

        <div class="ActionsPane-row">
          <button class="ActionsPane-btn">
            To the pub
          </button>
        </div>

        <div class="ActionsPane-row">
          <button class="ActionsPane-btn">
            To the inn
          </button>
        </div>

        <div class="ActionsPane-row">
          <button
            class="ActionsPane-btn"
            onClick={() => game.run('cityOffice')}
          >
            To the city office
          </button>
        </div>
      </div>
    ))}

    <CityOffice />
    <Dungeon />
  </Chain.shield>
);

export default Fyrya;
