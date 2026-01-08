import { PART_1 } from './seeds/part1';
import { PART_2 } from './seeds/part2';

export const CATEGORIES = [
    "Sport",
    "Musikk",
    "Film og TV",
    "Historie",
    "Geografi",
    "Vitenskap",
    "Lett blanding",
    "Mat og drikke"
];

// Combine all parts
export const INITIAL_QUESTIONS = [
    ...PART_1,
    ...PART_2
];
