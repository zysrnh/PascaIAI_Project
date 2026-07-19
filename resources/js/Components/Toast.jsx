import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export default function Toast() {
    const flash = usePage().props.flash || {};
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('info'); // success, error, warning, info

    useEffect(() => {
        if (flash.success) {
            setMessage(flash.success);
            setType('success');
            setVisible(true);
        } else if (flash.error) {
            setMessage(flash.error);
            setType('error');
            setVisible(true);
        } else if (flash.warning) {
            setMessage(flash.warning);
            setType('warning');
            setVisible(true);
        } else if (flash.info) {
            setMessage(flash.info);
            setType('info');
            setVisible(true);
        }
    }, [flash]);

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                setVisible(false);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [visible]);

    const [showAnim, setShowAnim] = useState(false);

    useEffect(() => {
        if (visible) {
            // Slight delay to allow DOM to render before adding translation class
            const animTimer = setTimeout(() => setShowAnim(true), 10);
            return () => clearTimeout(animTimer);
        } else {
            setShowAnim(false);
        }
    }, [visible]);

    if (!visible) return null;

    const styles = {
        success: {
            bg: 'bg-emerald-900',
            border: 'border-emerald-600',
            text: 'text-emerald-50',
            icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
        },
        error: {
            bg: 'bg-red-950',
            border: 'border-red-800',
            text: 'text-red-50',
            icon: <AlertCircle className="w-5 h-5 text-red-400" />,
        },
        warning: {
            bg: 'bg-amber-950',
            border: 'border-amber-800',
            text: 'text-amber-50',
            icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
        },
        info: {
            bg: 'bg-blue-950',
            border: 'border-blue-800',
            text: 'text-blue-50',
            icon: <Info className="w-5 h-5 text-blue-400" />,
        },
    };

    const currentStyle = styles[type] || styles.info;

    return (
        <div className={`fixed top-6 right-6 z-50 transition-all duration-300 ease-out transform ${showAnim ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
            <div className={`${currentStyle.bg} ${currentStyle.border} border shadow-2xl rounded-xl p-4 min-w-[320px] max-w-sm flex items-start gap-4 relative overflow-hidden`}>
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-white/20 to-transparent opacity-50"></div>
                <div className="shrink-0 mt-0.5 relative z-10">
                    {currentStyle.icon}
                </div>
                <div className="flex-1 relative z-10">
                    <p className={`text-sm font-semibold ${currentStyle.text} mb-0.5 capitalize`}>{type}</p>
                    <p className={`text-sm ${currentStyle.text} opacity-90 leading-relaxed`}>{message}</p>
                </div>
                <button 
                    onClick={() => setVisible(false)} 
                    className={`shrink-0 p-1 rounded-md opacity-70 hover:opacity-100 transition-opacity ${currentStyle.text} relative z-10`}
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
