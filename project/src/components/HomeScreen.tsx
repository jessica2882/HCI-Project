// import React from 'react';
// import { Plus, Play, Microscope } from 'lucide-react';
// import { Screen } from '../types/Pet';

// interface HomeScreenProps {
//   onScreenChange: (screen: Screen) => void;
//   hasPet: boolean;
// }

// const HomeScreen: React.FC<HomeScreenProps> = ({ onScreenChange, hasPet }) => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 p-6">
//       <div className="max-w-lg mx-auto pt-12">
        
//         {/* Title */}
//         <div className="text-center mb-16">
//           <div className="text-8xl mb-6 animate-bounce">🐾</div>
//           <h1 className="text-6xl font-black text-white mb-4 drop-shadow-lg">
//             PetCare
//           </h1>
//           <p className="text-2xl text-white font-semibold drop-shadow">
//             Create Your AI Pet Friend!
//           </p>
//         </div>

//         {/* Big Buttons */}
//         <div className="space-y-6">
//           <button
//             onClick={() => onScreenChange('create')}
//             className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white p-8 rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
//           >
//             <Plus size={48} className="mx-auto mb-4" />
//             <div className="text-3xl font-bold mb-2">Make New Pet</div>
//             <div className="text-xl opacity-90">Create your perfect friend!</div>
//           </button>
//           {Microscope && (
//           <button
//             onClick={() =>  onScreenChange('train')}
//             className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white p-8 rounded-3xl shadow-xl transform hover:scale-105 transition-all duration-200"
//           >
//             <Microscope size = {48} className="w-12 h-12 mx-auto mb-4" />
//             <h3 className="text-2xl font-bold mb-2">Science Lab</h3>
//             <p className="text-lg opacity-90">Learn about AI and train your pet</p>
//           </button>)}
//           {hasPet && (
//             <button
//               onClick={() => onScreenChange('play')}
//               className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white p-8 rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
//             >
//               <Play size={48} className="mx-auto mb-4" />
//               <div className="text-3xl font-bold mb-2">Play with Pet</div>
//               <div className="text-xl opacity-90">Continue the fun!</div>
//             </button>
            
//           )}
          
//         </div>

//         {/* Fun Icons */}
//         <div className="mt-16 grid grid-cols-4 gap-4">
//           <div className="text-center">
//             <div className="text-4xl mb-2">🎨</div>
//             <div className="text-sm text-white font-semibold">Draw</div>
//           </div>
//           <div className="text-center">
//             <div className="text-4xl mb-2">🎵</div>
//             <div className="text-sm text-white font-semibold">Sing</div>
//           </div>
//           <div className="text-center">
//             <div className="text-4xl mb-2">💃</div>
//             <div className="text-sm text-white font-semibold">Dance</div>
//           </div>
//           <div className="text-center">
//             <div className="text-4xl mb-2">📚</div>
//             <div className="text-sm text-white font-semibold">Stories</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomeScreen;

import React from 'react';
import { Plus, Play, Camera } from 'lucide-react';
import { Screen } from '../types/Pet';

interface HomeScreenProps {
  onScreenChange: (screen: Screen) => void;
  hasPet: boolean;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onScreenChange, hasPet }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-300 via-pink-300 to-blue-300 relative overflow-hidden">
      
      {/* Floating pets background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl animate-bounce opacity-20">🐱</div>
        <div className="absolute top-20 right-16 text-5xl animate-pulse opacity-20">🐶</div>
        <div className="absolute bottom-32 left-20 text-4xl animate-bounce opacity-20" style={{ animationDelay: '1s' }}>🐰</div>
        <div className="absolute bottom-40 right-10 text-5xl animate-pulse opacity-20" style={{ animationDelay: '2s' }}>🐦</div>
        <div className="absolute top-1/2 left-1/4 text-4xl animate-bounce opacity-20" style={{ animationDelay: '0.5s' }}>🐹</div>
        <div className="absolute top-1/3 right-1/4 text-5xl animate-pulse opacity-20" style={{ animationDelay: '1.5s' }}>🐠</div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center px-4 relative z-10">
        <div className="w-full max-w-lg text-center space-y-6">
          
          {/* Main Pet */}
          <div className="text-8xl md:text-9xl lg:text-[12rem] animate-bounce">🐈</div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white drop-shadow-2xl">
            PetCare
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-white font-bold drop-shadow-lg">
            Make Your AI Pet!
          </p>

          {/* Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => onScreenChange('create')}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white p-5 md:p-6 rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition duration-300 flex items-center justify-center"
            >
              <Plus size={36} className="mr-3" />
              <div className="text-left">
                <div className="text-xl md:text-2xl font-black">🐾 Make Pet</div>
                <div className="text-sm md:text-base opacity-90">Create your friend!</div>
              </div>
            </button>

            {hasPet && (
              <button
                onClick={() => onScreenChange('play')}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white p-5 md:p-6 rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition duration-300 flex items-center justify-center"
              >
                <Play size={36} className="mr-3" />
                <div className="text-left">
                  <div className="text-xl md:text-2xl font-black">💖 Play</div>
                  <div className="text-sm md:text-base opacity-90">Have fun together!</div>
                </div>
              </button>
            )}

            <button
              onClick={() => onScreenChange('train')}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white p-5 md:p-6 rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition duration-300 flex items-center justify-center"
            >
              <Camera size={36} className="mr-3" />
              <div className="text-left">
                <div className="text-xl md:text-2xl font-black">🧪 Science Lab</div>
                <div className="text-sm md:text-base opacity-90">Train with AI!</div>
              </div>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HomeScreen;


