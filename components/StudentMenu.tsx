import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { Menu, X, History, BarChart3, FileText, Trophy, Gamepad2, CreditCard, Crown, Mail, LogOut, Layout, BrainCircuit, Volume2, VolumeX } from 'lucide-react';
import { storage } from '../utils/storage';

interface StudentMenuProps {
    user: User;
    onNavigate: (tab: any) => void;
    onLogout: () => void;
    unreadCount: number;
    isAdmin: boolean;
    onAdminSwitch: () => void;
}

export const StudentMenu: React.FC<StudentMenuProps> = ({ 
    user, 
    onNavigate, 
    onLogout, 
    unreadCount,
    isAdmin,
    onAdminSwitch
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);

    useEffect(() => {
        storage.getItem('nst_voice_enabled').then(v => setIsVoiceEnabled(v !== 'false'));
    }, []);

    const toggleVoice = () => {
        const newState = !isVoiceEnabled;
        setIsVoiceEnabled(newState);
        storage.setItem('nst_voice_enabled', String(newState));
        // You might want to update VoiceService configuration here if it reads from storage constantly or listen to it.
        // For now, assume components check storage or we reload.
    };

    const menuItems = [
        { id: 'HISTORY', label: 'History', icon: History, color: 'text-blue-500' },
        { id: 'ANALYTICS', label: 'Analytics', icon: BarChart3, color: 'text-purple-500' },
        { id: 'MARKSHEET', label: 'Marksheet', icon: FileText, color: 'text-green-500', action: () => onNavigate('MARKSHEET') }, // Special case handled in parent?
        { id: 'LEADERBOARD', label: 'Rank List', icon: Trophy, color: 'text-yellow-500' },
        { id: 'AI_HISTORY', label: 'AI Chat History', icon: BrainCircuit, color: 'text-indigo-500' },
        { id: 'GAME', label: 'Spin & Win', icon: Gamepad2, color: 'text-red-500' },
        { id: 'SUB_HISTORY', label: 'My Plan', icon: CreditCard, color: 'text-slate-500' },
        { id: 'STORE', label: 'Premium Store', icon: Crown, color: 'text-amber-500' },
        { id: 'INBOX', label: 'Inbox', icon: Mail, color: 'text-pink-500', badge: unreadCount }
    ];

    return (
        <>
            {/* FAB */}
            <button 
                onClick={() => setIsOpen(true)}
                className="fixed bottom-24 right-4 w-14 h-14 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center z-40 active:scale-90 transition-transform"
            >
                <Menu size={24} />
                {unreadCount > 0 && <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>}
            </button>

            {/* DRAWER */}
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex justify-end">
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
                    
                    <div className="w-80 bg-white h-full shadow-2xl relative flex flex-col animate-in slide-in-from-right duration-300">
                        <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                            <div>
                                <h3 className="font-black text-slate-800 text-lg">Menu</h3>
                                <p className="text-xs text-slate-500">Quick Access</p>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-2 bg-white rounded-full shadow-sm hover:bg-slate-100">
                                <X size={20} className="text-slate-400" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-2">
                            {isAdmin && (
                                <button 
                                    onClick={() => { onAdminSwitch(); setIsOpen(false); }}
                                    className="w-full p-4 bg-slate-900 text-white rounded-xl flex items-center gap-4 shadow-lg mb-4 hover:scale-[1.02] transition-transform"
                                >
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                        <Layout size={20} className="text-yellow-400" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-sm">Admin Panel</p>
                                        <p className="text-[10px] opacity-60">Switch to Admin Mode</p>
                                    </div>
                                </button>
                            )}

                            {menuItems.map(item => (
                                <button 
                                    key={item.id}
                                    onClick={() => { 
                                        if (item.action) item.action();
                                        else onNavigate(item.id);
                                        setIsOpen(false);
                                    }}
                                    className="w-full p-3 rounded-xl hover:bg-slate-50 flex items-center gap-4 transition-colors group"
                                >
                                    <div className={`w-10 h-10 rounded-full bg-slate-50 group-hover:bg-white flex items-center justify-center border border-slate-100 group-hover:shadow-sm ${item.color}`}>
                                        <item.icon size={20} />
                                    </div>
                                    <span className="font-bold text-slate-700 text-sm flex-1 text-left">{item.label}</span>
                                    {item.badge ? (
                                        <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{item.badge}</span>
                                    ) : null}
                                </button>
                            ))}
                        </div>

                        <div className="p-4 border-t border-slate-100 space-y-3">
                            <button 
                                onClick={toggleVoice}
                                className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors ${isVoiceEnabled ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'}`}
                            >
                                {isVoiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                                {isVoiceEnabled ? 'Voice Guide: ON' : 'Voice Guide: OFF'}
                            </button>

                            <button 
                                onClick={onLogout}
                                className="w-full py-3 bg-red-50 text-red-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
                            >
                                <LogOut size={18} /> Logout
                            </button>
                            <p className="text-center text-[10px] text-slate-400 mt-4 font-bold tracking-widest uppercase">
                                v{localStorage.getItem('nst_app_version') || '1.0.0'}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
