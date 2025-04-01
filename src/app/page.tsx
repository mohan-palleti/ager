'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateLifeStats, calculateLifeStatsFromAge, getRandomQuote, AVERAGE_LIFE_EXPECTANCY } from '@/utils/calculations';
import { useRouter } from 'next/navigation';

interface LifeStats {
  age: number;
  daysLived: number;
  weeksLived: number;
  monthsLived: number;
  remainingDays: number;
  remainingWeeks: number;
  remainingMonths: number;
  lifePercentage: number;
}

interface StoredData {
  inputType: 'date' | 'age';
  birthDate: string;
  age: string;
  stats: LifeStats | null;
  quote: string;
  viewMode: 'days' | 'weeks' | 'months';
}

export default function Home() {
  const router = useRouter();
  const [inputType, setInputType] = useState<'date' | 'age'>('date');
  const [birthDate, setBirthDate] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [stats, setStats] = useState<LifeStats | null>(null);
  const [quote, setQuote] = useState<string>('');
  const [viewMode, setViewMode] = useState<'days' | 'weeks' | 'months'>('days');

  // Load data from localStorage on initial render
  useEffect(() => {
    const storedData = localStorage.getItem('lifeCalculatorData');
    if (storedData) {
      const data: StoredData = JSON.parse(storedData);
      setInputType(data.inputType);
      setBirthDate(data.birthDate);
      setAge(data.age);
      setStats(data.stats);
      setQuote(data.quote);
      setViewMode(data.viewMode);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    const data: StoredData = {
      inputType,
      birthDate,
      age,
      stats,
      quote,
      viewMode,
    };
    localStorage.setItem('lifeCalculatorData', JSON.stringify(data));
  }, [inputType, birthDate, age, stats, quote, viewMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputType === 'date' && !birthDate) return;
    if (inputType === 'age' && !age) return;
    
    let lifeStats: LifeStats;
    
    if (inputType === 'date') {
      const date = new Date(birthDate);
      lifeStats = calculateLifeStats(date);
    } else {
      const ageNum = parseInt(age);
      if (isNaN(ageNum) || ageNum < 0 || ageNum > AVERAGE_LIFE_EXPECTANCY) return;
      lifeStats = calculateLifeStatsFromAge(ageNum);
    }
    
    setStats(lifeStats);
    setQuote(getRandomQuote());
    router.push('/results');
  };

  const handleReset = () => {
    setInputType('date');
    setBirthDate('');
    setAge('');
    setStats(null);
    setQuote('');
    setViewMode('days');
    localStorage.removeItem('lifeCalculatorData');
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
            Ager
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300">
            Discover your life journey and remaining time
          </p>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 italic">
            *Based on average life expectancy of 72 years
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="mb-6">
            <div className="flex justify-center space-x-4 mb-4">
              <button
                type="button"
                onClick={() => setInputType('date')}
                className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                  inputType === 'date'
                    ? 'bg-yellow-500 dark:bg-yellow-400 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                Date of Birth
              </button>
              <button
                type="button"
                onClick={() => setInputType('age')}
                className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                  inputType === 'age'
                    ? 'bg-yellow-500 dark:bg-yellow-400 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                Age
              </button>
            </div>

            <AnimatePresence mode="wait">
              {inputType === 'date' ? (
                <motion.div
                  key="date"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Enter your date of birth
                  </label>
                  <input
                    type="date"
                    id="birthDate"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="age"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Enter your age
                  </label>
                  <input
                    type="number"
                    id="age"
                    min="0"
                    max="72"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-yellow-500 dark:bg-yellow-400 text-white py-2 px-4 rounded-md hover:bg-yellow-600 dark:hover:bg-yellow-500 transition-colors duration-200"
            >
              Calculate
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-200"
            >
              Reset
            </button>
          </div>
        </motion.form>

        <AnimatePresence>
          {stats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 sm:p-6 md:p-8">
                <blockquote className="text-base sm:text-lg md:text-xl italic text-gray-700 dark:text-gray-300 mb-6 text-center">
                  &ldquo;{quote}&rdquo;
                </blockquote>

                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Life Progress</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{Math.round(stats.lifePercentage)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <motion.div
                      className="bg-yellow-500 dark:bg-yellow-400 h-2.5 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${stats.lifePercentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-yellow-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-yellow-900 dark:text-yellow-400 mb-2">Age</h3>
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-600 dark:text-yellow-500">{stats.age} years</p>
                  </div>
                  <div className="bg-yellow-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-yellow-900 dark:text-yellow-400 mb-2">Days Lived</h3>
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-600 dark:text-yellow-500">{formatNumber(stats.daysLived)}</p>
                  </div>
                  <div className="bg-yellow-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-yellow-900 dark:text-yellow-400 mb-2">Remaining</h3>
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-600 dark:text-yellow-500">{formatNumber(stats.remainingDays)}</p>
                  </div>
                </div>

                <div className="flex space-x-4 mb-4">
                  <button
                    onClick={() => setViewMode('days')}
                    className={`flex-1 py-2 px-4 rounded-md transition-colors duration-200 ${
                      viewMode === 'days'
                        ? 'bg-yellow-500 dark:bg-yellow-400 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    Days
                  </button>
                  <button
                    onClick={() => setViewMode('weeks')}
                    className={`flex-1 py-2 px-4 rounded-md transition-colors duration-200 ${
                      viewMode === 'weeks'
                        ? 'bg-yellow-500 dark:bg-yellow-400 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    Weeks
                  </button>
                  <button
                    onClick={() => setViewMode('months')}
                    className={`flex-1 py-2 px-4 rounded-md transition-colors duration-200 ${
                      viewMode === 'months'
                        ? 'bg-yellow-500 dark:bg-yellow-400 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    Months
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
