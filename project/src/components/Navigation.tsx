import React from 'react';
import { Home, Settings, Brain, Heart, MessageCircle, User } from 'lucide-react';
import { Screen } from '../types/Pet';

interface NavigationProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
  hasPet: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ currentScreen, onScreenChange, hasPet }) => {
  const navItems = [
    { screen: 'home' as Screen, icon: Home, label: 'Home', enabled: true },
    { screen: 'create' as Screen, icon: Settings, label: 'Create', enabled: true },
    { screen: 'train' as Screen, icon: Brain, label: 'Train', enabled: hasPet },
    { screen: 'play' as Screen, icon: Heart, label: 'Play', enabled: hasPet },
    { screen: 'chat' as Screen, icon: MessageCircle, label: 'Chat', enabled: hasPet },
    { screen: 'profile' as Screen, icon: User, label: 'Profile', enabled: hasPet },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t-4 border-purple-200 px-2 py-3 z-50">
      <div className="flex justify-around max-w-lg mx-auto">
        {navItems.map(({ screen, icon: Icon, label, enabled }) => (
          <button
            key={screen}
            onClick={() => enabled && onScreenChange(screen)}
            disabled={!enabled}
            className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 ${
              enabled
                ? currentScreen === screen
                  ? 'text-purple-600 bg-purple-100 scale-110'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50 hover:scale-105'
                : 'text-gray-300 cursor-not-allowed'
            }`}
          >
            <Icon size={24} />
            <span className="text-xs mt-1 font-bold">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;