import React from 'react';
import { Trophy, Star, Brain, Heart, Camera, Award } from 'lucide-react';
import { Pet, Screen } from '../types/Pet';
import { achievements } from '../utils/petData';
import PetDisplay from './PetDisplay';

interface DashboardProps {
  pet: Pet;
  onScreenChange: (screen: Screen) => void;
  onResetPet: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ pet, onScreenChange, onResetPet }) => {
  const earnedAchievements = achievements.filter(achievement => 
    pet.achievements.includes(achievement.id)
  );

  const timeSinceLastInteraction = new Date().getTime() - pet.lastInteraction.getTime();
  const hoursSinceInteraction = Math.floor(timeSinceLastInteraction / (1000 * 60 * 60));

  const stats = [
    { label: 'Training Level', value: pet.training.level, icon: Brain, color: 'text-blue-600' },
    { label: 'Images Uploaded', value: pet.training.imagesUploaded, icon: Camera, color: 'text-green-600' },
    { label: 'Commands Learned', value: pet.training.commands.length, icon: Star, color: 'text-yellow-600' },
    { label: 'Achievements', value: earnedAchievements.length, icon: Trophy, color: 'text-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-red-100 p-4 pb-20">
      <div className="max-w-md mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Trophy className="mx-auto mb-4 text-yellow-600" size={48} />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h2>
          <p className="text-gray-600">Track your pet's progress and achievements</p>
        </div>

        {/* Pet Status Card */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
          <PetDisplay pet={pet} size="large" showStats={true} />
          
          <div className="mt-4 text-center">
            <div className="text-sm text-gray-600">
              Last interaction: {hoursSinceInteraction === 0 ? 'Just now' : `${hoursSinceInteraction}h ago`}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Created: {pet.lastInteraction.toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <Icon className={stat.color} size={24} />
                  <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Award className="mr-2 text-yellow-600" size={24} />
            Achievements
          </h3>
          
          {earnedAchievements.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              <p>No achievements yet!</p>
              <p className="text-sm">Keep interacting with your pet to earn badges.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {earnedAchievements.map((achievement) => (
                <div key={achievement.id} className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-3 border border-yellow-200">
                  <div className="text-2xl mb-1">{achievement.icon}</div>
                  <div className="text-sm font-semibold text-gray-800">{achievement.name}</div>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-4 text-xs text-gray-500">
            {earnedAchievements.length} of {achievements.length} achievements unlocked
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => onScreenChange('training')}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
          >
            <Brain className="mr-2" size={20} />
            Continue Training
          </button>

          <button
            onClick={() => onScreenChange('interact')}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
          >
            <Heart className="mr-2" size={20} />
            Play with {pet.name}
          </button>

          <button
            onClick={onResetPet}
            className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors duration-200"
          >
            Reset Pet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;