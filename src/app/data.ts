
export interface Book {
  id: string;
  title: string;
  level: string;
  coverImage: string;
  color: string;
}

export interface Unit {
  id: string;
  bookId: string;
  title: string;
  icon: string;
  description: string;
  color: string;
}

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  type: 'reading' | 'song' | 'exercise';
  isCompleted: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index
}

export const books: Book[] = [
  {
    id: 'b1',
    title: 'أنيسي',
    level: 'سنة ١',
    coverImage: 'https://madrassatii.com/wp-content/uploads/2016/09/arabia-nouveau-1_001.jpg',
    color: 'bg-emerald-100',
  },
  {
    id: 'b2',
    title: 'مساراتي',
    level: 'سنة ٢',
    coverImage: 'https://telmidh.tn/wp-content/uploads/2023/11/%D8%B32.webp',
    color: 'bg-orange-100',
  },
  {
    id: 'b3',
    title: 'ينابيع',
    level: 'سنة ٣',
    coverImage: 'https://www.librairie-hiba.com/wp-content/uploads/2024/07/%D9%8A%D9%86%D8%A7%D8%A8%D9%8A%D8%B9-%D9%83%D8%AA%D8%A7%D8%A8-%D8%A7%D9%84%D9%82%D8%B1%D8%A7%D8%A1%D8%A9-3-%D8%A7%D8%B3%D8%A7%D8%B3%D9%8A-430x430-1.jpg',
    color: 'bg-indigo-100',
  },
];

export const units: Unit[] = [
  // Book 1: Aneesi
  {
    id: 'u1',
    bookId: 'b1',
    title: 'الوحدة الأولى: عائلتي',
    description: 'أتعرف على أفراد عائلتي ومنزلي.',
    icon: '🏠',
    color: 'bg-green-50',
  },
  {
    id: 'u2',
    bookId: 'b1',
    title: 'الوحدة الثانية: مدرستي',
    description: 'أتعرف على صفي ومعلمتي وأصدقائي.',
    icon: '🏫',
    color: 'bg-blue-50',
  },
  // Book 2: Masarati
  {
    id: 'u3',
    bookId: 'b2',
    title: 'الوحدة الأولى: في الحي',
    description: 'الجيران، الحديقة، والسوق.',
    icon: '🏘️',
    color: 'bg-orange-50',
  },
  // Book 3: Yanabee
  {
    id: 'u4',
    bookId: 'b3',
    title: 'الوحدة الأولى: رحلة في بلادي',
    description: 'المدن، الجبال، والبحر.',
    icon: '🌄',
    color: 'bg-indigo-50',
  },
];

export const lessons: Lesson[] = [
  // Unit 1 (Book 1)
  { id: 'l1', unitId: 'u1', title: 'درس ١: هذا أبي', type: 'reading', isCompleted: true },
  { id: 'l2', unitId: 'u1', title: 'درس ٢: هذه أمي', type: 'reading', isCompleted: false },
  { id: 'l3', unitId: 'u1', title: 'نشيد: أسرتي', type: 'song', isCompleted: false },
  { id: 'l4', unitId: 'u1', title: 'تمرين: من في الصورة؟', type: 'exercise', isCompleted: false },
  
  // Unit 3 (Book 2)
  { id: 'l5', unitId: 'u3', title: 'درس ١: جيراننا', type: 'reading', isCompleted: false },
  
  // Unit 4 (Book 3)
  { id: 'l6', unitId: 'u4', title: 'درس ١: الجبل الأخضر', type: 'reading', isCompleted: false },
];

export const lessonContent = {
  title: 'هذا أبي',
  image: 'https://images.unsplash.com/photo-1760434685862-5f2b29748cb9?auto=format&fit=crop&w=1000&q=80',
  paragraphs: [
    "هَذَا أَبِي.",
    "اِسْمُ أَبِي خَالِد.",
    "أَبِي يُحِبُّ الْقِرَاءَةَ.",
    "أَنَا أُحِبُّ أَبِي كَثِيرًا."
  ]
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'مَا اسْمُ الأَبِ؟',
    options: ['خَالِد', 'أَحْمَد', 'سَامِي'],
    correctAnswer: 0,
  },
  {
    id: 'q2',
    question: 'مَاذا يُحِبُّ الأَبُ؟',
    options: ['الرَّسْم', 'الْقِرَاءَة', 'اللَّعِب'],
    correctAnswer: 1,
  },
];

export const vocabList = [
  { word: 'أَب', image: '👨' },
  { word: 'أُم', image: '👩' },
  { word: 'بَيْت', image: '🏠' },
  { word: 'أُسْرَة', image: '👨‍👩‍👧‍👦' },
];
