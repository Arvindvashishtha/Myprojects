export type Priority = 'High' | 'Medium' | 'Low';
export type TestType = 'Functional' | 'UI/UX' | 'Edge Case' | 'Negative' | 'Accessibility';

export interface TestCase {
    id: string;
    title: string;
    preconditions: string;
    steps: string[];
    expectedResults: string;
    priority: Priority;
    testType: TestType;
    relatedRequirements?: string;
}

export interface UploadedFile {
    id: string;
    name: string;
    size: number;
    type: string;
    content?: string; // Extracted text
    previewUrl?: string; // For images
}

export interface AppSettings {
    apiProvider: 'openai' | 'claude' | 'gemini' | 'custom';
    apiKey: string;
    model: string;
    theme: 'light' | 'dark' | 'system';
}

export interface Project {
    id: string;
    name: string;
    createdAt: number;
    updatedAt: number;
    testCases: TestCase[];
}

export interface GenerationHistory {
    id: string;
    timestamp: number;
    inputSource: string;
    caseCount: number;
}
