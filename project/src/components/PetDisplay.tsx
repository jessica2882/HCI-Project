import React from 'react';
import { Pet } from '../types/Pet';
import { petTypes } from '../utils/petData';

interface PetDisplayProps {
  pet: Pet | null;
  size?: 'big' | 'huge';
  showAction?: boolean;
  action?: string;
}

const PetDisplay: React.FC<PetDisplayProps> = ({ 
  pet, 
  size = 'big', 
  showAction = false,
  action
}) => {
  if (!pet) {
    return (
      <div className="flex items-center justify-center p-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl">
        <span className="text-6xl">🐾</span>
      </div>
    );
  }

  const petTypeData = petTypes[pet.type];
  const sizeClasses = {
    big: 'text-8xl',
    huge: 'text-9xl'
  };

  const getMoodAnimation = () => {
    switch (pet.stats.mood) {
      case 'happy':
        return 'animate-bounce';
      case 'excited':
        return 'animate-pulse';
      case 'playful':
        return 'animate-bounce';
      case 'sleepy':
        return 'opacity-70';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div 
        className={`${sizeClasses[size]} ${getMoodAnimation()} transition-all duration-500 relative`}
        style={{ 
          filter: `hue-rotate(${pet.appearance.color === '#FF6B9D' ? '0deg' : '45deg'})`,
        }}
      >
        <div className="relative">
          {petTypeData.fullBody}
          {showAction && action && (
            <div className="absolute -top-4 -right-4 text-3xl animate-bounce">
              {petTypeData.actions[pet.stats.mood] || '✨'}
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{pet.name}</h2>
        <div className="flex space-x-4 text-lg">
          <span className="bg-pink-100 px-3 py-1 rounded-full">😊 {pet.stats.happiness}%</span>
          <span className="bg-green-100 px-3 py-1 rounded-full">⚡ {pet.stats.energy}%</span>
          <span className="bg-orange-100 px-3 py-1 rounded-full">🍎 {pet.stats.hunger}%</span>
        </div>
      </div>
    </div>
  );
};

export default PetDisplay;