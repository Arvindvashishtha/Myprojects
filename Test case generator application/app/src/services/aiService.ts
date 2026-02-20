import type { TestCase } from '../types';
import { getPromptByTemplate } from './prompts';

interface GenerationContext {
    requirements: string;
    images?: string[];
    template?: 'agile' | 'waterfall' | 'bdd';
}

export const generateTestCases = async (
    context: GenerationContext,
    apiKey: string,
    model: string = 'gpt-4o',
    provider: string = 'openai'
): Promise<TestCase[]> => {
    if (!apiKey) throw new Error('API Key is required. Please set it in Settings.');

    // Safety: ensure model name matches provider
    let activeModel = model;
    if (provider === 'gemini' && (!activeModel || !activeModel.startsWith('gemini'))) {
        activeModel = 'gemini-1.5-flash';
    } else if (provider === 'openai' && (!activeModel || !activeModel.startsWith('gpt'))) {
        activeModel = 'gpt-4o';
    } else if (provider === 'claude' && (!activeModel || !activeModel.startsWith('claude'))) {
        activeModel = 'claude-3-5-sonnet-20240620';
    }

    const systemPrompt = getPromptByTemplate(context.template);
    const userPrompt = `Requirements:\n${context.requirements}`;

    let endpoint = '';
    let body: any = {};

    if (provider === 'openai') {
        endpoint = 'https://api.openai.com/v1/chat/completions';
        const messages: any[] = [
            { role: 'system', content: systemPrompt },
            {
                role: 'user',
                content: [
                    { type: 'text', text: userPrompt },
                    ...(context.images || []).map(img => ({
                        type: 'image_url',
                        image_url: { url: img } // Assuming base64 or valid URL
                    }))
                ]
            }
        ];
        body = {
            model: activeModel || 'gpt-4o',
            messages,
            response_format: { type: 'json_object' }
        };
    } else if (provider === 'claude') {
        endpoint = 'https://api.anthropic.com/v1/messages';
        body = {
            model: activeModel || 'claude-3-5-sonnet-20240620',
            max_tokens: 4096,
            system: systemPrompt,
            messages: [
                {
                    role: 'user',
                    content: [
                        { type: 'text', text: userPrompt },
                        ...(context.images || []).map(img => ({
                            type: 'image',
                            source: {
                                type: 'base64',
                                media_type: 'image/png', // Simplified
                                data: img.split(',')[1] // Strip base64 prefix
                            }
                        }))
                    ]
                }
            ]
        };
    } else if (provider === 'gemini') {
        endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${activeModel || 'gemini-1.5-flash'}:generateContent?key=${apiKey}`;
        body = {
            system_instruction: {
                parts: [{ text: systemPrompt }]
            },
            contents: [
                {
                    parts: [
                        { text: userPrompt },
                        ...(context.images || []).map(img => ({
                            inline_data: {
                                mime_type: 'image/png',
                                data: img.split(',')[1]
                            }
                        }))
                    ]
                }
            ],
            generation_config: {
                response_mime_type: 'application/json'
            }
        };
    } else {
        throw new Error(`Provider ${provider} not supported yet.`);
    }

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: provider === 'gemini' ? { 'Content-Type': 'application/json' } : {
            'Content-Type': 'application/json',
            'Authorization': provider === 'openai' ? `Bearer ${apiKey}` : '',
            'x-api-key': provider === 'claude' ? apiKey : '',
            'anthropic-version': provider === 'claude' ? '2023-06-01' : '',
            'dangerously-allow-browser': 'true' // For client-side demos, though usually risky
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        let errorMessage = `API error: ${response.status}`;
        try {
            const errData = await response.json();
            errorMessage = errData.error?.message || errorMessage;
        } catch (e) {
            // Fallback if response is not JSON
            const text = await response.text();
            errorMessage = text || errorMessage;
        }
        throw new Error(errorMessage);
    }

    const data = await response.json();
    let resultString = '';

    if (provider === 'openai') {
        resultString = data.choices[0].message.content;
    } else if (provider === 'claude') {
        resultString = data.content[0].text;
    } else if (provider === 'gemini') {
        if (!data.candidates || data.candidates.length === 0) {
            throw new Error('Gemini returned no results. Check if your API key has enough quota or if the prompt was flagged.');
        }
        resultString = data.candidates[0].content?.parts?.[0]?.text;
        if (!resultString) {
            throw new Error('Gemini response parts are empty. Safety filters might have blocked the response.');
        }
    }

    try {
        const parsed = JSON.parse(resultString);
        return parsed.testCases || [];
    } catch (e) {
        console.error('Failed to parse AI response:', resultString);
        throw new Error('AI returned invalid format. Please try again.');
    }
};
