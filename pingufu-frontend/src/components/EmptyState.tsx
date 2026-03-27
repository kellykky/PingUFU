import { GraduationCap } from "lucide-react";

interface EmptyStateProps {
  onPromptClick: (prompt: string) => void;
  prompts: string[];
}

export function EmptyState({ onPromptClick, prompts }: EmptyStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4">
      
      {/* Ícone (GraduationCap) e título (h1) substituídos pela logo */}
      <img 
        src="pingufu logo.png" 
        alt="Logo PingUfu" 
        className="h-16 sm:h-20 w-auto object-contain mb-4" 
      />
      
      <p className="text-muted-foreground text-sm mb-8 text-center max-w-md">
        Olá! Sou o assistente de IA da FACOM. Posso te ajudar com dúvidas sobre o BCC, BSI, disciplinas, estágio, TCC e mais.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl w-full">
        {prompts.map((prompt, i) => (
          <div key={i} onClick={() => onPromptClick(prompt)} className="prompt-card">
            <p className="text-sm text-secondary-foreground leading-snug">{prompt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
