export function TypingIndicator() {
  return (
    <div className="flex gap-3 justify-start">
      <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
        <div className="w-3 h-3 rounded-full bg-primary/60" />
      </div>
      <div className="ai-bubble flex items-center gap-1.5 py-4 px-5">
        <div className="typing-dot" />
        <div className="typing-dot" />
        <div className="typing-dot" />
      </div>
    </div>
  );
}
