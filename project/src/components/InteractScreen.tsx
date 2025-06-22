import React, { useState } from 'react';
import { Heart, Coffee, Gamepad2, Sparkles } from 'lucide-react';
import { Pet, Screen } from '../types/Pet';
import { petTypes } from '../utils/petData';
import PetDisplay from './PetDisplay';

interface InteractScreenProps {
  pet: Pet;
  onScreenChange: (screen: Screen) => void;
  onPetUpdate: (pet: Pet) => void;
}

const InteractScreen: React.FC<InteractScreenProps> = ({ pet, onScreenChange, onPetUpdate }) => {
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [petReaction, setPetReaction] = useState<string | null>(null);

  const performAction = (action: string, statChanges: Partial<Pet['stats']>) => {
    const updatedPet = {
      ...pet,
      stats: {
        ...pet.stats,
        ...statChanges,
        // Ensure stats stay within bounds
        hunger: Math.max(0, Math.min(100, (pet.stats.hunger + (statChanges.hunger || 0)))),
        energy: Math.max(0, Math.min(100, (pet.stats.energy + (statChanges.energy || 0)))),
        happiness: Math.max(0, Math.min(100, (pet.stats.happiness + (statChanges.happiness || 0)))),
      },
      lastInteraction: new Date(),
    };

    // Update mood based on stats
    if (updatedPet.stats.happiness > 80) updatedPet.stats.mood = 'happy';
    else if (updatedPet.stats.energy < 30) updatedPet.stats.mood = 'tired';
    else if (updatedPet.stats.hunger < 20) updatedPet.stats.mood = 'sad';
    else updatedPet.stats.mood = 'neutral';

    onPetUpdate(updatedPet);
    setLastAction(action);

    // Show pet reaction
    const petTypeData = petTypes[pet.type];
    const randomSound = petTypeData.sounds[Math.floor(Math.random() * petTypeData.sounds.length)];
    setPetReaction(randomSound);
    
    setTimeout(() => {
      setPetReaction(null);
    }, 2000);
  };

  const actions = [
    {
      id: 'feed',
      name: 'Feed',
      icon: Coffee,
      color: 'bg-orange-500 hover:bg-orange-600',
      description: 'Give your pet some food',
      statChanges: { hunger: 25, happiness: 10 },
    },
    {
      id: 'play',
      name: 'Play',
      icon: Gamepad2,
      color: 'bg-green-500 hover:bg-green-600',
      description: 'Play games with your pet',
      statChanges: { happiness: 20, energy: -10 },
    },
    {
      id: 'clean',
      name: 'Clean',
      icon: Sparkles,
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'Give your pet a bath',
      statChanges: { happiness: 15, energy: -5 },
    },
    {
      id: 'rest',
      name: 'Rest',
      icon: Heart,
      color: 'bg-purple-500 hover:bg-purple-600',
      description: 'Let your pet relax',
      statChanges: { energy: 30, happiness: 5 },
    },
  ];

  const getStatusColor = (value: number) => {
    if (value > 70) return 'text-green-600';
    if (value > 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-purple-100 p-4 pb-20">
      <div className="max-w-md mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Heart className="mx-auto mb-4 text-pink-600" size={48} />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Interact</h2>
          <p className="text-gray-600">Take care of your virtual pet</p>
        </div>

        {/* Pet Display with Reaction */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-lg relative">
          <PetDisplay pet={pet} size="large" showStats={true} />
          
          {petReaction && (
            <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-lg border-2 border-gray-200 animate-bounce">
              <span className="text-sm font-medium">{petReaction}</span>
            </div>
          )}

          {lastAction && (
            <div className="mt-4 text-center">
              <div className="text-sm text-gray-600 bg-gray-100 rounded-full px-3 py-1 inline-block">
                Last action: {lastAction}
              </div>
            </div>
          )}
        </div>

        {/* Status Overview */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-lg">
          <h3 className="font-semibold mb-3 text-gray-800">Pet Status</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className={`text-2xl font-bold ${getStatusColor(pet.stats.hunger)}`}>
                {pet.stats.hunger}%
              </div>
              <div className="text-xs text-gray-600">Hunger</div>
            </div>
            <div>
              <div className={`text-2xl font-bold ${getStatusColor(pet.stats.energy)}`}>
                {pet.stats.energy}%
              </div>
              <div className="text-xs text-gray-600">Energy</div>
            </div>
            <div>
              <div className={`text-2xl font-bold ${getStatusColor(pet.stats.happiness)}`}>
                {pet.stats.happiness}%
              </div>
              <div className="text-xs text-gray-600">Happiness</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => performAction(action.name, action.statChanges)}
                className={`${action.color} text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105`}
              >
                <Icon size={32} className="mx-auto mb-2" />
                <div className="font-semibold">{action.name}</div>
                <div className="text-xs opacity-90 mt-1">{action.description}</div>
              </button>
            );
          })}
        </div>

        {/* Continue to Chat */}
        <button
          onClick={() => onScreenChange('chat')}
          className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg"
        >
          Start Chatting with {pet.name}
        </button>
      </div>
    </div>
  );
};

export default InteractScreen;