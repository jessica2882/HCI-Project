import React, { useState, useEffect } from 'react';
import { Pet, Screen } from './types/Pet';
import Navigation from './components/Navigation';
import HomeScreen from './components/HomeScreen';
import CreatePetScreen from './components/CreatePetScreen';
import TrainScreen from './components/TrainScreen';
import PlayScreen from './components/PlayScreen';
import ChatScreen from './components/ChatScreen';
import ProfileScreen from './components/ProfileScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [pet, setPet] = useState<Pet | null>(null);

  // Load pet from localStorage
  useEffect(() => {
    const savedPet = localStorage.getItem('petcare-pet');
    if (savedPet) {
      try {
        const parsedPet = JSON.parse(savedPet);
        parsedPet.lastInteraction = new Date(parsedPet.lastInteraction);
        setPet(parsedPet);
      } catch (error) {
        console.error('Error loading pet:', error);
      }
    }
  }, []);

  // Save pet to localStorage
  useEffect(() => {
    if (pet) {
      localStorage.setItem('petcare-pet', JSON.stringify(pet));
    }
  }, [pet]);

  const handleScreenChange = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handlePetCreated = (newPet: Pet) => {
    setPet(newPet);
  };

  const handlePetUpdate = (updatedPet: Pet) => {
    setPet(updatedPet);
  };

  const handleResetPet = () => {
    setPet(null);
    localStorage.removeItem('petcare-pet');
    setCurrentScreen('home');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen
            onScreenChange={handleScreenChange}
            hasPet={!!pet}
          />
        );
      case 'create':
        return (
          <CreatePetScreen
            onScreenChange={handleScreenChange}
            onPetCreated={handlePetCreated}
          />
        );
      case 'train':
        return pet ? (
          <TrainScreen
            pet={pet}
            onScreenChange={handleScreenChange}
            onPetUpdate={handlePetUpdate}
          />
        ) : null;
      case 'play':
        return pet ? (
          <PlayScreen
            pet={pet}
            onScreenChange={handleScreenChange}
            onPetUpdate={handlePetUpdate}
          />
        ) : null;
      case 'chat':
        return pet ? (
          <ChatScreen
            pet={pet}
            onScreenChange={handleScreenChange}
            onPetUpdate={handlePetUpdate}
          />
        ) : null;
      case 'profile':
        return pet ? (
          <ProfileScreen
            pet={pet}
            onScreenChange={handleScreenChange}
            onResetPet={handleResetPet}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {renderScreen()}
      <Navigation
        currentScreen={currentScreen}
        onScreenChange={handleScreenChange}
        hasPet={!!pet}
      />
    </div>
  );
}

export default App;