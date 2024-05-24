import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const debounce = (func: Function, wait: number) => {
  let timeout: any;

  return function executedFunction(...args: any) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export function capitalize(str: string): string {
  return str
    .split("")
    .map((letter, idx) => {
      if (idx == 0) return (letter.charCodeAt(0) | 32) ^ 32;
      else return letter.charCodeAt(0) | 32;
    })
    .map((num) => String.fromCharCode(num))
    .join("");
}
