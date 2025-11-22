// lib/fonts.ts
import { Baloo_2, Quicksand } from "next/font/google";
export const baloo2 = Baloo_2({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
    display: 'swap',
});
export const quicksand = Quicksand({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
});
