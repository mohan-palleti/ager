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
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Your Life Remaining
          </h1>
          <p className="text-xl text-gray-600">
            Here is what your life looks like in numbers
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg shadow-xl p-8 mb-8"
        >
          <blockquote className="text-2xl italic text-gray-700 mb-8 text-center">
            &ldquo;{quote}&rdquo;
          </blockquote>

          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-lg font-medium text-gray-700">Life Progress</span>
              <span className="text-lg font-medium text-gray-700">{Math.round(stats.lifePercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                className="bg-purple-600 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${stats.lifePercentage}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-purple-50 p-6 rounded-lg transform hover:scale-105 transition-transform duration-200"
            >
              <h3 className="text-xl font-semibold text-purple-900 mb-2">Age</h3>
              <p className="text-3xl font-bold text-purple-600">{stats.age} years</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-purple-50 p-6 rounded-lg transform hover:scale-105 transition-transform duration-200"
            >
              <h3 className="text-xl font-semibold text-purple-900 mb-2">Days Lived</h3>
              <p className="text-3xl font-bold text-purple-600">{formatNumber(stats.daysLived)}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-purple-50 p-6 rounded-lg transform hover:scale-105 transition-transform duration-200"
            >
              <h3 className="text-xl font-semibold text-purple-900 mb-2">Remaining Days</h3>
              <p className="text-3xl font-bold text-purple-600">{formatNumber(stats.remainingDays)}</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-purple-50 p-6 rounded-lg transform hover:scale-105 transition-transform duration-200"
            >
              <h3 className="text-xl font-semibold text-purple-900 mb-2">Weeks Lived</h3>
              <p className="text-3xl font-bold text-purple-600">{formatNumber(stats.weeksLived)}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="bg-purple-50 p-6 rounded-lg transform hover:scale-105 transition-transform duration-200"
            >
              <h3 className="text-xl font-semibold text-purple-900 mb-2">Months Lived</h3>
              <p className="text-3xl font-bold text-purple-600">{formatNumber(stats.monthsLived)}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="bg-purple-50 p-6 rounded-lg transform hover:scale-105 transition-transform duration-200"
            >
              <h3 className="text-xl font-semibold text-purple-900 mb-2">Remaining Months</h3>
              <p className="text-3xl font-bold text-purple-600">{formatNumber(stats.remainingMonths)}</p>
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
            className="bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700 transition-colors duration-200 text-lg"
          >
            Calculate Again
          </button>
        </motion.div>
      </div>
    </main>
  );
} 