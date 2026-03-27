### PingUfu - Chatbot Acadêmico

O PingUfu é um assistente virtual inteligente desenvolvido para os alunos da Faculdade de Computação (FACOM) da UFU. Ele utiliza a arquitetura RAG (Retrieval-Augmented Generation) para consultar uma base de dados oficial (ementas, regras de estágio, etc.) antes de responder, garantindo precisão e evitando alucinações da IA.

## Tecnologias Principais

- **Backend:** Python, FastAPI, Uvicorn, Pydantic.
- **Frontend:** React, Tailwind CSS.
- **IA:** Google Gemini (LLM), LangChain, Sentence-Transformers (Embeddings).
- **Banco de Dados:** MongoDB Atlas com Vector Search (Busca Vetorial).

## Como Executar Localmente

O projeto é dividido em duas partes que devem rodar simultaneamente em terminais separados.

### 1. Backend (API)

Navegue até a pasta do backend e instale as dependências:
cd backend
python -m venv .venv
source .venv/bin/activate  # No Windows use: .venv\Scripts\activate
pip install -r requirements.txt

Crie um arquivo .env na pasta backend com as suas credenciais:
GEMINI_API_KEY=sua_chave_aqui
MONGO_URI=sua_string_mongodb_aqui

Inicie o servidor:
uvicorn main:app --reload

A API rodará em http://localhost:8000.

### 2. Frontend (Interface)

Em um novo terminal, navegue até a pasta do frontend e instale as dependências:
cd frontend
npm install

Inicie o servidor web:
npm run dev

Acesse a aplicação no seu navegador pelo link gerado no terminal (geralmente http://localhost:8080 ou http://localhost:5173).
