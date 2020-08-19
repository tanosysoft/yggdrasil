import Chain, { clear, d, goTo, sdl, sec, w } from '@tanosysoft/chain';
import checkpoint from './checkpoint';
import clearPanes from './clearPanes';

class CityOffice extends d.Component {
  render = () => (
    <Chain.shield class="CityOffice">
      {checkpoint('cityOffice')}
      {[clear, clearPanes]}
      {sec(2)}
      {sdl(80)}
      <h1>Fyrya's City Office{sec(2)}</h1>

      {checkpoint('cityOffice.located')}
      <p>{sdl(30)}The city office is located inside this fancy-looking
      building you've just found yourself in.{w}</p>

      {checkpoint('cityOffice.peopleCarrying')}
      <p>{sdl(30)}You see people carrying all sorts of equipment doing
      busy work. They don't look like novices, so it looks like the
      adventurer registration office does more than just issuing
      exploration permits.{w}</p>

      {checkpoint('cityOffice.calmMan')}
      <p>{sdl(30)}Amidst all the apparent rush, a calm middle-aged man
      talks to you.{w}</p>

      {checkpoint('cityOffice.hiThere')}
      <p>{sdl(30)}Officer: Hi there!{w}<br />
      I see you don't have a badge yet.{w}<br />
      Looking for your very own exploration permit?{w}<br />
      I can help you with that!{w}</p>

      {checkpoint('cityOffice.tigthenTheGrip')}
      <p>{sdl(30)}You tighten the grip around the hilt.{w}</p>

      {checkpoint('cityOffice.itsReal')}
      <p>{sdl(30)}It's real! You'll soon be putting all your hard work
      sword pratice to use on those ugly beasts!{w}</p>

      {checkpoint('cityOffice.itsReal')}
      <p>{sdl(30)}Officer: I like that sparkle in your eyes.<br />
      We'll see how long that fire burns.{w}</p>

      {checkpoint('cityOffice.itsReal')}
      <p>{sdl(30)}Are you becoming a real warrior, or are you soon running
      away in the face of the hardships of this life you choose?{w}</p>

      {checkpoint('cityOffice.doYouHaveWhatItTakes')}
      <p>{sdl(30)}Do you have what it takes!?{w}<br />
      Time sure will tell! Hah!{w}</p>

      {checkpoint('cityOffice.allINeed')}
      <p>{sdl(30)}Alright. All I really need before I can issue you a Level
      1~2 exploration permit is your name and some basic information.{w}</p>

      {checkpoint('cityOffice.enterYourName')}
      <p>{sdl(30)}Please write your name right here, then fill the rest of the
      form, please.{sec(1)}</p>

      {async () => {
        await new Promise(resolve => game.setPane('bottom', (
          <div class="ActionsPane">
            <input
              class="ActionsPane-input"
              value={d.binding({
                set: x => game.chain.progress.playerName = x,
              })}
              onAttach={el => el.focus()}
              onKeyUp={ev => ev.key === 'Enter' && resolve()}
            />
          </div>
        )));

        game.setPane('bottom', null);
        game.chain.saveGame();
      }}

      {checkpoint('cityOffice.signIt')}
      <p>{sdl(30)}You hurriedly fill in your name as well as the rest of the
      form and sign it.{w}</p>

      {checkpoint('cityOffice.heresYourBadge')}
      <p>{sdl(30)}Alright, {() => game.chain.progress.playerName}! Here's your
      badge.{w}</p>

      {goTo('fyrya')}
    </Chain.shield>
  );
}

export default CityOffice;
