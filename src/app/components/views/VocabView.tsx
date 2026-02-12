import React from 'react';
import { vocabList } from '../../data';
import { motion } from 'motion/react';
import { ArrowRight, Volume2, ArrowLeft } from 'lucide-react';

interface VocabViewProps {
  onBack: () => void;
}

export function VocabView({ onBack }: VocabViewProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextWord = () => {
    if (currentIndex < vocabList.length - 1) {
      setCurrentIndex(c => c + 1);
    }
  };

  const prevWord = () => {
    if (currentIndex > 0) {
      setCurrentIndex(c => c - 1);
    }
  };

  const word = vocabList[currentIndex];

  return (
    <div className="flex flex-col min-h-screen bg-lime-50">
      <div className="p-6 flex items-center justify-between">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-lime-200 text-lime-800 transition-colors">
          <ArrowRight size={24} />
        </button>
        <span className="font-bold text-lime-800 font-[Tajawal]">كلماتي الجديدة</span>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 pb-24">
        <motion.div
          key={word.word}
          initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl max-w-sm w-full flex flex-col items-center text-center border-4 border-lime-100"
        >
          <div className="text-8xl mb-8 filter drop-shadow-md">
            {word.image}
          </div>
          
          <h2 className="text-6xl font-bold text-slate-800 mb-8 font-[Tajawal] tracking-wide">
            {word.word}
          </h2>

          <button className="w-16 h-16 rounded-full bg-lime-400 hover:bg-lime-500 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 mb-4">
            <Volume2 size={32} />
          </button>
          <span className="text-lime-600 font-medium font-[Tajawal]">اضغط للاستماع</span>
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center gap-8 mt-12">
          <button 
            onClick={prevWord}
            disabled={currentIndex === 0}
            className="p-4 rounded-full bg-white shadow-md disabled:opacity-30 disabled:cursor-not-allowed text-lime-700 hover:bg-lime-50 transition-colors"
          >
            <ArrowRight size={32} />
          </button>
          
          <span className="font-bold text-lg text-lime-800 font-[Tajawal]">
            {currentIndex + 1} / {vocabList.length}
          </span>

          <button 
            onClick={nextWord}
            disabled={currentIndex === vocabList.length - 1}
            className="p-4 rounded-full bg-white shadow-md disabled:opacity-30 disabled:cursor-not-allowed text-lime-700 hover:bg-lime-50 transition-colors"
          >
            <ArrowLeft size={32} />
          </button>
        </div>
      </div>
    </div>
  );
}
