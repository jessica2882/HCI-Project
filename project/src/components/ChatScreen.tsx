import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { Pet, Screen } from '../types/Pet';
import { petTypes } from '../utils/petData';
import PetDisplay from './PetDisplay';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'pet';
  type?: 'text' | 'drawing' | 'song' | 'dance';
  timestamp: Date;
}

interface ChatScreenProps {
  pet: Pet;
  onScreenChange: (screen: Screen) => void;
  onPetUpdate: (pet: Pet) => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ pet, onScreenChange, onPetUpdate }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi! I'm ${pet.name}! What do you want me to do? 🐾`,
      sender: 'pet',
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): { text: string; type: 'text' | 'drawing' | 'song' | 'dance' } => {
    const lowerMessage = userMessage.toLowerCase();
    const petTypeData = petTypes[pet.type];
    
    // AI Generation requests
    if (lowerMessage.includes('draw') && pet.training.canDraw) {
      const drawings = ['🌈', '🏠', '🌸', '🦋', '⭐', '🎈', '🍎', '🌞'];
      const randomDrawing = drawings[Math.floor(Math.random() * drawings.length)];
      return {
        text: `Here's my drawing for you! ${randomDrawing} I made this just for you!`,
        type: 'drawing'
      };
    }
    
    if (lowerMessage.includes('sing') && pet.training.canSing) {
      const songs = [
        '🎵 La la la, you are my best friend! 🎵',
        '🎶 Happy happy day, let\'s go out and play! 🎶',
        '🎵 I love you, you love me, we\'re a happy family! 🎵'
      ];
      const randomSong = songs[Math.floor(Math.random() * songs.length)];
      return {
        text: randomSong,
        type: 'song'
      };
    }
    
    if (lowerMessage.includes('dance') && pet.training.canDance) {
      return {
        text: '💃 *dancing* 💃 Look at me go! Do you like my dance moves? 🕺',
        type: 'dance'
      };
    }

    // Story generation
    if (lowerMessage.includes('story')) {
      const stories = [
        'Once upon a time, there was a magical pet who could fly! ✨🦋',
        'In a faraway land, all the animals were friends and played together! 🌈🐾',
        'There was a brave little pet who saved the day with kindness! 💖🦸'
      ];
      const randomStory = stories[Math.floor(Math.random() * stories.length)];
      return { text: randomStory, type: 'text' };
    }

    // Regular responses
    const responses = [
      `${petTypeData.sounds[0]} That sounds fun!`,
      `${petTypeData.sounds[1]} I love talking with you!`,
      `${petTypeData.sounds[2]} You're the best friend ever!`,
      `I'm so happy! What else can we do together? 😊`,
      `That's amazing! Tell me more! ✨`
    ];

    return {
      text: responses[Math.floor(Math.random() * responses.length)],
      type: 'text'
    };
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = generateAIResponse(inputText);
      const petResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        sender: 'pet',
        type: aiResponse.type,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, petResponse]);
      setIsTyping(false);

      // Update pet happiness
      const updatedPet = {
        ...pet,
        stats: {
          ...pet.stats,
          happiness: Math.min(100, pet.stats.happiness + 5),
        },
        lastInteraction: new Date(),
      };
      onPetUpdate(updatedPet);
    }, 1500);
  };

  const quickMessages = [
    '🎨 Draw something!',
    '🎵 Sing a song!',
    '💃 Dance for me!',
    '📚 Tell me a story!'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 flex flex-col">
      
      {/* Header with Pet */}
      <div className="bg-white/90 backdrop-blur p-4 shadow-lg">
        <div className="max-w-lg mx-auto">
          <PetDisplay pet={pet} size="big" showAction={true} />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-lg mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-6 py-4 rounded-3xl text-lg font-semibold ${
                  message.sender === 'user'
                    ? 'bg-purple-500 text-white'
                    : message.type === 'drawing'
                    ? 'bg-pink-100 text-pink-800 border-4 border-pink-300'
                    : message.type === 'song'
                    ? 'bg-blue-100 text-blue-800 border-4 border-blue-300'
                    : message.type === 'dance'
                    ? 'bg-yellow-100 text-yellow-800 border-4 border-yellow-300'
                    : 'bg-white text-gray-800 shadow-lg'
                }`}
              >
                <p>{message.text}</p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 shadow-lg px-6 py-4 rounded-3xl">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 bg-white/90 backdrop-blur">
        <div className="max-w-lg mx-auto">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {quickMessages.map((msg) => (
              <button
                key={msg}
                onClick={() => {
                  setInputText(msg);
                  setTimeout(sendMessage, 100);
                }}
                className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-4 py-2 rounded-2xl font-bold text-sm hover:scale-105 transition-all duration-200"
              >
                {msg}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder={`Talk to ${pet.name}...`}
              className="flex-1 border-4 border-purple-300 rounded-full px-6 py-3 text-lg font-semibold focus:outline-none focus:border-purple-500 transition-colors duration-200"
            />
            <button
              onClick={sendMessage}
              disabled={!inputText.trim() || isTyping}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full hover:scale-110 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
            >
              <Send size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;