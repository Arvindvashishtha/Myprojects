# Project Constitution

## Data Schemas

### Core Entities

#### 1. Integration: Ollama
- **Endpoint**: `http://localhost:11434/api/chat` (or `/api/generate`)
- **Model**: `llama3.2`

#### 2. Input Payload (`UserMessage`)
```json
{
  "role": "user",
  "content": "User's requirement or feature description"
}
```

#### 3. System Context (`SystemPayload`)
- **Storage**: `templates/system_prompt.md` (The "proper Template")
- **Structure**:
```json
{
  "role": "system",
  "content": "<Loaded content from templates/system_prompt.md>"
}
```

#### 4. Interaction Output (`ChatStream`)
- **Format**: Markdown formatted test cases (streaming text).

## Behavioral Rules
1. **Protocol 0**: Do not write scripts in `tools/` until Discovery is complete. (Discovery Complete).
2. **Data-First**: Strict adherence to the Input/Output schema defined above.
3. **Local-First**: All API calls go to `localhost:11434`. No external cloud dependencies.
4. **UI**: Simple, aesthetic Chat Interface (HTML/CSS/JS).

## Architectural Invariants
- **Frontend**: Vanilla HTML/CSS/JS (Lightweight).
- **Backend/Service**: Client-side JS directly communicating with Ollama (presuming CORS configured) or simple Node proxy if needed. *Decision: Try Client-side first for maximum "local" simplicity. If CORS blocks, add a thin Node server.*
