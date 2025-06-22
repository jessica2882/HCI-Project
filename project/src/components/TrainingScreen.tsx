import React, { useState, useEffect } from 'react';
import { Upload, Camera, Play, CheckCircle, Brain } from 'lucide-react';
import { Pet, Screen } from '../types/Pet';
import PetDisplay from './PetDisplay';

interface TrainingScreenProps {
  pet: Pet;
  onScreenChange: (screen: Screen) => void;
  onPetUpdate: (pet: Pet) => void;
}

const TrainingScreen: React.FC<TrainingScreenProps> = ({ pet, onScreenChange, onPetUpdate }) => {
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(pet.training.progress);
  const [uploadedFiles, setUploadedFiles] = useState(0);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setUploadedFiles(prev => prev + files.length);
      // Simulate training progress
      const newProgress = Math.min(trainingProgress + (files.length * 10), 100);
      setTrainingProgress(newProgress);
      
      // Update pet
      const updatedPet = {
        ...pet,
        training: {
          ...pet.training,
          progress: newProgress,
          imagesUploaded: pet.training.imagesUploaded + files.length,
        }
      };
      onPetUpdate(updatedPet);
    }
  };

  const startTraining = () => {
    setIsTraining(true);
    // Simulate AI training process
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        const newProgress = prev + Math.random() * 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          // Add achievement and update pet
          const updatedPet = {
            ...pet,
            training: { ...pet.training, progress: 100, level: pet.training.level + 1 },
            achievements: pet.achievements.includes('trainer') ? pet.achievements : [...pet.achievements, 'trainer'],
          };
          onPetUpdate(updatedPet);
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };

  const isTrainingComplete = trainingProgress >= 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 p-4 pb-20">
      <div className="max-w-md mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Brain className="mx-auto mb-4 text-blue-600" size={48} />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">AI Training</h2>
          <p className="text-gray-600">Teach your pet with images and videos</p>
        </div>

        {/* Pet Display */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
          <PetDisplay pet={pet} size="large" />
          <div className="mt-4 text-center">
            <div className="text-sm text-gray-600 mb-2">Training Level {pet.training.level}</div>
            <div className="bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-500 ${
                  isTrainingComplete ? 'bg-green-500' : 'bg-blue-500'
                }`}
                style={{ width: `${trainingProgress}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">{Math.round(trainingProgress)}% Complete</div>
          </div>
        </div>

        {/* Training Status */}
        {isTraining && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
            <div>
              <div className="font-semibold text-blue-800">Training in progress...</div>
              <div className="text-sm text-blue-600">Your pet is learning from the data</div>
            </div>
          </div>
        )}

        {isTrainingComplete && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center">
            <CheckCircle className="text-green-600 mr-3" size={24} />
            <div>
              <div className="font-semibold text-green-800">Training Complete!</div>
              <div className="text-sm text-green-600">Your pet is ready to interact</div>
            </div>
          </div>
        )}

        {/* Upload Section */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Upload Training Data</h3>
          
          <div className="space-y-4">
            <label className="block">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors duration-200 cursor-pointer">
                <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                <div className="font-medium text-gray-700">Upload Images</div>
                <div className="text-sm text-gray-500">JPG, PNG files</div>
              </div>
            </label>

            <label className="block">
              <input
                type="file"
                multiple
                accept="video/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors duration-200 cursor-pointer">
                <Camera className="mx-auto mb-2 text-gray-400" size={32} />
                <div className="font-medium text-gray-700">Upload Videos</div>
                <div className="text-sm text-gray-500">MP4, MOV files</div>
              </div>
            </label>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Uploaded: {pet.training.imagesUploaded} files
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {pet.training.imagesUploaded > 0 && !isTraining && !isTrainingComplete && (
            <button
              onClick={startTraining}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center shadow-lg"
            >
              <Play className="mr-2" size={20} />
              Start AI Training
            </button>
          )}

          {isTrainingComplete && (
            <button
              onClick={() => onScreenChange('interact')}
              className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center shadow-lg"
            >
              <CheckCircle className="mr-2" size={20} />
              Start Interacting
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainingScreen;