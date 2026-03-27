export interface Source {
  titulo: string;
  link: string | null;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  timestamp: Date;
}

export interface ApiResponse {
  resposta_ia: string;
  fontes: Source[];
  chat_id: string | null;
}
