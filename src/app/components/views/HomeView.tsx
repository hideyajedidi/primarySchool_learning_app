import React, { useState } from 'react';
import { Book, books } from '../../data';
import { motion, AnimatePresence } from 'motion/react';
import { Play, BookOpen, Star, GraduationCap } from 'lucide-react';

interface HomeViewProps {
  onSelectBook: (book: Book) => void;
}

const grades = [
  { id: 'all', label: 'الكل' },
  { id: 'سنة ١', label: 'السنة الأولى' },
  { id: 'سنة ٢', label: 'السنة الثانية' },
  { id: 'سنة ٣', label: 'السنة الثالثة' },
];

export function HomeView({ onSelectBook }: HomeViewProps) {
  const [selectedGrade, setSelectedGrade] = useState('all');

  const filteredBooks = selectedGrade === 'all' 
    ? books 
    : books.filter(book => book.level === selectedGrade);

  return (
    <div className="flex flex-col min-h-screen bg-orange-50/50 pb-24">
      {/* Hero Section */}
      <div className="relative w-full h-72 md:h-80 bg-teal-500 rounded-b-[3rem] overflow-hidden shadow-lg mb-8">
        <img 
          src="https://images.unsplash.com/photo-1633012252204-fa9f5873abf7?auto=format&fit=crop&w=1200&q=80" 
          alt="Kids Learning" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-600/90 to-transparent" />
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pt-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/20 backdrop-blur-sm p-3 rounded-full mb-4 ring-4 ring-white/10"
          >
            <GraduationCap size={48} className="text-white" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-md font-[Tajawal]"
          >
            مَكْتَبَتِي الْمَدْرَسِيَّة
          </motion.h1>
          <p className="text-xl text-teal-50 font-medium opacity-90 font-[Tajawal]">
            اخْتَرْ كِتَابَكَ وَانْطَلِقْ فِي رِحْلَةِ الْعِلْم
          </p>
        </div>
      </div>

      {/* Grade Selector */}
      <div className="px-4 md:px-8 max-w-5xl mx-auto w-full mb-8 z-20">
        <div className="flex flex-wrap justify-center gap-3 bg-white/60 backdrop-blur-md p-2 rounded-2xl shadow-sm border border-orange-100">
          {grades.map((grade) => (
            <button
              key={grade.id}
              onClick={() => setSelectedGrade(grade.id)}
              className={`
                px-6 py-2 rounded-xl font-bold text-lg transition-all duration-300 font-[Tajawal]
                ${selectedGrade === grade.id 
                  ? 'bg-orange-400 text-white shadow-md scale-105' 
                  : 'bg-white text-slate-500 hover:bg-orange-50 hover:text-orange-400'
                }
              `}
            >
              {grade.label}
            </button>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      <div className="flex-1 px-4 md:px-8 max-w-5xl mx-auto w-full">
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => onSelectBook(book)}
                  className="group cursor-pointer bg-white rounded-3xl p-4 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 flex flex-row items-center gap-4 overflow-hidden border-2 border-transparent hover:border-teal-400"
                >
                  <div className={`w-24 h-32 md:w-32 md:h-40 rounded-xl overflow-hidden shadow-md shrink-0 ${book.color} relative`}>
                    <img 
                      src={book.coverImage} 
                      alt={book.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  </div>
                  <div className="flex flex-col flex-1 items-start text-right h-full justify-between py-1">
                    <div>
                      <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-bold mb-2">
                         {book.level}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-1 font-[Tajawal]">{book.title}</h3>
                      <p className="text-slate-500 text-sm font-[Tajawal]">اضغط للبدء</p>
                    </div>
                    <div className="flex gap-2 mt-3 w-full">
                      <button className="flex-1 bg-orange-400 hover:bg-orange-500 text-white rounded-full p-2 text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm">
                        <Play size={16} fill="currentColor" />
                        <span>ابدأ</span>
                      </button>
                      <button className="bg-teal-50 text-teal-600 hover:bg-teal-100 rounded-full p-2 transition-colors">
                        <BookOpen size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12 text-slate-400"
              >
                <p className="text-xl font-[Tajawal]">لا توجد كتب متاحة لهذا المستوى حالياً</p>
              </motion.div>
            )}
          </div>
        </AnimatePresence>
      </div>
      
      {/* Decorative */}
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}
