import Chain, { goTo, w } from '@tanosysoft/chain';

export default {
  dgKey01: { name: 'Dungeon Key' },

  potion: {
    type: 'playerItem',
    name: 'Potion',

    use: ({ returnTo }) => (
      <>
        Elmina drinks a Potion...{w}<br />

        {() => void(game.inventoryItem('potion', -1))}
        Elmina recovers 10 HP!{w}<br />

        {goTo(returnTo)}
      </>
    ),
  },

  stone: { name: 'Stone' },
  batFang: { name: 'Bat Fang' },
  batWing: { name: 'Bat Wing' },
  greenGoo: { name: 'Green Goo' },
  moss: { name: 'Moss' },
};
