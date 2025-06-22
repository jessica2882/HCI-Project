export interface Pet {
  id: string;
  name: string;
  type: 'cat' | 'dog' | 'rabbit' | 'bird';
  appearance: {
    color: string;
    pattern: string;
    size: 'small' | 'medium' | 'big';
  };
  stats: {
    happiness: number;
    energy: number;
    hunger: number;
    mood: 'happy' | 'excited' | 'sleepy' | 'hungry' | 'playful';
  };
  training: {
    level: number;
    canDraw: boolean;
    canSing: boolean;
    canDance: boolean;
    imagesLearned: number;
  };
  achievements: string[];
  lastInteraction: Date;
}

export type Screen = 'home' | 'create' | 'train' | 'play' | 'chat' | 'profile';

export interface AIRequest {
  type: 'draw' | 'story' | 'song' | 'dance';
  prompt: string;
  image?: File;
}