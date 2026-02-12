import React from 'react';
import { Lesson, lessonContent } from '../../data';
import { motion } from 'motion/react';
import { ArrowRight, Volume2, ArrowLeft, BookOpen, PauseCircle, PlayCircle, Languages } from 'lucide-react';

interface LessonViewProps {
  lesson: Lesson;
  onBack: () => void;
  onNext: () => void;
  onStartQuiz: () => void;
  onStartGames: () => void;
  onOpenVocab: () => void;
}

export function LessonView({ lesson, onBack, onNext, onStartQuiz, onStartGames, onOpenVocab }: LessonViewProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [activeParagraph, setActiveParagraph] = React.useState<number | null>(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && activeParagraph === null) {
      setActiveParagraph(0);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      {/* Top Bar */}
      <div className="bg-white/80 backdrop-blur-md px-4 py-3 sticky top-0 z-40 border-b border-amber-100/50">
        <div className="flex items-center justify-between max-w-4xl mx-auto w-full">
          <button 
            onClick={onBack}
            className="p-2 rounded-full hover:bg-amber-100 text-amber-800 transition-colors"
          >
            <ArrowRight size={24} />
          </button>
          <span className="font-bold text-amber-900 font-[Tajawal]">{lesson.title}</span>
          <div className="flex gap-2">
            <button 
              onClick={onOpenVocab}
              className="p-2 rounded-full hover:bg-amber-100 text-amber-800 transition-colors"
              title="الكلمات الجديدة"
            >
              <Languages size={24} />
            </button>
            <button className="p-2 rounded-full hover:bg-amber-100 text-amber-800 transition-colors">
              <BookOpen size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-3xl mx-auto w-full p-6 pb-32">
        {/* Lesson Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full aspect-video rounded-3xl overflow-hidden shadow-lg mb-8 bg-amber-200"
        >
          <img 
            src={lessonContent.image} 
            alt={lessonContent.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Audio Control */}
        <div className="flex justify-center mb-8">
          <button 
            onClick={togglePlay}
            className="flex items-center gap-3 bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-full shadow-lg shadow-teal-500/30 transition-all hover:scale-105"
          >
            {isPlaying ? <PauseCircle size={24} fill="currentColor" /> : <PlayCircle size={24} fill="currentColor" />}
            <span className="text-lg font-bold font-[Tajawal]">{isPlaying ? 'توقف' : 'استمع للدرس'}</span>
          </button>
        </div>

        {/* Text Content */}
        <div className="space-y-6">
          {lessonContent.paragraphs.map((para, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              onClick={() => setActiveParagraph(index)}
              className={`text-2xl md:text-3xl leading-[1.8] font-[Tajawal] text-right cursor-pointer p-4 rounded-xl transition-colors
                ${activeParagraph === index ? 'bg-amber-100 text-amber-900 font-medium ring-2 ring-amber-200' : 'text-slate-800 hover:bg-white/50'}`}
            >
              {para}
            </motion.p>
          ))}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <button 
            onClick={onStartGames}
            className="flex-1 bg-purple-100 hover:bg-purple-200 text-purple-700 py-3 rounded-xl font-bold font-[Tajawal] transition-colors"
          >
            الألعاب
          </button>
          <button 
            onClick={onStartQuiz}
            className="flex-1 bg-orange-100 hover:bg-orange-200 text-orange-700 py-3 rounded-xl font-bold font-[Tajawal] transition-colors"
          >
            التمارين
          </button>
          <button 
            onClick={onNext}
            className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 font-[Tajawal] shadow-lg shadow-teal-500/20 transition-colors"
          >
            <span>التالي</span>
            <ArrowLeft size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
