import { BookOpen } from "lucide-react";
import { Source } from "@/types/chat";
import { useState } from "react";

interface SourcesBadgesProps {
  sources: Source[];
}

export function SourcesBadges({ sources }: SourcesBadgesProps) {
  const [expanded, setExpanded] = useState(false);

  if (!sources.length) return null;

  return (
    <div className="mt-2 pt-2 border-t border-border/50">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <BookOpen size={13} />
        Fontes Consultadas ({sources.length})
      </button>
      {expanded && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {sources.map((s, i) =>
            s.link ? (
              <a
                key={i}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="source-badge hover:underline"
              >
                {s.titulo}
              </a>
            ) : (
              <span key={i} className="source-badge">
                {s.titulo}
              </span>
            )
          )}
        </div>
      )}
    </div>
  );
}
