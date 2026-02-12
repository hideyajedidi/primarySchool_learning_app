import React from 'react';
import { Book, Unit, Lesson, units, lessons } from '../../data';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronDown, CheckCircle, Circle, Play, ArrowRight } from 'lucide-react';

interface UnitBrowserProps {
  book: Book;
  onSelectLesson: (lesson: Lesson) => void;
  onBack: () => void;
}

export function UnitBrowser({ book, onSelectLesson, onBack }: UnitBrowserProps) {
  const [expandedUnit, setExpandedUnit] = React.useState<string | null>(units[0].id);

  // Filter units for this book (in real app)
  const bookUnits = units.filter(u => u.bookId === book.id);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white px-6 pt-8 pb-6 shadow-sm sticky top-0 z-30">
        <div className="flex items-center justify-between max-w-3xl mx-auto w-full">
          <button 
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          >
            <ArrowRight size={24} />
          </button>
          <h1 className="text-xl font-bold text-slate-800 font-[Tajawal]">{book.title}</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </div>

      <div className="flex-1 px-4 py-6 max-w-3xl mx-auto w-full space-y-4 pb-24">
        {bookUnits.map((unit, index) => {
          const isExpanded = expandedUnit === unit.id;
          const unitLessons = lessons.filter(l => l.unitId === unit.id);
          const completedCount = unitLessons.filter(l => l.isCompleted).length;
          
          return (
            <motion.div 
              key={unit.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl overflow-hidden border-2 transition-all ${isExpanded ? 'border-teal-400 bg-white shadow-lg' : 'border-transparent bg-white shadow-sm'}`}
            >
              <button 
                onClick={() => setExpandedUnit(isExpanded ? null : unit.id)}
                className={`w-full flex items-center p-4 md:p-6 text-right transition-colors ${isExpanded ? 'bg-teal-50' : 'bg-white'}`}
              >
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-2xl md:text-3xl shrink-0 ${unit.color} mr-4`}>
                  {unit.icon}
                </div>
                <div className="flex-1 mr-4">
                  <h3 className="text-lg md:text-xl font-bold text-slate-800 font-[Tajawal]">{unit.title}</h3>
                  <p className="text-slate-500 text-sm md:text-base font-[Tajawal] line-clamp-1">{unit.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="mt-2 w-full max-w-[200px] h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-teal-400 rounded-full" 
                      style={{ width: `${(completedCount / unitLessons.length) * 100}%` }} 
                    />
                  </div>
                </div>
                <ChevronDown 
                  className={`text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                />
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-2 space-y-2">
                      {unitLessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => onSelectLesson(lesson)}
                          className="w-full flex items-center p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${lesson.isCompleted ? 'bg-teal-100 text-teal-600' : 'bg-slate-100 text-slate-400'}`}>
                            {lesson.isCompleted ? <CheckCircle size={20} /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
                          </div>
                          <div className="flex-1 mr-4 text-right">
                            <h4 className="font-bold text-slate-700 group-hover:text-teal-600 transition-colors font-[Tajawal]">{lesson.title}</h4>
                            <span className="text-xs text-slate-400 font-[Tajawal]">
                              {lesson.type === 'reading' ? 'قراءة' : lesson.type === 'song' ? 'نشيد' : 'تمرين'}
                            </span>
                          </div>
                          <ChevronLeft className="text-slate-300 group-hover:text-teal-400 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
