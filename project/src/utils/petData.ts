import { Pet } from '../types/Pet';

export const petTypes = {
  cat: {
    emoji: '🐱',
    name: 'Cat',
    sounds: ['Meow!', 'Purr!', 'Mrow!'],
    fullBody: '🐈',
    actions: {
      happy: '😸',
      excited: '🙀',
      sleepy: '😴',
      hungry: '🍽️',
      playful: '🎾'
    }
  },
  dog: {
    emoji: '🐶',
    name: 'Dog',
    sounds: ['Woof!', 'Bark!', 'Ruff!'],
    fullBody: '🐕',
    actions: {
      happy: '😊',
      excited: '🎉',
      sleepy: '💤',
      hungry: '🦴',
      playful: '⚽'
    }
  },
  rabbit: {
    emoji: '🐰',
    name: 'Rabbit',
    sounds: ['Hop!', 'Squeak!', 'Nibble!'],
    fullBody: '🐇',
    actions: {
      happy: '🥕',
      excited: '🌟',
      sleepy: '😴',
      hungry: '🥬',
      playful: '🏃'
    }
  },
  bird: {
    emoji: '🐦',
    name: 'Bird',
    sounds: ['Tweet!', 'Chirp!', 'Sing!'],
    fullBody: '🦜',
    actions: {
      happy: '🎵',
      excited: '✨',
      sleepy: '😴',
      hungry: '🌾',
      playful: '🪶'
    }
  }
};

export const petColors = [
  '#FF6B9D', '#4ECDC4', '#45B7D1', '#96CEB4', 
  '#FFEAA7', '#DDA0DD', '#FF9A9E', '#A8EDEA'
];

export const createDefaultPet = (name: string, type: Pet['type']): Pet => ({
  id: Date.now().toString(),
  name,
  type,
  appearance: {
    color: petColors[0],
    pattern: 'solid',
    size: 'medium',
  },
  stats: {
    happiness: 100,
    energy: 100,
    hunger: 80,
    mood: 'happy',
  },
  training: {
    level: 1,
    canDraw: false,
    canSing: false,
    canDance: false,
    imagesLearned: 0,
  },
  achievements: ['new-friend'],
  lastInteraction: new Date(),
});