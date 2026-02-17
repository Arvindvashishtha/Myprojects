# Findings

## Research
- Goal: Create a local LLM Testcase generator using Ollama (Llama 3.2).
- Source Material: User input + Stored Template.
- Interface: Web UI Chat.

## Constraints
- **Model**: `llama3.2` (Must be pulled locally via `ollama pull llama3.2`).
- **Environment**: Localhost.
- **CORS**: Browser might block requests to localhost:11434 from a file serving from filesystem or another port. *Mitigation*: User might need to run chrome with disabled web security or we start a simple `npx serve` and ensure Ollama has `OLLAMA_ORIGINS="*"` set.
    - *Note to User*: Will need to likely set `OLLAMA_ORIGINS="*"` env var when running Ollama.

## Technical Decisions
- **Architecture**: Single Page Application (SPA).
- **Stack**: HTML5, CSS3, Vanilla JS.
