import { useState, useRef, useEffect, useCallback } from "react";
import { Plus, Settings, GraduationCap } from "lucide-react";
import { ChatMessage } from "@/types/chat";
import { suggestedPrompts } from "@/lib/mock-data";
import { sendChatMessage } from "@/lib/api";
import { MessageBubble } from "@/components/MessageBubble";
import { TypingIndicator } from "@/components/TypingIndicator";
import { ChatInput } from "@/components/ChatInput";
import { EmptyState } from "@/components/EmptyState";
import { toast } from "sonner";

export default function Index() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = useCallback(async (content: string) => {
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const data = await sendChatMessage(content, chatId);

      if (data.chat_id) setChatId(data.chat_id);

      const aiMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.resposta_ia,
        sources: data.fontes,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      toast.error("Não foi possível conectar ao servidor. Verifique se a API está rodando.");
      console.error("Erro ao enviar mensagem:", error);
    } finally {
      setIsTyping(false);
    }
  }, [chatId]);

  const handleNewChat = () => {
    setMessages([]);
    setChatId(null);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <main className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/80 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <img
              src="icone pingufu.png"
              alt="Logo PingUfu"
              className="h-8 w-auto object-contain"
            />
            <span className="font-semibold text-foreground tracking-tight">pingUFU</span> 
            <span className="text-xs text-muted-foreground hidden sm:inline">
              · Assistente de IA da FACOM
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleNewChat}
              className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              title="Novo Chat"
            >
              <Plus size={20} />
            </button>
            <button
              className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              title="Configurações"
            >
              <Settings size={20} />
            </button>
          </div>
        </header>

        {messages.length === 0 && !isTyping ? (
          <EmptyState onPromptClick={sendMessage} prompts={suggestedPrompts} />
        ) : (
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="max-w-3xl mx-auto space-y-5">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}

        <ChatInput onSend={sendMessage} disabled={isTyping} />
      </main>
    </div>
  );
}
