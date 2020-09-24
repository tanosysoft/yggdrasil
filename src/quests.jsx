import Chain, { w } from '@tanosysoft/chain';

export default {
  batFang: {
    name: `3 Bat Fangs`,
    items: [[3, 'batFang']],
    description: <>Please bring me 3 Bat Fangs.{w}</>,
  },

  greenGoo: {
    prerequisites: ['batFang'],
    name: `4 Green Goo`,
    items: [[4, 'greenGoo']],
    description: <>Please bring me 4 Green Goo.{w}</>,
  },

  moss: {
    prerequisites: ['greenGoo'],
    name: `3 Moss`,
    items: [[3, 'moss']],
    description: <>Please bring me 3 Moss.{w}</>,
  },

  weed: {
    prerequisites: ['moss'],
    name: `4 Weed`,
    items: [[4, 'weed']],
    description: <>Please bring me 4 Weed.{w}</>,
  },

  twig: {
    prerequisites: ['weed'],
    name: `2 Twigs and 5 Stones`,
    items: [[2, 'twig'], [5, 'stone']],
    description: <>Please bring me 2 Twigs and 5 Stones.{w}</>,
  },

  flowerBud: {
    prerequisites: ['twig'],
    name: `3 Flower Buds and 5 Tiny Petals`,
    items: [[3, 'flowerBud'], [5, 'tinyPetal']],
    description: <>Please bring me 3 Flower Buds and 5 Tiny Petals.{w}</>,
  },

  vampireFang: {
    prerequisites: ['flowerBud'],
    name: `4 Vampire Fangs`,
    items: [[4, 'vampireFangs']],
    description: <>Please bring me 4 Vampire Fangs.{w}</>,
  },

  advSkull: {
    prerequisites: ['vampireFangs'],
    name: `7 Adventurer Skulls`,
    items: [[7, 'advSkull']],
    description: <>Please bring me 7 Adventurer Skulls.{w}</>,
  },
};
