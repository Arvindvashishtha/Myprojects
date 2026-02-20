import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileText, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { parseFile } from '../../services/documentParser';

const DocumentUploader: React.FC = () => {
    const { uploadedFiles, addFile, removeFile, setExtractedText, extractedText } = useAppStore();

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        for (const file of acceptedFiles) {
            const id = crypto.randomUUID();
            addFile({
                id,
                name: file.name,
                size: file.size,
                type: file.type,
            });

            try {
                const text = await parseFile(file);
                if (text) {
                    setExtractedText(extractedText + (extractedText ? '\n\n' : '') + `--- FILE: ${file.name} ---\n` + text);
                }
            } catch (error) {
                console.error(`Failed to parse ${file.name}:`, error);
            }
        }
    }, [addFile, setExtractedText, extractedText]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'text/plain': ['.txt'],
            'text/markdown': ['.md'],
            'application/pdf': ['.pdf'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
        },
    });

    const docFiles = uploadedFiles.filter(f => !f.type.startsWith('image/'));

    return (
        <div className="space-y-6">
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${isDragActive
                    ? 'border-blue-500 bg-blue-500/5'
                    : 'border-gray-800 hover:border-gray-700 hover:bg-gray-800/20'
                    }`}
            >
                <input {...getInputProps()} />
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="text-gray-400" />
                </div>
                <p className="text-lg font-medium text-gray-200">
                    {isDragActive ? 'Drop files here' : 'Click or drag PRDs to upload'}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                    Supports .pdf, .docx, .txt, .md
                </p>
            </div>

            {docFiles.length > 0 && (
                <div className="grid grid-cols-1 gap-3">
                    {docFiles.map((file) => (
                        <div
                            key={file.id}
                            className="flex items-center gap-4 bg-gray-800/40 p-4 rounded-xl border border-gray-800 group"
                        >
                            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                                <FileText className="text-blue-500 w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-200 truncate">{file.name}</p>
                                <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                <button
                                    onClick={() => removeFile(file.id)}
                                    className="p-2 text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DocumentUploader;
