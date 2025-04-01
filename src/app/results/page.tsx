'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { LifeStats } from '@/types';

export default function ResultsPage() {
  const router = useRouter();
  const [stats, setStats] = useState<LifeStats | null>(null);
  const [quote, setQuote] = useState<string>('');

  useEffect(() => {
    const storedData = localStorage.getItem('lifeCalculatorData');
    if (storedData) {
      const data = JSON.parse(storedData);
      if (data.stats) {
        setStats(data.stats);
        setQuote(data.quote);
      } else {
        router.push('/');
      }
    } else {
      router.push('/');
    }
  }, [router]);

  if (!stats) return null;

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
            Your Life Remaining
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300">
            Here is what your life looks like in numbers
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6 sm:mb-8"
          >
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-900 dark:text-yellow-400 mb-2">
              You have
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-600 dark:text-yellow-500">
              {formatNumber(stats.remainingDays)} days
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-900 dark:text-yellow-400">
              left to live
            </p>
          </motion.div>

          <blockquote className="text-base sm:text-lg md:text-xl italic text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 text-center">
            &ldquo;{quote}&rdquo;
          </blockquote>

          <div className="mb-6 sm:mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm sm:text-base md:text-lg font-medium text-gray-700 dark:text-gray-300">Life Progress</span>
              <span className="text-sm sm:text-base md:text-lg font-medium text-gray-700 dark:text-gray-300">{Math.round(stats.lifePercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3">
              <motion.div
                className="bg-yellow-500 dark:bg-yellow-400 h-2 sm:h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${stats.lifePercentage}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-yellow-50 dark:bg-gray-700 p-4 sm:p-6 rounded-lg transform hover:scale-105 transition-transform duration-200"
            >
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-yellow-900 dark:text-yellow-400 mb-2">Age</h3>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-600 dark:text-yellow-500">{stats.age} years</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-yellow-50 dark:bg-gray-700 p-4 sm:p-6 rounded-lg transform hover:scale-105 transition-transform duration-200"
            >
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-yellow-900 dark:text-yellow-400 mb-2">Days Lived</h3>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-600 dark:text-yellow-500">{formatNumber(stats.daysLived)}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-yellow-50 dark:bg-gray-700 p-4 sm:p-6 rounded-lg transform hover:scale-105 transition-transform duration-200"
            >
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-yellow-900 dark:text-yellow-400 mb-2">Weeks Lived</h3>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-600 dark:text-yellow-500">{formatNumber(stats.weeksLived)}</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-yellow-50 dark:bg-gray-700 p-4 sm:p-6 rounded-lg transform hover:scale-105 transition-transform duration-200"
            >
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-yellow-900 dark:text-yellow-400 mb-2">Months Lived</h3>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-600 dark:text-yellow-500">{formatNumber(stats.monthsLived)}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="bg-yellow-50 dark:bg-gray-700 p-4 sm:p-6 rounded-lg transform hover:scale-105 transition-transform duration-200"
            >
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-yellow-900 dark:text-yellow-400 mb-2">Remaining Weeks</h3>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-600 dark:text-yellow-500">{formatNumber(stats.remainingWeeks)}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="bg-yellow-50 dark:bg-gray-700 p-4 sm:p-6 rounded-lg transform hover:scale-105 transition-transform duration-200"
            >
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-yellow-900 dark:text-yellow-400 mb-2">Remaining Months</h3>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-600 dark:text-yellow-500">{formatNumber(stats.remainingMonths)}</p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-center"
        >
          <button
            onClick={() => router.push('/')}
            className="bg-yellow-500 dark:bg-yellow-400 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-md hover:bg-yellow-600 dark:hover:bg-yellow-500 transition-colors duration-200 text-base sm:text-lg"
          >
            Calculate Again
          </button>
        </motion.div>
      </div>
    </main>
  );
} 