import React, { useState } from 'react';
import { ArrowRight, Palette } from 'lucide-react';
import { Pet, Screen } from '../types/Pet';
import { petTypes, petColors, createDefaultPet } from '../utils/petData';
import PetDisplay from './PetDisplay';

interface CustomizePetProps {
  onScreenChange: (screen: Screen) => void;
  onPetCreated: (pet: Pet) => void;
  currentPet: Pet | null;
}

const CustomizePet: React.FC<CustomizePetProps> = ({ onScreenChange, onPetCreated, currentPet }) => {
  const [petName, setPetName] = useState(currentPet?.name || '');
  const [petType, setPetType] = useState<Pet['type']>(currentPet?.type || 'cat');
  const [selectedColor, setSelectedColor] = useState(currentPet?.appearance.color || petColors[0]);
  const [step, setStep] = useState(1);

  const handleCreatePet = () => {
    if (!petName.trim()) return;
    
    const newPet = currentPet 
      ? { ...currentPet, name: petName, type: petType, appearance: { ...currentPet.appearance, color: selectedColor } }
      : createDefaultPet(petName, petType);
    
    if (!currentPet) {
      newPet.appearance.color = selectedColor;
    }
    
    onPetCreated(newPet);
    onScreenChange('training');
  };

  const previewPet: Pet = {
    id: 'preview',
    name: petName || 'Your Pet',
    type: petType,
    appearance: {
      color: selectedColor,
      eyes: 'normal',
      ears: 'normal',
      accessories: {},
    },
    stats: { hunger: 80, energy: 90, happiness: 85, mood: 'happy' },
    training: { level: 1, progress: 0, commands: [], imagesUploaded: 0 },
    achievements: [],
    lastInteraction: new Date(),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-4 pb-20">
      <div className="max-w-md mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {currentPet ? 'Customize Pet' : 'Create Your Pet'}
          </h2>
          <p className="text-gray-600">Design your perfect virtual companion</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step >= num ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}
              >
                {num}
              </div>
            ))}
          </div>
        </div>

        {/* Pet Preview */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
          <PetDisplay pet={previewPet} size="large" />
        </div>

        {/* Step 1: Pet Type */}
        {step === 1 && (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="mr-2">🐾</span>
              Choose Pet Type
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(petTypes).map(([type, data]) => (
                <button
                  key={type}
                  onClick={() => setPetType(type as Pet['type'])}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    petType === type
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{data.emoji}</div>
                  <div className="text-sm font-medium">{data.name}</div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full mt-6 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center"
            >
              Next <ArrowRight className="ml-2" size={20} />
            </button>
          </div>
        )}

        {/* Step 2: Colors */}
        {step === 2 && (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Palette className="mr-2 text-purple-600" size={24} />
              Choose Color
            </h3>
            <div className="grid grid-cols-5 gap-3 mb-6">
              {petColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-12 h-12 rounded-full border-4 transition-all duration-200 ${
                    selectedColor === color
                      ? 'border-gray-800 scale-110'
                      : 'border-gray-300 hover:border-gray-500'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center"
              >
                Next <ArrowRight className="ml-2" size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Name */}
        {step === 3 && (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="mr-2">✏️</span>
              Name Your Pet
            </h3>
            <input
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              placeholder="Enter pet name..."
              className="w-full p-4 border-2 border-gray-200 rounded-lg text-lg font-medium focus:border-purple-500 focus:outline-none transition-colors duration-200"
              maxLength={20}
            />
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200"
              >
                Back
              </button>
              <button
                onClick={handleCreatePet}
                disabled={!petName.trim()}
                className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
              >
                {currentPet ? 'Update Pet' : 'Create Pet'} <ArrowRight className="ml-2" size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomizePet;