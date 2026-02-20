import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Image as ImageIcon, X, Plus } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

const ImageUploader: React.FC = () => {
    const { uploadedFiles, addFile, removeFile } = useAppStore();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const previewUrl = e.target?.result as string;
                addFile({
                    id: crypto.randomUUID(),
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    previewUrl,
                });
            };
            reader.readAsDataURL(file);
        });
    }, [addFile]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
        },
    });

    const images = uploadedFiles.filter(f => f.type.startsWith('image/'));

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
                    <ImageIcon className="text-gray-400" />
                </div>
                <p className="text-lg font-medium text-gray-200">
                    {isDragActive ? 'Drop images here' : 'Click or drag screenshots'}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                    Supports PNG, JPG, WebP
                </p>
            </div>

            {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {images.map((image) => (
                        <div
                            key={image.id}
                            className="relative aspect-video rounded-xl overflow-hidden border border-gray-800 group"
                        >
                            <img
                                src={image.previewUrl}
                                alt={image.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button
                                    onClick={() => removeFile(image.id)}
                                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                    <div
                        {...getRootProps()}
                        className="border border-dashed border-gray-800 rounded-xl aspect-video flex flex-col items-center justify-center text-gray-500 hover:text-gray-300 hover:bg-gray-800/30 transition-all cursor-pointer"
                    >
                        <input {...getInputProps()} />
                        <Plus className="w-6 h-6 mb-1" />
                        <span className="text-xs font-medium">Add more</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
