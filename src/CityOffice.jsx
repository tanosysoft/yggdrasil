import Chain, { clear, d, goTo, sdl, sec, w } from '@tanosysoft/chain';
import checkpoint from './checkpoint';
import label from './label';

let areaId = k => `cityOffice${k ? `.${k}` : ''}`;

let CityOffice = () => (
  <Chain.shield>
    {checkpoint('cityOffice')}
    {() => game.setPane('top', null)}
    {() => game.setPane('bottom', null)}
    {clear}
    {sec(2)}
    {sdl(80)}
    <h1>Fyrya's City Office{sec(2)}</h1>

    {Chain.if(() => !game.progressVar(areaId('visited')), (
      <div>
        {label(areaId('located'))}
        <p>{sdl(30)}The city office is located inside this fancy-looking
        building you've just found yourself in.{w}</p>

        {label(areaId('peopleCarrying'))}
        <p>{sdl(30)}You see people carrying all sorts of equipment doing
        busy work. They don't look like novices, so it looks like the
        adventurer registration office does more than just issuing
        exploration permits.{w}</p>

        {label(areaId('calmMan'))}
        <p>{sdl(30)}Amidst all the apparent rush, a calm middle-aged man
        talks to you.{w}</p>

        {label(areaId('hiThere'))}
        <p>{sdl(30)}Officer: Hi there!{w}<br />
        I see you don't have a badge yet.{w}<br />
        Looking for your very own exploration permit?{w}<br />
        I can help you with that!{w}</p>

        {label(areaId('tigthenTheGrip'))}
        <p>{sdl(30)}You tighten the grip around the hilt.{w}</p>

        {label(areaId('itsReal'))}
        <p>{sdl(30)}It's real! You'll soon be putting all your hard work
        sword pratice to use on those ugly beasts!{w}</p>

        {label(areaId('itsReal'))}
        <p>{sdl(30)}Officer: I like that sparkle in your eyes.<br />
        We'll see how long that fire burns.{w}</p>

        {label(areaId('itsReal'))}
        <p>{sdl(30)}Are you becoming a real warrior, or are you soon running
        away in the face of the hardships of this life you choose?{w}</p>

        {label(areaId('doYouHaveWhatItTakes'))}
        <p>{sdl(30)}Do you have what it takes!?{w}<br />
        Time sure will tell! Hah!{w}</p>

        {label(areaId('allINeed'))}
        <p>{sdl(30)}Alright. All I really need before I can issue you a Level
        1~2 exploration permit is your name and some basic information.{w}</p>

        {label(areaId('enterYourName'))}
        <p>{sdl(30)}Please write your name right here, then fill the rest of the
        form, please.{sec(1)}</p>

        {async () => {
          await new Promise(resolve => game.setPane('bottom', (
            <div class="ActionsPane">
              <input
                class="ActionsPane-input"
                value={d.binding({
                  get: () => game.progress.actors.h01.name,
                  set: x => game.progress.actors.h01.name = x,
                })}
                onAttach={el => el.focus()}
                onKeyUp={ev => ev.key === 'Enter' && resolve()}
              />
            </div>
          )));

          game.setPane('bottom', null);
          game.chain.saveGame();
        }}

        {label(areaId('signIt'))}
        <p>{sdl(30)}You hurriedly fill in your name as well as the rest of the
        form and sign it.{w}</p>

        {label(areaId('heresYourBadge'))}
        <p>{sdl(30)}Alright, {() => game.progress.actors.h01.name}! Here's your
        badge.{w}</p>

        {() => {
          game.progressVar(areaId('visited'), true);
          game.chain.saveGame();
        }}
      </div>
    ), (
      <div>
        {label(areaId('nothingToDo'))}
        <p>{sdl(30)}There's nothing else for you to do here for now.{w}</p>
      </div>
    ))}

    {goTo('fyrya')}
  </Chain.shield>
);

export default CityOffice;
