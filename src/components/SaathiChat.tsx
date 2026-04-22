"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  steps?: string[];
  title?: string;
}

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

export default function SaathiChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Greetings citizen. I am Saathi. Jarvis Mode is active—speak naturally and I will assist you with real-time electoral intelligence." }
  ]);
  const [input, setInput] = useState("");
  const [isJarvisMode, setIsJarvisMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [liveTranscription, setLiveTranscription] = useState("");
  
  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, liveTranscription]);

  // Handle Voice Loading (Browser Sync)
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const handleVoicesChanged = () => {
        window.speechSynthesis.getVoices();
      };
      window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
      // Pre-fetch
      window.speechSynthesis.getVoices();
      return () => window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
    }
  }, []);

  // Handle Speech Recognition Setup
  useEffect(() => {
    if (typeof window !== "undefined" && window.webkitSpeechRecognition) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = language === "en" ? "en-IN" : "hi-IN";

      recognition.onresult = (event: any) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        setLiveTranscription(interimTranscript || finalTranscript);

        // If Jarvis mode is on and we have a final result, auto-send after a brief pause
        if (finalTranscript && isJarvisMode) {
          handleAutoSubmit(finalTranscript);
        }
      };

      recognition.onerror = (event: any) => {
        console.error("Speech Rec Error:", event.error);
        if (event.error === "no-speech") setIsListening(false);
      };

      recognition.onend = () => {
        if (isJarvisMode) recognition.start(); // Keep listening in Jarvis mode
        else setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [language, isJarvisMode]);

  const handleAutoSubmit = (text: string) => {
    setLiveTranscription("");
    sendMessage(text);
  };

  const toggleMic = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      currentAudioRef.current?.pause(); // Stop AI if user starts new speech
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const toggleJarvis = () => {
    const newState = !isJarvisMode;
    setIsJarvisMode(newState);
    if (newState) {
       if (!isListening) toggleMic();
    } else {
       recognitionRef.current?.stop();
       setIsListening(false);
    }
  }

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    // Stop any playing AI audio
    currentAudioRef.current?.pause();

    const userMsg: Message = { role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text, language, voiceMode: true }),
      });

      if (!res.ok) {
        const errData = await res.json();
        if (errData.fallback) {
           const fallbackMsg: Message = {
             role: 'assistant',
             content: "The Consulate's Intelligence Mesh is currently in 'Safe Mode' due to a configuration gap. However, I can still assist you with general electoral guidelines. Please verify your Gemini API key in the platform settings.",
           };
           setMessages(prev => [...prev, fallbackMsg]);
           await playSpeech(fallbackMsg.content);
           setIsLoading(false);
           return;
        }
        throw new Error(errData.diagnostic || "Intelligence synchronization failed.");
      }

      const data = await res.json();

      const aiMsg: Message = { 
        role: "assistant", 
        content: data.summary,
        title: data.title,
        steps: data.steps 
      };
      setMessages(prev => [...prev, aiMsg]);

      // Multimodal Experience Bridge: Dispatch intents to the Consulate UI
      if (data.intents && Array.isArray(data.intents)) {
        data.intents.forEach((intent: string) => {
           window.dispatchEvent(new CustomEvent("consulate-command", { detail: { intent } }));
        });
      }

      await playSpeech(data.summary);
    } catch (err) {
      console.error("AI chat failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const playSpeech = async (text: string) => {
    try {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        // Stop any current synthesis
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        
        // Select best voice for the chosen language
        const voices = window.speechSynthesis.getVoices();
        const langCode = language === "en" ? "en-IN" : "hi-IN";
        
        // Strategy: Look for premium voices (Google, Microsoft, Apple) in the right language
        const bestVoice = voices.find(v => v.lang.startsWith(language) && (v.name.includes('Google') || v.name.includes('Premium'))) 
                       || voices.find(v => v.lang.startsWith(language))
                       || voices[0];

        if (bestVoice) {
          utterance.voice = bestVoice;
        }

        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.lang = langCode;

        // Sync with Recognition in Jarvis Mode
        if (isJarvisMode) recognitionRef.current?.stop();
        
        utterance.onend = () => {
          if (isJarvisMode) recognitionRef.current?.start();
        };

        window.speechSynthesis.speak(utterance);
      } else {
        // Fallback to legacy server-side TTS (legacy path)
        const res = await fetch("/api/speech", {
          method: "POST",
          body: JSON.stringify({ type: "tts", text, languageCode: language === "en" ? "en-IN" : "hi-IN" }),
        });
        const { audio } = await res.json();
        if (audio) {
          const audioObj = new Audio(`data:audio/mp3;base64,${audio}`);
          currentAudioRef.current = audioObj;
          if (isJarvisMode) recognitionRef.current?.stop();
          audioObj.onended = () => { if (isJarvisMode) recognitionRef.current?.start(); };
          audioObj.play();
        }
      }
    } catch (err) {
      console.error("Playback failed:", err);
    }
  };

  return (
    <div className="flex flex-col h-full relative overflow-hidden bg-surface-container-low/30 rounded-[2.5rem] border border-outline-variant/10 shadow-2xl">
      
      {/* JARVIS Status Header */}
      <div className="flex items-center justify-between p-6 border-b border-outline-variant/10 bg-surface/50 backdrop-blur-2xl relative z-10">
        <div className="flex items-center gap-4">
          <motion.div 
            animate={isListening ? { scale: [1, 1.2, 1], rotate: [0, 90, 0] } : {}}
            transition={{ repeat: Infinity, duration: 2 }}
            className={`w-10 h-10 rounded-xl flex items-center justify-center relative overflow-hidden ${isJarvisMode ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-primary'}`}
          >
             <span className="material-symbols-outlined text-xl">{isJarvisMode ? 'psychology' : 'smart_toy'}</span>
             {isLoading && <span className="absolute inset-0 border-2 border-primary/40 border-t-transparent animate-spin rounded-xl" />}
          </motion.div>
          <div>
             <h3 className="font-headline font-black text-on-surface tracking-tight">Saathi {isJarvisMode ? 'Jarvis Edition' : 'Virtual Assistant'}</h3>
             <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">Digital Consulate Liaison</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
           <button 
             onClick={toggleJarvis}
             className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${isJarvisMode ? 'bg-secondary text-on-secondary shadow-lg shadow-secondary/30' : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'}`}
           >
              <span className={`w-2 h-2 rounded-full ${isJarvisMode ? 'bg-white animate-pulse' : 'bg-on-surface-variant'}`} />
              Jarvis Mode
           </button>
           <div className="flex bg-surface-container-high rounded-xl p-1 shadow-inner">
             {["en", "hi"].map(l => (
               <button 
                 key={l}
                 onClick={() => setLanguage(l as any)}
                 className={`px-4 py-1.5 text-[10px] font-black rounded-lg transition-all ${language === l ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
               >
                 {l === 'en' ? 'ENGLISH' : 'हिन्दी'}
               </button>
             ))}
           </div>
        </div>
      </div>

      {/* Conversation Thread */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 flex flex-col gap-8 scrollbar-hide">
        <AnimatePresence mode="popLayout">
          {messages.map((msg, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex flex-col gap-3 ${msg.role === "user" ? "items-end" : "items-start"}`}
            >
              <div className={`p-6 rounded-3xl max-w-[85%] shadow-xl transition-all duration-500 ${
                msg.role === "user" 
                  ? "bg-primary text-on-primary rounded-tr-none shadow-primary/10" 
                  : "bg-surface-container-highest text-on-surface rounded-tl-none border border-outline-variant/10 shadow-black/5"
              }`}>
                 {msg.title && <h4 className="font-headline font-black text-sm mb-3 tracking-tight text-primary">{msg.title}</h4>}
                 <p className="text-sm font-body leading-relaxed">{msg.content}</p>
                 {msg.steps && msg.steps.length > 0 && (
                   <div className="mt-6 space-y-3 pt-6 border-t border-white/10">
                     {msg.steps.map((step, idx) => (
                       <div key={idx} className="flex gap-4 items-start text-xs opacity-90 leading-tight">
                         <span className="w-5 h-5 rounded-lg bg-white/10 flex items-center justify-center font-black text-[10px] shrink-0">{idx+1}</span>
                         {step}
                       </div>
                     ))}
                   </div>
                 )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Live Transcription HUD */}
        <AnimatePresence>
          {liveTranscription && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex justify-end pr-4"
            >
               <div className="bg-secondary/10 border border-secondary/20 p-4 rounded-2xl text-secondary text-xs font-bold italic shadow-lg shadow-secondary/5">
                  <span className="opacity-50 mr-2 not-italic underline decoration-secondary/30">Transcribing:</span>
                  "{liveTranscription}"
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 items-center text-primary ml-2">
            <div className="flex gap-1.5">
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Saathi is synthesizing intelligence...</span>
          </motion.div>
        )}
      </div>

      {/* Voice Interaction Controller */}
      <div className="p-8 border-t border-outline-variant/10 bg-surface/50 backdrop-blur-2xl relative z-10 min-h-[140px] flex flex-col justify-center">
        <div className="flex gap-6 items-center">
          
          {/* JARVIS Energy Orb / Mic Toggle */}
          <div className="relative isolate">
             <AnimatePresence>
                {isListening && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [1, 1.3, 1], opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className={`absolute inset-0 rounded-full blur-[60px] -z-10 ${isJarvisMode ? 'bg-secondary/60' : 'bg-primary/60'}`}
                  />
                )}
             </AnimatePresence>

             {/* Soundwave Visualizer Bars */}
             <div className="absolute inset-0 flex items-center justify-center gap-1 pointer-events-none -translate-y-12">
                {isListening && [1,2,3,4,5,6].map(i => (
                  <motion.div 
                    key={i}
                    animate={{ height: [4, 24, 4] }}
                    transition={{ repeat: Infinity, duration: 0.5 + (i * 0.1), ease: "easeInOut" }}
                    className={`w-1.5 rounded-full ${isJarvisMode ? 'bg-secondary/40' : 'bg-primary/40'}`}
                  />
                ))}
             </div>

             <button 
                onClick={toggleMic}
                className={`w-16 h-16 rounded-[2rem] flex items-center justify-center transition-all duration-500 shadow-2xl relative ${
                  isListening 
                    ? "bg-secondary text-on-secondary scale-110 shadow-secondary/30" 
                    : "bg-primary text-on-primary hover:scale-105 shadow-primary/20"
                }`}
              >
                <div className="absolute inset-0 bg-white/10 rounded-[2rem] opacity-0 hover:opacity-100 transition-opacity" />
                <span className="material-symbols-outlined text-3xl z-10">{isListening ? (isJarvisMode ? 'graphic_eq' : 'waves') : 'mic'}</span>
              </button>
          </div>
          
          <div className="flex-1 relative">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder={isListening ? "I am listening to you..." : "Talk to Jarvis or type your query..."}
              className="w-full bg-surface-container-highest border-none rounded-[2rem] py-5 pl-8 pr-16 text-sm font-body text-on-surface focus:ring-2 focus:ring-primary/20 placeholder:text-on-surface-variant/40 transition-all shadow-inner"
            />
            <button 
              onClick={() => sendMessage(input)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center text-primary bg-primary/10 hover:bg-primary/20 transition-all"
            >
              <span className="material-symbols-outlined font-black">arrow_forward</span>
            </button>
          </div>
        </div>

        {isJarvisMode && (
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="flex items-center justify-center gap-3 mt-6 text-[10px] font-black uppercase tracking-[0.3em] text-secondary"
           >
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping" />
              JARVIS HANDS-FREE ACTIVE
           </motion.div>
        )}
      </div>
    </div>
  );
}
