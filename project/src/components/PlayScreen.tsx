import React, { useState } from 'react';
import { Heart, Utensils, Gamepad2, Sparkles } from 'lucide-react';
import { Pet, Screen } from '../types/Pet';
import PetDisplay from './PetDisplay';

interface PlayScreenProps {
  pet: Pet;
  onScreenChange: (screen: Screen) => void;
  onPetUpdate: (pet: Pet) => void;
}

const PlayScreen: React.FC<PlayScreenProps> = ({ pet, onScreenChange, onPetUpdate }) => {
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [showReaction, setShowReaction] = useState(false);

  const performAction = (action: string, statChanges: Partial<Pet['stats']>) => {
    const updatedPet = {
      ...pet,
      stats: {
        ...pet.stats,
        happiness: Math.max(0, Math.min(100, (pet.stats.happiness + (statChanges.happiness || 0)))),
        energy: Math.max(0, Math.min(100, (pet.stats.energy + (statChanges.energy || 0)))),
        hunger: Math.max(0, Math.min(100, (pet.stats.hunger + (statChanges.hunger || 0)))),
      },
      lastInteraction: new Date(),
    };

    // Update mood
    if (updatedPet.stats.happiness > 80) updatedPet.stats.mood = 'happy';
    else if (updatedPet.stats.energy < 30) updatedPet.stats.mood = 'sleepy';
    else if (updatedPet.stats.hunger < 20) updatedPet.stats.mood = 'hungry';
    else updatedPet.stats.mood = 'playful';

    onPetUpdate(updatedPet);
    setLastAction(action);
    setShowReaction(true);
    
    setTimeout(() => {
      setShowReaction(false);
    }, 2000);
  };

  const actions = [
    {
      id: 'feed',
      name: 'Feed',
      icon: Utensils,
      emoji: '🍎',
      color: 'from-orange-400 to-red-500',
      statChanges: { hunger: 30, happiness: 15 },
    },
    {
      id: 'play',
      name: 'Play',
      icon: Gamepad2,
      emoji: '🎾',
      color: 'from-green-400 to-blue-500',
      statChanges: { happiness: 25, energy: -10 },
    },
    {
      id: 'clean',
      name: 'Clean',
      icon: Sparkles,
      emoji: '🛁',
      color: 'from-blue-400 to-purple-500',
      statChanges: { happiness: 20, energy: -5 },
    },
    {
      id: 'hug',
      name: 'Hug',
      icon: Heart,
      emoji: '🤗',
      color: 'from-pink-400 to-purple-500',
      statChanges: { happiness: 30, energy: 5 },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-blue-200 to-purple-200 p-6">
      <div className="max-w-lg mx-auto pt-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Heart className="mx-auto mb-4 text-white drop-shadow-lg" size={64} />
          <h2 className="text-5xl font-black text-white mb-2 drop-shadow-lg">
            Play Time!
          </h2>
          <p className="text-2xl text-white font-semibold drop-shadow">
            Take care of {pet.name}
          </p>
        </div>

        {/* Pet Display - Center */}
        <div className="bg-white/90 backdrop-blur rounded-3xl p-6 mb-8 shadow-2xl relative">
          <PetDisplay pet={pet} size="huge" showAction={true} />
          
          {showReaction && lastAction && (
            <div className="absolute top-4 right-4 bg-yellow-300 rounded-full px-4 py-2 shadow-lg animate-bounce">
              <span className="text-2xl font-bold">
                {lastAction === 'Feed' ? '😋' : 
                 lastAction === 'Play' ? '🎉' :
                 lastAction === 'Clean' ? '✨' : '💕'}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => performAction(action.name, action.statChanges)}
                className={`bg-gradient-to-br ${action.color} text-white p-8 rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-200`}
              >
                <div className="text-4xl mb-2">{action.emoji}</div>
                <div className="text-2xl font-bold">{action.name}</div>
              </button>
            );
          })}
        </div>

        {/* AI Actions */}
        {(pet.training.canDraw || pet.training.canSing || pet.training.canDance) && (
          <div className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-2xl">
            <h3 className="text-2xl font-bold text-center mb-4">🤖 AI Magic!</h3>
            <div className="grid grid-cols-3 gap-3">
              {pet.training.canDraw && (
                <button
                  onClick={() => onScreenChange('chat')}
                  className="bg-gradient-to-br from-pink-400 to-red-500 text-white p-4 rounded-2xl font-bold hover:scale-105 transition-all duration-200"
                >
                  <div className="text-2xl mb-1">🎨</div>
                  <div className="text-sm">Ask to Draw</div>
                </button>
              )}
              {pet.training.canSing && (
                <button
                  onClick={() => onScreenChange('chat')}
                  className="bg-gradient-to-br from-blue-400 to-purple-500 text-white p-4 rounded-2xl font-bold hover:scale-105 transition-all duration-200"
                >
                  <div className="text-2xl mb-1">🎵</div>
                  <div className="text-sm">Ask to Sing</div>
                </button>
              )}
              {pet.training.canDance && (
                <button
                  onClick={() => onScreenChange('chat')}
                  className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-4 rounded-2xl font-bold hover:scale-105 transition-all duration-200"
                >
                  <div className="text-2xl mb-1">💃</div>
                  <div className="text-sm">Ask to Dance</div>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayScreen;