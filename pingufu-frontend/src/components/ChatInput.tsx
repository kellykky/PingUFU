import { useState, useRef, useEffect } from "react";
import { SendHorizonal } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 160) + "px";
    }
  }, [value]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-4">
      <div className="flex items-end gap-2 bg-card border border-border rounded-2xl shadow-lg px-4 py-3">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Pergunte algo sobre a FACOM..."
          disabled={disabled}
          rows={1}
          className="flex-1 bg-transparent resize-none outline-none text-sm leading-relaxed max-h-40 placeholder:text-muted-foreground/60"
        />
        <button
          onClick={handleSend}
          disabled={!value.trim() || disabled}
          className="shrink-0 p-2 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-primary text-primary-foreground hover:opacity-90"
        >
          <SendHorizonal size={18} />
        </button>
      </div>
      <p className="text-center text-[11px] text-muted-foreground/60 mt-2">
        O PingUfu pode cometer erros. Verifique informações críticas nos documentos oficiais da FACOM.
      </p>
    </div>
  );
}
