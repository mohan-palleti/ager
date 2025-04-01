import { differenceInDays, differenceInWeeks, differenceInMonths } from 'date-fns';

export const AVERAGE_LIFE_EXPECTANCY = 72; // years
export const DAYS_IN_YEAR = 365;
export const TOTAL_DAYS = AVERAGE_LIFE_EXPECTANCY * DAYS_IN_YEAR;

export const lifeQuotes = [
  "Life is not about the number of breaths you take, but about the moments that take your breath away.",
  "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well.",
  "Life is what happens while you're busy making other plans.",
  "In the end, it's not the years in your life that count. It's the life in your years.",
  "Life is really simple, but we insist on making it complicated.",
  "The best way to predict the future is to create it.",
  "Life is either a daring adventure or nothing at all.",
  "The only way to do great work is to love what you do.",
  "Life is a journey, not a destination.",
  "The purpose of life is to discover your gift. The meaning of life is to give it away.",
];

export function calculateLifeStatsFromAge(age: number) {
  const daysLived = age * DAYS_IN_YEAR;
  const weeksLived = Math.floor(daysLived / 7);
  const monthsLived = age * 12;
  
  const remainingDays = TOTAL_DAYS - daysLived;
  const remainingWeeks = Math.floor(remainingDays / 7);
  const remainingMonths = Math.floor(remainingDays / 30);
  
  const lifePercentage = (daysLived / TOTAL_DAYS) * 100;
  
  return {
    age,
    daysLived,
    weeksLived,
    monthsLived,
    remainingDays,
    remainingWeeks,
    remainingMonths,
    lifePercentage,
  };
}

export function calculateLifeStats(birthDate: Date) {
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const daysLived = differenceInDays(today, birthDate);
  const weeksLived = differenceInWeeks(today, birthDate);
  const monthsLived = differenceInMonths(today, birthDate);
  
  const remainingDays = TOTAL_DAYS - daysLived;
  const remainingWeeks = Math.floor(remainingDays / 7);
  const remainingMonths = Math.floor(remainingDays / 30);
  
  const lifePercentage = (daysLived / TOTAL_DAYS) * 100;
  
  return {
    age,
    daysLived,
    weeksLived,
    monthsLived,
    remainingDays,
    remainingWeeks,
    remainingMonths,
    lifePercentage,
  };
}

export function getRandomQuote() {
  return lifeQuotes[Math.floor(Math.random() * lifeQuotes.length)];
} 