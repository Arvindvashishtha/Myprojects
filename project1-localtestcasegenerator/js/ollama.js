/**
 * Ollama API Client
 * Handles communication with the local Ollama instance.
 */

const OLLAMA_HOST = 'http://localhost:11434';
const DEFAULT_MODEL = 'llama3.2';

export class OllamaClient {
    constructor(host = OLLAMA_HOST, model = DEFAULT_MODEL) {
        this.host = host;
        this.model = model;
    }

    /**
     * Checks if Ollama is running and the model is available.
     * @returns {Promise<boolean>}
     */
    async checkConnection() {
        try {
            const response = await fetch(`${this.host}/api/tags`);
            if (!response.ok) return false;
            const data = await response.json();
            return data.models.some(m => m.name.includes(this.model));
        } catch (error) {
            console.error('Ollama connection check failed:', error);
            return false;
        }
    }

    /**
     * Generates a streaming chat response.
     * @param {string} userMessage - The user's input.
     * @param {string} systemContext - The system prompt/template.
     * @param {function} onChunk - Callback for each chunk of data.
     * @returns {Promise<void>}
     */
    async generateParams(userMessage, systemContext, onChunk) {
        const payload = {
            model: this.model,
            messages: [
                { role: 'system', content: systemContext },
                { role: 'user', content: userMessage }
            ],
            stream: true
        };

        try {
            const response = await fetch(`${this.host}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                // Ollama returns a stream of JSON objects
                // We need to parse multiple JSON objects if they come in a single chunk
                const lines = chunk.split('\n').filter(line => line.trim() !== '');

                for (const line of lines) {
                    try {
                        const json = JSON.parse(line);
                        if (json.message && json.message.content) {
                            onChunk(json.message.content);
                        }
                        if (json.done) {
                            onChunk(null, true); // Signal done
                        }
                    } catch (e) {
                        console.error('Error parsing JSON chunk', e);
                    }
                }
            }
        } catch (error) {
            console.error('Generation failed:', error);
            throw error;
        }
    }
}
