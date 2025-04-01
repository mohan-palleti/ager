'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateLifeStats, calculateLifeStatsFromAge, getRandomQuote, AVERAGE_LIFE_EXPECTANCY } from '@/utils/calculations';

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
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Ager
          </h1>
          <p className="text-xl text-gray-600">
            Discover your life journey and remaining time
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-xl p-6 mb-8"
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
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Date of Birth
              </button>
              <button
                type="button"
                onClick={() => setInputType('age')}
                className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                  inputType === 'age'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
                  <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Enter your date of birth
                  </label>
                  <input
                    type="date"
                    id="birthDate"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                    Enter your age
                  </label>
                  <input
                    type="number"
                    id="age"
                    min="0"
                    max="72"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors duration-200"
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
              <div className="bg-white rounded-lg shadow-xl p-6">
                <blockquote className="text-xl italic text-gray-700 mb-6">
                  &ldquo;{quote}&rdquo;
                </blockquote>

                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Life Progress</span>
                    <span className="text-sm font-medium text-gray-700">{Math.round(stats.lifePercentage)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <motion.div
                      className="bg-purple-600 h-2.5 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${stats.lifePercentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-900">Age</h3>
                    <p className="text-2xl font-bold text-purple-600">{stats.age} years</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-900">Days Lived</h3>
                    <p className="text-2xl font-bold text-purple-600">{formatNumber(stats.daysLived)}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-900">Remaining</h3>
                    <p className="text-2xl font-bold text-purple-600">{formatNumber(stats.remainingDays)}</p>
                  </div>
                </div>

                <div className="flex space-x-4 mb-4">
                  <button
                    onClick={() => setViewMode('days')}
                    className={`px-4 py-2 rounded-md ${
                      viewMode === 'days'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    Days
                  </button>
                  <button
                    onClick={() => setViewMode('weeks')}
                    className={`px-4 py-2 rounded-md ${
                      viewMode === 'weeks'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    Weeks
                  </button>
                  <button
                    onClick={() => setViewMode('months')}
                    className={`px-4 py-2 rounded-md ${
                      viewMode === 'months'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    Months
                  </button>
                </div>

                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-900">
                    {viewMode === 'days' && `${formatNumber(stats.remainingDays)} days remaining`}
                    {viewMode === 'weeks' && `${formatNumber(stats.remainingWeeks)} weeks remaining`}
                    {viewMode === 'months' && `${formatNumber(stats.remainingMonths)} months remaining`}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
