import Image from "next/image";

export default function AiAssistantPage() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* 1. Full-screen Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/ai-bg.jpg"
          alt="AI Assistant Background"
          fill
          priority
          quality={100}
          className="object-cover object-center"
        />
        {/* Subtle dark overlay to make your chat text easier to read */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* 2. Glassmorphism Chat Interface Box */}
      <div className="w-full max-w-xl mx-4 aspect-[4/5] bg-black/40 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl flex flex-col p-6 text-white">
        
        {/* Header */}
        <div className="border-b border-white/10 pb-4 mb-4">
          <h1 className="text-xl font-bold tracking-wide">GARA AI ASSISTANT</h1>
          <p className="text-xs text-white/60">Ask me anything about our digital services</p>
        </div>

        {/* Messages Area (Grows to take up space) */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin">
          <div className="bg-white/10 rounded-xl p-3 max-w-[85%] text-sm self-start">
            Hello! I am your AI assistant. how can I help you navigate Gara Digitals today?
          </div>
        </div>

        {/* Input Area */}
        <div className="mt-4 flex gap-2">
          <input 
            type="text" 
            placeholder="Type your message..." 
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 placeholder-white/40"
          />
          <button className="bg-white text-black font-semibold px-5 py-3 rounded-xl text-sm hover:bg-white/90 transition-colors">
            Send
          </button>
        </div>

      </div>
    </div>
  );
}

