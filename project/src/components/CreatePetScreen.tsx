import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Pet, Screen } from '../types/Pet';
import { petTypes, petColors, createDefaultPet } from '../utils/petData';
import PetDisplay from './PetDisplay';

interface CreatePetScreenProps {
  onScreenChange: (screen: Screen) => void;
  onPetCreated: (pet: Pet) => void;
}

const CreatePetScreen: React.FC<CreatePetScreenProps> = ({ onScreenChange, onPetCreated }) => {
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState<Pet['type']>('cat');
  const [selectedColor, setSelectedColor] = useState(petColors[0]);
  const [step, setStep] = useState(1);

  const handleCreatePet = () => {
    if (!petName.trim()) return;
    
    const newPet = createDefaultPet(petName, petType);
    newPet.appearance.color = selectedColor;
    
    onPetCreated(newPet);
    onScreenChange('train');
  };

  const previewPet: Pet = {
    id: 'preview',
    name: petName || 'My Pet',
    type: petType,
    appearance: {
      color: selectedColor,
      pattern: 'solid',
      size: 'medium',
    },
    stats: { hunger: 80, energy: 90, happiness: 100, mood: 'happy' },
    training: { level: 1, canDraw: false, canSing: false, canDance: false, imagesLearned: 0 },
    achievements: [],
    lastInteraction: new Date(),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-orange-200 to-red-200 p-6">
      <div className="max-w-lg mx-auto pt-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-5xl font-black text-white mb-4 drop-shadow-lg">
            Make Your Pet!
          </h2>
          <div className="flex justify-center space-x-2">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className={`w-6 h-6 rounded-full ${
                  step >= num ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Pet Preview - Always in center */}
        <div className="bg-white/90 backdrop-blur rounded-3xl p-6 mb-8 shadow-2xl">
          <PetDisplay pet={previewPet} size="huge" showAction={true} />
        </div>

        {/* Step 1: Choose Pet */}
        {step === 1 && (
          <div className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-2xl">
            <h3 className="text-3xl font-bold text-center mb-6">Pick Your Pet!</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(petTypes).map(([type, data]) => (
                <button
                  key={type}
                  onClick={() => setPetType(type as Pet['type'])}
                  className={`p-6 rounded-2xl border-4 transition-all duration-200 ${
                    petType === type
                      ? 'border-purple-500 bg-purple-100 scale-105'
                      : 'border-gray-200 bg-white hover:border-purple-300'
                  }`}
                >
                  <div className="text-5xl mb-2">{data.fullBody}</div>
                  <div className="text-xl font-bold">{data.name}</div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl text-2xl font-bold hover:scale-105 transition-all duration-200 flex items-center justify-center shadow-xl"
            >
              Next! <ArrowRight className="ml-2" size={28} />
            </button>
          </div>
        )}

        {/* Step 2: Choose Color */}
        {step === 2 && (
          <div className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-2xl">
            <h3 className="text-3xl font-bold text-center mb-6">Pick a Color!</h3>
            <div className="grid grid-cols-4 gap-4 mb-6">
              {petColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-16 h-16 rounded-full border-4 transition-all duration-200 hover:scale-110 ${
                    selectedColor === color
                      ? 'border-gray-800 scale-110'
                      : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-300 text-gray-700 py-4 rounded-2xl text-xl font-bold hover:bg-gray-400 transition-colors duration-200"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl text-xl font-bold hover:scale-105 transition-all duration-200 flex items-center justify-center"
              >
                Next! <ArrowRight className="ml-2" size={24} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Name Pet */}
        {step === 3 && (
          <div className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-2xl">
            <h3 className="text-3xl font-bold text-center mb-6">Name Your Pet!</h3>
            <input
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              placeholder="Type a name..."
              className="w-full p-6 border-4 border-gray-200 rounded-2xl text-2xl font-bold text-center focus:border-purple-500 focus:outline-none transition-colors duration-200"
              maxLength={15}
            />
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-gray-300 text-gray-700 py-4 rounded-2xl text-xl font-bold hover:bg-gray-400 transition-colors duration-200"
              >
                Back
              </button>
              <button
                onClick={handleCreatePet}
                disabled={!petName.trim()}
                className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-2xl text-xl font-bold hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
              >
                Create Pet! <ArrowRight className="ml-2" size={24} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePetScreen;