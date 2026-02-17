# SOP: Local Test Case Generation

## 1. Goal
Generate detailed, structured test cases based on user input (requirements) using a local LLM (Ollama).

## 2. Inputs
- **User Input**: A string describing the feature or requirement.
- **System Prompt**: A pre-defined markdown template (`templates/system_prompt.md`) ensuring consistency.
- **Model**: `llama3.2`.

## 3. Tool Logic (The "Tool" Layer)
The system will use the `OllamaChat` utility (to be implemented in `js/ollama.js`).

### Function Signature
`generateTestCases(userRequirement: string, systemContext: string) -> Promise<string>`

### Logic Flow
1.  **Construct Payload**:
    ```json
    {
      "model": "llama3.2",
      "messages": [
         { "role": "system", "content": systemContext },
         { "role": "user", "content": userRequirement }
      ],
      "stream": true
    }
    ```
2.  **Execute Request**: Send POST to `http://localhost:11434/api/chat`.
3.  **Process Stream**:
    - Listen for data chunks.
    - Accumulate/append text tokens to the UI.
    - Handle `done: true`.

## 4. Edge Cases
- **Ollama Offline**:
    - *Detection*: Network error (Connection Refused).
    - *Handling*: Display "Ollama is not running. Please run `ollama serve`" in the UI.
- **Model Missing**:
    - *Detection*: HTTP 404 or specific error body.
    - *Handling*: Display "Model `llama3.2` not found. Run `ollama pull llama3.2`".
- **Empty Input**:
    - *Handling*: Disable "Generate" button until input is present.
