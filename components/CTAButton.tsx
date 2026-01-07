import React from 'react';
import { Sparkles } from 'lucide-react';

interface CTAButtonProps {
  text: string;
  subtext: string;
  onClick?: () => void;
}

const CTAButton: React.FC<CTAButtonProps> = ({ text, subtext, onClick }) => {
  return (
    <div className="flex flex-col items-center justify-center my-8 w-full">
      <button
        onClick={onClick}
        className="group relative w-full max-w-md bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold py-5 px-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-pink-500/30 transform transition-all hover:-translate-y-1 active:translate-y-0 text-xl md:text-2xl border-b-4 border-pink-800"
      >
        <span className="flex items-center justify-center gap-2">
           {text}
        </span>
      </button>
      <p className="mt-3 text-pink-700 font-medium text-sm md:text-base flex items-center gap-2 animate-pulse">
        <Sparkles size={16} /> {subtext} <Sparkles size={16} />
      </p>
    </div>
  );
};

export default CTAButton;