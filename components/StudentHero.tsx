import React from 'react';
import { User, SystemSettings } from '../types';
import { Play, Zap, BrainCircuit, Timer, Trophy, ArrowRight } from 'lucide-react';

interface StudentHeroProps {
    user: User;
    settings: SystemSettings | undefined;
    dailyStudySeconds: number;
    onStartTimer: (duration: number) => void;
    onAiTutor: () => void;
    onContinueLearning: () => void;
    onDailyChallenge: () => void;
}

export const StudentHero: React.FC<StudentHeroProps> = ({ 
    user, 
    settings, 
    dailyStudySeconds, 
    onStartTimer, 
    onAiTutor, 
    onContinueLearning, 
    onDailyChallenge 
}) => {
    
    const formatTime = (secs: number) => {
        const h = Math.floor(secs / 3600);
        const m = Math.floor((secs % 3600) / 60);
        return `${h}h ${m}m`;
    };

    // Calculate Progress (Example: Target 3 hours = 10800s)
    const target = 10800;
    const progress = Math.min((dailyStudySeconds / target) * 100, 100);
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="space-y-6 animate-in slide-in-from-top-4 duration-500">
            {/* 1. STUDY TIMER & PROGRESS */}
            <div className="bg-slate-900 rounded-[32px] p-6 text-white shadow-2xl relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-600/20 rounded-full blur-3xl -ml-10 -mb-10"></div>

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-2xl font-black mb-1">Focus Mode</h2>
                            <p className="text-slate-400 text-xs font-medium">Set your daily goal</p>
                        </div>
                        
                        {/* LIVE PROGRESS RING */}
                        <div className="relative w-16 h-16 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="32" cy="32" r={radius} stroke="#1e293b" strokeWidth="6" fill="transparent" />
                                <circle 
                                    cx="32" cy="32" r={radius} 
                                    stroke={progress >= 100 ? '#22c55e' : '#3b82f6'} 
                                    strokeWidth="6" 
                                    fill="transparent" 
                                    strokeDasharray={circumference} 
                                    strokeDashoffset={offset} 
                                    strokeLinecap="round"
                                    className="transition-all duration-1000 ease-out"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <span className="text-[10px] font-black">{Math.round(progress)}%</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 mb-4">
                        {[15, 30, 60].map(min => (
                            <button 
                                key={min}
                                onClick={() => onStartTimer(min * 60)}
                                className="flex-1 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl py-3 text-xs font-bold transition-all active:scale-95"
                            >
                                {min}m
                            </button>
                        ))}
                        <button onClick={() => onStartTimer(0)} className="px-4 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-bold shadow-lg shadow-blue-900/50 active:scale-95 transition-all flex items-center justify-center">
                            <Play size={16} fill="currentColor" />
                        </button>
                    </div>
                    
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium bg-black/20 p-2 rounded-lg w-fit">
                        <Timer size={12} />
                        Studied Today: <span className="text-white font-bold">{formatTime(dailyStudySeconds)}</span>
                    </div>
                </div>
            </div>

            {/* 2. AI PERSONAL TUTOR CARD */}
            <button 
                onClick={onAiTutor}
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 rounded-[32px] p-1 shadow-xl hover:scale-[1.02] transition-transform active:scale-95 group relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                <div className="bg-white/10 backdrop-blur-sm rounded-[28px] p-6 flex items-center justify-between relative z-10 h-32">
                    <div className="text-left">
                        <div className="bg-white/20 w-fit px-3 py-1 rounded-full text-[10px] font-black text-white mb-2 flex items-center gap-1">
                            <BrainCircuit size={12} /> AI TUTOR
                        </div>
                        <h3 className="text-2xl font-black text-white leading-none mb-1">Ask anything</h3>
                        <p className="text-indigo-100 text-xs">I will teach you instantly.</p>
                    </div>
                    <div className="w-16 h-16 bg-white text-indigo-600 rounded-full flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                        <BrainCircuit size={32} />
                    </div>
                </div>
            </button>

            {/* 3. QUICK ACTIONS GRID */}
            <div className="grid grid-cols-2 gap-4">
                <button 
                    onClick={onContinueLearning}
                    className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 hover:border-blue-200 transition-all text-left group"
                >
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Play size={20} fill="currentColor" />
                    </div>
                    <h4 className="font-black text-slate-800 text-sm">Continue</h4>
                    <p className="text-[10px] text-slate-500">Resume learning</p>
                </button>

                <button 
                    onClick={onDailyChallenge}
                    className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 hover:border-yellow-200 transition-all text-left group"
                >
                    <div className="w-10 h-10 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Zap size={20} fill="currentColor" />
                    </div>
                    <h4 className="font-black text-slate-800 text-sm">Challenge</h4>
                    <p className="text-[10px] text-slate-500">Daily Quiz</p>
                </button>
            </div>
        </div>
    );
};
