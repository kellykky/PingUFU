import { ApiResponse } from "@/types/chat";

const API_BASE_URL = "http://localhost:8000";

export async function sendChatMessage(
  pergunta: string,
  chatId: string | null = null
): Promise<ApiResponse> {
  const res = await fetch(`${API_BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pergunta, chat_id: chatId }),
  });

  if (!res.ok) {
    throw new Error(`Erro na API: ${res.status}`);
  }

  return res.json();
}
