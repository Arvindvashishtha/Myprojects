import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TestCase, UploadedFile, AppSettings, Project, GenerationHistory } from '../types';

interface AppState {
    // Input State
    uploadedFiles: UploadedFile[];
    extractedText: string;
    designLinks: string[];
    urls: string[];

    // Generation State
    testCases: TestCase[];
    isProcessing: boolean;
    processingProgress: number;

    // Data State
    projects: Project[];
    history: GenerationHistory[];

    // UI/Settings State
    settings: AppSettings;

    // Actions
    addFile: (file: UploadedFile) => void;
    removeFile: (id: string) => void;
    setExtractedText: (text: string) => void;
    setTestCases: (cases: TestCase[]) => void;
    setProcessing: (processing: boolean, progress?: number) => void;
    saveProject: (name: string) => void;
    updateSettings: (settings: Partial<AppSettings>) => void;
    clearGeneration: () => void;
}

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            uploadedFiles: [],
            extractedText: '',
            designLinks: [],
            urls: [],
            testCases: [],
            isProcessing: false,
            processingProgress: 0,
            projects: [],
            history: [],
            settings: {
                apiProvider: 'gemini',
                apiKey: '',
                model: 'gemini-1.5-flash',
                theme: 'system',
            },

            addFile: (file) => set((state) => ({
                uploadedFiles: [...state.uploadedFiles, file]
            })),

            removeFile: (id) => set((state) => ({
                uploadedFiles: state.uploadedFiles.filter(f => f.id !== id)
            })),

            setExtractedText: (text) => set({ extractedText: text }),

            setTestCases: (cases) => set({ testCases: cases }),

            setProcessing: (processing, progress = 0) => set({
                isProcessing: processing,
                processingProgress: progress
            }),

            saveProject: (name) => set((state) => {
                const newProject: Project = {
                    id: crypto.randomUUID(),
                    name,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                    testCases: state.testCases,
                };
                return { projects: [...state.projects, newProject] };
            }),

            updateSettings: (newSettings) => set((state) => ({
                settings: { ...state.settings, ...newSettings }
            })),

            clearGeneration: () => set({
                uploadedFiles: [],
                extractedText: '',
                designLinks: [],
                urls: [],
                testCases: [],
                processingProgress: 0,
            }),
        }),
        {
            name: 'qa-generator-storage',
            partialize: (state) => ({
                projects: state.projects,
                history: state.history,
                settings: state.settings,
            }),
        }
    )
);
