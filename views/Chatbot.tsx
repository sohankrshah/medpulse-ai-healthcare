
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Info } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { Message } from '../types';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      sender: 'ai', 
      text: "Hello! I'm your MedPulse AI Assistant. How can I help you today? You can ask about symptoms, medicine info, or booking tips.", 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await geminiService.chatWithMedicalAI(input, []);
      const aiMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        sender: 'ai', 
        text: aiResponse || "I'm sorry, I couldn't process that. Please try again.", 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
      const errMsg: Message = { id: 'err', sender: 'ai', text: "Error communicating with the medical brain. Please check your connection.", timestamp: new Date() };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden max-w-4xl mx-auto">
      <div className="bg-blue-600 p-6 text-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
            <Bot size={28} />
          </div>
          <div>
            <h2 className="text-xl font-bold">MedPulse AI Chat</h2>
            <div className="flex items-center gap-1.5 text-blue-100 text-xs font-medium">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              Live Symptom Checker
            </div>
          </div>
        </div>
        <div className="hidden md:flex flex-col items-end opacity-80 text-xs">
          <p>Clinical Decision Support</p>
          <p>Powered by Gemini 3</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50" ref={scrollRef}>
        <div className="flex items-start gap-4 mb-4">
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex gap-3 text-sm text-blue-700 w-full">
                <Info className="flex-shrink-0" size={18} />
                <p><strong>Disclaimer:</strong> This AI assistant is for informational purposes only. In case of emergency, please dial emergency services immediately.</p>
            </div>
        </div>
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[80%] ${m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                m.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 shadow-sm border border-slate-100'
              }`}>
                {m.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                m.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
              }`}>
                {m.text}
                <p className={`mt-2 text-[10px] ${m.sender === 'user' ? 'text-blue-200' : 'text-slate-400'}`}>
                  {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-lg bg-white text-blue-600 shadow-sm border border-slate-100 flex items-center justify-center">
                <Loader2 size={16} className="animate-spin" />
              </div>
              <div className="p-4 rounded-2xl bg-white text-slate-400 text-xs border border-slate-100 italic">
                AI is thinking...
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-white border-t border-slate-100">
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-2 transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Describe your symptoms or ask a question..."
            className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-sm text-slate-800"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 transition-all shadow-md active:scale-95"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
