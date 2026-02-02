import React from 'react';
import { User, SystemSettings } from '../types';
import { BannerCarousel } from './BannerCarousel';
import { Sparkles, Crown, Megaphone, ArrowRight, Lightbulb } from 'lucide-react';

interface StudentExploreProps {
    user: User;
    settings: SystemSettings | undefined;
    onTabChange: (tab: any) => void;
    onStartTour: () => void;
    onRequestContent: () => void;
}

export const StudentExplore: React.FC<StudentExploreProps> = ({ 
    user, 
    settings, 
    onTabChange, 
    onStartTour,
    onRequestContent
}) => {
    
    return (
        <div className="space-y-6 py-6 border-t border-slate-100 bg-slate-50/50 -mx-4 px-4">
            <div className="flex items-center justify-between px-2 mb-2">
                <h3 className="font-black text-slate-400 text-xs uppercase tracking-widest">Explore More</h3>
            </div>

            {/* AI TOUR (GLOWING) */}
            <button 
                onClick={onStartTour}
                className="w-full bg-slate-900 rounded-2xl p-4 flex items-center justify-between shadow-lg shadow-blue-900/20 relative overflow-hidden group border border-slate-800"
            >
                <div className="absolute inset-0 bg-blue-600/10 animate-pulse"></div>
                <div className="flex items-center gap-4 relative z-10">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-600/50">
                        <Lightbulb size={20} />
                    </div>
                    <div className="text-left">
                        <h4 className="font-black text-white text-sm">App Tour</h4>
                        <p className="text-slate-400 text-[10px]">Learn how to use features</p>
                    </div>
                </div>
                <ArrowRight size={16} className="text-slate-500 relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* BANNERS */}
            <div className="overflow-hidden rounded-2xl shadow-sm border border-slate-200 bg-white">
                 <BannerCarousel>
                     {/* Dynamic Banners can be injected here or passed as children if needed, 
                         but for now we use static or settings based ones similar to old dashboard */}
                     <div onClick={() => onTabChange('STORE')} className="h-40 bg-gradient-to-r from-purple-600 to-pink-600 p-6 flex flex-col justify-center text-white relative overflow-hidden">
                         <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-1/4 translate-y-1/4">
                             <Crown size={120} />
                         </div>
                         <span className="bg-white/20 w-fit px-2 py-0.5 rounded text-[10px] font-bold mb-2 backdrop-blur-sm">PREMIUM</span>
                         <h3 className="text-xl font-black leading-tight mb-1">Upgrade Plan</h3>
                         <p className="text-xs opacity-90 mb-3">Unlock all premium features</p>
                     </div>
                     
                     <div onClick={() => onTabChange('GAME')} className="h-40 bg-gradient-to-r from-orange-500 to-red-500 p-6 flex flex-col justify-center text-white relative overflow-hidden">
                         <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-1/4 translate-y-1/4">
                             <Sparkles size={120} />
                         </div>
                         <h3 className="text-xl font-black leading-tight mb-1">Spin & Win</h3>
                         <p className="text-xs opacity-90 mb-3">Get free credits daily</p>
                     </div>
                 </BannerCarousel>
            </div>

            {/* QUICK LINKS */}
            <div className="grid grid-cols-2 gap-3">
                <button onClick={() => onTabChange('STORE')} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3 hover:border-yellow-400 transition-colors">
                    <div className="w-8 h-8 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center">
                        <Crown size={16} />
                    </div>
                    <div className="text-left">
                        <p className="font-bold text-slate-800 text-xs">Store</p>
                        <p className="text-[10px] text-slate-400">Buy Credits</p>
                    </div>
                </button>

                <button onClick={onRequestContent} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3 hover:border-pink-400 transition-colors">
                    <div className="w-8 h-8 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center">
                        <Megaphone size={16} />
                    </div>
                    <div className="text-left">
                        <p className="font-bold text-slate-800 text-xs">Request</p>
                        <p className="text-[10px] text-slate-400">Ask for content</p>
                    </div>
                </button>
            </div>
        </div>
    );
};
