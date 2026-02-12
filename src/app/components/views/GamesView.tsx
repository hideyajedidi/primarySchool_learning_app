import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Puzzle, Music, Mic, Image as ImageIcon } from 'lucide-react';

interface GamesViewProps {
  onBack: () => void;
}

const games = [
  { id: 1, title: 'ربط الكلمة', icon: <ImageIcon size={32} />, color: 'bg-pink-100 text-pink-600', description: 'صل الكلمة بالصورة المناسبة' },
  { id: 2, title: 'ترتيب الجمل', icon: <Puzzle size={32} />, color: 'bg-blue-100 text-blue-600', description: 'رتب الكلمات لتكوين جملة مفيدة' },
  { id: 3, title: 'استمع واختر', icon: <Music size={32} />, color: 'bg-purple-100 text-purple-600', description: 'استمع للصوت واختر الصورة' },
  { id: 4, title: 'تحدث', icon: <Mic size={32} />, color: 'bg-orange-100 text-orange-600', description: 'اقرأ الكلمة بصوت عالٍ' },
];

export function GamesView({ onBack }: GamesViewProps) {
  return (
    <div className="flex flex-col min-h-screen bg-indigo-50">
      <div className="bg-indigo-500 pb-12 pt-8 px-6 rounded-b-[3rem] shadow-lg">
        <div className="flex items-center gap-4 max-w-4xl mx-auto mb-6">
          <button 
            onClick={onBack}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors backdrop-blur-sm"
          >
            <ArrowRight size={24} />
          </button>
          <h1 className="text-3xl font-bold text-white font-[Tajawal]">الْعَبْ وَتَعَلَّمْ</h1>
        </div>
      </div>

      <div className="flex-1 px-6 -mt-8 max-w-4xl mx-auto w-full pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {games.map((game, index) => (
            <motion.button
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-right flex items-start gap-4 group"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${game.color}`}>
                {game.icon}
              </div>
              <div className="flex flex-col items-start">
                <h3 className="text-xl font-bold text-slate-800 mb-1 font-[Tajawal]">{game.title}</h3>
                <p className="text-slate-500 text-sm font-[Tajawal]">{game.description}</p>
                <div className="mt-4 px-4 py-1.5 bg-slate-100 rounded-full text-xs font-bold text-slate-600">
                  العب ال��ن
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
