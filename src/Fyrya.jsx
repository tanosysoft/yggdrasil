import Chain, { d, goTo, sdl, sec, w } from '@tanosysoft/chain';
import CityOffice from './CityOffice';
import checkpoint from './checkpoint';
import clear from './clear';

class Fyrya extends d.Component {
  render = () => (
    <Chain.shield class="Fyrya">
      {checkpoint('fyrya')}
      {clear}
      {sdl(80)}
      <h1>City of Fyrya{sec(2)}</h1>

      {checkpoint('fyrya.welcome')}
      <p>{sdl(30)} "Welcome to Fyria,{sec(0.3)} the most popular
      dungeon city of the Kingdom of Yggdrasil!"{w}</p>

      {checkpoint('fyrya.freunheira')}
      <p>{sdl(30)} "The city sits on a common travel and commerce path
      that connects the capital,{sec(0.2)} Freunheira,{sec(0.2)} to
      the Old World outside our Queen's Great Holy Land."{w}</p>

      {checkpoint('fyrya.richCity')}
      <p>{sdl(30)} "It's a rich city that thrives on a dangerous but
      profitable dungeon.{sec(0.5)} Lots of adventurers come by
      the city to explore its dungeons,{sec(0.2)} including many
      novices who stay at the upper levels."{w}</p>

      {checkpoint('fyrya.underequipped')}
      <p>{sdl(30)} "Oh.{sec(0.5)} You do look severely underequipped!
      {sec(0.5)} Is that precisely what you're here for?"{w}</p>

      {checkpoint('fyrya.haveToRegister')}
      <p>{sdl(30)} "You'll have to register at the Adventurer Registration
      Office before you're allowed into the dungeon."{w}</p>

      {checkpoint('fyrya.timeTravel')}
      <p>{sdl(30)} "... Don't gimme that look!{sec(0.8)} They'll be offering you
      free automatic post-death time-traveling under the Queen's magical Grace.
      {sec(0.8)} Judging by your rusty sword,{sec(0.2)} you'll be using the
      service a lot!"{w}</p>

      {checkpoint('fyrya.makeYourselfHome')}
      <p>{sdl(30)} "Well,{sec(0.3)} feel free to explore the city first,
      {sec(0.3)} traveler!{sec(0.8)} Do make yourself home!"{w}</p>

      {checkpoint('fyrya.whereTo')}
      <p>{sdl(30)}Where are you going?{sec(1)}</p>

      {() => game.setPane('bottom', (
        <div class="ActionsPane">
          <div class="ActionsPane-row">
            <button
              class="ActionsPane-btn"
            >
              To the dungeon
            </button>
          </div>

          <div class="ActionsPane-row">
            <button
              class="ActionsPane-btn"
            >
              To the pub
            </button>
          </div>

          <div class="ActionsPane-row">
            <button
              class="ActionsPane-btn"
            >
              To the inn
            </button>
          </div>

          <div class="ActionsPane-row">
            <button
              class="ActionsPane-btn"
              onClick={() => game.chain.run('cityOffice')}
            >
              To the city office
            </button>
          </div>
        </div>
      ))}

      <CityOffice />
    </Chain.shield>
  );
}

export default Fyrya;
