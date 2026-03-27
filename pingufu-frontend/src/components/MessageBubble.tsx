import ReactMarkdown from "react-markdown";
import { ChatMessage } from "@/types/chat";
import { SourcesBadges } from "./SourcesBadges";
import { Bot } from "lucide-react";

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
          <Bot size={16} className="text-primary" />
        </div>
      )}
      <div className={`max-w-[75%] ${isUser ? "user-bubble" : "ai-bubble"}`}>
        {isUser ? (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-[hsl(var(--ai-bubble-foreground))] prose-strong:text-foreground prose-li:text-[hsl(var(--ai-bubble-foreground))]">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}
        {!isUser && message.sources && <SourcesBadges sources={message.sources} />}
      </div>
    </div>
  );
}
