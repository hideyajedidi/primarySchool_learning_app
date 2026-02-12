import React from 'react';
import { quizQuestions } from '../../data';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, ArrowRight, RefreshCcw, Star } from 'lucide-react';

interface QuizViewProps {
  onBack: () => void;
  onComplete: () => void;
}

export function QuizView({ onBack, onComplete }: QuizViewProps) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState<number | null>(null);
  const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null);
  const [score, setScore] = React.useState(0);
  const [showResult, setShowResult] = React.useState(false);

  const currentQuestion = quizQuestions[currentQuestionIdx];

  const handleOptionClick = (index: number) => {
    if (selectedOption !== null) return; // Prevent changing answer

    setSelectedOption(index);
    const correct = index === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);

    // Auto advance after short delay
    setTimeout(() => {
      if (currentQuestionIdx < quizQuestions.length - 1) {
        setCurrentQuestionIdx(curr => curr + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const restart = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-teal-50 p-6 text-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full"
        >
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3].map((star, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <Star 
                  size={48} 
                  className={i < (score / quizQuestions.length) * 3 ? "text-yellow-400 fill-yellow-400" : "text-slate-200"} 
                />
              </motion.div>
            ))}
          </div>
          <h2 className="text-3xl font-bold text-teal-800 mb-2 font-[Tajawal]">أحسنت يا بطل!</h2>
          <p className="text-slate-500 mb-8 font-[Tajawal]">لقد أجبت على {score} من {quizQuestions.length} أسئلة بشكل صحيح</p>
          
          <div className="flex flex-col gap-3">
            <button 
              onClick={onComplete}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl font-bold font-[Tajawal]"
            >
              العودة للدرس
            </button>
            <button 
              onClick={restart}
              className="w-full bg-teal-50 hover:bg-teal-100 text-teal-700 py-3 rounded-xl font-bold font-[Tajawal] flex items-center justify-center gap-2"
            >
              <RefreshCcw size={18} />
              <span>إعادة المحاولة</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-teal-50">
      {/* Progress */}
      <div className="p-6 pb-0 max-w-2xl mx-auto w-full">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-teal-100 text-teal-700">
            <ArrowRight size={24} />
          </button>
          <div className="text-teal-800 font-bold font-[Tajawal]">
            سؤال {currentQuestionIdx + 1} من {quizQuestions.length}
          </div>
          <div className="w-10" />
        </div>
        <div className="h-3 bg-teal-200/50 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-teal-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIdx + 1) / quizQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-2xl mx-auto w-full">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="w-full"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-12 font-[Tajawal] leading-tight">
            {currentQuestion.question}
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedOption === index;
              const isCorrectAnswer = index === currentQuestion.correctAnswer;
              
              let cardStyle = "bg-white border-2 border-transparent hover:border-teal-200";
              if (selectedOption !== null) {
                if (isSelected && isCorrectAnswer) cardStyle = "bg-green-100 border-green-500 text-green-800";
                else if (isSelected && !isCorrectAnswer) cardStyle = "bg-red-100 border-red-500 text-red-800";
                else if (isCorrectAnswer) cardStyle = "bg-green-50 border-green-300 text-green-700"; // Show correct answer
                else cardStyle = "bg-slate-50 opacity-50";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  disabled={selectedOption !== null}
                  className={`relative p-6 rounded-2xl text-xl md:text-2xl font-bold font-[Tajawal] transition-all shadow-sm ${cardStyle}`}
                >
                  <span className="relative z-10">{option}</span>
                  {isSelected && (
                    <div className="absolute left-6 top-1/2 -translate-y-1/2">
                      {isCorrectAnswer ? <Check size={28} /> : <X size={28} />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
