import React, { useState } from 'react';
import { Upload, Camera, Sparkles, Brain } from 'lucide-react';
import { Pet, Screen } from '../types/Pet';
import PetDisplay from './PetDisplay';

interface TrainScreenProps {
  pet: Pet;
  onScreenChange: (screen: Screen) => void;
  onPetUpdate: (pet: Pet) => void;
}

const TrainScreen: React.FC<TrainScreenProps> = ({ pet, onScreenChange, onPetUpdate }) => {
  const [isTraining, setIsTraining] = useState(false);
  const [trainingType, setTrainingType] = useState<'draw' | 'sing' | 'dance' | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setIsTraining(true);
      
      // Simulate AI training
      setTimeout(() => {
        const updatedPet = {
          ...pet,
          training: {
            ...pet.training,
            imagesLearned: pet.training.imagesLearned + files.length,
            canDraw: true,
          },
          stats: {
            ...pet.stats,
            happiness: Math.min(100, pet.stats.happiness + 10),
          }
        };
        onPetUpdate(updatedPet);
        setIsTraining(false);
      }, 3000);
    }
  };

  const trainSkill = (skill: 'draw' | 'sing' | 'dance') => {
    setTrainingType(skill);
    setIsTraining(true);
    
    setTimeout(() => {
      const updatedPet = {
        ...pet,
        training: {
          ...pet.training,
          [skill === 'draw' ? 'canDraw' : skill === 'sing' ? 'canSing' : 'canDance']: true,
          level: pet.training.level + 1,
        },
        achievements: [...pet.achievements, `learned-${skill}`],
      };
      onPetUpdate(updatedPet);
      setIsTraining(false);
      setTrainingType(null);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 p-6">
      <div className="max-w-lg mx-auto pt-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Brain className="mx-auto mb-4 text-white drop-shadow-lg" size={64} />
          <h2 className="text-5xl font-black text-white mb-2 drop-shadow-lg">
            Train {pet.name}!
          </h2>
          <p className="text-2xl text-white font-semibold drop-shadow">
            Teach your pet cool tricks!
          </p>
        </div>

        {/* Pet Display - Center */}
        <div className="bg-white/90 backdrop-blur rounded-3xl p-6 mb-8 shadow-2xl">
          <PetDisplay pet={pet} size="huge" showAction={true} action={trainingType || undefined} />
          
          {isTraining && (
            <div className="mt-6 text-center">
              <div className="inline-flex items-center bg-blue-100 px-6 py-3 rounded-full">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
                <span className="text-xl font-bold text-blue-800">
                  {trainingType ? `Learning to ${trainingType}...` : 'Learning from photos...'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Training Options */}
        <div className="space-y-4">
          
          {/* Upload Photos */}
          <div className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-2xl">
            <h3 className="text-2xl font-bold text-center mb-4">📸 Teach with Photos</h3>
            <label className="block">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isTraining}
              />
              <div className="border-4 border-dashed border-purple-300 rounded-2xl p-8 text-center hover:border-purple-500 transition-colors duration-200 cursor-pointer">
                <Upload className="mx-auto mb-4 text-purple-500" size={48} />
                <div className="text-xl font-bold text-purple-700">Tap to Add Photos!</div>
                <div className="text-lg text-purple-600">Photos learned: {pet.training.imagesLearned}</div>
              </div>
            </label>
          </div>

          {/* Skill Training */}
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => trainSkill('draw')}
              disabled={isTraining}
              className={`p-6 rounded-2xl text-white font-bold text-lg transition-all duration-200 hover:scale-105 ${
                pet.training.canDraw 
                  ? 'bg-green-500 shadow-lg' 
                  : 'bg-gradient-to-br from-pink-400 to-red-500 shadow-xl'
              }`}
            >
              <div className="text-3xl mb-2">🎨</div>
              <div>{pet.training.canDraw ? 'Can Draw!' : 'Learn Draw'}</div>
            </button>

            <button
              onClick={() => trainSkill('sing')}
              disabled={isTraining}
              className={`p-6 rounded-2xl text-white font-bold text-lg transition-all duration-200 hover:scale-105 ${
                pet.training.canSing 
                  ? 'bg-green-500 shadow-lg' 
                  : 'bg-gradient-to-br from-blue-400 to-purple-500 shadow-xl'
              }`}
            >
              <div className="text-3xl mb-2">🎵</div>
              <div>{pet.training.canSing ? 'Can Sing!' : 'Learn Sing'}</div>
            </button>

            <button
              onClick={() => trainSkill('dance')}
              disabled={isTraining}
              className={`p-6 rounded-2xl text-white font-bold text-lg transition-all duration-200 hover:scale-105 ${
                pet.training.canDance 
                  ? 'bg-green-500 shadow-lg' 
                  : 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-xl'
              }`}
            >
              <div className="text-3xl mb-2">💃</div>
              <div>{pet.training.canDance ? 'Can Dance!' : 'Learn Dance'}</div>
            </button>
          </div>

          {/* Continue Button */}
          {(pet.training.canDraw || pet.training.canSing || pet.training.canDance) && (
            <button
              onClick={() => onScreenChange('play')}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-6 rounded-3xl text-2xl font-bold hover:scale-105 transition-all duration-200 shadow-2xl flex items-center justify-center"
            >
              <Sparkles className="mr-3" size={32} />
              Let's Play!
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainScreen;