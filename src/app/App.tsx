import React from 'react';
import { HomeView } from './components/views/HomeView';
import { UnitBrowser } from './components/views/UnitBrowser';
import { LessonView } from './components/views/LessonView';
import { QuizView } from './components/views/QuizView';
import { GamesView } from './components/views/GamesView';
import { VocabView } from './components/views/VocabView';
import { Book, Lesson } from './data';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, BookA, Gamepad2 } from 'lucide-react';

type ViewState = 'home' | 'units' | 'lesson' | 'quiz' | 'games' | 'vocab';

export default function App() {
  const [view, setView] = React.useState<ViewState>('home');
  const [selectedBook, setSelectedBook] = React.useState<Book | null>(null);
  const [selectedLesson, setSelectedLesson] = React.useState<Lesson | null>(null);

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
    setView('units');
  };

  const handleSelectLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setView('lesson');
  };

  const handleBack = () => {
    if (view === 'units') {
      setView('home');
      setSelectedBook(null);
    } else if (view === 'lesson') {
      setView('units');
      setSelectedLesson(null);
    } else if (view === 'quiz' || view === 'games' || view === 'vocab') {
      if (selectedLesson) {
        setView('lesson');
      } else {
        setView('units'); // Fallback if accessed directly (not implemented yet but good practice)
      }
    }
  };

  // Simple global nav for quick jumping in this demo
  const NavigationBar = () => (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md shadow-2xl rounded-full px-6 py-3 flex gap-6 z-50 border border-slate-200">
      <button 
        onClick={() => setView('home')}
        className={`flex flex-col items-center gap-1 transition-colors ${view === 'home' ? 'text-teal-600' : 'text-slate-400 hover:text-slate-600'}`}
      >
        <LayoutGrid size={24} />
      </button>
      <button 
        onClick={() => {
           if(selectedBook) setView('units');
           else alert("اختر كتابًا أولاً");
        }}
        className={`flex flex-col items-center gap-1 transition-colors ${['units', 'lesson', 'quiz'].includes(view) ? 'text-teal-600' : 'text-slate-400 hover:text-slate-600'}`}
      >
        <BookA size={24} />
      </button>
      <button 
        onClick={() => setView('games')}
        className={`flex flex-col items-center gap-1 transition-colors ${view === 'games' ? 'text-teal-600' : 'text-slate-400 hover:text-slate-600'}`}
      >
        <Gamepad2 size={24} />
      </button>
    </div>
  );

  return (
    <div dir="rtl" className="font-[Tajawal] bg-slate-50 min-h-screen text-slate-800">
      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
            <HomeView onSelectBook={handleSelectBook} />
          </motion.div>
        )}
        
        {view === 'units' && selectedBook && (
          <motion.div key="units" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
            <UnitBrowser 
              book={selectedBook} 
              onSelectLesson={handleSelectLesson} 
              onBack={handleBack} 
            />
          </motion.div>
        )}

        {view === 'lesson' && selectedLesson && (
          <motion.div key="lesson" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
            <LessonView 
              lesson={selectedLesson} 
              onBack={handleBack}
              onNext={() => setView('quiz')}
              onStartQuiz={() => setView('quiz')}
              onStartGames={() => setView('games')}
              onOpenVocab={() => setView('vocab')}
            />
          </motion.div>
        )}

        {view === 'vocab' && (
          <motion.div key="vocab" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
            <VocabView onBack={() => setView('lesson')} />
          </motion.div>
        )}

        {view === 'quiz' && (
          <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
            <QuizView 
              onBack={handleBack} 
              onComplete={() => setView('lesson')} 
            />
          </motion.div>
        )}

        {view === 'games' && (
          <motion.div key="games" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
            <GamesView onBack={() => selectedLesson ? setView('lesson') : setView('home')} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Optional Debug/Nav Bar for prototype */}
      {/* <NavigationBar /> */}
    </div>
  );
}
