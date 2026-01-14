'use client';

import { useEffect, useState, useRef } from 'react';
import { knowledgeService, KnowledgeDoc } from '@/services/knowledge.service';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, Trash2, Upload, AlertCircle, FileIcon } from 'lucide-react';

export default function MaterialsPage() {
  const [docs, setDocs] = useState<KnowledgeDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchDocs = async () => {
    try {
      setIsLoading(true);
      const data = await knowledgeService.getDocs();
      setDocs(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load materials.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      validateAndSetFiles(Array.from(e.target.files));
    }
  };

  const validateAndSetFiles = (files: File[]) => {
    setError(null);
    const validFiles: File[] = [];

    if (files.length > 10) {
      setError('최대 10개의 파일까지 선택할 수 있습니다.');
      return;
    }

    for (const file of files) {
      if (!file.name.endsWith('.md')) {
        setError('Markdown (.md) 파일만 업로드 가능합니다.');
        return;
      }
      validFiles.push(file);
    }

    setSelectedFiles(validFiles);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      validateAndSetFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    try {
      setUploading(true);
      await knowledgeService.uploadDocs(selectedFiles);
      setSelectedFiles([]);
      await fetchDocs();
    } catch (err) {
      console.error(err);
      setError('파일 업로드에 실패했습니다.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await knowledgeService.deleteDoc(id);
      await fetchDocs();
    } catch (err) {
      console.error(err);
      setError('파일 삭제에 실패했습니다.');
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Knowledge Materials</h1>
        <p className="text-muted-foreground">
          AI 학습을 위한 Markdown 문서를 업로드하고 관리하세요.
        </p>
      </div>

      {error && (
        <div className="bg-destructive/15 text-destructive p-4 rounded-md flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
        </div>
      )}

      {/* Upload Area */}
      <Card
        className={`p-10 border-2 border-dashed transition-colors cursor-pointer flex flex-col items-center justify-center gap-4 ${uploading ? 'opacity-50 pointer-events-none' : 'hover:bg-accent/50 hover:border-accent-foreground/50'
          }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={openFileDialog}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
          accept=".md"
          onChange={handleFileSelect}
        />
        <div className="p-4 rounded-full bg-primary/10 text-primary">
          <Upload className="w-8 h-8" />
        </div>
        <div className="text-center space-y-1">
          <h3 className="font-semibold text-lg">
            {selectedFiles.length > 0
              ? `${selectedFiles.length}개 파일 선택됨`
              : 'Click to upload or drag and drop'}
          </h3>
          <p className="text-sm text-muted-foreground">
            Only markdown (.md) files allowed. Max 10 files.
          </p>
        </div>
        {selectedFiles.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 justify-center max-w-lg">
            {selectedFiles.map((f, i) => (
              <span key={i} className="text-xs bg-secondary px-2 py-1 rounded-md text-secondary-foreground">
                {f.name}
              </span>
            ))}
          </div>
        )}
      </Card>

      {selectedFiles.length > 0 && (
        <div className="flex justify-end">
          <Button onClick={(e) => { e.stopPropagation(); handleUpload(); }} disabled={uploading}>
            {uploading ? 'Uploading...' : '이력 데이터 업로드'}
          </Button>
        </div>
      )}

      {/* File List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Uploaded Documents ({docs.length}/10)</h2>
        {isLoading ? (
          <div className="text-center py-10 text-muted-foreground">Loading...</div>
        ) : docs.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground bg-muted/30 rounded-lg">
            등록된 문서가 없습니다.
          </div>
        ) : (
          <div className="grid gap-4">
            {docs.map((doc) => (
              <Card key={doc.id} className="p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-md bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium truncate max-w-[300px]">{doc.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
                      <span>{(doc.size / 1024).toFixed(1)} KB</span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold ${doc.status === 'COMPLETED' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          doc.status === 'FAILED' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                            'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                        {doc.status}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => handleDelete(doc.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
