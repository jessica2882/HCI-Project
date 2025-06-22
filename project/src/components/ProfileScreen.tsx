import React from 'react';
import { Trophy, Star, Brain, Heart, RotateCcw } from 'lucide-react';
import { Pet, Screen } from '../types/Pet';
import PetDisplay from './PetDisplay';

interface ProfileScreenProps {
  pet: Pet;
  onScreenChange: (screen: Screen) => void;
  onResetPet: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ pet, onScreenChange, onResetPet }) => {
  const achievements = [
    { id: 'new-friend', name: 'New Friend', icon: '🎉', unlocked: pet.achievements.includes('new-friend') },
    { id: 'learned-draw', name: 'Artist', icon: '🎨', unlocked: pet.achievements.includes('learned-draw') },
    { id: 'learned-sing', name: 'Singer', icon: '🎵', unlocked: pet.achievements.includes('learned-sing') },
    { id: 'learned-dance', name: 'Dancer', icon: '💃', unlocked: pet.achievements.includes('learned-dance') },
  ];

  const stats = [
    { label: 'Level', value: pet.training.level, icon: Brain, color: 'text-blue-600' },
    { label: 'Photos', value: pet.training.imagesLearned, icon: Star, color: 'text-yellow-600' },
    { label: 'Skills', value: [pet.training.canDraw, pet.training.canSing, pet.training.canDance].filter(Boolean).length, icon: Trophy, color: 'text-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-orange-200 to-red-200 p-6">
      <div className="max-w-lg mx-auto pt-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Trophy className="mx-auto mb-4 text-white drop-shadow-lg" size={64} />
          <h2 className="text-5xl font-black text-white mb-2 drop-shadow-lg">
            {pet.name}'s Profile
          </h2>
        </div>

        {/* Pet Display - Center */}
        <div className="bg-white/90 backdrop-blur rounded-3xl p-6 mb-8 shadow-2xl">
          <PetDisplay pet={pet} size="huge" showAction={true} />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white/90 backdrop-blur rounded-2xl p-4 shadow-xl text-center">
                <Icon className={`mx-auto mb-2 ${stat.color}`} size={32} />
                <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-sm text-gray-600 font-semibold">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Achievements */}
        <div className="bg-white/90 backdrop-blur rounded-3xl p-6 mb-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-center mb-6">🏆 Achievements</h3>
          
          <div className="grid grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className={`p-4 rounded-2xl text-center transition-all duration-200 ${
                  achievement.unlocked 
                    ? 'bg-gradient-to-br from-yellow-300 to-orange-400 shadow-lg' 
                    : 'bg-gray-200 opacity-50'
                }`}
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <div className={`text-sm font-bold ${achievement.unlocked ? 'text-white' : 'text-gray-500'}`}>
                  {achievement.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => onScreenChange('train')}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-6 rounded-3xl text-2xl font-bold hover:scale-105 transition-all duration-200 shadow-2xl flex items-center justify-center"
          >
            <Brain className="mr-3" size={32} />
            Train More!
          </button>

          <button
            onClick={() => onScreenChange('play')}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-6 rounded-3xl text-2xl font-bold hover:scale-105 transition-all duration-200 shadow-2xl flex items-center justify-center"
          >
            <Heart className="mr-3" size={32} />
            Play Time!
          </button>

          <button
            onClick={onResetPet}
            className="w-full bg-gradient-to-r from-red-400 to-pink-500 text-white py-4 rounded-3xl text-xl font-bold hover:scale-105 transition-all duration-200 shadow-xl flex items-center justify-center"
          >
            <RotateCcw className="mr-2" size={24} />
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;