import { OllamaClient } from './ollama.js';

// DOM Elements
const inputArea = document.getElementById('userInput');
const generateBtn = document.getElementById('generateBtn');
const outputArea = document.getElementById('outputArea');
const statusBadge = document.getElementById('statusBadge');

// State
const client = new OllamaClient();
let systemPrompt = '';

// Initialization
async function init() {
    // Load System Prompt
    try {
        /* In a real web server we would fetch this. 
           Since we are local file system, we might need a workaround or assume it's pasted/injected.
           For this specific "Local Tool" demo, we will try to fetch it relative path. 
        */
        // Note: Fetching local files via XHR might fail due to CORS/Policy. 
        // For simplicity in this specific "no-build" environment, I'll hardcode the fallback 
        // or try to fetch.
        const res = await fetch('templates/system_prompt.md');
        if (res.ok) {
            systemPrompt = await res.text();
        } else {
            console.warn("Could not load template file. Using default.");
            systemPrompt = "You are a QA Assistant. Generate test cases.";
        }
    } catch (e) {
        console.warn("Template load error (likely CORS if local):", e);
        // Fallback for local filesystem opening
        systemPrompt = `You are an expert QA Automation Engineer. Your goal is to generate comprehensive test cases based on the user's feature description or requirement.
        Format the output using Markdown tables for Positive and Negative scenarios.`;
    }

    // Check Connection
    const isConnected = await client.checkConnection();
    updateStatus(isConnected);
}

function updateStatus(connected) {
    if (connected) {
        statusBadge.textContent = '● System Online (Llama 3.2)';
        statusBadge.classList.add('online');
        statusBadge.classList.remove('offline');
        generateBtn.disabled = false;
    } else {
        statusBadge.textContent = '● System Offline / Model Missing';
        statusBadge.classList.add('offline');
        statusBadge.classList.remove('online');
        generateBtn.disabled = true;
    }
}

// Event Listeners
generateBtn.addEventListener('click', async () => {
    const userInput = inputArea.value.trim();
    if (!userInput) return;

    // Reset UI
    outputArea.innerHTML = '';
    generateBtn.disabled = true;
    generateBtn.textContent = 'Generating...';

    // Markdown Converter (Simple global or just text for now. We can add marked.js via CDN in HTML)
    let fullText = '';

    try {
        await client.generateParams(userInput, systemPrompt, (chunk, isDone) => {
            if (isDone) {
                generateBtn.disabled = false;
                generateBtn.textContent = 'Generate Test Cases';
                return;
            }
            if (chunk) {
                fullText += chunk;
                // Simple stream render: In a real app we'd use a streamed markdown parser
                // For now, we will just set text or try to parse if library exists
                if (window.marked) {
                    outputArea.innerHTML = window.marked.parse(fullText);
                } else {
                    outputArea.innerText = fullText;
                }

                // Auto scroll
                outputArea.scrollTop = outputArea.scrollHeight;
            }
        });
    } catch (err) {
        outputArea.innerHTML = `<div class="error">Error: ${err.message}</div>`;
        generateBtn.disabled = false;
        generateBtn.textContent = 'Generate Test Cases';
    }
});

// Run Init
init();
